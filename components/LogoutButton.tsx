'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
    router.refresh();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      Cerrar sesión
    </Button>
  );
}

