export interface ManualDoseInput {
  redKcalPerDay: number;
  kcalPerKg: number;
  mealsPerDay: number;
}

export interface ManualDoseResult {
  kcalPerGram: number;
  gramsPerDay: number;
  gramsPerMeal: number;
}

export function calculateManualDose({
  redKcalPerDay,
  kcalPerKg,
  mealsPerDay,
}: ManualDoseInput): ManualDoseResult {
  // Validaciones
  if (redKcalPerDay <= 0 || !isFinite(redKcalPerDay)) {
    throw new Error('El RED debe ser un número mayor a 0');
  }

  if (kcalPerKg <= 0 || !isFinite(kcalPerKg)) {
    throw new Error('La energía del alimento debe ser mayor a 0');
  }

  if (mealsPerDay <= 0 || !Number.isInteger(mealsPerDay)) {
    throw new Error('El número de comidas debe ser un entero mayor a 0');
  }

  // kcal/g = (kcal/kg) / 1000
  const kcalPerGram = kcalPerKg / 1000;

  // g/día = RED / kcal/g
  const gramsPerDay = redKcalPerDay / kcalPerGram;

  // g/toma = g/día / comidas
  const gramsPerMeal = gramsPerDay / mealsPerDay;

  return {
    kcalPerGram,
    gramsPerDay,
    gramsPerMeal,
  };
}

