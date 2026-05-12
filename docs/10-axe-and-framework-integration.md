# axe-core and Framework Integration

## axe-core Integration

The driver can run runtime accessibility checks when `axe-core` is installed.

### Availability check

```ts
const available = await driver.axeIntegration.isAvailable();
```

### Run scans

```ts
const full = await driver.axeIntegration.run();
const partial = await driver.axeIntegration.runOnNode(formEl);
```

### Working with results

Use `violations`, `passes`, and `incomplete` collections to:

- Fail CI for critical violations.
- Track recurring rule failures over time.
- Build team dashboards for accessibility quality.

## Framework Integration

Framework APIs connect interaction mode, landmarks, and summaries.

### Detect interaction mode

```ts
const mode = driver.framework.detectInteractionMode();
```

### Register pathways and navigate

```ts
driver.framework.registerPathway('main-nav', {
  landmark: 'navigation',
  element: navEl,
  label: 'Main Navigation',
});

driver.framework.navigateToLandmark('main');
```

### Get summary

```ts
const summary = driver.framework.getAccessibilitySummary();
```

## Deployment Advice

- Run axe scans in non-production or sampled production flows.
- Include framework summary data in observability pipelines.
- Combine landmark navigation with skip links for best results.
