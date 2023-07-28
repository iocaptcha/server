TS / ES6 iocaptcha server.
Where security reigns, yet privacy remains.

![image](https://github.com/iocaptcha/assets/blob/main/logo_blue.png?raw=true)
# iocaptcha server


## Installing
[![image](https://img.shields.io/npm/v/@iocaptcha/client.svg)](https://www.npmjs.com/package/@iocaptcha/server)
[![build CI](https://github.com/iocaptcha/client/actions/workflows/node.js.yml/badge.svg)](https://github.com/iocaptcha/server/actions/workflows/node.js.yml)

```bash
npm install @iocaptcha/server
```

# Usage

## ES6
### Verifying user-submitted tokens
```js
import { Api, ApiConfig, CONFIG } from '@iocaptcha/server';

// specify your endpoint's public & private keys here */
const iocaptcha = new Api({
  endpoint_public_key: "AAAA",
  endpoint_private_key: "BBBB",
});

// check if authentication passes
iocaptcha.authenticate().then((res) => {
  console.log("authenticated iocaptcha?", res);
  if (!res) {
    // authentication failed
    throw new Error("iocaptcha authentication failed");
  }
});

let token = "..." // get token from user
// check token
iocaptcha.validate(token).then((result) => {
  console.log("result:", result);
  if (result.pass) {
    // ... allow the user
  } else {
    // ... deny the user
  }
}).catch((err) => {
  console.log("error:", err.response.data.error);
  // errors usually happen when the token has been invalidated (already used)
  // or the token has expired
  // ... deny the user
});

```
### iocaptcha.validate() returned response structure:
```js
// 
var resp = {
  "error": null, // whether any errors occured (if so, pass will be false)
  "flags": [ // enterprise only flags, https://iocaptcha.com/enterprise
  "UnavailableEnterpriseOnlyFeature"
],
  "ip_match": true, // whether the IP address matches the token
  "pass": true, // whether the token passed as judged by the endpoint's score threshold
  "score": 0.9285714285714286, // the token's human score (0.0 = bot, 1.0 = human)
  "ua_match": true // whether the user agent matches the token
}
```
