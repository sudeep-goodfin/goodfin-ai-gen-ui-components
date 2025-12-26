/**
 * Version Configuration System
 *
 * This file defines the versioning structure for the component library.
 * Each release maps to specific component versions.
 *
 * Structure:
 * - Release: A named version of the entire library (e.g., "v1.0.0", "v1.1.0")
 * - Component Version: Individual version of each component within a release
 */

// Individual component version type
export type ComponentVersion = {
  version: string;
  variant?: string; // Optional default variant for this version
  changelog?: string;
  deprecated?: boolean;
};

// Component versions registry - tracks all versions of each component
export type ComponentVersionRegistry = {
  [componentId: string]: {
    versions: ComponentVersion[];
    latest: string;
  };
};

// Release configuration - maps release to component versions
export type ReleaseConfig = {
  id: string;
  label: string;
  date: string;
  description?: string;
  isLatest?: boolean;
  componentVersions: {
    [componentId: string]: string; // componentId -> version
  };
};

// All releases configuration
export type VersionConfig = {
  currentRelease: string;
  releases: ReleaseConfig[];
  componentRegistry: ComponentVersionRegistry;
};

// Component version registry - all available versions for each component
export const componentRegistry: ComponentVersionRegistry = {
  // Investment Flow Components
  'deal-preview': {
    versions: [
      { version: '1.0.0', changelog: 'Initial release with full and minimal variants' },
      { version: '1.1.0', changelog: 'Added compact variant, improved mobile layout' },
    ],
    latest: '1.1.0',
  },
  'deal-investment': {
    versions: [
      { version: '1.0.0', changelog: 'Initial investment flow' },
      { version: '1.1.0', changelog: 'Added block variants (block-01 to block-04)' },
      { version: '1.2.0', changelog: 'Added presets and stepper options' },
    ],
    latest: '1.2.0',
  },
  'investment-risk': {
    versions: [
      { version: '1.0.0', changelog: 'Initial risk assessment view' },
    ],
    latest: '1.0.0',
  },
  'document-list': {
    versions: [
      { version: '1.0.0', changelog: 'Initial document list' },
    ],
    latest: '1.0.0',
  },
  'document-detail': {
    versions: [
      { version: '1.0.0', changelog: 'Initial document detail view' },
    ],
    latest: '1.0.0',
  },
  'signature-input': {
    versions: [
      { version: '1.0.0', changelog: 'Initial signature input' },
    ],
    latest: '1.0.0',
  },
  'document-signing': {
    versions: [
      { version: '1.0.0', changelog: 'Initial document signing flow' },
    ],
    latest: '1.0.0',
  },
  'tax-document': {
    versions: [
      { version: '1.0.0', changelog: 'Initial tax document view' },
    ],
    latest: '1.0.0',
  },
  'accreditation': {
    versions: [
      { version: '1.0.0', changelog: 'Initial accreditation flow' },
    ],
    latest: '1.0.0',
  },
  'entity-selection': {
    versions: [
      { version: '1.0.0', changelog: 'Initial entity selection' },
    ],
    latest: '1.0.0',
  },
  'payment-method': {
    versions: [
      { version: '1.0.0', changelog: 'Initial payment method selection' },
    ],
    latest: '1.0.0',
  },
  'investment-review': {
    versions: [
      { version: '1.0.0', changelog: 'Initial investment review' },
    ],
    latest: '1.0.0',
  },

  // Deal Page Components
  'deal-page-greeting': {
    versions: [
      { version: '1.0.0', changelog: 'Initial AI greeting' },
    ],
    latest: '1.0.0',
  },
  'deal-page-ticker': {
    versions: [
      { version: '1.0.0', changelog: 'Initial ticker view' },
    ],
    latest: '1.0.0',
  },
  'deal-page-intro': {
    versions: [
      { version: '1.0.0', changelog: 'Initial Goodfin AI intro' },
    ],
    latest: '1.0.0',
  },
  'deal-page-investment': {
    versions: [
      { version: '1.0.0', changelog: 'Initial accredited welcome' },
      { version: '1.1.0', changelog: 'Added block variants' },
    ],
    latest: '1.1.0',
  },

  // Primitives
  'input-bar': {
    versions: [
      { version: '1.0.0', changelog: 'Initial input bar' },
      { version: '2.0.0', changelog: 'Complete redesign with command panel' },
    ],
    latest: '2.0.0',
  },
  'feedback-buttons': {
    versions: [
      { version: '1.0.0', changelog: 'Initial feedback buttons' },
    ],
    latest: '1.0.0',
  },

  // Flows
  'conversation': {
    versions: [
      { version: '1.0.0', changelog: 'Initial conversation flow' },
    ],
    latest: '1.0.0',
  },
  'onboarding': {
    versions: [
      { version: '1.0.0', changelog: 'Initial onboarding flow' },
    ],
    latest: '1.0.0',
  },
  'welcome': {
    versions: [
      { version: '1.0.0', changelog: 'Welcome 0.1' },
    ],
    latest: '1.0.0',
  },
  'welcome02': {
    versions: [
      { version: '1.0.0', changelog: 'Welcome 0.2 initial release' },
      { version: '1.1.0', changelog: 'Added chat history drawer, portfolio tabs' },
      { version: '2.0.0', changelog: 'Welcome Screen v2 - Updated electronic signature text, removed same-day processing badge, simplified international wire transfer fields' },
    ],
    latest: '2.0.0',
  },
};

// Release configurations
export const releases: ReleaseConfig[] = [
  {
    id: 'v1.3.0',
    label: 'v1.3.0',
    date: '2025-12-26',
    description: 'Welcome Screen v2 with document signing improvements and wire transfer UX updates',
    isLatest: true,
    componentVersions: {
      'deal-preview': '1.1.0',
      'deal-investment': '1.2.0',
      'investment-risk': '1.0.0',
      'document-list': '1.0.0',
      'document-detail': '1.0.0',
      'signature-input': '1.0.0',
      'document-signing': '1.0.0',
      'tax-document': '1.0.0',
      'accreditation': '1.0.0',
      'entity-selection': '1.0.0',
      'payment-method': '1.0.0',
      'investment-review': '1.0.0',
      'deal-page-greeting': '1.0.0',
      'deal-page-ticker': '1.0.0',
      'deal-page-intro': '1.0.0',
      'deal-page-investment': '1.1.0',
      'input-bar': '2.0.0',
      'feedback-buttons': '1.0.0',
      'conversation': '1.0.0',
      'onboarding': '1.0.0',
      'welcome': '1.0.0',
      'welcome02': '2.0.0',
    },
  },
  {
    id: 'v1.2.0',
    label: 'v1.2.0',
    date: '2025-12-19',
    description: 'Portfolio tabs, chat history, and neutral theme',
    isLatest: false,
    componentVersions: {
      'deal-preview': '1.1.0',
      'deal-investment': '1.2.0',
      'investment-risk': '1.0.0',
      'document-list': '1.0.0',
      'document-detail': '1.0.0',
      'signature-input': '1.0.0',
      'document-signing': '1.0.0',
      'tax-document': '1.0.0',
      'accreditation': '1.0.0',
      'entity-selection': '1.0.0',
      'payment-method': '1.0.0',
      'investment-review': '1.0.0',
      'deal-page-greeting': '1.0.0',
      'deal-page-ticker': '1.0.0',
      'deal-page-intro': '1.0.0',
      'deal-page-investment': '1.1.0',
      'input-bar': '2.0.0',
      'feedback-buttons': '1.0.0',
      'conversation': '1.0.0',
      'onboarding': '1.0.0',
      'welcome': '1.0.0',
      'welcome02': '1.1.0',
    },
  },
  {
    id: 'v1.1.0',
    label: 'v1.1.0',
    date: '2025-12-15',
    description: 'Added input bar v2 with command panel',
    componentVersions: {
      'deal-preview': '1.1.0',
      'deal-investment': '1.1.0',
      'investment-risk': '1.0.0',
      'document-list': '1.0.0',
      'document-detail': '1.0.0',
      'signature-input': '1.0.0',
      'document-signing': '1.0.0',
      'tax-document': '1.0.0',
      'accreditation': '1.0.0',
      'entity-selection': '1.0.0',
      'payment-method': '1.0.0',
      'investment-review': '1.0.0',
      'deal-page-greeting': '1.0.0',
      'deal-page-ticker': '1.0.0',
      'deal-page-intro': '1.0.0',
      'deal-page-investment': '1.0.0',
      'input-bar': '2.0.0',
      'feedback-buttons': '1.0.0',
      'conversation': '1.0.0',
      'onboarding': '1.0.0',
      'welcome': '1.0.0',
      'welcome02': '1.0.0',
    },
  },
  {
    id: 'v1.0.0',
    label: 'v1.0.0',
    date: '2025-12-01',
    description: 'Initial release with core investment flow components',
    componentVersions: {
      'deal-preview': '1.0.0',
      'deal-investment': '1.0.0',
      'investment-risk': '1.0.0',
      'document-list': '1.0.0',
      'document-detail': '1.0.0',
      'signature-input': '1.0.0',
      'document-signing': '1.0.0',
      'tax-document': '1.0.0',
      'accreditation': '1.0.0',
      'entity-selection': '1.0.0',
      'payment-method': '1.0.0',
      'investment-review': '1.0.0',
      'deal-page-greeting': '1.0.0',
      'deal-page-ticker': '1.0.0',
      'deal-page-intro': '1.0.0',
      'deal-page-investment': '1.0.0',
      'input-bar': '1.0.0',
      'feedback-buttons': '1.0.0',
      'conversation': '1.0.0',
      'onboarding': '1.0.0',
      'welcome': '1.0.0',
      'welcome02': '1.0.0',
    },
  },
];

// Main version configuration
export const versionConfig: VersionConfig = {
  currentRelease: 'v1.3.0',
  releases,
  componentRegistry,
};

// Helper functions
export function getLatestRelease(): ReleaseConfig {
  return releases.find(r => r.isLatest) || releases[0];
}

export function getReleaseById(releaseId: string): ReleaseConfig | undefined {
  return releases.find(r => r.id === releaseId);
}

export function getComponentVersionForRelease(releaseId: string, componentId: string): string | undefined {
  const release = getReleaseById(releaseId);
  return release?.componentVersions[componentId];
}

export function getLatestComponentVersion(componentId: string): string | undefined {
  return componentRegistry[componentId]?.latest;
}

export function getAllReleases(): ReleaseConfig[] {
  return releases;
}

export function getComponentChangelog(componentId: string, version: string): string | undefined {
  const component = componentRegistry[componentId];
  if (!component) return undefined;
  const versionInfo = component.versions.find(v => v.version === version);
  return versionInfo?.changelog;
}
