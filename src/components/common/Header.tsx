import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { careersRegistry, allPlans } from '../../data/careers';
import {
  Moon, Sun, GraduationCap, BookOpen, Search,
  ChevronDown, Check, ChevronRight,
  HardHat, Zap, Factory, Laptop, Cpu, ShieldAlert, Bot, DownloadCloud
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { DataMenu } from './DataMenu';

/**
 * Componente Header
 * Gestiona la navegación, selección de carrera, versiones de planes y el cambio de tema global.
 */

const Header: React.FC = () => {
  const careerId = useAppStore(state => state.careerId);
  const setCareer = useAppStore(state => state.setCareer);
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);


  const [showCareerHint, setShowCareerHint] = useState(false);

  // Hook de PWA
  const { isInstallable, install } = usePWAInstall();


  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const careerRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  const currentCareer = careersRegistry[careerId];

  const availablePlansData = React.useMemo(() => {
    const availablePlanIds = currentCareer ? currentCareer.availablePlans : [];
    return availablePlanIds.map(id => allPlans[id]).filter(Boolean);
  }, [currentCareer]);

  const [currentPlanDisplay, setCurrentPlanDisplay] = useState<string>('');

  useEffect(() => {
    if (availablePlansData.length > 0) {
      const defaultPlan = availablePlansData.find(p => p.active) || availablePlansData[availablePlansData.length - 1];
      setCurrentPlanDisplay(defaultPlan?.year.toString() || '...');
    }
  }, [careerId, availablePlansData]);

  useEffect(() => {
    const hasSeenHint = localStorage.getItem('careerHintDismissed');
    if (!hasSeenHint) {
      const timer = setTimeout(() => setShowCareerHint(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissHint = () => {
    setShowCareerHint(false);
    localStorage.setItem('careerHintDismissed', 'true');
  };

  const getIcon = (iconName: string | undefined, size = 18) => {
    switch (iconName) {
      case 'HardHat': return <HardHat size={size} />;
      case 'Zap': return <Zap size={size} />;
      case 'Factory': return <Factory size={size} />;
      case 'Laptop': return <Laptop size={size} />;
      case 'Cpu': return <Cpu size={size} />;
      case 'ShieldAlert': return <ShieldAlert size={size} />;
      case 'Bot': return <Bot size={size} />;
      default: return <GraduationCap size={size} />;
    }
  };

  // --- EFECTOS ---
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (careerRef.current && !careerRef.current.contains(event.target as Node)) {
        setIsCareerOpen(false);
      }
      if (planRef.current && !planRef.current.contains(event.target as Node)) {
        setIsPlanOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCareerOpen(false);
        setIsPlanOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-0">

        {/* Barra Principal */}
        <div className="container mx-auto px-4 min-h-16 py-2 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
          {/* Logo y Título */}
          <div className="flex items-center gap-3 select-none flex-shrink-0">
            {/* Icono Dinámico */}
            <div className={`p-2 rounded-lg shadow-sm shadow-blue-500/20 bg-gradient-to-br from-blue-500 to-blue-600 text-white`}>
              {currentCareer ? getIcon(currentCareer.icon, 20) : <GraduationCap size={20} />}
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">Planificador FIO</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-0.5">UNaM - Oberá</span>
            </div>
          </div>

          {/* Controles Customizados */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-end pl-2 max-w-full">

            {/* GRUPO DE SELECTORES */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 flex-shrink-0 relative z-40">

              {/* SELECTOR DE CARRERA */}
              <div className="relative" ref={careerRef}>
                {/* Tooltip Animado */}
                {showCareerHint && (
                  <div className="absolute top-full left-0 mt-3 w-max z-50 animate-bounce-slow pointer-events-none">
                    <div className="bg-blue-600 text-white text-xs font-bold py-1 px-3 rounded-full shadow-lg relative">
                      {/*  */}
                      <div className="absolute bottom-full left-4 -mb-[1px] border-4 border-transparent border-b-blue-600"></div>
                      Elegí tu carrera
                    </div>
                  </div>
                )}

                <button
                  id="career-button"
                  onClick={() => {
                    setIsCareerOpen(!isCareerOpen);
                    dismissHint();
                  }}
                  aria-haspopup="true"
                  aria-expanded={isCareerOpen}
                  aria-label="Seleccionar Carrera"
                  className={`
                    relative overflow-hidden
                    flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-200
                    ${isCareerOpen
                      ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'}
                    ${showCareerHint ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 animate-pulse' : ''}
                  `}
                >
                  {/* Animación de "linea recorriendo" */}
                  {showCareerHint && (
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent -translate-x-full animate-shimmer" />
                  )}

                  {/* Icono solo visible en mobile */}
                  <div className="block sm:hidden text-blue-600 dark:text-blue-400">
                    {currentCareer ? getIcon(currentCareer.icon, 18) : <GraduationCap size={18} />}
                  </div>

                  <span className="font-medium max-w-[120px] sm:max-w-[220px] truncate text-left relative z-10 hidden sm:block">
                    {currentCareer?.name || 'Seleccionar Carrera'}
                  </span>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 relative z-10 ${isCareerOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCareerOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1 animate-fade-in z-50 origin-top-left"
                  >
                    <div className="px-3 py-2 text-[10px] uppercase font-bold text-gray-400 border-b border-gray-100 dark:border-gray-700 mb-1 bg-gray-50 dark:bg-gray-800/50">
                      Carreras Disponibles
                    </div>
                    {/* Iteramos sobre el registry */}
                    {Object.values(careersRegistry).map((career) => {
                      const isSelected = careerId === career.id;
                      return (
                        <button
                          key={career.id}
                          onClick={() => {
                            setCareer(career.id);
                            setIsCareerOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                            ${isSelected ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/10' : 'text-gray-700 dark:text-gray-300'}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span className={isSelected ? 'text-blue-500' : `text-${career.color}-500 opacity-70`}>
                              {getIcon(career.icon, 16)}
                            </span>
                            <span className="truncate">{career.name}</span>
                          </div>
                          {isSelected && <Check size={14} />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Separador */}
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>

              {/* SELECTOR DE PLAN */}
              <div className="relative" ref={planRef}>
                <button
                  onClick={() => setIsPlanOpen(!isPlanOpen)}
                  aria-haspopup="true"
                  aria-expanded={isPlanOpen}
                  aria-label={`Seleccionar Plan (Actual: ${currentPlanDisplay})`}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all duration-200 group
                    ${isPlanOpen ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'}
                  `}
                >
                  <BookOpen size={14} className="text-gray-500 sm:text-gray-500 text-blue-600 dark:text-blue-400" />
                  <span className="font-bold text-blue-600 dark:text-blue-400 hidden sm:block">Plan {currentPlanDisplay}</span>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isPlanOpen ? 'rotate-180' : ''}`} />
                </button>

                {isPlanOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1 animate-fade-in z-50"
                  >
                    <div className="px-3 py-2 text-[10px] uppercase font-bold text-gray-400 border-b border-gray-100 dark:border-gray-700 mb-1">
                      Planes de Estudio
                    </div>
                    {availablePlansData.map((plan) => {
                      const isSelected = currentPlanDisplay === plan.year.toString();
                      return (
                        <button
                          key={plan.id}
                          onClick={() => {
                            setCurrentPlanDisplay(plan.year.toString());
                            setIsPlanOpen(false);
                          }}
                          className={`
                            w-full px-4 py-2 text-left text-sm flex items-center justify-between transition-colors
                            ${isSelected
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}
                          `}
                        >
                          <span>Plan {plan.year}</span>
                          {isSelected && <Check size={14} />}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* Botones */}
            <div className="flex items-center gap-1 flex-shrink-0 ml-1">

              {/* Botón de Instalación PWA */}
              {isInstallable && (
                <button
                  onClick={install}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all hover:scale-105 mr-1 animate-fade-in"
                  title="Instalar Aplicación"
                >
                  <DownloadCloud size={16} />
                  <span>Instalar</span>
                </button>
              )}

              <button
                onClick={toggleTheme}
                aria-label={theme === 'light' ? "Activar Modo Oscuro" : "Activar Modo Claro"}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                title={theme === 'light' ? "Modo Oscuro" : "Modo Claro"}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Buscar Materia (Ctrl+K)"
              >
                <Search size={20} />
              </button>

              <DataMenu />
            </div>

          </div>
        </div>



        {/* Breadcrumb */}
        <div className="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-2">
          <div className="container mx-auto flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            {/* Icono en breadcrumb */}
            <span className="text-blue-500 dark:text-blue-400">
              {currentCareer ? getIcon(currentCareer.icon, 14) : <BookOpen className="h-3.5 w-3.5" />}
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[200px] sm:max-w-none">
              {currentCareer?.name || 'Carrera no seleccionada'}
            </span>
            <ChevronRight size={12} className="text-gray-500" />
            <span className="hidden sm:inline">Facultad de Ingeniería</span>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700 mx-1">•</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Plan {currentPlanDisplay}</span>
          </div>
        </div>
      </header >
    </>
  );
};

export default Header;