# Xpresser Params Loader
[GIT](https://github.com/xpresserjs/params-loader) |
[NPM](https://www.npmjs.com/package/@xpresser/params-loader) |
[DEMO](#demo)

This plugin provides a middleware generator for **requiring/loading** url params

##### Already installed? [Jump to Usage](#define-params)

## Installation
```shell
npm install @xpresser/params-loader
# Or
yarn add @xpresser/params-loader
```

### Plugins.json
Add `npm://@xpresser/params` to your `plugins.json`, if you don't have one then create a new one in your `backend`
folder.
```json
{
   "npm://@xpresser/params-loader": true 
}
```

## About

Most urls in every large application includes parameters (params for short). For example:

##### Example Urls

```shell
/user/:username
/post/:postId
```

`:username` and `:postId` are params.

Loading these params and finding what they represent can be done in controllers. For example:

```javascript
// A controller action
function indexPage(http) {
  const {username} = http.params;
  if (!username) return http.status(404).send(`Username is required!`);
  // use param
}
```

The above method becomes lengthy and redundant overtime as we need to repeat the same code for every single controller
action.

With the `params-loader` plugin we can generate a middleware that will load params and save the loaded params
to `http.state`

### Middleware Process

- Check if param is defined or return `notFound`
- if `load` function is defined:
  - Call it, if it throws an error, return `loadError` else hold result.
  - Check if `load` result value is undefined and return `notFound`
  - Save `load` result to  `http.state`
- Save `param` original value to  `http.state`.

## Define Params

Using the [example urls](#example-urls) defined above. <br/>
Assuming we have  a file in our **middleware directory** `ParamsMiddleware.(js|ts)`
:::: xTabs Javascript|Typescript
::: xTab Javascript

```javascript
const {ParamsMiddleware} = require("@xpresser/params-loader");
const User = require('path/to/assumed/UserModel');
const Post = require('path/to/assumed/PostModel');

module.exports = ParamsMiddleware({
  username: {
    as: "user",
    addToBoot: true,
    load: (username) => User.findOne({username}),
    loadError: (http, error) =>
        http.status(500).send(`Error loading user: ${error.message}`),
    notFound: (http, username) =>
        http.status(400).send(`User '${username}' not found!`),
  },
  
  postId: {
    as: "post",
    load: (postId) => Post.findOne({id: postId}),
    notFound: (http, postId) =>
        http.status(404).send(`Post '${postId}' not found!`),
  }
});
```

:::
::: xTab Typescript

```typescript
import {ParamsMiddleware} from "@xpresser/params-loader";
import User from "path/to/assumed/UserModel";
import Post from "path/to/assumed/PostModel";

export = ParamsMiddleware({
    username: {
        as: "user",
        addToBoot: true,
        load: (username) => User.findOne({username}),
        loadError: (http, error) =>
            http.status(500).send(`Error loading user: ${error.message}`),
        notFound: (http, username) =>
            http.status(400).send(`User '${username}' not found!`),
    },

    postId: {
        as: "post",
        load: (postId) => Post.findOne({id: postId}),
        notFound: (http, postId) =>
            http.status(404).send(`Post '${postId}' not found!`)
    }
});
```

:::
::::

The example above shows how to register the `username` and `postId` params.

`username` is renamed to `user` and `postId` is renamed to `post`.

Below is a table that shows the options of each param and their descriptions.

### Param Options

| Option      | Required | Description                                                                                                                              |
|-------------|----------|------------------------------------------------------------------------------------------------------------------------------------------|
| `notFound`  | **NO**   | if param is not found in `http.params` **OR** Param exists but has a `falsy` value before or after `load`, this function will be called. |
| `as`        | **NO**   | Custom name of the param to be saved to `http.state`                                                                                     |
| `addToBoot` | **NO**   | Add param to the boot state using `http.addToBoot()`                                                                                     |
| `load`      | **NO**   | Function to load the param.                                                                                                              |
| `loadError` | **NO**   | Function to handle error if `load` expects an error to be  thrown.                                                                       |


### Type Definition
```typescript
import {Http} from "xpresser/types/http";

type Options = {
    notFound: (http: Http, value: any) => any;
    as?: string;
    addToBoot?: boolean;
    load?: (value: any, http: Http) => any;
    loadError?: (http: Http, error: Error) => any;
};
```

## Register Middleware
Just like every other middleware, you can register it while routing using `router.path()` routes or in controller `middleware`.

### Via Route Path
```typescript
router.path('/user/:username', () => {
    router.get("=index")
    router.post("=update")
}).middleware("Params.username")
```
The `Param.username` middleware will be applied to all routes with prefix `/user/:username`.

### Via Controller
```typescript
const AppController = {
    middleware: {
        "Params.username": ["getUser"],
        "Params.postId": ["getPost"]
    }
}
```
The above simply means that 
- `Params.username` middleware will be applied to all actions in its array value e.g `getUser`.
- `Params.postId` middleware will be applied to all actions in its array value e.g `getPost`.


## Accessing Loaded Params
This plugin also extends xpresser's `RequestEngine` to add a few `helper` methods to the current request instance.

### loadedParam()
Get a loaded parameter.

:::: xTabs Javascript|Typescript
::: xTab Javascript
```javascript
// Controller action
function action(http){
    const user = http.loadedParam("user");
}
```
:::
::: xTab Typescript
```typescript
// Controller action
function action(http){
    const user = http.loadedParam("user"); // type: `any`
    // or typed
    const user = http.loadedParam<T>("user"); // type: `T`
}
```
:::
::::


### loadedParams()
Get all the loaded params or `pick` specified param if pick exists as `1st` argument.

:::: xTabs Javascript|Typescript
::: xTab Javascript
```javascript
// Controller action
function action(http){
    // Get all
    const loadedParams = http.loadedParams();
    // Or pick
    const {user, post} = http.loadedParams(["user", "post"]);
}
```
:::
::: xTab Typescript
```typescript
// Controller action
function action(http){
    type ExpectedParams = {user: User, post: Post};
    
    // Get all
    const loadedParams = http.loadedParams(); // type: `Record<string, any>`
    // or Get all Typed
    const loadedParams = http.loadedParams<ExpectedParams>(); // type: `ExpectedParams`
    
    // Pick specified
    const {user, post} = http.loadedParams(["user", "post"]); // type: `Record<string, any>`
    // or Pick typed
    const {user, post} = http.loadedParams<ExpectedParams>(["user", "post"]) // type: `ExpectedParams`
}
```
:::
::::

### hasLoadedParam()
Check if a request has a param loaded.
```javascript
// let assume `postId` is an optional param and may not be loaded.
function getPost(http){
    if(!http.hasLoadedParam()){
        return // all posts
    }
    
    // else return post
    return http.loadedParam('post');
}
```

### addLoadedParam()
Add a param to the loaded params. This may be useful if you are loading some parameters `manually` and want to add them to the loaded params.

```javascript
// Assming we have a custom middleware loading some parameters
async function fileId(http) {
  const {fileId} = http.params
  
  // do some checks and loading if needed for example
  const file = await File.findOne({id: fileId})
  
  // add to loaded Params
  http.addLoadedParam("file", fileId) 
  
  return http.next();
} 
```

## Demo

<codesandbox lang="params-loader"/>
