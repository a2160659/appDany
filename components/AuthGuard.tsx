'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const normalizedPathname = (pathname || '').replace(/\/$/, '');
  const isLoginRoute = normalizedPathname === '/login';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // No proteger la ruta de login
    if (isLoginRoute) {
      setIsAuth(true);
      return;
    }

    // Verificar autenticación
    const authenticated = isAuthenticated();
    setIsAuth(authenticated);
    
    if (!authenticated) {
      router.push('/login');
    }
  }, [router, isLoginRoute, isMounted]);

  // Mostrar loading hasta que esté montado
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  // Si estamos en login, siempre renderizar (sin verificación)
  if (isLoginRoute) {
    return <>{children}</>;
  }

  // Mostrar loading mientras se verifica la autenticación
  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-600">Verificando...</div>
      </div>
    );
  }

  // Si no está autenticado, mostrar loading (la redirección está en progreso)
  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-600">Redirigiendo...</div>
      </div>
    );
  }

  // Si está autenticado, renderizar los children
  return <>{children}</>;
}

