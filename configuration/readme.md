# Configuration

XpresserJs uses an object for configuration and must be set in your **boot** file.

## Setup

You can add configuration to your project using any of these methods you prefer.

**Inline**

```javascript
const xpresser = require('xpresser');
xpresser.init({/*Your configurations here!*/});
```

**Require**

```javascript
const xpresser = require('xpresser');
xpresser.init(require('./config.js'));
```

**Path to file**

```javascript
const xpresser = require('xpresser');
const configFile = __dirname + './config.js';

xpresser.init(configFile);
```

`configFile` will be required by xpresser if path exits.

## Default Configuration

On boot your configuration is **merged** with the default configuration below. Any keys missing in your configuration
will be replaced with the default value.

```javascript
const config = {
  name: "Xpresser",
  env: "development",
  
  debug: {
    enabled: true,
    controllerAction: true,
  },
  
  server: {
    port: 2000,
    protocol: "http",
    domain: "localhost",
    root: "/",
    includePortInUrl: true,
    baseUrl: "",
    ssl: {
      enabled: false,
      port: 443,
    },
    use: {
      cors: false,
      helmet: false,
      session: false,
      bodyParser: true
    },
    poweredBy: true,
    servePublicFolder: true,
    maintenanceMiddleware: 'MaintenanceMiddleware.js'
  },
  
  date: {
    format: "YYYY-MM-DD H:mm:ss",
  },
  
  paths: {
    base: __dirname,
    // Should be relative to the base set above.
    // e.g base+'/'+backend should resolve to /full/path/base/backend
    backend: "base://backend",
    // Must be relative to base
    frontend: "frontend",
    public: "public",
    storage: "storage",
    xjs: "xjs",
    // Npm Dir
    npm: "base://node_modules",
    // Other Paths
    routesFile: "backend://routes.js",
    events: "backend://events",
    controllers: "backend://controllers",
    models: "backend://models",
    middlewares: "backend://middlewares",
    views: "backend://views",
    jsonConfigs: "backend://",
  },
  
  session: {
    startOnBoot: false,
    secret: "!XpresserSecretKey!",
    cookie: {
      path: "/",
      domain: "localhost",
      maxAge: 5000 * 60 * 24,
    },
    resave: true,
    saveUninitialized: true,
  },
  
  template: {
    use: false,
    engine: "ejs",
    extension: "ejs",
    locals: {
      all: true,
      get: false,
      post: false,
      session: false,
      stackedScripts: false,
    },
  },
  
  response: {
    cacheFiles: false,
    cacheFileExtensions: ["js", "css"],
    cacheIfMatch: [],
    cacheMaxAge: 31536000,
    overrideServerName: true,
    serverName: "Xpresser",
  },
  
  artisan: {
    loadEvents: false,
    singleModelName: true,
    pluralizeModelTable: true,
  },
  
  packages: {},
  
  plugins: {}
};
```

See: [Detailed explanation of all default configurations](./default.md)

## use.json

When it comes to modifying or extending xpresser core files, the **use.json** comes in handy. The use.json simply tells
xpresser path to files you want added to your project.

Contents of the use.json depends on your project and what you want todo.

**Note:** By default the use.json should be located in your `jsonConfigs` folder

```json
{
  "extends": {
    "RequestEngine": "path/to/RequestEngine.js"
  },
  "globalMiddlewares": [
    "path/to/a/GlobalMiddleware.js"
  ]
}
```

The declaration above tells xpresser to extend its core `RequestEngine` file with yours and to add a global middleware
to your project.

## plugins.json

The plugins.json contains a list of plugins added in your project.

### Array deprecation.

From xpresser **version 0.5.0** onwards, the plugins.json content will be an object instead of an array.

:::: xTabs New|Old
::: xTab 0

```json
{
  "npm://@xpresser/session": true,
  "npm://@xpresser/file-uploader": true
}
```

:::
::: xTab 1

```json
[
  "npm://@xpresser/session",
  "npm://@xpresser/file-uploader"
]
```

:::
::::
**Note:** `npm://` is a shorthand for your `node_modules` folder.

### Why the change?

Using array came with a few limitations for the framework and plugin consumer.

- **Duplicates**: Stop possibility of declaring a plugin twice. With arrays, you can list a plugin twice++, but when
  using objects it will trigger an error.
- **Options**: With objects we can add options that will determine how a plugin will work. see more about options below.

### Disable plugin

In the example below, `@xpresser/file-uploader` will not be loaded.

```json
{
  "npm://@xpresser/session": true,
  "npm://@xpresser/file-uploader": false
}
```

The above can still be written as:

```json
{
  "npm://@xpresser/session": true,
  "npm://@xpresser/file-uploader": {
    "load": false
  }
}
```

The latter can be used when you still have more options. `load=true` unless defined `false`.

### Set plugin environment.

There are some plugins that are meant for a particular environment. You can define them like so:

```json
{
  "npm://@xpresser/session": true,
  "npm://@xpresser/file-uploader": {
    "load": true,
    "env": "development"
  }
}
```

`@xpresser/file-uploader` will only load when in development mode. You can also use array for multiple environments like
so:

```json
{
  "npm://@xpresser/session": true,
  "npm://@xpresser/file-uploader": {
    "load": true,
    "env": [
      "development",
      "test"
    ]
  }
}
```


