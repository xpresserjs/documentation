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
`http.res` object represents the HTTP response that an Express app sends when it gets an HTTP request.
Read more about `res` on [expressjs.com](https://expressjs.com/en/api.html#res)
