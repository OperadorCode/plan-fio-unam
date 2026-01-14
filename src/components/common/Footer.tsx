// -----------------------------------------------------------------------------
// Footer.tsx
// Pie de página global del Planificador Académico FIO
// -----------------------------------------------------------------------------
//
// Este componente muestra el footer de la aplicación, incluyendo:
// 1. Barra de logos institucionales (UNaM, FIO, CEFI, JUP)
// 2. Barra compacta con acciones rápidas, créditos y enlaces externos
//
// ----------------------------------------------------------------------------

import { Github, Mail, Bug, ExternalLink } from "lucide-react";

const PROJECT_URLS = {
  source: " ",
  issues: "soporte@planfio.org",
  feedback:
    "https://docs.google.com/forms/d/e/1FAIpQLSfWc7fNm_VqvS8kA_eIvc5jIwgL0tsLXvMFK_w4_M-qOm6QyQ/viewform?usp=dialog",
};

const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12 print:hidden transition-colors duration-300">
      {/* SECCIÓN 1: BARRA DE LOGOS */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-16 flex-nowrap overflow-x-auto">
          {/* UNaM */}
          <a
            href="https://www.unam.edu.ar/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center transition-opacity hover:opacity-80 duration-300 flex-shrink-0"
            title="Universidad Nacional de Misiones"
          >
            <img
              src="/logos/UNaM_Version_Principal_color.webp"
              alt="Logo UNaM"
              width="252"
              height="80"
              className="h-8 sm:h-12 md:h-20 w-auto object-contain"
            />
          </a>
          {/* FIO */}
          <a
            href="https://www.fio.unam.edu.ar/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center transition-opacity hover:opacity-80 duration-300 flex-shrink-0"
            title="Facultad de Ingeniería Oberá"
          >
            <img
              src="/logos/LOGO-fio_color.webp"
              alt="Logo FIO"
              width="59"
              height="64"
              className="h-6 sm:h-10 md:h-16 w-auto object-contain"
            />
          </a>
          {/* CEFI */}
          <a
            href="https://www.instagram.com/cefiunamobera/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center transition-opacity hover:opacity-80 duration-300 flex-shrink-0"
            title="Centro de Estudiantes"
          >
            <img
              src="/logos/logo-CEFI.webp"
              alt="Logo CEFI"
              width="137"
              height="64"
              className="h-6 sm:h-10 md:h-16 w-auto object-contain mix-blend-multiply dark:mix-blend-normal dark:rounded-md"
            />
          </a>
          {/* JUP */}
          <a
            href="https://www.instagram.com/jup_fio_unam/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center transition-opacity hover:opacity-80 duration-300 flex-shrink-0"
            title="JUP FIO"
          >
            <img
              src="/logos/logo-JUP.webp"
              alt="Logo JUP"
              width="115"
              height="64"
              className="h-6 sm:h-10 md:h-16 w-auto object-contain mix-blend-multiply dark:mix-blend-normal dark:rounded-md"
            />
          </a>
        </div>
      </div>

      {/* SECCIÓN 2: BARRA COMPACTA DE INFO Y FEEDBACK */}
      <div className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          {/* Izquierda: Acciones rápidas (Sugerencias / Bugs) */}
          <div className="flex items-center gap-6">
            <a
              href={PROJECT_URLS.feedback}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              title="¿Tenés una idea?"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Sugerencias</span>
            </a>
            <a
              href={PROJECT_URLS.issues}
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Reportar un problema técnico"
            >
              <Bug className="h-3.5 w-3.5" />
              <span>Reportar Error</span>
            </a>
          </div>
          {/* Derecha: Créditos, versión y enlaces externos */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-400 dark:text-gray-500">
              Planificador Académico FIO{" "}
              <span className="ml-1 px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-[10px]">
                V1.0
              </span>
            </span>
            <div className="h-3 w-px bg-gray-300 dark:bg-gray-700 mx-2 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <a
                href={PROJECT_URLS.source}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
                title="Código Fuente en GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.fio.unam.edu.ar"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Sitio Oficial FIO"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
