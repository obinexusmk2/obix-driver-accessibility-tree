# Accessibility Tree Mirror

The Tree Mirror synchronizes DOM changes into a model useful for diagnostics and accessibility-aware tooling.

## Start Observing

```ts
driver.treeMirror.observe(document.getElementById('app')!);
```

## Snapshot and Diff

```ts
const snapshot = driver.treeMirror.snapshot();
const changes = driver.treeMirror.diff();
```

## Serialize

```ts
const json = driver.treeMirror.serialize();
```

## Change Listener

```ts
driver.treeMirror.onTreeChange((changes) => {
  console.log('A11y tree changed:', changes);
});
```

## Use Cases

- Debugging inaccessible dynamic rendering.
- Detecting unexpected role/structure mutations.
- Creating QA dashboards for accessibility-state drift.

## Performance Notes

- Scope observation to the smallest practical container.
- Avoid large unnecessary mutation bursts in render loops.
