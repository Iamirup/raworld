/**
 * RaWorld runs without accounts: the session is permanently anonymous and
 * already settled, so nothing waits on a sign-in that can never happen.
 */

/** Minimal user profile exposed to UI components. */
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: 'free' | 'pro';
}

/** Simplified auth session state for UI consumption. */
export interface AuthSession {
  user: AuthUser | null;
  isPending: boolean;
}

const SESSION: AuthSession = { user: null, isPending: false };

export async function initAuthState(): Promise<void> {}

/**
 * Emits the (static) session once. The returned unsubscribe is a no-op since
 * the session never changes.
 */
export function subscribeAuthState(callback: (state: AuthSession) => void): () => void {
  callback(SESSION);
  return () => {};
}

export function getAuthState(): AuthSession {
  return SESSION;
}
