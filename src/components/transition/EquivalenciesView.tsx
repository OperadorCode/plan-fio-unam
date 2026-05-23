import React, { useMemo } from "react";
import { EquivalenciesTable } from "./EquivalenciesTable";
import { useTransitionData } from "../../hooks/useTransitionData";
import { useCareerMetadata } from "../../hooks/useCareerMetadata";
import { useAppStore } from "../../store/useAppStore";
import { AlertCircle } from "lucide-react";

export const EquivalenciesView: React.FC = () => {
    const { data: transitionData, hasTransition } = useTransitionData();
    const { originCourseMeta, targetCourseMeta } = useCareerMetadata();
    const courseStatus = useAppStore((state) => state.courseStatus);

    const approvedCourses = useMemo(
        () => Object.entries(courseStatus).filter(([, status]) => status === "approved").map(([id]) => id),
        [courseStatus]
    );

    const regularCourses = useMemo(
        () => Object.entries(courseStatus).filter(([, status]) => status === "regular").map(([id]) => id),
        [courseStatus]
    );

    if (!hasTransition || !transitionData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <AlertCircle size={48} className="mb-4 text-gray-400" />
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Sin equivalencias disponibles</h3>
                <p className="text-center max-w-md">
                    No hay una transición o tabla de equivalencias definida para tu plan de estudios actual.
                </p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in w-full max-w-5xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Tabla de Equivalencias</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Consultá cómo se reconocen las materias de tu plan actual en el nuevo plan de estudios propuesto.
                </p>
            </div>
            <EquivalenciesTable
                originCourseMeta={originCourseMeta}
                targetCourseMeta={targetCourseMeta}
                approvedCourses={approvedCourses}
                regularCourses={regularCourses}
                equivalencies={transitionData.equivalencies}
            />
        </div>
    );
};

export default EquivalenciesView;
