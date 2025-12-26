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

  useEffect(() => {
    // No proteger la ruta de login
    if (pathname === '/login') {
      setIsAuth(true);
      return;
    }

    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      
      if (!authenticated) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, pathname]);

  // Si estamos en login, renderizar sin verificación
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // Mostrar nada mientras se verifica la autenticación
  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, no renderizar nada (la redirección ya se hizo)
  if (!isAuth) {
    return null;
  }

  // Si está autenticado, renderizar los children
  return <>{children}</>;
}

