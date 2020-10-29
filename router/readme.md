# XpresserRouter

[XpresserRouter](https://npmjs.com/package/@xpresser/router) provides an easy way to route your urls to functions or controller actions.

In your application an instance of XpresserRouter can be accessed globally using `$.router`.

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
$.router.get(url, action)
```
`action` can either be a function, or a string holding a controller name and action.
```javascript
$.router.get('/', (x) => {
    return x.view('about')
});
```

Using a Function works same way a controller action would but using the later would make your routes file look clean for your own readability.

Assuming we have a controller named **PagesController** with 2 methods: **about** & **faq**
```javascript
$.router.get('/about', 'PagesController@about')
$.router.get('/faq', 'PagesController@faq')
```

Looks neat now right?
It can look neater with smart routing.

**Note:** XpresserRouter does not require the word **`Controller`** in your controller name when routing e.g
```javascript
$.router.get('/about', 'Pages@about')
$.router.get('/faq', 'Pages@faq')
```
The above works exactly as the first.

## Named Routes
Named routing is another amazing feature of XpresserRouter. Named routes allow referring to routes when generating redirects or Urls more comfortably.

You can specify named routes by chaining the `name` method onto the route definition
```javascript
$.router.post('/auth/login', 'Auth@login').name('login')
```
Once you have assigned a name to your routes, you may use the route's name when generating URLs or redirects.

In your views you can refer to that route using the **`ctx.route($name)`** helper.
```ejs
<form action="<%=ctx.route('login')%>">
    ...  
</form>
```
will be rendered as
```html
<form action="/auth/login">
    ...
</form>
```

If your name is the same with your controller action name just like the example above
you can use the`.actionAsName()` helper.

```javascript
$.router.post('/auth/login', 'Auth@login').name('login')
// is same as
$.router.post('/auth/login', 'Auth@login').actionAsName();
```

## $.router.path
`path` is not part of the http verbs, it is a special method for creating deep routes.

```javascript
$.router.path(path, () => {/* Child Routes */});
```
It accepts the path for 1st argument and a function containing **child routes** for the 2nd argument.

Assuming you have a controller with so many methods for a related route. e.g
```javascript
class AccountController extends $.controller {
    static view(){/* Some codes here... */}
    static update(){/* Some codes here... */}
    static change_password(){/* Some codes here... */}
    static send_code(){/* Some codes here... */}
    static verify(){/* Some codes here... */}
}
```
Now we want all the requests to this controller to be on **example.com/account/{whatever}**, this is where `$.router.path` comes in handy.

#### Without Path
```javascript
const route = $.router;
route.get('/account', 'Account@view');
route.post('/account', 'Account@update');
route.post('/account/change_password', 'Account@change_password');
route.post('/account/send_code', 'Account@send_code');
route.get('/account/verify', 'Account@verify');
```
#### Using Path
```javascript
const route = $.router;
route.path('/account', () => {
    route.get('', 'view');
    route.post('', 'update');
    route.post('change_password', 'change_password');
    route.post('send_code', 'send_code');
    route.get('verify', 'verify');
}).controller('Account');
```
The above code will produce the same routes as the one without path.
But it doesn't end here.

The path function also provides amazing ways to make you write less when declaring routes.

### @/= Shorthand
Notice the url, and the controller action is the same when declaring with path.
it kind of feels like  there is a little redundancy there, well XpresserRouter provides a clean solution for situations like this.
```javascript
// Instead of
route.get('change_password', 'change_password');
// it can be written as
route.get('@change_password');
```
The above simply means that XpresserRouter should use same url as the actions name.

So the above routes can be written like below
```javascript
const route = $.router;
route.path('/account', () => {
    route.get('@view');
    route.post('@update');
    route.post('@change_password');
    route.post('@send_code');
    route.get('@verify');
}).controller('Account');
```

But this only applies if your controller actions matches your url which most times is the case and can be used only by routes declared in `$.router.path` children function.

### Named Routes
In real life situations when using the path function you may like to have a name prefix for all names registered in that path e.g
```javascript
route.path('/account', () => {
    route.get('@view').name('account.view');
    route.post('@update').name('account.update');
    route.post('@change_password').name('account.change_password');
    route.post('@send_code').name('account.send_code');
    route.get('@verify').name('account.verify');
}).controller('Account');
```
### As
Instead of using `account.` repeatedly you can use the `as` helper like this
```javascript
route.path('/account', () => {
    route.get('@view').name('view');
    route.post('@update').name('update');
    route.post('@change_password').name('change_password');
    route.post('@send_code').name('send_code');
    route.get('@verify').name('verify');
}).controller('Account').as('account');
```
The as function tells XpresserRouter to prefix any name in the given path with `account.`
**Note:** If a route specifies `name` and `as` is also used in parent path the name will be used instead of the string specified in `as`

### Actions as Name
Using the routes declared above as an example, you will notice the controller actions are the same with names of all the routes.

Path also offers a function similar to the **actionAsName** function but this time it is plural.
```javascript
route.path('/account', () => {
    route.get('@view');
    route.post('@update');
    route.post('@change_password');
    route.post('@send_code');
    route.get('@verify');
}).controller('Account').as('account').actionsAsName();
```
With these neat looking codes your end result will be

| Method | Url | Controller@action | Name
| ----- | -----| -----------------| -----
| GET   | /account/view | AccountController@view | account.view
| POST   | /account/update | AccountController@update | account.update
| POST   | /account/change_password | AccountController@change_password | account.change_password
| POST   | /account/send_code | AccountController@send_code | account.send_code
| GET   | /account/verify | AccountController@verify | account.verify


### External Controller
Routes declared in path can make reference to external controllers but will be prefixed by path url.
```javascript
route.path('/user/:id', () => {
    route.get('posts', 'Posts@user')
    // -> /user/:id/posts
}).controller('Account')
``` 

#### .... To be continued ....
