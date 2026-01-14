import React from "react";
import Stats from "../features/stats/Stats";
import type { StudyPlan, Course } from "../../types";
import type { TabId } from "../../types/navigation";

interface HeroSectionProps {
  currentPlan: StudyPlan;
  activeTab: TabId;
  allCourses: Course[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeTab,
  allCourses,
}) => {
  if (activeTab !== "table") return null;

  return (
    <div className="mb-6 animate-fade-in-down">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-bl-full -mr-16 -mt-16 pointer-events-none"></div>

        <div className="relative z-10">
          <Stats
            allCourses={allCourses}
            variant="dashboard"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
