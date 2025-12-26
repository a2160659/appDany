/**
 * ⚠️ AUTENTICACIÓN SOLO PARA DESARROLLO
 * ⚠️ NO USAR EN PRODUCCIÓN
 * ⚠️ Las credenciales están hardcodeadas
 */

const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = 'dogsandpets';
const AUTH_KEY = 'isAuthenticated';

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, 'true');
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return localStorage.getItem(AUTH_KEY) === 'true';
}

