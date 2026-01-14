import React from "react";
import { BarChart2, Search } from "lucide-react";
import { useEquivalenciesFilter } from "../../hooks/useEquivalenciesFilter";
import { EquivalenceRow } from "./equivalencies/EquivalenceRow";
import type {
  CourseMeta2013,
  CourseMeta2025,
} from "../../hooks/useCareerMetadata";
import type { EquivalenceRule } from "../../types";

interface EquivalenceTableProps {
  courseMeta2013: Record<string, CourseMeta2013>;
  courseMeta2025: Record<string, CourseMeta2025>;
  approvedCourses: string[];
  equivalencies: EquivalenceRule[];
}

export const EquivalenciesTable: React.FC<EquivalenceTableProps> = ({
  courseMeta2013,
  courseMeta2025,
  approvedCourses,
  equivalencies,
}) => {
  const { searchTerm, setSearchTerm, groupedEquivalencies } =
    useEquivalenciesFilter({
      courseMeta2013,
      courseMeta2025,
      equivalencies,
    });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col max-h-[70vh]">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 flex-shrink-0">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart2 size={20} className="text-gray-500 dark:text-gray-400" />
            Tabla de Equivalencias
          </h3>
          <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
            Consultá la correspondencia entre planes de estudio.
          </p>
        </div>
        <div className="relative w-full sm:w-72 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Filtrar por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="w-full overflow-y-auto custom-scrollbar flex-1 relative overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse min-w-[600px]">
          <thead className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 uppercase text-[11px] font-bold tracking-wider sticky top-0 z-20 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <tr>
              <th className="px-3 sm:px-6 py-3 min-w-[200px] bg-gray-100 dark:bg-gray-900">
                Plan 2013 (Origen)
              </th>
              <th className="px-2 py-3 text-center min-w-[80px] bg-gray-100 dark:bg-gray-900">
                Tipo
              </th>
              <th className="px-3 sm:px-6 py-3 min-w-[200px] bg-gray-100 dark:bg-gray-900">
                Plan 2025 (Destino)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {Object.entries(groupedEquivalencies)
              .sort()
              .map(([year, eqs]) => (
                <React.Fragment key={year}>
                  <tr className="bg-gray-50/80 dark:bg-gray-800/80 sticky top-[40px] z-10 backdrop-blur-sm">
                    <td
                      colSpan={3}
                      className="px-6 py-2 text-[10px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest border-y border-gray-100 dark:border-gray-700/50 bg-gray-50/95 dark:bg-gray-800/95"
                    >
                      {year}º Año (Plan 2013)
                    </td>
                  </tr>

                  {eqs.map((eq: any, index: number) => (
                    <EquivalenceRow
                      key={index}
                      eq={eq}
                      courseMeta2013={courseMeta2013}
                      approvedCourses={approvedCourses}
                    />
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>

        {Object.keys(groupedEquivalencies).length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg">
              No se encontraron materias con ese nombre.
            </p>
            <p className="text-sm">Probá buscando por código o nombre</p>
          </div>
        )}
      </div>
    </div>
  );
};
