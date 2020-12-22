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

`http.req` object represents the HTTP request and has properties for the request query string, parameters, body, HTTP
headers, and so on.

Read more about `req` on [expressjs.com](https://expressjs.com/en/api.html#req)

### res

`http.res` object represents the HTTP response that an Express app sends when it gets an HTTP request. Read more
about `res` on [expressjs.com](https://expressjs.com/en/api.html#res)

### params

`http.params` is an object containing properties mapped to the [named route “parameters”](/router/#route-parameters).
For example, if you have the route `/user/:name`, then the **name** property is available as `http.params.name`. <br/>
This object defaults to {}.

### route

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
class FileController extends ControllerClass {
  
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

`http.store` serves as a store for the current request. it is an instance `object-collection`

```javascript
// In a middleware
http.store.set("user", user);

// In your controller or else where.
const user = http.store.get("user");
```

### $query

`http.$query` holds your current request **query** data as a collection. if you don't want it as a collection then you
can use `http.req.query`

```javascript
// get ?page or return default 1
http.$query.get("page", 1)

// Pick only specified keys
http.$query.pick(["utm_campaign", "utm_campaign_id"]) 
```

### $body

`http.$body` holds your current request **body** data as a collection. if you don't want it as a collection then you can
use `http.req.body`

```javascript
// Get status or return default `pending`
http.$body.get("status", "pending")

// Pick only specified keys
http.$body.pick(["email", "password"]) 
```

## Methods

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

`http.body(key: string, $default?: any)` can be use to get a key from the current request body data or return default if
not found.

```javascript
const message = http.body("message") // no defaults
const status = http.body("status", "pending") // with default
```
This function should not be confused with `http.$body`, that is a collection while this deals with one key.