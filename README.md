# cf-esi-include

> Edge Side Includes (ESI) for Cloudflare Workers

## Usage

Installation:
```
yarn add esi-cf-workers
```

### Usage in Cloudflare Pages

Create a [middleware], at `functions/_middleware.js` with the follwing content:
```js
import { withESI } from "esi-cf-workers"

export async function onRequest(context) {
 const res = await context.next();
  return withESI(res);
}
```

### Usage in Cloudflare Workers

```js
import { withESI } from "esi-cf-workers"

export default {
  async fetch(request, env, ctx) {
    const res = await fetch(request)
    return withESI(res)
  },
};
```

[middleware]: https://developers.cloudflare.com/pages/functions/middleware/
