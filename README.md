# cf-esi-include

> Edge Side Includes (ESI) for Cloudflare Workers

## Usage

Installation:
```
yarn add cf-esi-include
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

[middleware]: https://developers.cloudflare.com/pages/functions/middleware/
