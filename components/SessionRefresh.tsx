'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated, logout } from '@/lib/auth';

/**
 * Componente que verifica periódicamente si la sesión sigue válida
 * y refresca la autenticación
 */
export function SessionRefresh() {
  const router = useRouter();
  const pathname = usePathname();
  const normalizedPathname = (pathname || '').replace(/\/$/, '');
  const isLoginRoute = normalizedPathname === '/login';

  useEffect(() => {
    // No verificar en la página de login
    if (isLoginRoute) {
      return;
    }

    // Verificar autenticación cada 5 minutos
    const interval = setInterval(() => {
      if (!isAuthenticated()) {
        logout();
        router.push('/login');
      }
    }, 5 * 60 * 1000); // 5 minutos

    // Verificar inmediatamente al montar
    if (!isAuthenticated()) {
      logout();
      router.push('/login');
    }

    return () => clearInterval(interval);
  }, [router, isLoginRoute]);

  return null;
}

