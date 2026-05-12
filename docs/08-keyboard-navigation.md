# Keyboard Navigation Patterns

The Keyboard Navigation controller supports reusable ARIA interaction models.

## Supported Patterns

- `roving-tabindex`
- `activedescendant`
- `grid`

## Create Navigation Context

```ts
const nav = driver.keyboardNav.createNavigation('menu-main', {
  pattern: 'roving-tabindex',
  orientation: 'vertical',
  wrap: true,
  typeAhead: true,
});

nav.mount(containerElement);
```

## Programmatic Control

```ts
nav.moveNext();
nav.movePrev();
nav.moveFirst();
nav.moveLast();
nav.moveTo(itemElement);
```

## Current Item and Teardown

```ts
const current = nav.getCurrentItem();
nav.unmount();
```

## Accessibility Recommendations

- Ensure visible focus indicator for every focusable item.
- Keep arrow key behavior consistent with orientation.
- Provide Home/End behavior for long collections.
- Add type-ahead for large menus/listboxes.
