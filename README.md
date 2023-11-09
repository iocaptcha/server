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
import { Api } from '@iocaptcha/server';

// specify your endpoint's public & private keys here */
const iocaptcha = new Api({
  endpoint_public_key: "AAAA",
  endpoint_private_key: "BBBB",
});

// check if authentication passes
let success = await iocaptcha.authenticate();

if (success) {
  console.log("iocaptcha authenticated!");
} else {
  throw new Error("iocaptcha authentication failed! check your keys.");
}

let token = "..." // get token from user
// check token
let result = await iocaptcha.validate(token);

if (result.pass) {
  // ... allow the user
} else {
  // ... deny the user
}

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
  "ua_match": true, // whether the user agent matches the token
  "action": "login", // the action the token was generated for
  "sess_start_ts": 1699495076840, // the timestamp the session started
  "sess_finish_ts": 1699495071635, // the timestamp the session ended
  "sess_type": "sess_type" // the type of session ('iocaptcha', 'iosec', or 'ioshield')
}
```

### Verifying user-submitted tokens, and their IP adress and User-Agent
You can send the user's IP address and User-Agent to the validate() function for extra verification.
This is recommended, and will lower the score shall it find a mismatch, and also return the ip_match and ua_match flags as specified above.
```js
let result = await iocaptcha.validate({
  token: ..token,
  user_ip: ..ip,
  user_useragent: ..useragent
})
```


### Skipping invalidation
**Invalidation** is a process where when you make a request to our API, or use the invalidate() function, the token is marked as used and cannot be used again.
This is done to prevent replay attacks, however if you want to avoid this behaviour, such as when you want to make multiple requests with the same token, you can use the invalidation option.

**This is not recommended, and should only be used when you know what you're doing.**
```js
let result = await iocaptcha.validate({
  token: ..token,
  invalidate: false
})
```