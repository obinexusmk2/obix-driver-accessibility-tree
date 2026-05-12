# Installation and Setup

## Install Package

```bash
npm install @obinexusltd/obix-driver-accessibility-tree
```

## Optional Dependency: axe-core

If you plan to run runtime accessibility rule checks:

```bash
npm install axe-core
```

## Basic Initialization

```ts
import { createAccessibilityTreeDriver } from '@obinexusltd/obix-driver-accessibility-tree';

const driver = createAccessibilityTreeDriver({
  rootElement: document.getElementById('app')!,
  liveRegionDefaults: {
    level: 'polite',
    atomic: true,
    relevant: 'additions text',
  },
  screenReaderHints: true,
});

await driver.initialize();
```

## Shutdown

```ts
await driver.destroy();
```

Always call `destroy()` when your app or micro-frontend unmounts to ensure observers and listeners are cleaned up.

## Recommended Boot Order

1. Create driver in app bootstrap.
2. Initialize after root node is mounted.
3. Register framework landmarks and navigation pathways.
4. Attach feature-specific handlers (keyboard contexts, focus traps, announcements).
5. Destroy on teardown.
