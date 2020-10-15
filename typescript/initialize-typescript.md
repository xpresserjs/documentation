# xpresserTS
xpresserTs is the **Typescript** implementation of **xpresserJs**.

Xpresser was written with typescript but was not built for Typescript when it first started, we had to focus on making it lovely for javascript first.
Now this has been achieved, we have given xpresser the full Typescript supports it needs.


- Use **.ts** files
- **xjs-cli** creates typed .ts files
- Provide support **.ts.hbs** factory files.
- Provide option for node or typescript environments.

## Creating a Project
Creating a new xpresserTs project is no different from running the usual `xjs new` command using **xjs-cli** or starting in a plain **app.ts** file if you have a good understanding of the xpresser framework

### Using xjs-cli
```shell script
xjs new xpresser-ts-app
```

### Plain app.ts file
```typescript
import xpresser from "xpresser"

const $ = xpresser({/* configurations */})

// This line is required for all xpresser typescript projects
$.initializeTypescript(__filename);

// Boot Xpresser
$.boot();
```

## initializeTypescript?
This method does a little magic behind the scenes using the `__filename` argument passed to it.

### Why __filename?
xpresser not only being a web server framework but also a cli framework needs to know what file type you are running.
if it detects a **.ts** extension it means the app is running in **typescript** mode and vice versa when it detects a **.js** file extension, this helps xpresser decide if to create **.ts** files when you use the `xjs-cli make:*` command.

#### Why would it detect .js when using Typescript?
When you compile Typescript to Javascript files which is required for production because nodejs only understands pure Javascript syntax, the extension of the file becomes **.js** when you run it.

This concept makes it possible for the `initializeTypescript` function to provide an option where you can choose what to run when in **.js/.ts mode** as it's second argument.

### Usage
#### `initializeTypescript(filename: string, run?: (isNode: boolean) => void)`

- **filename:** must be `__filename` [#why __filename?](#why-filename)
- **run** a function where you run codes for different modes. i.e **.js/.ts**
- **isNode:** is true when in nodejs mode and vice versa.

```typescript
$.initializeTypescript(__filename, (isNode: boolean) => {
    if(isNode){
        // This will log only when running built .js files.
        $.logInfo('Running built .js version');
    }
})
```

### isNode Use Cases?
This depends on your project, but we have encountered many use cases for this option. It started with a situation where routes file remains `routes.ts` after build because the value comes from the config `paths.routesFile`.

`initializeTypescript` behind the scenes when in **node mode** checks if your routesFile config has a **.ts** extension and renames it to **.js** i.e setting it to the compiled routes file path.

## Types you should know
Below are common types you should know and may require during development.

### $ (DollarSign)
```typescript
import {DollarSign} from "xpresser/types";
declare const $: DollarSign;

// Now you can access the global `$`
``` 

### Xpresser.Http
This represents the `http` variable your controller actions receives e.g;
```typescript
const name: string = 'PostController';
const getPosts = (http) => {}

export = {getPosts}
```