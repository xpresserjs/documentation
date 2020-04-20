# Configuration
XpresserJs uses an object for configuration and must be set in your **boot** file.

## Setup
You can add configuration to your project using any of these methods you prefer.

**Inline**
```javascript
const xpresser = require('xpresser');
xpresser({/*Your configurations here!*/});
```

**Require**
```javascript
const xpresser = require('xpresser');
xpresser(require('./config.js'));
```

**Path to file**
```javascript
const xpresser = require('xpresser');
const configFile = __dirname + './config.js';

xpresser(configFile);
```
`configFile` will be required by xpresser if path exits.

## Default Configuration
On boot your configuration is **merged** with the default configuration below.
Any keys missing in your configuration will be replaced with the default value.

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
        jsonConfigs: "base://",
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
