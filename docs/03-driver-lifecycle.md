# Driver Lifecycle and Configuration

## Factory

Use the package factory to create one driver per application root:

```ts
const driver = createAccessibilityTreeDriver(config);
```

## Lifecycle Methods

- `initialize()`
  - Lazily initializes submodules.
  - Safe place to begin observation and event subscriptions.
- `destroy()`
  - Stops observers.
  - Removes listeners.
  - Releases in-memory references where applicable.

## Configuration Fields

### `rootElement`
- Type: `HTMLElement`
- Default: `document.body`
- Defines the base area for scanning and observation.

### `liveRegionDefaults`
- `level`: `'off' | 'polite' | 'assertive'`
- `atomic`: `boolean`
- `relevant`: `string`
- `label`: `string | undefined`

### `screenReaderHints`
- Type: `boolean`
- Enables detection heuristics/signals exposed by screen reader bridge APIs.

## Accessing Submodules

After `initialize()`, use module accessors from the driver instance:

- `driver.liveRegions`
- `driver.screenReaderBridge`
- `driver.treeMirror`
- `driver.widgetCompliance`
- `driver.semanticEnhancer`
- `driver.keyboardNav`
- `driver.stateManager`
- `driver.focusManager`
- `driver.axeIntegration`
- `driver.framework`
