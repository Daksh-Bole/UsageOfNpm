# awaitfall demo

A small Node.js project that demonstrates [`awaitfall`](https://www.npmjs.com/package/awaitfall), a terminal tool for seeing how asynchronous work runs and where it spends time.

## Run it

Requires Node.js 18 or newer.

```bash
npm install
npm run demo
npm run demo:parallel
```

The first run loads three independent dashboard resources one after another. The second uses `Promise.all` to load the same resources together. `awaitfall` prints a timing waterfall for each run so you can compare the total wait and see which spans overlap.

## How the package is used

`trace()` records one operation, and `span()` labels each async step inside it:

```js
import { span, trace } from 'awaitfall'

await trace('dashboard', async () => {
  const profile = await span('loadProfile', () => getProfile())
  return profile
})
```

The project keeps the example self-contained by simulating network calls with short timers. Replace those functions with real API or database calls to trace your own application.

## Project structure

- `src/demo.mjs` — intentionally sequential dashboard loading
- `src/parallel.mjs` — the same independent tasks with `Promise.all`

## Package

This project uses `awaitfall` from npm. See the [package page](https://www.npmjs.com/package/awaitfall) for the complete API and options.
