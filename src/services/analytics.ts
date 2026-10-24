/**
 * Analytics facade.
 *
 * RaWorld ships without third-party product analytics: every tracker below is
 * a no-op that keeps the call sites stable. Wire a collector in here if one is
 * ever needed.
 */

export { bucketPanelKeyForAnalytics } from '@/utils/analytics-panel-key';

export type UmamiEvent = string;
export type MissionPickerTrigger = 'auto' | 'manual' | 'agent';
export type LayoutCustomizationKind = 'panel-resize' | 'panel-reorder' | 'map-divider';
export type BriefThreadOpenSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info' | null;

export interface BriefThreadOpenProps {
  country: string | null;
  followed: boolean;
  severity: BriefThreadOpenSeverity;
  source: 'dashboard' | 'magazine';
}

export function initAnalytics(): void {}
export function initAuthAnalytics(): void {}
export function track(_event: UmamiEvent, _data?: Record<string, unknown>): void {}
export function trackPrivacyRestricted(_event: UmamiEvent, _data?: Record<string, unknown>): void {}
export function trackEvent(_name: string, _props?: Record<string, unknown>): void {}
export function trackContentHandoff(): void {}
export function trackGateHit(_feature: string): void {}
export function trackAnalystControlAction(_actionType: string, _status: string, _reason?: string): void {}
export function trackBriefThreadOpen(_props: BriefThreadOpenProps): void {}
export function trackCountryBriefOpened(_countryCode: string): void {}
export function trackCountrySelected(_code: string, _name: string, _source: string): void {}
export function trackCriticalBannerAction(_action: string, _theaterId: string): void {}
export function trackDeeplinkOpened(_type: string, _target: string): void {}
export function trackDownloadClicked(_platform: string): void {}
export function trackFeatureToggle(_featureId: string, _enabled: boolean): void {}
export function trackFindingClicked(_id: string, _source: string, _type: string, _priority: string): void {}
export function trackLLMFailure(_lastProvider: string): void {}
export function trackLLMUsage(_provider: string, _model: string, _cached: boolean): void {}
export function trackLanguageChange(_language: string): void {}
export function trackLayoutCustomized(_kind: LayoutCustomizationKind): void {}
export function trackMapLayerToggle(_layerId: string, _enabled: boolean, _source: 'user' | 'programmatic'): void {}
export function trackMapViewChange(_view: string): void {}
export function trackMissionPickerShown(_trigger: MissionPickerTrigger, _surface: 'desktop' | 'mobile'): void {}
export function trackMissionSelected(_missionId: string, _source: 'user' | 'agent' = 'user'): void {}
export function trackPanelToggled(_panelId: string, _enabled: boolean): void {}
export function trackPanelView(_panelId: string): void {}
export function trackSearchResultSelected(_resultType: string, _options?: { includeAttribution?: boolean }): void {}
export function trackSearchUsed(_queryLength: number, _resultCount: number): void {}
export function trackThemeChanged(_theme: string): void {}
export function trackUpdateClicked(_version: string): void {}
export function trackUpdateDismissed(_version: string): void {}
export function trackUpdateShown(_current: string, _remote: string): void {}
export function trackVariantSwitch(_from: string, _to: string): void {}
export function trackWebcamRegionFiltered(_region: string): void {}
export function trackWebcamSelected(_webcamId: string, _city: string, _viewMode: string): void {}
