import React from "react";
import {
  GraduationCap,
  ArrowRightLeft,
  School,
  BookOpen,
  AlertCircle,
} from "lucide-react";

interface IntroStepProps {
  intermediateTitle: string;
}

export const IntroStep: React.FC<IntroStepProps> = ({ intermediateTitle }) => {
  const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032];
  const academicYears = [
    { label: "1° y 2° Año", teachingEnd: 2025, examEnd: 2032 },
    { label: "3° Año", teachingEnd: 2026, examEnd: 2032 },
    { label: "4° Año", teachingEnd: 2027, examEnd: 2032 },
    { label: "5° Año", teachingEnd: 2028, examEnd: 2032 },
  ];

  return (
    <div className="animate-fade-in space-y-12 text-gray-800 dark:text-gray-200">
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
            Transición al Plan 2025
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            En respuesta a los nuevos estándares de acreditación (CONEAU), la
            Facultad actualiza su formación. Este cambio busca modernizar el
            perfil profesional y otorgar títulos intermedios con salida laboral
            real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta Título Intermedio */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border-l-8 border-cyan-500 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <GraduationCap size={100} />
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl text-cyan-700 dark:text-cyan-300">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Nuevo Título Intermedio
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Se crea el título de{" "}
              <span className="font-bold text-cyan-700 dark:text-cyan-400">
                {intermediateTitle}
              </span>
              . Una certificación oficial que valida tu trayecto y te habilita
              profesionalmente antes de terminar la ingeniería.
            </p>
          </div>

          {/* Tarjeta Implementación */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border-l-8 border-blue-600 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ArrowRightLeft size={100} />
            </div>
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-300">
                <School size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Implementación Gradual
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              El Plan 2025 arranca oficialmente en el{" "}
              <strong>Ciclo Lectivo 2026</strong>. El plan actual (2013) no
              desaparece de golpe: entra en una fase de cierre progresivo
              garantizada hasta marzo de 2032.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-3xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Identificá tu Situación
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            ¿Cómo te afecta el cambio a partir de 2026?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ingresantes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-t-4 border-cyan-500">
            <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto shadow-lg shadow-cyan-500/30">
              1
            </div>
            <h4 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
              Ingresantes 2026
            </h4>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Ingreso directo y automático al{" "}
              <strong>Nuevo Plan de Estudios</strong>.
            </p>
          </div>

          {/* 1 y 2 Año */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-t-4 border-blue-600">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto shadow-lg shadow-blue-600/30">
              2
            </div>
            <h4 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
              1° y 2° Año Cursado
            </h4>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Si ya cursaste, pasás <strong>automáticamente</strong> al Nuevo
              Plan. Se te reconocen todas las materias aprobadas con
              equivalencia directa.
            </p>
          </div>

          {/* Avanzados */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-t-4 border-slate-600">
            <div className="w-12 h-12 bg-slate-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto shadow-lg shadow-slate-600/30">
              3
            </div>
            <h4 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
              Avanzados (3°-5°)
            </h4>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Podés terminar en el Plan 2013 o migrar voluntariamente. Tenés
              mesas de examen aseguradas hasta el 2031.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="text-blue-600" size={24} />
            Cierre Progresivo del Plan 2013
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Visualizá hasta cuándo se dictan las materias y hasta cuándo podrás
            rendirlas.
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-9 gap-1 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-b border-gray-200 dark:border-gray-700 pb-2">
              <div className="text-left pl-2 col-span-1">Año Acad.</div>
              {years.map((y) => (
                <div key={y}>{y}</div>
              ))}
            </div>

            <div className="space-y-4">
              {academicYears.map((row, idx) => {
                return (
                  <div
                    key={idx}
                    className="relative h-12 flex items-center group"
                  >
                    <div className="w-[11%] flex-shrink-0 text-sm font-bold text-gray-700 dark:text-gray-300 pr-4">
                      {row.label}
                    </div>

                    <div className="absolute left-[11%] right-0 top-0 bottom-0 grid grid-cols-8 gap-1 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`border-l border-gray-100 dark:border-gray-800 ${
                            i % 2 === 0
                              ? "bg-gray-50/50 dark:bg-gray-800/50"
                              : ""
                          } h-full`}
                        ></div>
                      ))}
                    </div>

                    <div className="absolute left-[11%] right-0 top-2 bottom-2 grid grid-cols-8 gap-1 pr-4">
                      <div
                        className="bg-blue-500/90 rounded-l-md shadow-sm flex items-center justify-center text-[10px] text-white font-bold z-10"
                        style={{
                          gridColumnStart: 1,
                          gridColumnEnd: row.teachingEnd - 2025 + 2,
                        }}
                      >
                        Cursado
                      </div>
                      <div
                        className="bg-slate-300/80 dark:bg-slate-600/80 rounded-r-md flex items-center justify-center text-[10px] text-slate-700 dark:text-slate-200 font-bold z-0 border-2 border-white dark:border-gray-900 border-l-0"
                        style={{
                          gridColumnStart: row.teachingEnd - 2025 + 2,
                          gridColumnEnd: row.examEnd - 2025 + 2,
                        }}
                      >
                        {row.examEnd - row.teachingEnd > 2 && "Solo Exámenes"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 justify-center mt-6 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Dictado Regular de Clases</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
            <span>Disponible para Rendir Exámenes</span>
          </div>
          <div className="flex items-center gap-2 text-red-500 font-medium">
            <AlertCircle size={14} />
            <span>Caducidad Definitiva: 31/03/2032</span>
          </div>
        </div>
      </section>
    </div>
  );
};
