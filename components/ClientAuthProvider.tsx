'use client';

import { AuthGuard } from './AuthGuard';
import { SessionRefresh } from './SessionRefresh';

interface ClientAuthProviderProps {
  children: React.ReactNode;
}

export function ClientAuthProvider({ children }: ClientAuthProviderProps) {
  return (
    <AuthGuard>
      <SessionRefresh />
      {children}
    </AuthGuard>
  );
}

