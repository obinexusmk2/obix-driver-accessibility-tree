# ARIA State and Focus Management

## ARIA State Manager

Use state APIs to keep ARIA properties synchronized with UI state.

### Write and read state

```ts
driver.stateManager.setState(buttonEl, { expanded: true, disabled: false });
const state = driver.stateManager.getState(buttonEl);
```

### Observe state changes

```ts
const unsubscribe = driver.stateManager.onStateChange((element, newState) => {
  console.log('ARIA state updated', element, newState);
});

unsubscribe();
```

## Focus Management

Focus APIs are useful for dialogs, drawers, popovers, and contextual UI.

### Move/save/restore focus

```ts
driver.focusManager.moveFocus(targetEl);
driver.focusManager.saveFocus();
driver.focusManager.restoreFocus();
```

### Focus trap lifecycle

```ts
const trap = driver.focusManager.createFocusTrap(dialogEl);
trap.activate();
trap.deactivate();
```

## Recommendations

- Save focus before opening overlays.
- Restore focus to trigger controls on close.
- Ensure Escape closes focus traps for modal experiences.
