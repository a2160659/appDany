export type ActivityLevel = 'inactive' | 'active' | 'veryActive';

export type AdjustmentMode = 'none' | 'increase' | 'decrease';

export type AdjustmentPercentage = 5 | 10 | 15;

export interface REDCalculationInput {
  pvKg: number;
  activityLevel: ActivityLevel;
  adjustmentMode: AdjustmentMode;
  adjustmentPct: AdjustmentPercentage;
}

export interface REDCalculationResult {
  pm: number; // Peso metabólico
  k: number; // Factor K
  redMaintenance: number; // RED sin ajuste
  redFinal: number; // RED con ajuste aplicado
  adjustmentLabel: string; // Etiqueta del ajuste aplicado (ej: "+10%", "-5%", "sin ajuste")
}

