# Mimo Clone

Ejercicio simplificado inspirado en Mimo, orientado a practicar programación.

## Tecnología

React 18 con Vite. La aplicación es un entrenador de JavaScript con teoría, ejercicios, tests locales y examen.

## Flujo de trabajo

1. Definir una funcionalidad en `docs/specs/`.
2. Registrar decisiones técnicas en `docs/decisions/`.
3. Implementar código en `src/` y pruebas en `tests/`.
4. Validar los criterios de aceptación de la especificación.

## Estructura

```text
docs/
  specs/       Especificaciones funcionales
  decisions/   Decisiones de arquitectura (ADRs)
src/           Código de la aplicación
tests/         Pruebas automatizadas
```

## Ejecutar localmente

```bash
npm install
npm run dev
```

El componente original de Claude se conserva temporalmente en `src/legacy/JSForge.jsx`. Su progreso ahora se guarda en el navegador mediante `localStorage`.
