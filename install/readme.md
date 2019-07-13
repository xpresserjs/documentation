# Installation
Our documentation will be using **Yarn**
```sh
yarn add xpresser
```

## MVC Structure
Unlike **express** or other javascript frameworks where you can boot up a simple server saying **Hello World** in a single file, it is impossible
using Xpresser to achieve that because of its MVC Structure.

Xpresser requires 3 files to achieve same **Hello World**

1. Main File (where xpresser is called).
2. Controller File.
3. Routes File.


## Setup
Xpresser returns a `Function` that boots up a server when called using the configuration object passed to it.
  
The configuration object **must** include `paths.base` config, that tells xpresser where it is called from i.e **Base Directory**.


Create a Main File: **app.js**
```javascript
const StartXpresser = require('xpresser');

const config = {
    name: "Xpresser App",
    paths: {
        // Base Folder (MUST).
        base: __dirname,
        // Controller Folder
        controllers: 'base://',
        // Routes File
        routesFile: 'base://routes.js'
    },
};

StartXpresser(config);
```

**base://** in Xpresser simple means path to `paths.base`

Create a Controller: **AppController.js**
```javascript
class AppController extends $.controller {

    index(x) {
        return x.res.send("<h1> Hello World</h1>");
    }

}

module.exports = AppController;
```

Create a Controller: **routes.js**
```javascript
$.router.get('/', 'AppController@index');
```

`$.router` is Xpresser's router variable that provides a great api to create routes easily.


Run ```node app.js``` and you will see your server started in console like below
```sh
===> Starting {Your App Name}...
===> Server started and available on http://localhost:2000/
===> PORT:2000
```
