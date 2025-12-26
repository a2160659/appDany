import Link from 'next/link';
import { Dog, Cat } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { LogoutButton } from '@/components/LogoutButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-end mb-4">
            <LogoutButton />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Calculadora RED Veterinaria
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calcula los Requerimientos de Energía Diarios (RED) para perros y gatos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/perros" className="block">
              <Card hover className="text-center h-full flex flex-col items-center justify-center py-12">
                <Dog className="w-24 h-24 text-primary-600 mb-6" strokeWidth={1.5} />
                <h2 className="text-3xl font-bold text-gray-800">Perros</h2>
                <p className="text-gray-600 mt-2">Calculadora de RED para perros</p>
              </Card>
            </Link>
            
            <Link href="/gatos" className="block">
              <Card hover className="text-center h-full flex flex-col items-center justify-center py-12">
                <Cat className="w-24 h-24 text-secondary-600 mb-6" strokeWidth={1.5} />
                <h2 className="text-3xl font-bold text-gray-800">Gatos</h2>
                <p className="text-gray-600 mt-2">Calculadora de RED para gatos</p>
              </Card>
            </Link>
        </div>
      </div>
    </main>
  );
}

