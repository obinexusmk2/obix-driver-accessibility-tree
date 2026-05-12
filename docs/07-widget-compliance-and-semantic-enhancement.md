# Widget Compliance and Semantic Enhancement

Two complementary modules help maintain ARIA correctness:

- **ARIA Widget Compliance**: validates and configures known widget patterns.
- **Semantic HTML Enhancer**: auto-fixes common semantic gaps.

## Widget Compliance

### Apply pattern

```ts
driver.widgetCompliance.applyPattern(element, 'tabs');
```

### Validate element

```ts
const result = driver.widgetCompliance.validate(element);
console.log(result.valid, result.errors, result.warnings);
```

Supported pattern families include accordion, menu-bar, slider, tabs, dialog, listbox, tree, and combobox.

## Semantic Enhancer

### Scan once

```ts
const report = driver.semanticEnhancer.scan();
```

### Continuous observe mode

```ts
driver.semanticEnhancer.observe(document.body);
```

### Add custom rule

```ts
driver.semanticEnhancer.addRule({
  selector: '[data-tooltip]',
  apply: (el) => el.setAttribute('aria-describedby', el.dataset.tooltip!),
});
```

## Practical Guidance

- Auto-fixes should be audited and tracked in code review.
- Use warnings from validation as backlog items for component hardening.
