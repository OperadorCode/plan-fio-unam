import React, { useState, useMemo } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import type { CreditYear } from "../../../types/creditSystem";

interface YearSectionProps {
  yearData: CreditYear;
  selectedBlock: string | null;
  approvedCodes: string[];
}

export const YearSection = React.memo(
  ({ yearData, selectedBlock, approvedCodes }: YearSectionProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const hasActiveMatches = useMemo(() => {
      if (!selectedBlock) return true;
      return yearData.asignaturas.some((s) => s.bloque === selectedBlock);
    }, [selectedBlock, yearData]);

    return (
      <div
        className={`border rounded-xl overflow-hidden mb-4 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300
            ${
              selectedBlock && !hasActiveMatches
                ? "border-gray-100 dark:border-gray-800 opacity-60"
                : "border-gray-200 dark:border-gray-700"
            }
        `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors
                        ${
                          selectedBlock && !hasActiveMatches
                            ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        }
                    `}
            >
              {yearData.anio === "Final" ? "F" : yearData.anio}
            </div>
            <span
              className={`font-semibold text-lg transition-colors
                        ${
                          selectedBlock && !hasActiveMatches
                            ? "text-gray-400 dark:text-gray-500"
                            : "text-gray-800 dark:text-gray-100"
                        }
                    `}
            >
              {yearData.anio === "Final"
                ? "Práctica Final"
                : `Año ${yearData.anio}`}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp size={20} className="text-gray-400" />
          ) : (
            <ChevronDown size={20} className="text-gray-400" />
          )}
        </button>

        {isOpen && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[640px]">
              <thead className="bg-gray-50/50 dark:bg-gray-900/20 text-gray-500 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-2 sm:px-4 py-3 font-medium whitespace-nowrap min-w-[60px]">
                    Cod
                  </th>
                  <th className="px-2 sm:px-4 py-3 font-medium min-w-[180px]">
                    Asignatura
                  </th>
                  <th className="px-2 sm:px-4 py-3 font-medium text-center whitespace-nowrap">
                    Bloque
                  </th>
                  <th
                    className="px-2 sm:px-4 py-3 font-medium text-right text-gray-400 whitespace-nowrap hidden lg:table-cell"
                    title="Horas Presenciales Semanales"
                  >
                    HPS
                  </th>
                  <th
                    className="px-2 sm:px-4 py-3 font-medium text-right text-gray-400 whitespace-nowrap hidden md:table-cell"
                    title="Horas Presenciales Totales"
                  >
                    HPT
                  </th>
                  <th
                    className="px-2 sm:px-4 py-3 font-medium text-right text-gray-400 whitespace-nowrap hidden md:table-cell"
                    title="Horas Autónomas Totales"
                  >
                    HAT
                  </th>
                  <th
                    className="px-2 sm:px-4 py-3 font-medium text-right whitespace-nowrap"
                    title="Carga Horaria Total"
                  >
                    CHT
                  </th>
                  <th
                    className="px-2 sm:px-4 py-3 font-medium text-right text-blue-600 dark:text-blue-400 whitespace-nowrap pr-4 sm:pr-8"
                    title="Créditos"
                  >
                    CRE
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {yearData.asignaturas.map((subject) => {
                  const isDimmed =
                    selectedBlock && subject.bloque !== selectedBlock;
                  const isSubjectApproved = approvedCodes.includes(
                    subject.codigo
                  );

                  return (
                    <tr
                      key={subject.codigo}
                      className={`transition-all duration-300 group
                                            ${
                                              isDimmed
                                                ? "opacity-25 grayscale"
                                                : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            }
                                            ${
                                              isSubjectApproved && !isDimmed
                                                ? "bg-blue-50/30 dark:bg-blue-900/5"
                                                : ""
                                            }
                                        `}
                    >
                      <td className="px-2 sm:px-4 py-3 font-mono text-xs text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 whitespace-nowrap">
                        {subject.codigo}
                      </td>
                      <td className="px-2 sm:px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                        <div className="flex items-start justify-between flex-wrap sm:flex-nowrap gap-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span className="font-medium">
                              {subject.nombre}
                            </span>
                            {subject.cuatrimestre && (
                              <span className="text-[10px] text-gray-500 uppercase tracking-tight font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 whitespace-nowrap w-fit">
                                {subject.cuatrimestre}
                              </span>
                            )}
                          </div>
                          {isSubjectApproved && !isDimmed && (
                            <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full font-bold shadow-sm whitespace-nowrap">
                              <CheckCircle2 size={10} strokeWidth={3} />
                              <span className="hidden sm:inline">Aprobada</span>
                              <span className="sm:hidden">✓</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-md transition-transform duration-300
                                                ${
                                                  subject.bloque === "CB"
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                    : ""
                                                }
                                                ${
                                                  subject.bloque === "TB"
                                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                                    : ""
                                                }
                                                ${
                                                  subject.bloque === "TA"
                                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                    : ""
                                                }
                                                ${
                                                  subject.bloque === "CC"
                                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                                    : ""
                                                }
                                                ${
                                                  selectedBlock ===
                                                  subject.bloque
                                                    ? "scale-110 shadow-sm ring-1 ring-offset-1 ring-gray-200 dark:ring-gray-700"
                                                    : ""
                                                }
                                            `}
                        >
                          {subject.bloque}
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-right text-gray-500 hidden lg:table-cell">
                        {subject.HPS || "-"}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-right text-gray-500 hidden md:table-cell">
                        {subject.HPT}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-right text-gray-500 hidden md:table-cell">
                        {subject.HAT}
                      </td>
                      <td className="px-2 sm:px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">
                        {subject.CHT}
                      </td>
                      <td className="pl-2 sm:pl-4 pr-4 sm:pr-8 py-3 text-right font-bold text-blue-600 dark:text-blue-400">
                        {subject.CRE}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
);
