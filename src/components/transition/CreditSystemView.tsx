import React from "react";
import { BookOpen, GraduationCap, Layers, Filter } from "lucide-react";
import type { CreditSystemData } from "../../types/creditSystem";
import { BlockCard } from "./credit-system/BlockCard";
import { YearSection } from "./credit-system/YearSection";
import { useCreditProgress } from "../../hooks/useCreditProgress";
import { CreditSummaryCard } from "./credit-system/CreditSummaryCard";
import { IntermediateTitleCard } from "./credit-system/IntermediateTitleCard";
import { CreditFooter } from "./credit-system/CreditFooter";

import { BLOCK_COLORS, DEFAULT_BLOCK_COLOR } from "../../styles/domainColors";

import type { Course } from "../../types";

interface CreditSystemViewProps {
  creditData: CreditSystemData;
  approvedCodes?: string[];
  intermediateTitleName?: string;
  intermediateTitleFlag?: keyof Course;
}

export const CreditSystemView: React.FC<CreditSystemViewProps> = ({
  creditData,
  approvedCodes = [],
  intermediateTitleName,
  intermediateTitleFlag,
}) => {
  const { bloques_conocimiento, plan_de_estudios, totales_plan_estudios } =
    creditData;

  const {
    blockProgress,
    currentTitle,
    currentTitleIndex,
    titles,
    nextTitle,
    prevTitle,
    selectedBlock,
    handleBlockSelect,
    setSelectedBlock,
  } = useCreditProgress(
    creditData,
    approvedCodes,
    intermediateTitleName,
    intermediateTitleFlag
  );

  const getBlockColor = (sigla: string) => {
    return BLOCK_COLORS[sigla] || DEFAULT_BLOCK_COLOR;
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CreditSummaryCard
          totalApproved={blockProgress.totalApproved}
          totalObjective={totales_plan_estudios.CRE_total}
        />

        <IntermediateTitleCard
          currentTitle={currentTitle}
          currentIndex={currentTitleIndex}
          totalTitles={titles.length}
          onNext={nextTitle}
          onPrev={prevTitle}
        />
      </div>

      <div
        className={`rounded-xl p-6 border transition-all duration-300
                 ${
                   selectedBlock
                     ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                     : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm"
                 }
            `}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-lg hidden sm:block transition-colors duration-300
                        ${
                          selectedBlock
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-500"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        }
                    `}
          >
            {selectedBlock ? (
              <Filter size={24} strokeWidth={1.5} />
            ) : (
              <Layers size={24} strokeWidth={1.5} />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedBlock
                ? "Filtrado por Bloque"
                : `Sistema Argentino de Créditos (SACAU)`}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              {selectedBlock ? (
                <span>
                  Visualizando asignaturas del bloque{" "}
                  <strong className="text-gray-900 dark:text-white">
                    {
                      bloques_conocimiento.find(
                        (b) => b.sigla === selectedBlock
                      )?.nombre
                    }
                  </strong>
                  .
                </span>
              ) : (
                "Panel de control del plan de estudios. Seleccioná un bloque para filtrar la matriz curricular o analizá el avance global."
              )}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen size={16} /> Bloques Curriculares
          </h3>
          {selectedBlock && (
            <button
              onClick={() => setSelectedBlock(null)}
              className="text-xs font-medium text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1 hover:underline"
            >
              Borrar filtro
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bloques_conocimiento.map((block) => {
            const stats = blockProgress.stats[block.sigla];
            const progressPercent =
              (stats.approvedCredits / block.creditos_totales_bloque) * 100;
            return (
              <BlockCard
                key={block.sigla}
                block={block}
                colorClass={getBlockColor(block.sigla)}
                isSelected={selectedBlock === block.sigla}
                onSelect={() => handleBlockSelect(block.sigla)}
                approvedCredits={stats.approvedCredits}
                progress={progressPercent}
              />
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
          <GraduationCap size={16} /> Matriz Curricular Detallada
        </h3>
        <div className="space-y-3">
          {plan_de_estudios.map((year, idx) => (
            <YearSection
              key={idx}
              yearData={year}
              selectedBlock={selectedBlock}
              approvedCodes={approvedCodes}
            />
          ))}
        </div>
      </div>

      <CreditFooter
        totalHours={totales_plan_estudios.CHT_total}
        totalCredits={totales_plan_estudios.CRE_total}
      />
    </div>
  );
};
