# Typescript Support

xpresserTs is the **Typescript** implementation of **xpresserJs**.

Xpresser was written with typescript but was not built for Typescript when it first started, we had to focus on making
it lovely for javascript first. Now this has been achieved, we have given xpresser the full Typescript supports it
needs.

- Use **.ts** files
- **xjs-cli** creates typed .ts files
- Provide support **.ts.hbs** factory files.
- Provide option for node or typescript environments.

## Creating a Project

Creating a new xpresserTs project is no different from running the usual `xjs new` command and select Typescript
using [**xjs-cli**](/xjs-cli.md) or starting in a plain **app.ts** file if you have a good understanding of the xpresser
framework

### Using xjs-cli

**Note:** xjs-cli version must be `>=0.1.39`, any lower version will not have the option for **Typescript**

```sh
xjs new xpresser-ts-app
```

### Plain app.ts file

```typescript
import {init} from "xpresser";

const $ = xpresser.init({/* configurations */})

// This line is required for all xpresser typescript projects
$.initializeTypescript(__filename);

// Boot Xpresser
$.boot();
```

## initializeTypescript?

This method does a little magic behind the scenes using the `__filename` argument passed to it.

### Why __filename?

xpresser not only being a web server framework but also a cli framework needs to know what file type you are running. if
it detects a **.ts** extension it means the app is running in **typescript** mode and vice versa when it detects a
**.js** file extension, this helps xpresser decide if to create **.ts** files when you use the `xjs make:*` command.

#### Why would it detect .js when using Typescript?

When you compile Typescript to Javascript files which is required for production because nodejs only understands node
Javascript syntax, the extension of `__filename` becomes **.js** when you run it.

This concept makes it possible for the `initializeTypescript` function to provide an option where you can choose what to
run when in **.js/.ts mode** as it's second argument.

### Usage

#### `initializeTypescript(filename: string, run?: (isNode) => void)`

```typescript
$.initializeTypescript(__filename, (isNode: isNode) => {
    if (isNode) {
        // This will log only when running built .js files.
        $.logInfo('Running built .js version');
    }
})
```

- **filename:** must be `__filename` [#why __filename?](#why-filename)
- **run** a function where you run codes for different modes. i.e **.js/.ts**
- **isNode:** is `false` when in typescript mode but holds
  type [isNode](https://github.com/xpresserjs/framework/blob/09226e0ffbecb926e5dd8441ca2367eaba89a01c/types/index.d.ts#L18)
  data when in Nodejs mode.

### isNode

In Nodejs mode `isNode` returns an object.

```typescript
type isNode = {
    ts: {
        baseFolder: string
    }
} | false
```

The `ts.baseFolder` holds the guessed path to your typescript directory. The term guessed path is used because it was
guessed assuming that your`tsc` build folder and xpresser **boot file** are in same directory, which is 90% the use
case.

```sh
/my-app:
    - backend
    - build
        -- backend
        -- server.js
    - node_modules
    - server.ts # Boot file
    - package.json
```

With this file structure when you run `build/server.js` the `ts.baseFolder` will be `/my-app`

### isNode Use Cases?

This depends on your project, but we have encountered many use cases for this option. It started with a situation where
routes file remains `routes.ts` after build because the value comes from the config `{paths.routesFile}`.

`initializeTypescript` behind the scenes when in **node mode** checks if your routesFile config has a **.ts** extension
and renames it to **.js** i.e setting it to the compiled routes file path.

## Import type files

Version `>=0.4.0` of xpresser ships with default type files `(*d.ts)` that should be imported to your project and added
to your `tsconfig.json` using the command below.

```sh
xjs import xpresser types
```

The following files will be imported to your **backend/types** folder.

```
- index.d.ts  
- modules.d.ts  
- xpresser.d.ts  
```

Add to your `tsconfig.json`

```json
{
  "compilerOptions": {
    "types": [
      "./backend/types"
    ]
  }
}
```

### index.d.ts

This is the index file where other required types should be imported/referenced.
<br/>
**Note:** We recommend you don't declare types here, only make reference to other declaration files.

### modules.d.ts

In Typescript, when you require a module that doesn't have types you are required to declare these modules yourself
depending on your **strict** settings. e.g:

```typescript
declare module "express-edge";
```

`module.d.ts` gives you a private space to declare these modules.

### xpresser.d.ts

All declarations related to extending xpresser, or any of it's plugins should be declared here. For example extending
the `DollarSign` or `http` key in controller actions.

## Types you should know

Below are common Types you should know.

- [$ (DollarSign)](#dollarsign)
- [Http](#http)
- [Http.**Response**](#http)
- [Http.**Request**](#http)

### $ (DollarSign)

```typescript
import {DollarSign} from "xpresser/types";

declare const $: DollarSign;

// Now you can access the global `$`
$.helpers.randomStr(10) // 10 random alphabets
``` 

### Http

This represents the `http` variable your controller actions receives as first argument. it also carries two
types `Request`&`Response`

- **http**: `Http`
- **http.req**: `Http.Request`
- **http.res**: `Http.Response`

```typescript
import {Http} from "xpresser/types/http";

export = {

    404(http: Http): Http.Response {

        http.res.status(404); // Set Response Status

        return http.send({
            url: http.req.url // Current Url
        })
    },
}
```

## What next?

Now you have known what typescript brings to the table, you can continue using xpresser the same way you know how to but
with Typescript support.


<Pagination/>