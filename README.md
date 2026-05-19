# Password Strength Meter

Componente React que evalúa y muestra la fortaleza de una contraseña en tiempo real, construido siguiendo estrictamente **Test Driven Development (TDD)**.

---

## Instalación

```bash
# Clona el repositorio
git clone https://github.com/HipWilson/password-strength-meter.git
cd password-strength-meter

# Instala dependencias (con Bun)
bun install
```

> También funciona con `npm install`, `pnpm install` o `yarn`.

---

## Correr los tests

```bash
# Ejecutar todos los tests (modo watch)
bun test

# Ejecutar tests una sola vez (CI)
bun test --run

# Tests con interfaz visual
bun run test:ui

# Generar reporte de cobertura
bun run coverage
```

El reporte de cobertura se genera en `coverage/index.html`.

---

## Correr en modo desarrollo

```bash
bun run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

---

## Build de producción

```bash
bun run build
bun run preview
```

---

## Lint

```bash
bun run lint
```

---

## Flujo TDD seguido

Este proyecto sigue estrictamente el ciclo **Red → Green → Refactor**:

### 1. Configuración del proyecto
Se configuró manualmente Vite + Vitest + React Testing Library + jsdom desde cero, sin templates preconfigurados.

### 2. Tests escritos primero (FALLAN)
Se escribieron **todos** los tests antes de escribir cualquier código de implementación:

- `src/__tests__/calculateStrength.test.ts` — Tests unitarios para la función pura
- `src/__tests__/PasswordStrengthMeter.test.tsx` — Tests del componente con RTL

En este estado, los tests fallan porque los archivos de implementación **no tienen informacion todavía**.
Este commit tiene el mensaje: `test: add all tests before implementation `

### 3. Implementación mínima para pasar los tests
Se implementaron:

- `src/utils/calculateStrength.ts` — Lógica pura separada del componente
- `src/components/PasswordStrengthMeter.tsx` — Componente React

Todos los tests pasan en verde.


## Reglas de fortaleza

| Condición | Fortaleza |
|---|---|
| Contraseña vacía | `vacía` |
| Menos de 8 caracteres | `débil` |
| 8+ caracteres, sin números ni símbolos | `media` |
| 8+ caracteres con al menos un número | `fuerte` |
| 8+ caracteres con número **y** símbolo | `muy fuerte` |

> Un símbolo es cualquier carácter que no sea letra ni número (incluye espacios, `!@#$%^&*`, etc.).

---

## Puntos extra implementados

- ✅ Input accesible por rol y label (`getByRole`, `getByLabelText`)
- ✅ Barra de progreso visual con `role="progressbar"` y sus tests
- ✅ TypeScript strict en todo el proyecto
- ✅ Reporte de coverage con `vitest run --coverage`
- ✅ Lint con ESLint + TypeScript ESLint
- ✅ CI con GitHub Actions en cada push

---

## Estructura del proyecto

```
src/
├── __tests__/
│   ├── calculateStrength.test.ts   # Tests unitarios (lógica pura)
│   └── PasswordStrengthMeter.test.tsx  # Tests del componente
├── components/
│   └── PasswordStrengthMeter.tsx   # Componente React
├── utils/
│   └── calculateStrength.ts        # Lógica pura de fortaleza
├── App.tsx
├── App.css
├── main.tsx
└── setupTests.ts
```
