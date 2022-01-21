## Default Configurations

### name

Name of your project/application.

### env

Equivalent to `NODE_ENV`, holds your current environment.

Options: **development, production, staging** or your **custom** environment

## Debug

### debug.enabled

If true, debugging is enabled.

### debug.requests
**Note:** Requires xpresser version `>=0.26.8`

This object holds the configuration for debugging requests.
```js
// Default Data
({
    enabled: true,
    colored: "mute",
    showAll: false,
    show: {
        time: false,
        statusCode: true,
        statusMessage: false
    }
})
```

### debug.requests.enabled
`Default: true`

Enable/Disable debugging requests.

### debug.requests.colored
`Default: "mute"` 

Accepts: <br>
`true` - Colored output. <br>
`false` - No colored output. <br>
`mute` - Dimmed output.

### debug.requests.show
This object holds the config for selecting what to show in the debug log.
```js
// Default Data
({
    time: false,  // Include/Exclude time in the debug log.
    statusCode: true, // Include/Exclude statusCode in the debug log.
    statusMessage: false // Include/Exclude statusMessage in the debug log.
})
```

### debug.requests.showAll
`Default: false`

Show all the request log data. When set to `true`, the `show` object is ignored.

### debug.requests.ignore
`Default: []`

An array of `number|string|regexp` method/urls that will be ignored.
```js
ignore: [
    // Ignore 204 status codes.
    204,
    // Ignore all requests that `startsWith` or `includes` "/static/"
    "/static/",
    // Ignore png and jpg files using regexp.
    /\.(png|jpg)$/
    
]
```

### debug.requests.ignoreFn
A function that will be called for each request. If the function returns `true`, the request will be ignored.

**Note:** This function will be called after the `ignore` array.
```js
ignoreFn: (http) => {
    // Ignore requests with status code `204` 
    // OR Ignore all requests that `startsWith` or `includes` "/static/"
    return http.res.statusCode === 204 || http.req.url.startsWith("/static/")
}
```

## Server

### server.port

**`Default: 2000`**

Server port.

### server.protocol

**`Default: 'http'`**

Server protocol needed for url generator helpers.

### server.domain

**`Default: 'localhost'`**

Server domain.

### server.root

**`Default: '/'`**

Server root needed for url generator helpers. If your files are in a sub-folder you can indicate here also.

### server.router

Xpresser router config

```typescript
{
    pathCase: 'snake' | 'kebab' // default: 'snake'
}
```

### server.router.pathCase

**`Default: 'snake'`**

Router shorthand path case. Can either be `snake` or `kebab`.

```typescript
$.router.path("/user", (r) => {
    r.post('@sendResetEmail');
    r.post('@accountSettings');
})

// `snake` will be converted to:
"/user/send_reset_email"
"/user/account_settings"

// `kebab` will be converted to:
"/user/send-reset-email"
"/user/account-settings"
```


