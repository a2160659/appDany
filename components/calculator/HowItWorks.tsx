import React from 'react';
import { Card } from '@/components/ui/Card';
import { ActivityLevel } from '@/lib/calc/types';

interface HowItWorksProps {
  factors: Record<ActivityLevel, number>;
  title?: string;
  note?: string;
}

const activityLabels: Record<ActivityLevel, string> = {
  inactive: 'Inactivos',
  active: 'Activos',
  veryActive: 'Muy activos',
};

export function HowItWorks({ factors, title = '¿Cómo se calcula?', note }: HowItWorksProps) {
  return (
    <Card className="bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Fórmula:</h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-gray-800 font-mono text-lg">
              RED = K × PV<sup>0.75</sup>
            </p>
          </div>
        </div>
        
        <div>
          <p className="text-gray-600 mb-2">
            Donde <strong>PV</strong> es el peso vivo en kg y <strong>PM = PV<sup>0.75</sup></strong> es el peso metabólico.
          </p>
          <p className="text-gray-600">
            El factor <strong>K</strong> depende del nivel de actividad:
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Factores K:</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                    Nivel de actividad
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                    Factor K
                  </th>
                </tr>
              </thead>
              <tbody>
                {(Object.keys(factors) as ActivityLevel[]).map((level) => (
                  <tr key={level} className="border-b border-gray-200 last:border-b-0">
                    <td className="px-4 py-3 text-gray-700">{activityLabels[level]}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{factors[level]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Nota:</strong> El ajuste porcentual se aplica al resultado final de RED.
          </p>
        </div>
        
        {note && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">{note}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

