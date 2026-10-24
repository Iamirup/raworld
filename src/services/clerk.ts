/**
 * RaWorld has no user accounts. This module keeps the small surface that the
 * data layer still reads (current user / bearer token) and always answers
 * "anonymous": no sign-in, no sign-up, no session token.
 */

export function isClerkAuthEnabled(): boolean {
  return false;
}

export async function initClerk(): Promise<void> {}

export function scheduleClerkLoad(): void {}

export function getClerk(): null {
  return null;
}

export function clearClerkTokenCache(): void {}

export async function getClerkToken(): Promise<string | null> {
  return null;
}

export function getCurrentClerkUser(): { id: string; name: string; email: string; image: string | null; plan: 'free' | 'pro' } | null {
  return null;
}

export function getClerkUserCreatedAt(): number | null {
  return null;
}

export function subscribeClerk(_callback: () => void): () => void {
  return () => {};
}
