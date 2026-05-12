# Live Regions and Announcements

The Live Region Manager provides structured, reusable `aria-live` channels.

## Why It Matters

Screen readers do not automatically read every DOM change. Live regions make dynamic updates perceivable without moving focus.

## Common Patterns

### Create named regions

```ts
const status = driver.liveRegions.createRegion('status', {
  level: 'polite',
  atomic: true,
});
```

### Announce from named region

```ts
status.announce('Profile saved successfully.');
```

### Global announcements

```ts
driver.liveRegions.announceGlobal('Connection restored.', 'assertive');
```

## Guidance

- Use **polite** for non-critical updates.
- Use **assertive** for urgent blocking errors.
- Keep announcement text short and outcome-focused.
- Avoid flooding with rapid repetitive messages.

## Operational Tips

- Standardize announcement strings with app-level helper utilities.
- Prefer one region per message category (`status`, `errors`, `navigation`).
- Review region count via `getActiveRegions()` during debugging.
