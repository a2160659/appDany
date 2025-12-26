'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '@/lib/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Si ya está autenticado, redirigir a home
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Pequeño delay para prevenir ataques de fuerza bruta
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = await login(username.trim(), password);
    
    if (success) {
      router.push('/');
      router.refresh();
    } else {
      setError('Usuario o contraseña incorrectos');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && username && password) {
      handleSubmit(e as any);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Calculadora RED Veterinaria
          </h1>
          <p className="text-gray-600">Iniciar sesión</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              label="Usuario"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ingresa tu usuario"
              autoFocus
              required
            />
          </div>

          <div>
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading || !username || !password}
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Acceso restringido para uso autorizado
          </p>
        </div>
      </Card>
    </main>
  );
}

