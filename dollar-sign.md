# $
The `$` sign is a global variable exposed by **xpresser** and can be accessed by any file used in your project.
It contains functions that will serve as helpers in your project.

## Config

### $.config
##### Type: [**`ObjectCollection`**](https://www.npmjs.com/package/object-collection)

Carries the config object of your application as a collection, Both default and defined.

**Example**
```javascript
if($.config.get('server.port') === 443){
    $.log("You are using https.");
}

if(!$.config.has('project.theme')){
    $.logErrorAndExit("No {project.theme} config defined.");
}

$.config.get('name', 'Xpresser');
// => Name of your application or set default

$.config.get('paths.base');
// => /path/to/your/base/folder
```

## UseEngine
Use engine provides easy to type helpers for file requirement. All helpers also understands xpresser **SmartPaths** e.g `base://`

### $.use.file()
##### Type: `Function` Args: `(path: string)`
Requires file, throws error if file does not exist.

**Example**
```javascript
const data = $.use.file('base://data.json');
// => {maybe: 'some json data in data.json'}
// OR
// Error: File {path} does not exist!
```

### $.use.model()
##### Type: `Function` Args: `(model: string, handleError = true)`
Require Model using model folder config specified in `paths.models`, throws error and exits if file does not exist unless `handleError = false`.

**Example**
```javascript
const User = $.use.model('User');
// => Requires file {/path/to/models/folder/User.js}
```

### $.use.middleware()
##### Type: `Function` Args: `(middleware: string, handleError = true)`
Require Middleware using middleware folder config specified in `paths.middlewares`, throws error and exits if file does not exist unless `handleError = false`.

**Example**
```javascript
const Auth = $.use.middleware('Auth');
// => Requires file: {/path/to/middleware/folder/Auth.js}
```

### $.use.controller()
##### Type: `Function` Args: `(controller: string, handleError = true)`
Require Controller using controller folder config specified in `paths.controllers`, throws error and exits if file does not exist unless `handleError = false`.

**Example**
```javascript
const AppController = $.use.controller('AppController');
// => Requires file: {/path/to/controller/folder/AppController.js}
```

## Others
### $.store
##### Type: [**`ObjectCollection`**](https://www.npmjs.com/package/object-collection)
A collection for storing data at anywhere in your project.

**Example**
```javascript
$.store.set('foo', 'bar')

// Some where else in your app.
$.store.get('foo');
// => 'bar'
```





