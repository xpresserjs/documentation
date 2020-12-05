# Session Plugin

At version **1.0.0**, xpresser will **STOP** shipping with session support out of the box because It benefits the
framework more as a standalone plugin.
<br/>However, the new plugin re-enables the current session system and is simply **Plug & Play**.

## Setup

Install session plugin

```shell
npm i @xpresser/session
// OR
yarn add @xpresser/session
```

### Register Plugin

Add plugin to your `plugins.json` file. if you don't have one create one at `backend/plugins.json`.

```json
[
  "npm://@xpresser/session"
]
```

Note: Plugin should come before other plugins that requires `session`

### Import Configs

```shell
xjs import session configs
```

Session is enabled and sqlite store is used by default. Check imported config file for more settings @ **
configs/session.js**

## Usage

Session data is an object stored in `http.session` which is a shortHand for `http.req.session`.

### Set/Update session
```javascript
route.post('/login', http => {
  // Add to Session
  http.session.user = http.body('username');
  
  return 'Login Successful!'
});
```

### Get session

```javascript
route.post('/account', http => {
  // Asign session.user to const user.
  const user = http.session.user;
  
  return {user}
});
```

### Delete Session

```javascript
route.post('/logout', http => {
  // Delete session with key `user`
  delete http.session.user;
  
  return 'User Deleted successfully.'
});
```

## Advanced
### Using Custom Store.
To use a custom session store, you need to set `useDefault` to `false` and `customStore` to `true`
```javascript
module.exports = ($) => ({
  useDefault: false,
  customS
})
```
**TO BE CONTINUED...**