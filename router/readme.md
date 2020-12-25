# Router

[XpresserRouter](https://npmjs.com/package/@xpresser/router) provides an easy way to route your urls to functions or
controller actions.

In your application an instance of XpresserRouter can be accessed globally using `$.router`.

##### Using global DollarSign

:::: xTabs Javascript|Typescript
::: xTab Javascript

```javascript
const router = $.router; // Or global.$.router

// Your routes
router.get('/', () => 'Hello World');
```

:::
::: xTab Typescript

```typescript
import {DollarSign} from "xpresser/types";

declare const $: DollarSign;
const router = $.router;

router.get('/', () => 'Hello World');
```

:::
::::

##### Without Global DollarSign

if you don't want to use the global dollarSign, or you disabled `exposeDollarSign` then you have to import the router
like this:
:::: xTabs Javascript|Typescript
::: xTab Javascript

```javascript
const {getInstanceRouter} = require('xpresser');
const router = getInstanceRouter();

// Your routes
router.get('/', () => 'Hello World');
```

:::
::: xTab Typescript

```typescript
import {getInstanceRouter} from "xpresser";
// Assign to variable.
const router = getInstanceRouter();

// Your routes
router.get('/', () => 'Hello World');
```

:::
::::

## Supported Verbs

- checkout
- copy
- delete
- get
- head
- lock
- merge
- mkactivity
- mkcol
- move
- m-search
- notify
- options
- patch
- post
- purge
- put
- report
- search
- subscribe
- trace
- unlock
- unsubscribe

## Basic

```javascript
router.METHOD(PATH, ACTION)
```

where

- **`router`** is an instance of XpresserRouter.
- **`METHOD`** is an HTTP request method, in lowercase.
- **`PATH`** is a path on the server.
- **`ACTION`** is the function executed when the route is matched.

`ACTION` can either be a function, or a string holding a controller action.

```javascript
router.get('/', http => http.view('about'));
```

Using a Function works same way a controller action would but using the later would make your routes file look clean for
your own readability.

### Routing to Files.

The router provides a shorthand helper for routing static files.

```javascript
router.sendFile('/*', 'public/404.html');
```

The above is a shorthand for the code below.

```javascript
router.get('/*', http => {
  const file = http.$('path').base('public/404.html');
  return http.res.sendFile(file);
})
```

### Routing to Controller actions.

Assuming we have a controller named **PagesController** with 2 methods: **about** & **faq**

```javascript
router.get('/about', 'PagesController@about')
router.get('/faq', 'PagesController@faq')
```

Looks neat now right? It can look better with smart routing.

**Note:** XpresserRouter does not require the word **`Controller`** in your controller name when routing e.g

```javascript
router.get('/about', 'Pages@about')
router.get('/faq', 'Pages@faq')
```

The above works exactly as the first.

## Named Routes

Named routing is another amazing feature of XpresserRouter. Named routes allows referring to routes when generating
redirects or Urls easily.

You can specify named routes by chaining the `name` method onto the route definition

```javascript
router.post('/auth/login', 'Auth@login').name('login')
```

Once you have assigned a name to your routes, you may use the route's name when generating URLs or redirects.

In your views you can refer to that route using the **`ctx.route($name)`** helper.

```ejs

<form action="<%= ctx.route('login') %>">
    ...
</form>
```

will be rendered as

```html

<form action="/auth/login">
    ...
</form>
```

If your name is the same with your controller action name just like the example above you can use the`.actionAsName()`
helper.

```javascript
router.post('/auth/login', 'Auth@login').name('login')
// is same as
router.post('/auth/login', 'Auth@login').actionAsName();
```

## Paths

`router.path()` is not part of the http verbs functions, it is a special method for creating deep routes.

```javascript
router.path(path, () => {/* Child Routes */});
```

It accepts the path for 1st argument and a function containing **child routes** for the 2nd argument.

Assuming you have a controller with so many methods for a related route. e.g

```javascript
const {ControllerClass} = require('xpresser');

class AccountController extends ControllerClass {
  static view() {/* Some codes here... */}
  
  static update() {/* Some codes here... */}
  
  static change_password() {/* Some codes here... */}
  
  static send_code() {/* Some codes here... */}
  
  static verify() {/* Some codes here... */}
}
```

Now we want all the requests to this controller to be on **example.com/account/{whatever}**, this is
where `$.router.path` comes handy.

#### Without Path

```javascript
router.get('/account', 'Account@view');
router.post('/account', 'Account@update');
router.post('/account/change_password', 'Account@change_password');
router.post('/account/send_code', 'Account@send_code');
router.get('/account/verify', 'Account@verify');
```

#### Using Path

```javascript
router.path('/account', () => {
  router.get('', 'view');
  router.post('', 'update');
  router.post('change_password', 'change_password');
  router.post('send_code', 'send_code');
  router.get('verify', 'verify');
}).controller('Account');
```

The above code will produce the same routes as the one without path. But it doesn't end here.

The path function also provides amazing ways to make you write less when declaring routes.

### @/= Path Helpers

Notice the url and actions of `change_password`, `send_code` & `verify` in the code above, They are the same. **i.e**

```javascript
router.post('change_password', 'change_password'); // url/path and action is the same.
router.post('send_code', 'send_code'); // url/path and action is the same.
router.get('verify', 'verify'); // url/path and action is the same.
```

it kind of feels like there is a little redundancy there, well XpresserRouter provides a clean solution for situations
like this.

#### @

```javascript
// Instead of
router.post('change_password', 'change_password');
// it can be written as
router.post('@change_password');
```

The above simply means that XpresserRouter should use same url as the actions name.

#### =

```javascript
// Instead of
router.get('', 'view');
// it can be written as
router.get('=view');
```

The above simply means that XpresserRouter should set the action to the path's index url.

if we want to rewrite [the above example](#using-path) it will look like below

```javascript
router.path('/account', () => {
  router.get('=view');
  router.post('=update');
  router.post('@change_password');
  router.post('@send_code');
  router.get('@verify');
}).controller('Account');
```

##### Generated Routes #1

| Method | Url | Controller@action | 
| ----- | -----| -----------------|
| GET   | /account | AccountController@view
| POST   | /account | AccountController@update
| POST   | /account/change_password | AccountController@change_password
| POST   | /account/send_code | AccountController@send_code
| GET   | /account/verify | AccountController@verify

**Note:** This only applies if your controller actions matches your url which most times is the case and can be used
only by routes declared in `router.path()` children function.

### Named Routes

In real life situations when using the path function you may like to have a name prefix for all names registered in that
path e.g

```javascript
router.path('/account', () => {
  router.get('@view').name('account.view');
  router.post('@update').name('account.update');
  router.post('@change_password').name('account.change_password');
  router.post('@send_code').name('account.send_code');
  router.get('@verify').name('account.verify');
}).controller('Account');
```

### As

Instead of using `account.` repeatedly you can use the `as` helper like this

```javascript
router.path('/account', () => {
  router.get('=view').name('view');
  router.post('=update').name('update');
  router.post('@change_password').name('change_password');
  router.post('@send_code').name('send_code');
  router.get('@verify').name('verify');
}).controller('Account').as('account');
```

The as function tells XpresserRouter to prefix any name in the given path with `account.`

### Actions as Name

Using the routes declared above as an example, you will notice the controller actions are the same with names of all the
routes.

Path also offers a function similar to the **actionAsName** function but this time it is plural.

```javascript
router.path('/account', () => {
  router.get('=view');
  router.post('=update');
  router.post('@change_password');
  router.post('@send_code');
  router.get('@verify');
}).controller('Account').as('account').actionsAsName();
```

With these simple looking codes, your end result will be:

| Method | Url | Controller@action | Name
| ----- | -----| -----------------| -----
| GET   | /account | AccountController@view | account.view
| POST   | /account | AccountController@update | account.update
| POST   | /account/change_password | AccountController@change_password | account.change_password
| POST   | /account/send_code | AccountController@send_code | account.send_code
| GET   | /account/verify | AccountController@verify | account.verify

### External Controller

Routes declared in `.path`  also can make reference to external controllers but will be prefixed by the current path
url.

```javascript
router.path('/user/:id', () => {
  router.get('posts', 'Posts@user')
  // -> /user/:id/posts
}).controller('Account')
``` 

## Use Controller

The `router` instance includes a `useController` method. This method groups routes to a controller using [path](#paths)

```javascript
router.useController("Post", () => {
  
  router.get("/posts", "all");
  router.post("/posts", "create");
  
  router.path("/post/:postId", () => {
    
    router.get("=view");
    route.post("=update");
  
  })
});
```

##### Generated Routes #2

| Method | Url | Controller@action
| ----- | -----| -----------------
| GET | /posts | PostController@all
| POST | /posts | PostController@create
| GET | /post/:postId | PostController@view
| POST | /post/:postId | PostController@update

## View All Routes

Xpresser provides a cli command that lists all routes for you and also includes mapped controllers.
<br/> [See `xjs routes` command](../xjs-cli.html#routes)

## Advanced Routing

Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can
be strings, string patterns, or regular expressions.

The characters ?, +, *, and () are subsets of their regular expression counterparts. The hyphen (-) and the dot (.) are
interpreted literally by string-based paths.

If you need to use the dollar character ($) in a path string, enclose it escaped within ([ and ]). For example, the path
string for requests at “/data/$book”, would be “/data/([\$])book”.

## Route Path patterns

Here are some examples of route paths based on string patterns. <br/>
This route path below will match **acd** and **abcd**.

```javascript
router.get('/ab?cd', 'YourController@index');
```

This route path will match **abcd**, **abbcd**, **abbbcd**, and so on.

```javascript
router.get('/ab+cd', 'YourController@index');
```

This route path will match **abcd**, **abxcd**, **abRANDOMcd**, **ab123cd**, and so on.

```javascript
router.get('/ab*cd', 'YourController@index');
```

This route path will match **/abe** and **/abcde.**

```javascript
router.get('/ab(cd)?e', 'YourController@index');
```

### Paths with regular expressions.

Examples of route paths based on regular expressions: <br/>
This route path will match anything with an “a” in it.

```javascript
router.get(/a/, 'YourController@index')
```

This route path will match **butterfly** and **dragonfly**, but not **butterflyman**, **dragonflyman**, and so on.

```javascript
router.get(/.*fly$/, 'YourController@index')
```

## Route parameters.

Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The
captured values are populated in the req.params object, with the name of the route parameter specified in the path as
their respective keys.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
http.params: { "userId": "34", "bookId": "8989" }
```

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

```javascript
router.get('/users/:userId/books/:bookId', function(http) {
  return http.send(http.params); // {"userId": "34", "bookId": "8989"}
});
```
