# Getting Started

## Requirements

#### Nodemon <small>(Required)</small>
Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
[Install Nodemon](https://www.npmjs.com/package/nodemon)

## Install Xpresser
### Npm
```sh
npm i xpresser
```
### Yarn
Our documentation will be using **Yarn**
```sh
yarn add xpresser
```

## Hello World (Single File)
Create a file: **app.js** and paste the codes below.
```javascript
//> 1
const xpresser = require('xpresser');

//> 2
xpresser({
    name: 'My Xpresser App',
    paths: {base: __dirname},
    server: {port: 2000, startOnBoot: false}
});

//> 3
$.router.get('/', (x) => {
    return x.res.send('<h1>Hello World</h1>');
});

//> 4
$.startHttpServer();
```

1. Require **xpresser**.
2. Boot xpresser with your **configuration**.
    * `$` is exposed as a global variable on boot, meaning it can be used in every file booted in your project.
3. Define **index** route.
4. Start server.

Run ```nodemon app.js``` and you should see your server started in console.
```sh
===> xpresser v{Your xpresser version}
===> Starting {Your App Name}...
===> Server started and available on http://localhost:2000/
===> PORT:2000
```

## Using MVC Structure.
When creating a real world application, **You need Structure**.

Xpresser provides MVC (**Model, View & Controller**) support out of the box.

To get started we need 3 files to achieve same **Hello World**.

1. **Boot File:** where xpresser is called.
2. **Routes File:** where routes are defined.
3. **Controller File:** where actions to request are handled.


## Setup
Create Boot File: **app.js**
```javascript
const xpresser = require('xpresser');

// Set Config
const config = {
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
xpresser(config);
```

In our [single file example](#hello-world-single-file), notice `server.startOnBoot` was set to **false** but it's missing from the config above.
This is because by default server starts on boot unless `server.startOnBoot=false`. When set to false you can start server manually using `$.startHttpServer()`

See [Configuration](./configuration/) for more info.

Create Routes file: **routes.js**

`paths.routesFile` if defined in **config**, will be required by xpresser when booting up and all routes defined in it will be registered.
```javascript
// "/"  => {index} method in AppController
$.router.get('/', 'AppController@index');

// "/about" => {about} method in AppController
$.router.get('/about', 'AppController@about');
```
`$.router` is an instance of [**XpresserRouter**](../router/readme.md).

Create Controller: **controllers/AppController.js**
```javascript
class AppController extends $.controller {
    index(x) {
        return x.res.send("<h1>Hello World</h1>");
    }
    
    about(x) {
        return x.res.send("<h1>About Page</h1>");
    }
}

module.exports = AppController;
```
`$.controller` is Xpresser's base controller.

Run `nodemon app.js` and visit [http://localhost:2000](http://localhost:2000) on your browser, you should see **Hello World** and `/about` should show **About Page**


## What Next?

1. [Configuration](./configuration/)
2. [Xjs-Cli](./xjs-cli.md)
3. [$ (The Dollar Sign)](./dollar-sign.md)
4. [Routing](./router/readme.md)
