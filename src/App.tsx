/**
 * Componente raíz de la aplicación que orquestra la interfaz principal.
 * Integra la gestión de estado global, componentes de visualización y herramientas
 * bajo una estructura de navegación por pestañas limpia y unificada.
 */

import { useState, useMemo } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { useAppStore } from "./store/useAppStore";
import { usePlanContext } from "./context/PlanContext";
import {
  Map,
  Table,
  ArrowRightLeft,
  CalendarDays,
  BookOpenCheck,
} from "lucide-react";
import { WelcomeModal } from "./components/common/WelcomeModal";
import { InstallPrompt } from "./components/pwa/InstallPrompt";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { CommandPalette } from "./components/common/CommandPalette";
import { useAppShortcuts } from "./hooks/useAppShortcuts";
import { useCourseNavigation } from "./hooks/useCourseNavigation";
import type { TabId } from "./types";

import { MainLayout } from "./components/layout/MainLayout";
import { HeroSection } from "./components/layout/HeroSection";
import { TabContent } from "./components/layout/TabContent";

import { useTransitionData } from "./hooks/useTransitionData";

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("table");

  const careerId = useAppStore((state) => state.careerId);
  const { hasTransition } = useTransitionData();

  if (activeTab === "transition" && !hasTransition) {
    setActiveTab("table");
  }

  const { currentPlan, allCourses, loading } = usePlanContext();

  if (loading || !currentPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingScreen message="Cargando plan de estudios..." />
      </div>
    );
  }

  useAppShortcuts(setActiveTab);
  useCourseNavigation(setActiveTab);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const tabs = useMemo(
    () =>
      [
        {
          id: "table",
          label: "Plan de Estudios",
          shortLabel: "Plan",
          icon: Table,
          show: true,
        },
        {
          id: "map",
          label: "Mapa de Correlatividades",
          shortLabel: "Mapa",
          icon: Map,
          show: true,
        },
        {
          id: "transition",
          label: "Plan de Transición",
          shortLabel: "Transición",
          icon: ArrowRightLeft,
          show: hasTransition,
        },
        {
          id: "exams",
          label: "Exámenes",
          shortLabel: "Mesas",
          icon: BookOpenCheck,
          show: true,
        },
        {
          id: "calendar",
          label: "Calendario",
          shortLabel: "Calendario",
          icon: CalendarDays,
          show: true,
        },
      ] as const,
    [careerId, hasTransition]
  );

  return (
    <ErrorBoundary>
      <MainLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        header={<Header onMenuClick={() => setMobileSidebarOpen(true)} />}
      >
        <div className="flex flex-col min-h-screen">
          <CommandPalette />

          <main className="flex-grow container mx-auto px-4 py-6 md:py-8 max-w-7xl">
            <HeroSection
              currentPlan={currentPlan}
              activeTab={activeTab}
              allCourses={allCourses}
            />

            <TabContent
              activeTab={activeTab}
              currentPlan={currentPlan}
              careerId={careerId}
            />
          </main>
          <Footer />
          <WelcomeModal />
          <InstallPrompt />
        </div>
      </MainLayout>
    </ErrorBoundary>
  );
}

export default App;
