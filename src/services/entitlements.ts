/**
 * Entitlements for RaWorld.
 *
 * There are no plans or subscriptions: every install gets the full feature
 * set. The state below is constant and the subscription hooks only exist so
 * callers can keep reading it the same way.
 */

export interface EntitlementState {
  planKey: string;
  features: {
    tier: number;
    historyDays?: number;
    apiAccess: boolean;
    apiRateLimit: number;
    planLimits?: {
      apiRequestsPerDay: number | null;
      apiBurstRequestsPerMinute: number | null;
      /** `"shared-api-budget"` = no separate MCP allowance; MCP calls charge
       *  `apiRequestsPerDay`. Mirrors `PlanLimits` in convex/config/productCatalog.ts. */
      mcpCallsPerDay: number | null | "shared-api-budget";
      mcpBurstRequestsPerMinute: number | null;
      dashboardAiCallsPerDay?: number | null;
    };
    maxDashboards: number;
    prioritySupport: boolean;
    exportFormats: string[];
    /**
     * Pro MCP access (plan 2026-05-10-001). Undefined on legacy entitlement
     * snapshots that pre-date the catalog field. `hasFeature('mcpAccess')`
     * coerces undefined → false via Boolean(), so the settings tab
     * fails-closed for unrefreshed Pro users (they'll see it appear once
     * Dodo's next webhook repopulates the field).
     */
    mcpAccess?: boolean;
    /**
     * Data-export entitlement (plan 2026-07-25-001). This controls the locked
     * state while `exportFormats` controls which CSV/JSON/PDF actions the
     * unlocked menu exposes; `tier` cannot discriminate because Pro Business
     * shares tier 1 with Pro.
     * Undefined on legacy snapshots: the export gate treats undefined on a
     * `tier >= 2` snapshot as entitled (permanent fail-open) so a stale row
     * never locks a paying customer out of their own data.
     */
    dataExport?: boolean;
    /**
     * Partner-embed key issuance (`wme_…`). Deliberately separate from
     * `apiAccess`: both Pro tiers sell embedding without REST access, so
     * gating the Embeds tab on `apiAccess` would hide it from most of the
     * customers who bought it. Undefined on snapshots older than the catalog
     * field; the account gate also accepts a verified Clerk PRO role while the
     * Convex snapshot hydrates.
     */
    embedAccess?: boolean;
  };
  validUntil: number;
}

export type EntitlementVerificationStatus = 'idle' | 'pending' | 'ready' | 'unavailable';

const FULL_ACCESS: EntitlementState = {
  planKey: 'full',
  features: {
    tier: 3,
    apiAccess: true,
    apiRateLimit: 0,
    maxDashboards: 100,
    prioritySupport: false,
    exportFormats: ['csv', 'json', 'pdf'],
    mcpAccess: true,
    dataExport: true,
    embedAccess: true,
  },
  validUntil: Number.MAX_SAFE_INTEGER,
};

export function beginEntitlementVerification(): void {}

export function markEntitlementVerificationUnavailable(): void {}

export function resetEntitlementVerification(): void {}

export async function initEntitlementSubscription(
  _userId?: string,
  _isCurrent?: () => boolean,
): Promise<void> {}

export function destroyEntitlementSubscription(): void {}

export function resetEntitlementState(): void {}

/** Fires immediately with the constant state; there are never further changes. */
export function onEntitlementChange(
  cb: (state: EntitlementState | null) => void,
): () => void {
  cb(FULL_ACCESS);
  return () => {};
}

export function onEntitlementVerificationChange(
  cb: (status: EntitlementVerificationStatus) => void,
): () => void {
  cb('ready');
  return () => {};
}

export function getEntitlementVerificationStatus(): EntitlementVerificationStatus {
  return 'ready';
}

export function getEntitlementState(): EntitlementState | null {
  return FULL_ACCESS;
}

export function hasFeature(flag: keyof EntitlementState['features']): boolean {
  return Boolean(FULL_ACCESS.features[flag]);
}

export function hasEmbedAccessForAccount(_role?: 'free' | 'pro'): boolean {
  return true;
}

export function hasTier(_minTier: number): boolean {
  return true;
}

export function isEntitlementActive(
  state: EntitlementState | null,
  now: number,
): boolean {
  return state !== null && state.validUntil >= now;
}

export function isEntitled(): boolean {
  return true;
}

export function shouldReloadOnEntitlementChange(
  _last: boolean | null,
  _next: boolean,
): boolean {
  return false;
}
