# Request Engine (http)

Xpresser [`RequestEngine`](https://github.com/xpresserjs/framework/blob/master/src/RequestEngine.ts) is the class whose
instance represents your current `request` and `response` when handling requests.

:::: xTabs Router | Controller
::: xTab 0

```javascript
$.router.get("/", http => {
  // http is an instance `RequestEngine`
})
```

:::
::: xTab 1

```javascript
const Controller = {
  name: "Controller",
  
  index(http) {
    // http is an instance `RequestEngine`
  }
}
```

:::
::::

## Properties

Properties available on `http` methods are:

### req

##### Type: `Xpresser.Http.Request`

`http.req` object represents the HTTP request and has properties for the request query string, parameters, body, HTTP
headers, and so on.

Read more about `req` on [expressjs.com](https://expressjs.com/en/api.html#req)

### res

##### Type: `Xpresser.Http.Response`

`http.res` object represents the HTTP response that an Express app sends when it gets an HTTP request. Read more
about `res` on [expressjs.com](https://expressjs.com/en/api.html#res)

### params

##### Type: `Record<string, any>`

`http.params` is an object containing properties mapped to the [named route “parameters”](/router/#route-parameters).
For example, if you have the route `/user/:name`, then the **name** property is available as `http.params.name`. <br/>
This object defaults to `{}`.

### route

##### Type: `{name: string, method: string, controller: string}`

`http.route` holds the `name, method & controller` of the current request
<br/> For example:

```json
{
  "name": "index",
  "method": "get",
  "controller": "AppController@index"
}
```

#### Use Cases

In some situations you may want to point multiple requests to one controller action, `http.route` data will help your
decide what action to take.

##### Controller Action Example

:::: xTabs Routes|FileController
::: xTab 0

```javascript
$.router.post('upload/image', 'File@upload').name('upload.image');
$.router.post('upload/pdf', 'File@upload').name('upload.pdf');
```

:::
::: xTab 1

```javascript
class FileController extends ControllerClass {
  
  upload(http) {
    // Get file from route data.
    const fileType = http.route.name.split('.').pop(); // "image" or "pdf"
    
    return http.send({fileType})
  }
}
```

:::
::::

##### Controller Boot Example

If you make use of controller boot methods frequently then `http.route.controller` can help you decide what to boot for
each method. For example
:::: xTabs Routes|PagesController
::: xTab 0

```javascript
$.router.post('/', 'Pages@index')
$.router.post('/about', 'Pages@about')
```

:::
::: xTab 1

```javascript
class PagesController extends ControllerClass {
  
  boot(http) {
    if (http.route.controller === 'PagesController@about') {
      // get contact details.
    }
  }
  
  index() { return "Index Page"}
  
  about() { return "About Page"}
}
```

:::
::::

**Note:** `http.route.controller` will be spelled correctly in full, even if you used shorthand when declaring the
route.

### store

Deprecated, Renamed to  [state](#state).

### state

##### Type: `ObjectCollection`

`http.state` serves as a state management for the current request. it is an instance of `object-collection`

```javascript
// In a middleware
http.state.set("currentIp", "127.0.0.1");

// In your controller or else where.
const currentIp = http.state.get("currentIp");
```

### $query

##### Type: `ObjectCollection`

`http.$query` holds your current request **query** data as a collection. if you don't want it as a collection then you
can use `http.req.query`

```javascript
// get ?page or return default 1
http.$query.get("page", 1)

// Pick only specified keys
http.$query.pick(["utm_campaign", "utm_campaign_id"]) 
```

### $body

##### Type: `ObjectCollection`

`http.$body` holds your current request **body** data as a collection. if you don't want it as a collection then you can
use `http.req.body`

```javascript
// Get status or return default `pending`
http.$body.get("status", "pending")

// Pick only specified keys
http.$body.pick(["email", "password"]) 
```

## Methods

### $(): DollarSign

##### Type: `<K extends keyof DollarSign>(key: K) => DollarSign[K]`

`http.$` function serves a helper method for you to access your **xpresser instance properties** at any time. But it
doesn't return the instance.

```javascript
$.helpers.randomStr(10);
// will be
http.$("helpers").randomStr(10);

$.events.emit("User.loggedIn");
// will be
http.$("events").emit("User.loggedIn")
```

### $instance()

##### Type: `() => DollarSign`

`http.$instance()` returns the current xpresser instance

```javascript
const $ = http.$instance();

$.events.emit("User.loggedIn");
```

### addToBoot

##### Type: `(key: string, value: any) => this`

`http.addToBoot` function is a shortcut for add data to the **"boot"** object in `http.state`

```javascript
http.addToBoot("authId", 100034);
// is same as
http.state.set("boot.authId", 100034);
```

**Note:** Boot data is automatically loaded in all controllers unless boot method exists;

### all()

`http.all()` returns both query and body data. if there is conflict in key names, the body key will be entertained.

````javascript
// POST /create-post?name=unknown&category=movies
// body: {name: "Alice in the Borderland"}
// query: {name: "unknown", category: "movies"}

const data = http.all();
console.log(data.name) // Alice in the Borderlan
````

### body()

##### Type: `<T=unknown>(key: string, def?: T) => T`

`http.body` function can be used to get a key from the current request body data or return default if not found.

:::: xTabs Javascript|Typescript
::: xTab Javascript

```javascript
const message = http.body("message") // no defaults
const status = http.body("status", "pending") // with default
```

:::
::: xTab Typescript In Typescript `http.body()` returns type: unknown, so you must set type to pass.

```typescript
const message = http.body<string>("message") // no defaults

const status: string = http.body("status", "pending") // with default
```

:::
::::

### hasParam()

##### Type: `(param: string) => boolean`

`http.hasParam` function checks if a name route parameter exists in the current request

```javascript
// Route: /user/:userId/songs/:songId?

// Get: /user/2/songs
http.hasParam('userId') // true
http.hasParam('songId') // false

// Get: /user/2/songs/18
http.hasParam('songId') // true

// is equivalent to
http.params.hasOwnProperty('songId');
```

### hasParams()

##### Type: `(params: string[]) => boolean`

Checks if multiple named route parameter exists in the current request

```javascript
// Route: /user/:userId/songs/:songId?

// Get: /user/2/songs
http.hasParams(['userId', 'songId']) // false

// Get: /user/2/songs/18
http.hasParams(['userId', 'songId']) // true
```

### json()

##### Type: `(body: any, status?: number) => Http.Response`

Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a
JSON string using JSON.stringify().

The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it
to convert other values to JSON.

```javascript
http.json(null)
http.json({user: 'tobi'})
http.json({error: 'message'}, 500)
```

### next()

#### Type: `() => void | any`

`http.next` function is used to move to the next request middleware and is only available in middlewares

```javascript
const kidsOnlyMiddleware = {
  
  allow(http) {
    return http.state.get("age") <= 10 ? // if age <= 10
        http.next() // procced to next request middleware
        : http.send({error: "Your too old"}); // Send error.
  }
}
```

### query()

##### Type: `<T=unknown>(key: string, def?: T) => T`

`http.query` function Can be used to get a key from the current request query data or return default if not found.

:::: xTabs Javascript|Typescript
::: xTab 0

```javascript
let page = http.query("page") // no defaults
const perPage = http.query("perPage", 30) // with default
```

:::
::: xTab 1

```typescript
const page = http.query<number>("message") // no defaults

const perPage: number = http.query("perPage", 30) // with default
```

:::
::::

### redirect()

##### Type: `(path="/") => any`

`http.redirect` function redirects the current request to another url.

```javascript
http.redirect() // redirects to `/`

http.redirect("/auth/login") // redirects to `/auth/login`
```

### redirectBack()

##### Type: `() => any`

`http.redirectBack()` redirects the current request back to the url it came from. (Referrer)

### redirectToRoute()

##### Type: `(route: string, params?: any[], query?: object | false, includeUrl?: boolean) => any`

`http.redirectToRoute` function redirects the current request to the route name specified.

- **route:** Named route.
- **params:** Url parameters array.
- **query:** Url query object.
- **includeUrl:** if true, your full server url will prefix the route.

```javascript
$.route.get("/auth/login", "Auth@login").name("login")
$.route.get("/user/:userId/songs/:songId", "Song@mine").name("user.songs")

// Redirect to `/auth/login`
http.redirectToRoute("login");

// Redirect to `/user/2/songs/4`
http.redirectToRoute("user.songs", [2, 4]);

// Redirect to `/user/2/songs/4?draft=true`
http.redirectToRoute("user.songs", [2, 4], {draft: true});

// Redirect to `http://localhost:3000/user/2/songs/4?draft=true`
http.redirectToRoute("user.songs", [2, 4], {draft: true}, true)
```

### send()

##### Type: `(body: any, status?: number) => Http.Response`

`http.send` sends the HTTP response. The body parameter can be a Buffer object, a String, an object, Boolean, or an
Array. For example:

```javascript
http.send(Buffer.from('whoop'))
http.send({some: 'json'})
http.send('<p>some html</p>')
http.send('Sorry, we cannot find that!', 404)
http.send({error: 'something blew up'}, 500)
```

### status()

##### Type: `(status: number) => this`

`http.status` Sets the HTTP status for the response. It is a chainable alias of
Node’s [response.statusCode](https://nodejs.org/api/http.html#http_response_statuscode)

```javascript
http.status(400).send('Bad Request') // sets status and sends response
```

### try()

##### Type: `<T=unknown>(fn: () => T) => T` Xpresser Version: `>= 0.6.5`

Sometimes when handling request you come across actions that may cause errors, but you know you can proceed without
them.
`http.try` gives you the freedom to do stuffs like this using xpresser's `InXpresserError` class.

```javascript
http.try(() => {
  // actions to try here
  // logs error but does not stop process.
});

// Also accepts async function.
http.try(async () => {
  // actions to try here
  // logs error but does not stop process.
})
```

### tryOrCatch()

##### Type: `<T=unknown>(fn: () => T, handleError?: (error: InXpresserError) => any) => T`

Works just like [http.try](#try) but **throws** error if not handled. You can handle error by passing a function as the
second argument.

```javascript
http.tryOrCatch(async () => {
  // Try cretaing user
  await User.new(http.$body.all());

}, (e) => {
  return http.send({error: e})
});
```

### view()

##### Type: `(file: string, data = {}, fullPath: boolean = false) => any`

`http.view` function Renders a view and sends the rendered HTML string to the client. The view argument is a string that
is the file path of the view file to render. This should be relative to the root of your views directory.

If you want to load views outside your view directory, then provide **full path** to the file and enable the fullPath
argument.

```javascript
/*
-views
-views/auth
-views/auth/login.ejs
-views/auth/signup.ejs
-views/index.ejs
-views/about.ejs
 */

http.view('index') // views/index.ejs
http.view('about') // views/about.ejs
http.view('auth/login') // views/auth/login.ejs
http.view('auth/signup') // views/auth/signup.ejs
```

## Extend Request Engine

The default `RequestEngine` can be modified or extended to provide custom functionality for your project/application.

The first step to extending the default `RequestEngine` is by creating a `RequestEngine.(js|ts)` file. This file should
export your custom `RequestEngine` class.

Note: **new** syntax works for xpresser version **0.25.1** and above while **old** syntax works for any version of
xpresser. The new syntax makes it easier for typescript to understand your code.

:::: xTabs Javascript|Typescript|Javascript (old)|Typescript (old)
::: xTab 0

```javascript
const {getInstance} = require("xpresser");
const $ = getInstance();

// Your Custom Request Engine
class MyRequestEngine extends $.extendedRequestEngine() {
  
  // Example method
  badRequest(error) {
    return this.status(400).send({error});
  }

}

// Export extended class.
module.exports = MyRequestEngine;
```

:::
::: xTab 1

```typescript
import {getInstance} from "xpresser";

const $ = getInstance();

// Your Custom Request Engine
class MyRequestEngine extends $.extendedRequestEngine() {
    // Example method
    badRequest(error: string) {
        return this.status(400).json({error});
    }
}

// Export extended class.
export = MyRequestEngine;

// Add type support.
declare module "xpresser/types/http" {
    interface Http extends MyRequestEngine {
    }
}
```

:::
::: xTab 2

```javascript
// Export function that extends default RequestEngine.
module.exports = (ExtendedRequestEngine) => {
  return class extends ExtendedRequestEngine {
    
    // Example method
    badRequest(error) {
      return this.status(400).send({error});
    }
  
  }
}
```

:::
::: xTab 3

```typescript
import type RequestEngine from "xpresser/src/RequestEngine";

// Export function that extends default RequestEngine.
export = (ExtendedRequestEngine: typeof RequestEngine) => {
    return class extends ExtendedRequestEngine {

        // Example method
        badRequest(error: string) {
            return this.status(400).send({error});
        }

    }
}

// Add type support.
declare module "xpresser/types/http" {
    interface Http {
        badRequest(error: string): any;
    }
}
```

:::
::::

Next, add the path to your custom `RequestEngine` (without file extension) to your
project's [use.json](../configuration/readme.md#use-json) file.

```json
{
  "extends": {
    "RequestEngine": [
      "backend://RequestEngine"
    ]
  }
}
```

Now you can use the custom `badRequest` method in your controller like so

```javascript
// Controller Action
const AppController = {
  
  login(http) {
    return http.badRequest("No username and password found!");
  }

}
```
