# Release Specification

This document describes the versioning system and release process for the Goodfin AI Primitives component library.

## Versioning Structure

### Component Versions
Each component has its own version history tracked in `src/config/versions.ts`:

```typescript
'component-id': {
  versions: [
    { version: '1.0.0', changelog: 'Initial release' },
    { version: '2.0.0', changelog: 'Major update description' },
  ],
  latest: '2.0.0',
}
```

### Release Versions
Releases bundle component versions together:

```typescript
{
  id: 'v1.3.0',
  label: 'v1.3.0',
  date: '2025-12-26',
  description: 'Release description',
  isLatest: true,
  componentVersions: {
    'component-id': '2.0.0',
    // ... all component versions
  },
}
```

## Release Process

### 1. Update Component Version

When making changes to a component, update its version in `componentRegistry`:

```bash
# In src/config/versions.ts, add new version entry:
'welcome02': {
  versions: [
    { version: '1.0.0', changelog: 'Initial release' },
    { version: '2.0.0', changelog: 'Description of changes' },  # Add new
  ],
  latest: '2.0.0',  # Update latest
}
```

### 2. Create New Release

Add a new release entry at the top of the `releases` array:

```typescript
{
  id: 'vX.Y.Z',
  label: 'vX.Y.Z',
  date: 'YYYY-MM-DD',
  description: 'Release summary',
  isLatest: true,  // Mark as latest
  componentVersions: {
    // Copy from previous release and update changed components
  },
}
```

Don't forget to set `isLatest: false` on the previous release.

### 3. Update Current Release

Update `versionConfig.currentRelease`:

```typescript
export const versionConfig: VersionConfig = {
  currentRelease: 'vX.Y.Z',
  // ...
};
```

### 4. Commit and Push

```bash
git add .
git commit -m "Release vX.Y.Z: <summary>"
git push origin <branch>
git push goodfin <branch>
```

## Version Numbering

Follow semantic versioning:
- **Major (X.0.0)**: Breaking changes, major redesigns
- **Minor (0.X.0)**: New features, non-breaking additions
- **Patch (0.0.X)**: Bug fixes, small tweaks

## Component ID Reference

| Component ID | Description |
|-------------|-------------|
| `welcome02` | Welcome Screen Flow 0.2 |
| `welcome` | Welcome Screen Flow 0.1 (archived) |
| `deal-preview` | Deal preview cards |
| `deal-investment` | Investment amount selection |
| `input-bar` | Chat input bar |
| `document-signing` | Document signing flow |
| ... | See `src/config/versions.ts` for full list |

## Changelog Guidelines

Write clear, concise changelogs that describe:
- What changed (feature/fix/improvement)
- Why it changed (user benefit)
- Any breaking changes

Example:
```
"Welcome Screen v2 - Updated electronic signature text, removed same-day processing badge, simplified international wire transfer fields"
```

## Current Release

**v1.3.0** (2025-12-26)
- Welcome Screen v2 with document signing improvements
- Wire transfer UX updates
- Removed misleading "same-day processing" text
- Simplified international wire transfer field grouping
