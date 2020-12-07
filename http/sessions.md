# Sessions

##### Already installed? [Jump to Usage](#usage)

At version **1.0.0**, xpresser will **STOP** shipping with session support out of the box because It benefits the
framework more as a standalone plugin.
<br/>However, this plugin re-enables the old session system and is simply **Plug & Play**.

:::details Migrating?

Migrating does not affect code usage. Sessions data stil exists in `http.session`.
:::

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

### Configuration

**Note:** Session is enabled and sqlite store is used by default without any configuration. <br/>
Import default configuration file using the command below

```shell
xjs import session configs
```

Check imported config file for more settings @ **configs/session(.js|.ts)**

### Tsconfig.json (Typescript)

If your project is following xpresser's recommended declaration files structure then you can add the code below to
your `xpresser.d.ts` file **OR** You have a declaration file already registered in your tsconfig.json, then add the code
below to it.

```typescript
import "@xpresser/session/xpresser";
```

An alternative to using a declaration file is adding types to your `tsconfig.json`.

```json
{
  "types": [
    "@xpresser/session/xpresser"
  ]
}
```

## Usage

Session data is an object stored in `http.session` which is a shortHand for `http.req.session`.

::: details Typescript
`http.session` is a type of `XSessionCustomData`, declared
in [`@xpresser/session/xpresser.d.ts`](https://github.com/xpresserjs/session/blob/master/xpresser.d.ts).
:::

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

To use a custom session store, you need to set `useDefault` to `false` and set your custom store function

:::: xTabs Javascript|Typescript
::: xTab Javascript
```javascript
module.exports = ($) => ({
  useDefault: false,
  
  customStore(session) {
    const store = new YourCustomStore();
    
    return session({
      ...this.sessionConfig,
      store,
    });
  }
});
```
:::
::: xTab Typescript
```typescript
import {XSessionConfig} from  "@xpresser/session/custom-types";

export = (): XSessionConfig => ({
    useDefault: false,

    customStore(session) {
        const store = new YourCustomStore();

        return session({
            ...this.sessionConfig,
            store,
        });
    }
});
```
:::
::::

#### Custom Store Example.
The example below is a mongodb custom store using [connect-mongodb-session](https://npmjs.org/package/connect-mongodb-session)

:::: xTabs Javascript|Typescript
::: xTab Javascript
```javascript
const ConnectMongodbSession = require('connect-mongodb-session');

module.exports = () => ({
  useDefault: false,
  
  customStore(session){
    const MongoDBStore = ConnectMongodbSession(session);
    const store = new MongoDBStore({
      uri: 'mongodb://localhost:27017/mongodb_session_test',
      collection: 'mySessions'
    });

    // Catch errors
    store.on('error', function (error) {
      console.log(error);
    });
  
    return session({
      ...this.sessionConfig,
      ...{store: store},
    });
  }
})
```
:::
::: xTab Typescript
```typescript
import {XSessionConfig} from  "@xpresser/session/custom-types";
import ConnectMongodbSession = require('connect-mongodb-session');


export = (): XSessionConfig => ({
    useDefault: false,

    customStore(session) {
        const MongoDBStore = ConnectMongodbSession(session);
        const store = new MongoDBStore({
            uri: 'mongodb://localhost:27017/mongodb_session_test',
            collection: 'mySessions'
        });

        // Catch errors
        store.on('error', function (error) {
            console.log(error);
        });

        return session({
            ...this.sessionConfig,
            ...{store: store},
        });
    }
});
```
:::
::::

**TO BE CONTINUED...**