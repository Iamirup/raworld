/**
 * Premium access and panel gate reasons.
 *
 * RaWorld has no accounts or paid plans, so every surface is unlocked. The
 * gate reason enum survives only so panels can keep a single "show content"
 * code path.
 */

import type { AuthSession } from './auth-state';
import type { ClientEntitlementBelief } from './premium-denial';

export enum PanelGateReason {
  NONE = 'none',
}

/** Every caller has full access. */
export function hasPremiumAccess(_authState?: AuthSession): boolean {
  return true;
}

export type PremiumAccessGrant = 'pro_user';

export function readPremiumAccessGrant(_authState?: AuthSession): PremiumAccessGrant {
  return 'pro_user';
}

export function getPanelGateReason(
  _authState: AuthSession,
  _isPremium: boolean,
): PanelGateReason {
  return PanelGateReason.NONE;
}

/** The client always believes it has full access (there is no other plan). */
export function readClientEntitlementBelief(_authState?: AuthSession): ClientEntitlementBelief {
  return { entitlementTier: 3, authRole: null };
}
