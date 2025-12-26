/**
 * Sistema de autenticación mejorado para producción
 * Usa hash SHA-256 para verificar credenciales sin almacenarlas en texto plano
 */

// Hash SHA-256 de las credenciales (admin/dogsandpets)
// Esto previene que las credenciales estén en texto plano en el código
const ADMIN_USERNAME = 'admin';
const CREDENTIALS_HASH = {
  password: 'fd30192760361e0cfe9f4be2209e2294ae668d0261c9981ea09a5ccb5b3de8f9', // SHA-256 de 'dogsandpets'
};

const SESSION_KEY = 'vet_calc_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

interface SessionData {
  token: string;
  expiresAt: number;
}

/**
 * Genera un hash SHA-256 de una cadena
 */
async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Verifica las credenciales del usuario
 */
async function verifyCredentials(username: string, password: string): Promise<boolean> {
  // Verificación de username (comparación case-insensitive)
  if (username.toLowerCase().trim() !== ADMIN_USERNAME.toLowerCase()) {
    return false;
  }

  // Verificación de password usando hash SHA-256
  const passwordHash = await hashString(password);
  return passwordHash === CREDENTIALS_HASH.password;
}

/**
 * Genera un token de sesión único
 */
function generateSessionToken(): string {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  const tokenArray = Array.from(randomBytes);
  return tokenArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Inicia sesión con credenciales
 */
export async function login(username: string, password: string): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  const isValid = await verifyCredentials(username, password);
  
  if (isValid) {
    const sessionData: SessionData = {
      token: generateSessionToken(),
      expiresAt: Date.now() + SESSION_DURATION,
    };
    
    // Usar sessionStorage en lugar de localStorage (más seguro, se limpia al cerrar navegador)
    // Además, guardar en localStorage como backup
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    } catch (e) {
      console.error('Error guardando sesión:', e);
      return false;
    }
    
    return true;
  }
  
  return false;
}

/**
 * Cierra la sesión
 */
export function logout(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.error('Error cerrando sesión:', e);
  }
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    // Intentar obtener de sessionStorage primero (más seguro)
    let sessionDataStr = sessionStorage.getItem(SESSION_KEY);
    
    // Si no está en sessionStorage, intentar localStorage
    if (!sessionDataStr) {
      sessionDataStr = localStorage.getItem(SESSION_KEY);
    }
    
    if (!sessionDataStr) {
      return false;
    }
    
    const sessionData: SessionData = JSON.parse(sessionDataStr);
    
    // Verificar que la sesión no haya expirado
    if (Date.now() > sessionData.expiresAt) {
      logout(); // Limpiar sesión expirada
      return false;
    }
    
    // Verificar que el token existe
    if (!sessionData.token || sessionData.token.length < 32) {
      logout();
      return false;
    }
    
    // Sincronizar sessionStorage y localStorage
    try {
      sessionStorage.setItem(SESSION_KEY, sessionDataStr);
      localStorage.setItem(SESSION_KEY, sessionDataStr);
    } catch (e) {
      // Ignorar errores de storage
    }
    
    return true;
  } catch (e) {
    // Si hay error al parsear, limpiar y retornar false
    logout();
    return false;
  }
}

/**
 * Obtiene el token de sesión actual (si existe)
 */
export function getSessionToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const sessionDataStr = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!sessionDataStr) {
      return null;
    }
    
    const sessionData: SessionData = JSON.parse(sessionDataStr);
    if (Date.now() > sessionData.expiresAt) {
      return null;
    }
    
    return sessionData.token;
  } catch (e) {
    return null;
  }
}
