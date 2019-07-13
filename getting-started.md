# Introduction

Xpresser is a Node.js framework built using [Express](https://expressjs.com) a **Fast, unopinionated, minimalist web framework** as it's server alongside community proven worthy libiaries.

## Usage

```javascript
const xpresser = require("xpresser");

xpresser({
  name: "MyApp",
  paths: {
    base: __dirname,
    routesFile: "base://routes.js"
  },
  server: {
    port: 2000
  }
});

// Returns global variable $
```

Every configuration has a default value except for **`paths.base`** config that must be **defined**.

1. `name` -> (string) Name of your app.
2. `paths` -> (object) See [Path Configurations](./readme.md).

   1. `base` --> (string) Base path where xpresser is called from.
   2. `routesFile` --> (string) Path to file where routes are defined.

3. `server` -> (object) See [Server Configurations](./readme.md).
   1. `port` --> (number) App port.

### Create Routes File

In your base folder create routes.js

```javascript
const Router = $.router;

Router.get("/", "AppController@index");
```

### Create AppController.js

```javascript
class AppController extends $.controller {
  /**
   * @param res - Express response
   */
  index({ res }) {
    return res.send("Hello World");
  }
}

module.exports = AppController;
```
