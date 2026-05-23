import { useMemo, useState } from "react";
import type { EquivalenceRule } from "../types";
import { normalizeText } from "../utils/textUtils";

interface UseEquivalenciesFilterProps {
  originCourseMeta: Record<
    string,
    { name: string; year: string; regimen: string; hours: number }
  >;
  targetCourseMeta: Record<
    string,
    { name: string; regimen: string; block: string }
  >;
  equivalencies: EquivalenceRule[];
}

export const useEquivalenciesFilter = ({
  originCourseMeta,
  targetCourseMeta,
  equivalencies,
}: UseEquivalenciesFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchIndex = useMemo(() => {
    return equivalencies.map((eq) => {
      const meta2025 = targetCourseMeta[eq.targetId];
      const targetName = meta2025?.name || eq.targetName;
      const targetRegimen = meta2025?.regimen;

      const targetNameNorm = normalizeText(targetName);
      const targetIdNorm = normalizeText(eq.targetId);

      const sourceData = eq.sourceIds.map((id) => {
        const meta = originCourseMeta[id];
        return {
          id,
          idNorm: normalizeText(id),
          nameNorm: meta ? normalizeText(meta.name) : normalizeText(id),
          year: meta?.year || "Otros",
        };
      });

      return {
        ...eq,
        targetName,
        targetRegimen,
        targetNameNorm,
        targetIdNorm,
        sourceData,
      };
    });
  }, [originCourseMeta, targetCourseMeta, equivalencies]);

  const groupedEquivalencies = useMemo(() => {
    const term = normalizeText(searchTerm);
    const filtered = searchIndex.filter((eq) => {
      if (eq.targetNameNorm.includes(term) || eq.targetIdNorm.includes(term))
        return true;
      return eq.sourceData.some(
        (src) => src.nameNorm.includes(term) || src.idNorm.includes(term)
      );
    });

    const groups: Record<string, EquivalenceRule[]> = {};
    filtered.forEach((eq) => {
      const year = eq.sourceData[0]?.year || "Otros";

      if (!groups[year]) groups[year] = [];
      groups[year].push(eq);
    });

    return groups;
  }, [searchTerm, searchIndex]);

  return {
    searchTerm,
    setSearchTerm,
    groupedEquivalencies,
  };
};
