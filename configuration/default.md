## Default Configurations

### name

Name of your project/application.

### env

Equivalent to NODE_ENV, holds your current environment.

options: **development, production, staging** or your **custom** environment

## Debug

### debug.enabled

If true, debugging is enabled.

### debug.controllerAction

if true, xpresser will log any requests made to any registered controller action.

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


