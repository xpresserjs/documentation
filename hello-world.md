## Hello World (Single File)

:::: xTabs Javascript|Typescript
:::xTab Javascript

Create a file: **app.js** and paste the codes below.

```javascript
//> 1
const xpresser = require('xpresser');

//> 2
const $ = xpresser.init({
  env: 'development',
  name: 'My Xpresser App',
  paths: {base: __dirname},
  server: {port: 2000}
});

//> 3
$.on.boot(next => {
  // Register route.
  $.router.get('/', http => http.res.send('<h1>Hello World</h1>'));
  // Continue Boot    
  return next();
})

//> 4
$.boot();
```

:::

::: xTab Typescript

Create a file: **app.ts** and paste the codes below.

```typescript
//> 1
import xpresser = require("xpresser");

//> 2
const $ = xpresser.init({
    env: 'development',
    name: 'My Xpresser App',
    paths: {base: __dirname},
    server: {port: 2000}
});

// Initialize typecript.
$.initializeTypescript(__filename);

//> 3
$.on.boot(next => {
    // Register route.
    $.router.get('/', http => http.res.send('<h1>Hello World</h1>'));
    // Continue Boot    
    return next();
})

//> 4
$.boot();
```

:::
::::

1. Require **xpresser**.
2. Boot xpresser with your **configuration**.
    * `$` is exposed as a global variable on boot, meaning it can be used in every file required/loaded in your project.
3. Define **index** route in xpresser `$.on.boot` event
4. Boot xpresser.

Run `nodemon app.js` or `ts-node-dev app.ts` and you should see your server started in console.

```sh
==> xpresser v{Your xpresser version}
==> Starting {Your App Name}...
==> Server started and available on http://localhost:2000/
==> PORT:2000
```

## Using MVC Structure.

When creating a real world application, **You need Structure**.

Xpresser provides MVC (**Model, View & Controller**) support out of the box.

To get started we need 3 files to achieve same **Hello World**.

1. **Boot File:** where xpresser is called.
2. **Routes File:** where routes are defined.
3. **Controller File:** where actions to request are handled.

## Setup MVC Structure

:::: xTabs Javascript|Typescript
::: xTab Javascript

Create Boot File: **app.js**

```javascript
const xpresser = require('xpresser');

// Set Config
const config = {
  env: 'development',
  name: 'Xpresser App',
  paths: {
    // Base Folder (REQUIRED).
    base: __dirname,
    // Path to Controllers Folder
    controllers: 'controllers',
    // Routes File
    routesFile: 'routes.js'
  },
  server: {port: 2000}
};

// Boot Server
xpresser.init(config).boot();
```

:::

::: xTab Typescript

Create Boot File: **app.ts**

```typescript
import xpresser = require("xpresser");

// Set Config
const config = {
    name: 'Xpresser App',
    paths: {
        // Base Folder (REQUIRED).
        base: __dirname,
        // Path to Controllers Folder
        controllers: 'controllers',
        // Routes File
        routesFile: 'routes.ts'
    },
    server: {port: 2000}
};

// Boot Server
xpresser.init(config)
    .initializeTypescript(__filename)
    .boot();
```

:::
::::

In our [single file example](#hello-world-single-file), we registered routes before calling `$.boot()`, well in this
case we don't need that since we have specified a `routesFile` in our config.

See [Configuration](./configuration/readme.md) for more info.

### Routing
Create Routes file: **routes.(js|ts)**

`paths.routesFile` if defined in **config**, will be required by xpresser when booting up and all routes defined in it
will be registered.

:::: xTabs Javascript|Typescript
::: xTab Javascript

```javascript
const router = require("xpresser").getInstanceRouter();

// "/"  => {index} method in AppController
router.get('/', 'AppController@index');

// "/about" => {about} method in AppController
router.get('/about', 'AppController@about');
```

:::
::: xTab Typescript

```ts
import {getInstanceRouter} from "xpresser";

const router = getInstanceRouter()
// "/"  => {index} method in AppController
router.get('/', 'AppController@index');

// "/about" => {about} method in AppController
router.get('/about', 'AppController@about');
```

:::
::::

Read more on routing: [
XpresserRouter](../router/readme.md).

Create Controller: **AppController.(js|ts)**
:::: xTabs Javascript|Typescript|xjs-cli
::: xTab Javascript

```javascript
module.exports = {
  name: "AppController",
  
  index(http) {
    return http.res.send("<h1>Hello World</h1>");
  },
  
  about(http) {
    return http.res.send("<h1>About Page</h1>");
  }
}
```

:::

::: xTab Typescript

```typescript
import {Http} from "xpresser/types/http";

export = {
    name: "AppController",

    index(http: Http): Http.Response {
        return http.send("<h1>Hello World</h1>");
    },

    about(http: Http): Http.Response {
        return http.send("<h1>About Page</h1>");
    }
}
```

:::

::: xTab xjs-cli

```sh
xjs make:controller AppController
```

Note: make sure you have **initialized** `xjs-cli` for your project **before** running this command.
see [How to initialize xjs-cli](./xjs-cli.md#init-file)
::::

### Run
```sh
# Javascript
node app.js

# Typescript
ts-node app.ts
```

Visit [http://localhost:2000](http://localhost:2000) on your browser, you should see **Hello World** and `/about` should
show **About Page**

## What Next?

1. [Start a project using xjs-cli](./getting-started.md)
2. [Configuration](./configuration/readme.md)
3. [$ (The Dollar Sign)](./dollar-sign.md)
4. [Routing](./router/readme.md)
