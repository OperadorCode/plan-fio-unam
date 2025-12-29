
/**
 * Componente raíz de la aplicación que orquestra la interfaz principal.
 * Integra la gestión de estado global, componentes de visualización (YearTable, Stats, Calendar)
 * y herramientas de productividad (ExamPlanner) bajo una estructura común.
 */



import { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import YearTable from './components/YearTable';
import Stats from './components/Stats';
import Calendar from './components/Calendar';
import ExamPlanner from './components/ExamPlanner';
import { useAppStore } from './store/useAppStore';
import { careerPlans } from './data/careers';
import { Map, Table, GraduationCap } from 'lucide-react';
import { WelcomeModal } from './components/common/WelcomeModal';
import { InstallPrompt } from './components/pwa/InstallPrompt';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingScreen } from './components/common/LoadingScreen';
import { CommandPalette } from './components/common/CommandPalette';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const CareerMap = lazy(() => import('./components/CareerMap'));

// Componente Principal: Gestiona layout, routing y estado global.
function App() {
  const [activeTab, setActiveTab] = useState<'table' | 'map'>('table');
  const careerId = useAppStore(state => state.careerId);
  const currentPlan = careerPlans[careerId as keyof typeof careerPlans];

  if (!currentPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingScreen message="Cargando plan de estudios..." />
      </div>
    );
  }

  const allCourses = Object.values(currentPlan.coursesData).flat();

  // Atajos globales de navegación
  useKeyboardShortcuts([
    { combo: 'alt+1', handler: () => setActiveTab('table') },
    { combo: 'alt+2', handler: () => setActiveTab('map') },
  ]);

  useEffect(() => {
    const handleNavigation = (e: CustomEvent) => {
      const { courseId } = e.detail;
      setActiveTab('table');
      setTimeout(() => {
        const element = document.getElementById(`course-${courseId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-4', 'ring-blue-500/50', 'z-20');
          setTimeout(() => element.classList.remove('ring-4', 'ring-blue-500/50', 'z-20'), 2000);
        }
      }, 100);
    };
    window.addEventListener('navigate-to-course', handleNavigation as EventListener);
    return () => window.removeEventListener('navigate-to-course', handleNavigation as EventListener);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans">

        <Header />
        <CommandPalette />

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <div className="lg:col-span-8 space-y-6">
              {/* Encabezado de carrera y estadísticas */}
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg shadow-blue-500/20">
                    <GraduationCap size={32} />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white leading-tight">
                      {currentPlan.name}
                    </h1>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Universidad Nacional de Misiones • Plan Oficial
                    </p>
                  </div>
                </div>
                <Stats allCourses={allCourses} />
              </div>

              {/* Navegación entre tabla y mapa */}
              <div className="bg-white dark:bg-gray-800 p-1.5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex w-full sm:w-auto sm:inline-flex overflow-x-auto max-w-full no-scrollbar">
                <button
                  onClick={() => setActiveTab('table')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'table'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <Table size={18} />
                  <span className="inline sm:hidden">Plan</span>
                  <span className="hidden sm:inline">Plan de Estudios</span>
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'map'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                >
                  <Map size={18} />
                  <span className="inline sm:hidden">Mapa</span>
                  <span className="hidden sm:inline">Mapa de Correlatividades</span>
                </button>
              </div>

              {/* Renderizado dinámico: tabla de materias o mapa de correlatividades */}
              <div className="animate-fade-in relative min-h-[400px]">
                {activeTab === 'map' && (
                  <div className="w-full h-[700px] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative">
                    <Suspense fallback={
                      <div className="flex items-center justify-center h-full">
                        <LoadingScreen message="Cargando mapa interactivo..." />
                      </div>
                    }>
                      <CareerMap courses={currentPlan.coursesData} />
                    </Suspense>
                  </div>
                )}
                {activeTab === 'table' && (
                  <div className="space-y-8 animate-fade-in">
                    {Object.entries(currentPlan.coursesData).map(([year, courses]) => (
                      <YearTable
                        key={year}
                        year={year}
                        courses={courses}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
              <section>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                  Calendario Académico
                </h2>
                <Calendar />
              </section>
              <section>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  Mesas de Examen
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1">
                  <ExamPlanner />
                </div>
              </section>
            </div>
          </div>
        </main>
        <Footer />
        <WelcomeModal />
        <InstallPrompt />
      </div>
    </ErrorBoundary>
  );
}

export default App;