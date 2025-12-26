'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { calculateManualDose } from '@/lib/calc/manualDose';
import { RotateCcw } from 'lucide-react';

interface ManualDoseCalculatorProps {
  redFinalKcalPerDay: number | null;
  showExactValues: boolean;
  onToggleExactValues?: (value: boolean) => void;
}

export function ManualDoseCalculator({
  redFinalKcalPerDay,
  showExactValues,
  onToggleExactValues,
}: ManualDoseCalculatorProps) {
  const [kcalPerKg, setKcalPerKg] = useState<string>('');
  const [mealsPerDay, setMealsPerDay] = useState<number>(2);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<ReturnType<typeof calculateManualDose> | null>(null);

  const mealsOptions = [
    { value: '1', label: '1 vez al día' },
    { value: '2', label: '2 veces al día' },
    { value: '3', label: '3 veces al día' },
    { value: '4', label: '4 veces al día' },
  ];

  const handleCalculate = () => {
    setError('');

    if (!redFinalKcalPerDay) {
      setError('Primero calcula el RED');
      setResult(null);
      return;
    }

    const kcalPerKgValue = parseFloat(kcalPerKg);

    if (!kcalPerKg || isNaN(kcalPerKgValue) || kcalPerKgValue <= 0) {
      setError('Ingresa una energía válida en kcal/kg (mayor a 0)');
      setResult(null);
      return;
    }

    try {
      const calculatedResult = calculateManualDose({
        redKcalPerDay: redFinalKcalPerDay,
        kcalPerKg: kcalPerKgValue,
        mealsPerDay,
      });
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular');
      setResult(null);
    }
  };

  const handleClear = () => {
    setKcalPerKg('');
    setMealsPerDay(2);
    setError('');
    setResult(null);
  };

  const formatGrams = (value: number) => {
    if (showExactValues) {
      return value.toFixed(2);
    }
    return Math.round(value).toString();
  };

  const formatKcal = (value: number) => {
    if (showExactValues) {
      return value.toFixed(2);
    }
    return Math.round(value).toString();
  };

  if (!redFinalKcalPerDay) {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dosis manual</h2>
        <p className="text-gray-600">
          Primero calcula el RED para estimar dosis.
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Dosis manual</h2>

      <div className="space-y-6">
        {/* Inputs */}
        <div className="space-y-4">
          <Input
            label="Energía del alimento (kcal/kg)"
            type="number"
            step="0.1"
            min="0.1"
            value={kcalPerKg}
            onChange={(e) => {
              setKcalPerKg(e.target.value);
              setError('');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && kcalPerKg) {
                handleCalculate();
              }
            }}
            error={error}
            placeholder="Ej: 3600"
          />

          <Select
            label="Comidas al día"
            options={mealsOptions}
            value={mealsPerDay.toString()}
            onChange={(e) => setMealsPerDay(Number(e.target.value))}
          />

          {onToggleExactValues && (
            <Toggle
              label="Mostrar valores exactos"
              checked={showExactValues}
              onChange={onToggleExactValues}
              description="Mostrar gramos con 2 decimales en lugar de redondeados"
            />
          )}

          <div className="flex gap-4">
            <Button
              onClick={handleCalculate}
              variant="primary"
              className="flex-1"
              disabled={!kcalPerKg}
            >
              Calcular dosis
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Resultados */}
        {result && (
          <div className="bg-white rounded-lg p-6 border border-blue-200 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Resultados</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">RED final:</span>
                <span className="font-semibold text-gray-800">
                  {formatKcal(redFinalKcalPerDay)} kcal/día
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Energía del alimento:</span>
                <span className="font-semibold text-gray-800">
                  {parseFloat(kcalPerKg).toFixed(1)} kcal/kg
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">kcal/g:</span>
                <span className="font-semibold text-gray-800">
                  {formatKcal(result.kcalPerGram)} kcal/g
                </span>
              </div>

              <div className="flex justify-between items-center py-3 bg-primary-50 rounded-lg px-4 border-2 border-primary-500">
                <span className="text-lg font-semibold text-gray-800">Dosis diaria total:</span>
                <span className="text-2xl font-bold text-primary-600">
                  {formatGrams(result.gramsPerDay)} g/día
                </span>
              </div>

              <div className="flex justify-between items-center py-3 bg-secondary-50 rounded-lg px-4 border-2 border-secondary-500">
                <span className="text-lg font-semibold text-gray-800">Dosis por comida:</span>
                <span className="text-2xl font-bold text-secondary-600">
                  {formatGrams(result.gramsPerMeal)} g
                </span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Ejemplo:</strong> Si come {mealsPerDay} {mealsPerDay === 1 ? 'vez' : 'veces'} al día:{' '}
                  {Math.round(result.gramsPerDay)} g/día → {Math.round(result.gramsPerMeal)} g por comida
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cómo se calcula */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">¿Cómo se calcula?</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>kcal/g</strong> = (kcal/kg) / 1000
            </p>
            <p>
              <strong>g/día</strong> = RED / kcal/g
            </p>
            <p>
              <strong>g/toma</strong> = g/día / comidas
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-300">
            <p className="text-xs text-gray-600 italic">
              Dosis orientativa; ajustar clínicamente.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

