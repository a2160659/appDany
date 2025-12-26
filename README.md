# Calculadora RED Veterinaria

Aplicación web para calcular los Requerimientos de Energía Diarios (RED) para perros y gatos.

## Características

- 🐕 Calculadora de RED para perros con factores K específicos
- 🐈 Calculadora de RED para gatos con factores K configurables
- 📊 Cálculo de Peso Metabólico (PM = PV^0.75)
- ➕ Ajuste porcentual (aumentar/disminuir) del resultado final
- 📖 Sección "¿Cómo se calcula?" con explicación de fórmulas y factores
- 💻 Diseño responsive y moderno
- ✅ Validaciones y manejo de errores

## Stack Tecnológico

- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**
- **TailwindCSS**
- **Vitest** (tests unitarios)
- **lucide-react** (iconos)

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Construcción

```bash
npm run build
npm start
```

## Tests

```bash
npm test
```

## Fórmula de Cálculo

### Fórmula Base

```
PM = PV^0.75
RED = K × PM
```

Donde:
- **PV** = Peso vivo en kg
- **PM** = Peso metabólico
- **K** = Factor según nivel de actividad

### Factores K para Perros

| Nivel de actividad | Factor K |
|-------------------|----------|
| Inactivos         | 99       |
| Activos           | 132      |
| Muy activos       | 160      |

### Factores K para Gatos

Los factores K para gatos son configurables. Por defecto usan los mismos valores que perros, pero pueden ajustarse en `lib/calc/cat.ts` según referencias específicas.

### Ajuste Porcentual

Se puede aplicar un ajuste porcentual al resultado final:
- **Sin ajuste**: RED final = RED mantenimiento
- **Aumentar**: RED final = RED mantenimiento × (1 + porcentaje/100)
- **Disminuir**: RED final = RED mantenimiento × (1 - porcentaje/100)

Porcentajes disponibles: 5%, 10%, 15%

## Estructura del Proyecto

```
app/
  page.tsx              # Home con tarjetas Perros/Gatos
  perros/
    page.tsx            # Calculadora de perros
  gatos/
    page.tsx            # Calculadora de gatos
components/
  ui/                   # Componentes UI básicos
  calculator/           # Componentes específicos de calculadora
lib/
  calc/                 # Funciones de cálculo
    dog.ts
    cat.ts
    types.ts
__tests__/
  calc/                 # Tests unitarios
```

## Licencia

MIT

