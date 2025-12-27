# Planificador FIO (UNaM)

Sistema de gestión académica y planificación de cursada para la Facultad de Ingeniería de Oberá (UNaM).

## Descripción General

Esta aplicación permite a los estudiantes de ingeniería administrar su progreso académico, visualizar correlatividades mediante grafos interactivos y planificar sus mesas de examen. La arquitectura está diseñada para ser escalable, soportando múltiples planes de estudio y carreras dentro de la misma plataforma.

## Funcionalidades Principales

- **Visualización de Grafos**: Renderizado dinámico de la red de materias y sus dependencias (correlatividades) utilizando React Flow.
- **Validación Académica**: Motor de reglas riguroso que valida el estado de las materias (Regular, Aprobada, Pendiente) basándose en los requisitos del plan de estudio.
- **Gestión de Optativas**: Sistema para seleccionar y validar materias electivas, integrándolas al cálculo de progreso.
- **Persistencia Local**: Almacenamiento del estado del usuario en el navegador (LocalStorage) sin necesidad de backend.
- **Soporte PWA (Progressive Web App)**: Capacidad de instalación en dispositivos móviles y escritorio con soporte offline.

## Tecnologías

El proyecto está construido sobre un stack moderno basado en React y TypeScript:

- **Core**: React 18, TypeScript, Vite.
- **Estado**: Zustand (con middleware de persistencia).
- **UI/Styling**: Tailwind CSS, Lucide React (iconos).
- **Visualización**: React Flow.
- **Testing**: Vitest, React Testing Library.
- **PWA**: vite-plugin-pwa (Workbox).

## Configuración y Ejecución

### Requisitos Previos

- Node.js (v18 o superior recomendado)
- npm o yarn

### Instrucciones

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```

3.  **Ejecutar pruebas unitarias**:
    ```bash
    npm test
    ```

4.  **Construir para producción**:
    ```bash
    npm run build
    ```

## Estructura del Proyecto

- `src/data/`: Definiciones estáticas de las carreras y planes de estudio.
- `src/store/`: Gestión del estado global y lógica de negocio.
- `src/utils/academicValidation.ts`: Lógica central de reglas de correlatividad.
- `src/components/`: Componentes de interfaz de usuario.
- `src/components/graph/`: Nodos y lógica específica del grafo de materias.

## Actualizaciones y PWA

La aplicación está configurada como una PWA con estrategia `CacheFirst`. Las actualizaciones se descargan en segundo plano y se aplican automáticamente en la próxima visita o recarga.

---
Facultad de Ingeniería de Oberá - Universidad Nacional de Misiones
