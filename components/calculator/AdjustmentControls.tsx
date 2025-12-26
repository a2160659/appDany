import React from 'react';
import { Select } from '@/components/ui/Select';
import { AdjustmentMode, AdjustmentPercentage } from '@/lib/calc/types';

interface AdjustmentControlsProps {
  mode: AdjustmentMode;
  percentage: AdjustmentPercentage;
  onModeChange: (mode: AdjustmentMode) => void;
  onPercentageChange: (percentage: AdjustmentPercentage) => void;
}

const adjustmentModeOptions = [
  { value: 'none', label: 'Sin ajuste' },
  { value: 'increase', label: 'Aumentar' },
  { value: 'decrease', label: 'Disminuir' },
];

const percentageOptions = [
  { value: '5', label: '5%' },
  { value: '10', label: '10%' },
  { value: '15', label: '15%' },
];

export function AdjustmentControls({
  mode,
  percentage,
  onModeChange,
  onPercentageChange,
}: AdjustmentControlsProps) {
  return (
    <div className="space-y-4">
      <Select
        label="Modo de ajuste"
        options={adjustmentModeOptions}
        value={mode}
        onChange={(e) => onModeChange(e.target.value as AdjustmentMode)}
      />
      {mode !== 'none' && (
        <Select
          label="Porcentaje"
          options={percentageOptions}
          value={percentage.toString()}
          onChange={(e) => onPercentageChange(Number(e.target.value) as AdjustmentPercentage)}
        />
      )}
    </div>
  );
}

