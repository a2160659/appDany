'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { LogoutButton } from '@/components/LogoutButton';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { ActivitySelector } from '@/components/calculator/ActivitySelector';
import { AdjustmentControls } from '@/components/calculator/AdjustmentControls';
import { ResultCard } from '@/components/calculator/ResultCard';
import { HowItWorks } from '@/components/calculator/HowItWorks';
import { ManualDoseCalculator } from '@/components/calculator/ManualDoseCalculator';
import { calculateCatRED, CAT_FACTORS } from '@/lib/calc/cat';
import { ActivityLevel, AdjustmentMode, AdjustmentPercentage } from '@/lib/calc/types';

export default function GatosPage() {
  const [pvKg, setPvKg] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('active');
  const [adjustmentMode, setAdjustmentMode] = useState<AdjustmentMode>('none');
  const [adjustmentPct, setAdjustmentPct] = useState<AdjustmentPercentage>(10);
  const [showExactValues, setShowExactValues] = useState(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<ReturnType<typeof calculateCatRED> | null>(null);

  const handleCalculate = () => {
    setError('');
    
    const weight = parseFloat(pvKg);
    
    if (!pvKg || isNaN(weight) || weight <= 0) {
      setError('Ingresa un peso válido en kg (mayor a 0)');
      setResult(null);
      return;
    }

    try {
      const calculatedResult = calculateCatRED({
        pvKg: weight,
        activityLevel,
        adjustmentMode,
        adjustmentPct,
      });
      setResult(calculatedResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular');
      setResult(null);
    }
  };

  const handleClear = () => {
    setPvKg('');
    setActivityLevel('active');
    setAdjustmentMode('none');
    setAdjustmentPct(10);
    setShowExactValues(false);
    setError('');
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="inline-flex items-center text-secondary-600 hover:text-secondary-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al inicio
            </Link>
            <LogoutButton />
          </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Calculadora RED - Gatos
          </h1>
          <p className="text-lg text-gray-600">
            Calcula los Requerimientos de Energía Diarios para gatos
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Panel de entrada - orden 1 en móvil */}
          <div className="space-y-6 order-1">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos de entrada</h2>
              
              <div className="space-y-6">
                <Input
                  label="Peso vivo (PV) en kg"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={pvKg}
                  onChange={(e) => {
                    setPvKg(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && pvKg) {
                      handleCalculate();
                    }
                  }}
                  error={error}
                  placeholder="Ej: 4.5"
                />

                <ActivitySelector
                  value={activityLevel}
                  onChange={setActivityLevel}
                />

                <AdjustmentControls
                  mode={adjustmentMode}
                  percentage={adjustmentPct}
                  onModeChange={setAdjustmentMode}
                  onPercentageChange={setAdjustmentPct}
                />

                <Toggle
                  label="Mostrar valores exactos"
                  checked={showExactValues}
                  onChange={setShowExactValues}
                  description="Mostrar kcal con 2 decimales en lugar de redondeados"
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleCalculate}
                    variant="primary"
                    className="flex-1"
                    disabled={!pvKg}
                  >
                    Calcular
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
            </div>

            {/* Sección "Cómo se calcula" para desktop - dentro de la primera columna */}
            <div className="hidden lg:block">
              <HowItWorks
                factors={CAT_FACTORS}
                title="¿Cómo se calcula?"
                note="Factores K configurables para gatos: ajusta estos valores según tu referencia."
              />
            </div>
          </div>

          {/* Panel de resultados - orden 2 en móvil */}
          <div className="space-y-6 order-2">
            {result && (
              <>
                <ResultCard
                  result={result}
                  pvKg={parseFloat(pvKg)}
                  showExactValues={showExactValues}
                />
                
                <ManualDoseCalculator
                  redFinalKcalPerDay={result.redFinal}
                  showExactValues={showExactValues}
                  onToggleExactValues={setShowExactValues}
                />
              </>
            )}
            
            {!result && !error && (
              <div className="bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center">
                <p className="text-gray-500 text-lg">
                  Ingresa los datos y haz clic en &quot;Calcular&quot; para ver los resultados
                </p>
              </div>
            )}
          </div>

          {/* Sección "Cómo se calcula" para móvil - orden 3 */}
          <div className="order-3 lg:hidden">
            <HowItWorks
              factors={CAT_FACTORS}
              title="¿Cómo se calcula?"
              note="Factores K configurables para gatos: ajusta estos valores según tu referencia."
            />
          </div>
        </div>
      </div>
    </main>
    </AuthGuard>
  );
}

