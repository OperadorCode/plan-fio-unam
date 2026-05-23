# Guía de Contribución

Este documento establece los lineamientos técnicos y estándares de desarrollo para contribuir al proyecto Planificador FIO.

## Stack Tecnológico

- **Runtime**: Node.js (Latest LTS)
- **Framework**: React + Vite
- **Lenguaje**: TypeScript (Strict Mode)
- **Gestión de Estado**: Zustand
- **Estilos**: Tailwind CSS
- **Testing**: Vitest + React Testing Library

## Convenciones de Código

### Estructura de Carpetas

- `src/data`: Fuente de verdad única (Single Source of Truth) para los planes de estudio. Los datos deben seguir estrictamente las interfaces definidas.
- `src/components`: Componentes funcionales. Se recomienda el uso de `React.memo` únicamente cuando sea justificable por razones de rendimiento.
- `src/store`: Lógica de negocio y gestión de estado global.
- `src/types`: Definiciones de TypeScript compartidas.

### TypeScript

- El uso de `any` está prohibido. Se deben definir interfaces explícitas para todas las propiedades y estructuras de datos.
- Se requiere documentación mediante JSDoc para funciones complejas, especialmente aquellas ubicadas en `src/utils`.

### Flujo de Trabajo (Git Flow)

1.  Realizar un fork del repositorio.
2.  Crear una rama para la nueva funcionalidad o corrección: `git checkout -b feature/nombre-descriptivo`.
3.  Confirmar los cambios siguiendo convenciones semánticas: `git commit -m "feat: descripción técnica"`.
4.  Enviar los cambios a la rama remota: `git push origin feature/nombre-descriptivo`.
5.  Abrir un Pull Request detallando los cambios realizados.

## Testing

El proyecto utiliza Vitest para pruebas unitarias. Antes de enviar un Pull Request, es obligatorio verificar que todas las pruebas pasen correctamente:

```bash
npm test
```

Cualquier modificación en la lógica de validación académica (`academicValidation.ts`) debe ir acompañada de sus correspondientes casos de prueba en `academicValidation.test.ts`.

## Arquitectura de Datos

Los datos académicos se organizan en `src/data/careers/{carrera}/`. Para cada carrera, la estructura consta de:
- **Planes de Estudio (`plan{anio}.ts`)**: Implementan la interfaz `StudyPlan` y contienen las asignaturas, años, cuatrimestres y correlatividades.
- **Sistemas de Créditos (`creditos{anio}.ts`)**: Implementan la interfaz `CreditSystemData` y detallan la carga horaria (HPS, HPT, HAT, CHT) y los créditos (CRE) por bloque de conocimiento.
- **Equivalencias (`equivalencias.ts`)**: Definen las reglas de transición (interfaz `EquivalenceRule`) entre planes anteriores (ej. 2013) y el plan vigente.

Al agregar una nueva carrera o modificar las transiciones, es necesario registrarla en `src/hooks/useTransitionData.ts` y asegurar la integridad de los datos mediante los tests de validación existentes.

## Actualización de Datos (Procedimiento Manual)

Dado que la aplicación funciona offline-first sin backend dinámico, la actualización de datos se realiza modificando los archivos fuente.

### Calendario Académico

1. Editar `src/data/calendar/calendarConfig.ts`.
2. Crear una nueva constante para el año (ej: `events2026`) siguiendo el formato de años anteriores.
3. Agregar la constante al array exportado `generalEvents`.

### Mesas de Examen

1. Editar `src/data/calendar/examDates.ts`.
2. Definir los nuevos turnos respetando el esquema `ExamDate`.
3. Concatenarlos al array `examDates`.

### Planes de Estudio y Correlativas

Para modificar un plan existente (ej: corrección de correlativas):

1. Localizar el archivo en `src/data/careers/{carrera}/plan{anio}.ts`.
2. Modificar la definición de la materia (nombre, código, correlativas).
3. Ejecutar `npm test` para asegurar que la integridad referencial se mantiene (que no rompa correlativas de otras materias).

### Sistemas de Créditos y Titulaciones Intermedias

Para actualizar horas, créditos o requerimientos de títulos intermedios:

1. Localizar el archivo en `src/data/careers/{carrera}/creditos{anio}.ts`.
2. Ajustar los valores de `HPS`, `HPT`, `HAT`, `CHT` o `CRE` correspondientes.
3. Para indicar si una materia pertenece a un título intermedio, usar los flags booleanos específicos de cada carrera (ej: `isTULOC` para Civil, `isTUEM` para Electromecánica, etc.).

### Equivalencias y Transición de Planes

Para modificar cómo se reconocen las materias de un plan anterior en el nuevo:

1. Localizar el archivo en `src/data/careers/{carrera}/equivalencias.ts`.
2. Agregar o modificar las reglas de equivalencia especificando `sourceSubjectId`, `targetSubjectId` y el `type` de equivalencia (directa, parcial, etc.).
3. Verificar que los códigos coincidan exactamente con los definidos en los archivos de los planes.

---

Facultad de Ingeniería - Universidad Nacional de Misiones
