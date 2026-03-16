# @obinexusltd/obix-driver-accessibility-tree

[![npm version](https://img.shields.io/npm/v/@obinexusltd/obix-driver-accessibility-tree)](https://www.npmjs.com/package/@obinexusltd/obix-driver-accessibility-tree)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-featured accessibility driver for the [OBIX SDK](https://github.com/OBINexusComputing/obix-sdk). Solves 10 core browser accessibility problems: live region management, screen reader detection, accessibility tree mirroring, ARIA widget compliance, semantic HTML enhancement, keyboard navigation, ARIA state management, focus trapping, axe-core validation, and framework-level interaction mode detection.

## Installation

```bash
npm install @obinexusltd/obix-driver-accessibility-tree

# Optional: enable axe-core validation
npm install axe-core
```

## Quick Start

```typescript
import { createAccessibilityTreeDriver } from '@obinexusltd/obix-driver-accessibility-tree';

const driver = createAccessibilityTreeDriver({
  rootElement: document.getElementById('app')!,
  liveRegionDefaults: { level: 'polite', atomic: true },
  screenReaderHints: true,
});

await driver.initialize();

// Announce a message to screen readers
driver.announce('Your changes have been saved.', 'polite');

// Trap focus inside a dialog
const trap = driver.focusManager.createFocusTrap(dialogElement);
trap.activate();

// Clean up
await driver.destroy();
```

## API Reference

### Driver Lifecycle

```typescript
const driver = createAccessibilityTreeDriver(config?: AccessibilityTreeDriverConfig);

await driver.initialize();  // Lazy-initialize all sub-features
await driver.destroy();     // Tear down all features and release resources
```

**Config options:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `rootElement` | `HTMLElement` | `document.body` | Root element to observe |
| `liveRegionDefaults.level` | `'off' \| 'polite' \| 'assertive'` | `'polite'` | Default aria-live level |
| `liveRegionDefaults.atomic` | `boolean` | `false` | Default aria-atomic value |
| `liveRegionDefaults.relevant` | `string` | `'additions text'` | Default aria-relevant value |
| `liveRegionDefaults.label` | `string` | `undefined` | Default aria-label for regions |
| `screenReaderHints` | `boolean` | `false` | Enable screen reader detection heuristics |

---

### Live Region Manager

Manages `aria-live` regions for dynamic content announcements. Creates visually hidden elements that are accessible to screen readers.

```typescript
// Access after initialize()
const { liveRegions } = driver;

// Create a named live region
const region = liveRegions.createRegion('status', { level: 'polite', atomic: true });

// Announce via a specific region
region.announce('Item deleted.');

// Announce globally (uses the default region)
liveRegions.announceGlobal('Page loaded.', 'assertive');

// Inspect active regions
const active = liveRegions.getActiveRegions();
```

---

### Screen Reader Bridge

Browser-safe screen reader detection using media queries (no intrusive heuristics). Creates dedicated regions for polite, assertive, and route-change announcements.

```typescript
const { screenReaderBridge } = driver;

// Detect screen reader signals
const result = screenReaderBridge.detect();
result.likely;         // boolean — screen reader probably active
result.signals;        // string[] — detected signals (forced-colors, prefers-contrast, etc.)

// Make announcements
screenReaderBridge.announcePolite('Form submitted successfully.');
screenReaderBridge.announceAssertive('Error: required field missing.');
screenReaderBridge.announceRouteChange('/dashboard');
```

---

### Accessibility Tree Mirror

Real-time DOM-to-accessibility-tree synchronization via `MutationObserver`. Maps HTML semantics to ARIA roles and diffs the tree on every mutation.

```typescript
const { treeMirror } = driver;

// Start observing
treeMirror.observe(document.getElementById('app')!);

// Snapshot the current tree
const tree = treeMirror.snapshot();

// Diff since last snapshot
const changes = treeMirror.diff();

// Serialize to JSON
const json = treeMirror.serialize();

// React to tree changes
treeMirror.onTreeChange((changes) => {
  console.log('tree updated', changes);
});
```

---

### ARIA Widget Compliance

W3C ARIA Authoring Practices pattern validation and auto-configuration. Applies correct ARIA attributes for common widget patterns.

**Supported patterns:**

| Pattern | Widget Type |
|---------|-------------|
| `accordion` | Expandable sections |
| `menu-bar` | Horizontal menu |
| `slider` | Range input |
| `tabs` | Tab panel group |
| `dialog` | Modal dialog |
| `listbox` | Selection list |
| `tree` | Hierarchical list |
| `combobox` | Autocomplete input |

```typescript
const { widgetCompliance } = driver;

// Apply a pattern to an element
widgetCompliance.applyPattern(element, 'tabs');

// Validate an element against its declared pattern
const result = widgetCompliance.validate(element);
result.valid;     // boolean
result.errors;    // string[]
result.warnings;  // string[]
```

---

### Semantic HTML Enhancer

Auto-injects missing ARIA attributes based on built-in rules. Detects and fixes common accessibility issues such as clickable `div` elements without a role, missing `alt` text, and unlabeled inputs.

```typescript
const { semanticEnhancer } = driver;

// One-shot scan of the root element
const report = semanticEnhancer.scan();
report.fixed;    // number — attributes auto-applied
report.skipped;  // number — elements that needed manual review

// Continuously observe and fix new content
semanticEnhancer.observe(document.body);

// Add a custom rule
semanticEnhancer.addRule({
  selector: '[data-tooltip]',
  apply: (el) => { el.setAttribute('aria-describedby', el.dataset.tooltip!); },
});

// Inspect the built-in rule set
const rules = semanticEnhancer.getBuiltinRules();
```

---

### Keyboard Navigation Controller

Implements ARIA keyboard navigation patterns with arrow-key movement, Home/End support, and optional type-ahead.

**Supported patterns:** `roving-tabindex`, `activedescendant`, `grid`

```typescript
const { keyboardNav } = driver;

// Create a named navigation context
const nav = keyboardNav.createNavigation('my-listbox', {
  pattern: 'roving-tabindex',
  orientation: 'vertical',
  wrap: true,
  typeAhead: true,
});

nav.mount(containerElement);

// Programmatic movement
nav.moveTo(itemElement);
nav.moveNext();
nav.movePrev();
nav.moveFirst();
nav.moveLast();

const current = nav.getCurrentItem();

nav.unmount();
```

---

### ARIA State Manager

Reactive ARIA state management with batch update support. Tracks element-to-state mappings and emits change events.

```typescript
const { stateManager } = driver;

// Set ARIA state on an element
stateManager.setState(buttonEl, { expanded: true, disabled: false });

// Read current state
const state = stateManager.getState(buttonEl);

// Read all tracked states
const all = stateManager.getAllStates();

// Subscribe to changes
const unsubscribe = stateManager.onStateChange((element, newState) => {
  console.log('state changed', element, newState);
});

unsubscribe(); // remove listener
```

---

### Focus Management

Programmatic focus control with a save/restore stack and focus trap support. Escape key automatically deactivates traps.

```typescript
const { focusManager } = driver;

// Move focus to an element
focusManager.moveFocus(targetElement);

// Save the current focus position
focusManager.saveFocus();

// Restore last saved focus
focusManager.restoreFocus();

// Create and activate a focus trap (e.g. inside a modal)
const trap = focusManager.createFocusTrap(dialogElement);
trap.activate();   // Tab/Shift+Tab cycle inside dialogElement, Escape deactivates
trap.deactivate(); // Release trap and return focus to trigger
```

---

### axe-core Integration

Optional runtime ARIA validation using axe-core (peer dependency). Lazy-loads axe-core on first use; runs 18 default ARIA-specific rules.

```typescript
// Requires: npm install axe-core
const { axeIntegration } = driver;

// Check if axe-core is available
const available = await axeIntegration.isAvailable();

// Run on the whole document
const results = await axeIntegration.run();
results.violations;  // AxeViolation[]
results.passes;      // AxePass[]
results.incomplete;  // AxeIncomplete[]

// Run on a specific element
const nodeResults = await axeIntegration.runOnNode(formElement);
```

---

### Framework Integration

Unified facade for framework-level accessibility. Detects interaction mode, manages navigation landmarks, and provides an accessibility summary.

```typescript
const { framework } = driver;

// Detect how the user is currently interacting
const mode = framework.detectInteractionMode();
// 'keyboard' | 'pointer' | 'touch' | 'screen-reader'

// Register a navigation pathway
framework.registerPathway('main-nav', {
  landmark: 'navigation',
  element: navElement,
  label: 'Main Navigation',
});

// Jump to a landmark
framework.navigateToLandmark('main');

// Get an accessibility health summary
const summary = framework.getAccessibilitySummary();
summary.interactionMode;  // current mode
summary.landmarks;        // registered landmark count
summary.liveRegions;      // active region count
```

---

### Sub-Module Accessors

Direct access to underlying sub-modules after `initialize()`:

```typescript
driver.liveRegions        // LiveRegionManagerAPI
driver.screenReaderBridge // ScreenReaderBridgeAPI
driver.treeMirror         // TreeMirrorAPI
driver.widgetCompliance   // WidgetComplianceAPI
driver.semanticEnhancer   // SemanticEnhancerAPI
driver.keyboardNav        // KeyboardNavigationAPI
driver.stateManager       // AriaStateManagerAPI
driver.focusManager       // FocusManagerAPI
driver.axeIntegration     // AxeIntegrationAPI
driver.framework          // FrameworkIntegrationAPI
```

---

## Architecture

| Module | Responsibility |
|--------|---------------|
| `live-region-manager` | aria-live region creation and announcements |
| `screen-reader-bridge` | Screen reader detection via media queries |
| `accessibility-tree-mirror` | MutationObserver-based DOM-to-ARIA tree sync |
| `aria-widget-compliance` | W3C ARIA pattern validation and auto-config |
| `semantic-html-enhancer` | Auto-inject missing ARIA from built-in rules |
| `keyboard-navigation` | Roving tabindex / activedescendant / grid patterns |
| `state-properties-manager` | Reactive ARIA state with change events |
| `focus-management` | Focus trap, save/restore, programmatic movement |
| `axe-core-integration` | Optional runtime validation via axe-core |
| `framework-integration` | Interaction mode, landmarks, accessibility summary |
| `types` | All shared TypeScript interfaces |

---

## Environment Support

| Environment | Support |
|-------------|---------|
| Browser | Full — MutationObserver, media queries, focus APIs |
| Node.js / SSR | Safe import — no `window`/`document` access at load time |
| Deno | Graceful no-op — `isBrowser: false` |
| jsdom (test) | Full — all features work in JSDOM (Vitest) |

---

## License

MIT — OBINexus <okpalan@protonmail.com>
