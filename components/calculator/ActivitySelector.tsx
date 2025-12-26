import React from 'react';
import { Select } from '@/components/ui/Select';
import { ActivityLevel } from '@/lib/calc/types';

interface ActivitySelectorProps {
  value: ActivityLevel;
  onChange: (value: ActivityLevel) => void;
  error?: string;
}

const activityOptions = [
  { value: 'inactive', label: 'Inactivo' },
  { value: 'active', label: 'Activo' },
  { value: 'veryActive', label: 'Muy activo' },
];

export function ActivitySelector({ value, onChange, error }: ActivitySelectorProps) {
  return (
    <Select
      label="Nivel de actividad"
      options={activityOptions}
      value={value}
      onChange={(e) => onChange(e.target.value as ActivityLevel)}
      error={error}
    />
  );
}

