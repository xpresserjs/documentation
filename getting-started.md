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

## Simple Hello World
Create a file: **app.js** and paste the codes below.
```javascript
// Require Xpresser
const xpresser = require('xpresser');

// Boot Xpresser With Your Config
const $ = xpresser({
    name: 'My Xpresser App',
    paths: {base: __dirname},
    server: {
        port: 2000,
        startOnBoot: false,
    }
});

// Add Routes
$.router.get('/', (x) => {
    return x.res.send('<h1>Hello World</h1>');
});

// Start Server
$.startHttpServer();
```
Run ```nodemon app.js``` and you will see your server started in console.
```sh
===> Starting {Your App Name}...
===> Server started and available on http://localhost:2000/
===> PORT:2000
```

## Using MVC Structure.
When creating a real world applications **You need Structure**.
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

Create Routes file: **routes.js**

`paths.routesFile` if defined will be required by xpresser when booting up and all routes defined in it will be registered.
```javascript
// Send Requests to "/" to {index} method in AppController
$.router.get('/', 'AppController@index');

// Send Requests to "/about" to {about} method in AppController
$.router.get('/about', 'AppController@about');
```
`$.router` is an instance of [**XpresserRouter**](https://www.npmjs.com/package/@xpresser/router) that provides a great api to create routes easily.

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

1. Using Xpresser MVC structure is easier with [Xjs-Cli](https://www.npmjs.com/package/xjs-cli)
2. [$ (The Dollar Sign)](./dollar-sign.md)
3. [XpresserRouter](../router/readme.md)
