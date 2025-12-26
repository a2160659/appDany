import { ActivityLevel, AdjustmentMode, AdjustmentPercentage, REDCalculationInput, REDCalculationResult } from './types';

export const DOG_FACTORS: Record<ActivityLevel, number> = {
  inactive: 99,
  active: 132,
  veryActive: 160,
};

export function calculateDogRED({
  pvKg,
  activityLevel,
  adjustmentMode,
  adjustmentPct,
}: REDCalculationInput): REDCalculationResult {
  // Validar que el peso sea válido
  if (pvKg <= 0 || !isFinite(pvKg)) {
    throw new Error('El peso debe ser un número mayor a 0');
  }

  // Calcular Peso Metabólico: PM = PV^0.75
  const pm = Math.pow(pvKg, 0.75);

  // Obtener factor K según nivel de actividad
  const k = DOG_FACTORS[activityLevel];

  // Calcular RED de mantenimiento: RED = K × PM
  const redMaintenance = k * pm;

  // Aplicar ajuste porcentual si corresponde
  let redFinal = redMaintenance;
  let adjustmentLabel = 'sin ajuste';

  if (adjustmentMode === 'increase') {
    redFinal = redMaintenance * (1 + adjustmentPct / 100);
    adjustmentLabel = `+${adjustmentPct}%`;
  } else if (adjustmentMode === 'decrease') {
    redFinal = redMaintenance * (1 - adjustmentPct / 100);
    adjustmentLabel = `-${adjustmentPct}%`;
  }

  return {
    pm,
    k,
    redMaintenance,
    redFinal,
    adjustmentLabel,
  };
}

