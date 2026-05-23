import React from "react";
import { Search } from "lucide-react";
import { useEquivalenciesFilter } from "../../hooks/useEquivalenciesFilter";
import { EquivalenceRow } from "./equivalencies/EquivalenceRow";
import type {
    OriginCourseMeta,
    TargetCourseMeta,
} from "../../hooks/useCareerMetadata";
import type { EquivalenceRule } from "../../types";

interface EquivalenceTableProps {
    originCourseMeta: Record<string, OriginCourseMeta>;
    targetCourseMeta: Record<string, TargetCourseMeta>;
    approvedCourses: string[];
    regularCourses: string[];
    equivalencies: EquivalenceRule[];
}

export const EquivalenciesTable: React.FC<EquivalenceTableProps> = ({
    originCourseMeta,
    targetCourseMeta,
    approvedCourses,
    regularCourses,
    equivalencies,
}) => {
    const { searchTerm, setSearchTerm, groupedEquivalencies } =
        useEquivalenciesFilter({
            originCourseMeta,
            targetCourseMeta,
            equivalencies,
        });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col max-h-[70vh] select-none">
            <div className="p-4 sm:p-5 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex flex-shrink-0 justify-center">
                <div className="relative w-full max-w-2xl group">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Buscar materia por nombre o código..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 text-sm sm:text-base bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 outline-none transition-all placeholder-gray-400/80 font-medium text-gray-700 dark:text-gray-200 shadow-inner"
                    />
                </div>
            </div>

            <div className="w-full overflow-y-auto custom-scrollbar flex-1 relative">
                <div className="md:hidden p-4">
                    {Object.entries(groupedEquivalencies)
                        .sort()
                        .map(([year, eqs]) => (
                            <div key={year}>
                                <div className="sticky top-0 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-sm py-2 mb-2 z-10">
                                    <span className="text-[10px] font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                        {year}º Año (Plan de Origen)
                                    </span>
                                </div>
                                {eqs.map((eq: EquivalenceRule, index: number) => (
                                    <EquivalenceRow
                                        key={index}
                                        eq={eq}
                                        originCourseMeta={originCourseMeta}
                                        approvedCourses={approvedCourses}
                                        regularCourses={regularCourses}
                                    />
                                ))}
                            </div>
                        ))}
                </div>
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                        <thead className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 uppercase text-[11px] font-bold tracking-wider sticky top-0 z-20 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                            <tr>
                                <th className="px-3 sm:px-6 py-3 min-w-[200px] bg-gray-100 dark:bg-gray-900">
                                    Plan de Origen (Origen)
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
                                                {year}º Año (Plan de Origen)
                                            </td>
                                        </tr>

                                        {eqs.map((eq: EquivalenceRule, index: number) => (
                                            <EquivalenceRow
                                                key={index}
                                                eq={eq}
                                                originCourseMeta={originCourseMeta}
                                                approvedCourses={approvedCourses}
                                                regularCourses={regularCourses}
                                            />
                                        ))}
                                    </React.Fragment>
                                ))}
                        </tbody>
                    </table>
                </div>

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
