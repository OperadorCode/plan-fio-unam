/**
 * Componente raíz de la aplicación que orquestra la interfaz principal.
 * Integra la gestión de estado global, componentes de visualización y herramientas
 * bajo una estructura de navegación por pestañas limpia y unificada.
 */

import { useState, useMemo, useEffect } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { useAppStore } from "./store/useAppStore";
import { usePlanContext } from "./context/PlanContext";
import {
  Map,
  Table,
  CalendarDays,
  ArrowRightLeft,
  ClipboardList,
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
  const activePlanId = useAppStore((state) => state.activePlanId);
  const { hasTransition, data: transitionData } = useTransitionData();

  const { currentPlan, allCourses, loading } = usePlanContext();

  const showTransitionTabs = hasTransition && !!transitionData && activePlanId !== transitionData.config.targetPlanId && transitionData.equivalencies.length > 0;

  useAppShortcuts(setActiveTab);
  useCourseNavigation(setActiveTab);

  useEffect(() => {
    if ((activeTab === "transition" || activeTab === "equivalencies") && !showTransitionTabs) {
      setTimeout(() => setActiveTab("table"), 0);
    }
  }, [activeTab, showTransitionTabs]);

  useEffect(() => {
    const handleTabNavigation = (e: CustomEvent<{ tabId: TabId }>) => {
      setActiveTab(e.detail.tabId);
    };
    window.addEventListener("navigate-to-tab", handleTabNavigation as EventListener);
    return () => {
      window.removeEventListener("navigate-to-tab", handleTabNavigation as EventListener);
    };
  }, []);

  const tabs = useMemo(
    () =>
      [
        {
          id: "table" as const,
          label: "Plan de Estudios",
          shortLabel: "Plan",
          icon: Table,
          show: true,
        },
        {
          id: "map" as const,
          label: "Mapa de Correlatividades",
          shortLabel: "Mapa",
          icon: Map,
          show: true,
        },
        {
          id: "transition" as const,
          label: "Actualizar Plan",
          shortLabel: "Transición",
          icon: ArrowRightLeft,
          show: showTransitionTabs,
        },
        {
          id: "equivalencies" as const,
          label: "Equivalencias",
          shortLabel: "Equival.",
          icon: ClipboardList,
          show: showTransitionTabs,
        },
        {
          id: "agenda" as const,
          label: "Agenda Académica",
          shortLabel: "Agenda",
          icon: CalendarDays,
          show: true,
        },
      ],
    [careerId, showTransitionTabs]
  );

  if (loading || !currentPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingScreen message="Cargando plan de estudios..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <MainLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
        header={<Header />}
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
