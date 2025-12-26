import React from 'react';
import { Card } from '@/components/ui/Card';
import { REDCalculationResult } from '@/lib/calc/types';

interface ResultCardProps {
  result: REDCalculationResult;
  pvKg: number;
  showExactValues: boolean;
}

export function ResultCard({ result, pvKg, showExactValues }: ResultCardProps) {
  const formatRED = (value: number) => {
    if (showExactValues) {
      return value.toFixed(2);
    }
    return Math.round(value).toString();
  };

  const formatPM = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultados</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Peso vivo (PV):</span>
          <span className="font-semibold text-gray-800">{pvKg.toFixed(2)} kg</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Peso metabólico (PM):</span>
          <span className="font-semibold text-gray-800">{formatPM(result.pm)}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Factor K:</span>
          <span className="font-semibold text-gray-800">{result.k}</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">RED mantenimiento:</span>
          <span className="font-semibold text-gray-800">
            {formatRED(result.redMaintenance)} kcal/día
          </span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-gray-600">Ajuste aplicado:</span>
          <span className="font-semibold text-gray-800">{result.adjustmentLabel}</span>
        </div>
        
        <div className="flex justify-between items-center py-3 bg-white rounded-lg px-4 mt-4 border-2 border-primary-500">
          <span className="text-lg font-semibold text-gray-800">RED final:</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatRED(result.redFinal)} kcal/día
          </span>
        </div>
      </div>
    </Card>
  );
}

