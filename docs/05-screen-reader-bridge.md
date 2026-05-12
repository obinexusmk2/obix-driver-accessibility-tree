# Screen Reader Bridge

The Screen Reader Bridge surfaces assistive-technology related signals and provides dedicated announcement channels.

## Detection

```ts
const result = driver.screenReaderBridge.detect();

if (result.likely) {
  console.log('Likely AT usage:', result.signals);
}
```

`signals` may include browser/media-query indicators such as contrast or forced-color preferences.

## Announcements

```ts
driver.screenReaderBridge.announcePolite('Settings updated.');
driver.screenReaderBridge.announceAssertive('Form validation failed.');
driver.screenReaderBridge.announceRouteChange('/dashboard');
```

## Best Practices

- Treat detection as heuristic, not certainty.
- Keep route-change announcements consistent across navigation events.
- Couple error announcements with visible inline messaging.

## Integration Notes

- Works best when paired with framework route hooks.
- Prefer semantic page headings in addition to route announcements.
