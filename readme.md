# Elysia HTMX

Elysia plugin to support integration with [HTMX](https://htmx.org/).

## Installation

```bash
bun add --exact elysia-htmx
```

## Usage

```ts
import { htmx } from "elysia-htmx"; // 1. Import
import Elysia from "elysia";

new Elysia()
  .use(htmx()) // 2. Use
  .get("/", ({ hx }) => {
    return {
      request: hx.request,
      boosted: hx.boosted,
      historyRestoreRequest: hx.historyRestoreRequest,
      currentURL: hx.currentURL,
      prompt: hx.prompt,
      target: hx.target,
      triggerName: hx.triggerName,
      trigger: hx.trigger,
      isHTMX: hx.isHTMX,
    }
  })
  .listen(3000);
```

### API (Added Context)

```ts
type HtmxContext = {
    hx: {
        request: boolean;
        boosted: boolean;
        historyRestoreRequest: boolean;
        currentURL: string;
        prompt: string;
        target: string;
        triggerName: string;
        trigger: string;
        setLocation(url: string): void;
        pushURL(url: string): void;
        redirect(url: string): void;
        refresh(): void;
        replaceURL(url: string): void;
        reswap(value: HxSwap): void;
        retarget(elementSelector: string): void;
        reselect(elementSelector: string): void;
        triggerEvent(event: string | Record<string, unknown>): void;
        triggerEventAfterSettle(): void;
        triggerEventAfterSwap(): void;
        get isHTMX(): boolean;
        stopPolling(): void;
    };
};
```

For usage of the `hx` object, please refer to the [htmx](https://htmx.org/)'s [Request](https://htmx.org/reference/#request_headers) and [Response](https://htmx.org/reference/#response_headers) headers documentation.
