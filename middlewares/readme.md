# Middlewares
Middleware functions are functions that have access to the current request  and can make changes that will be passed to the next request-response cycle. 

**Note:** All express middlewares works on xpresser.

## Defining a middleware.
To create a middleware, use the xjs `make:middleware` command.
```sh
xjs make:middleware OnlyXhrRequests
````
```sh
=>  OnlyXhrRequestsMiddleware created successfully. 
=>  located @ backend/middlewares/OnlyXhrRequestsMiddleware.js
```
Notice the word `Middleware` is automatically added at the end of the specified name when creating the file for you.

This middleware will check if the request is a **XmlHttpRequest**, if true it will move to the next request cycle else it will return an error to the user.

```javascript
/**
* OnlyXhrRequestsMiddleware
*/
module.exports = {

    /**
     * Handle Incoming request
     * @param {Xpresser.Http} http
     * @return any
     */
    allow(http) {
        
        if (!http.req.xhr) {
            return http.status(401).send({
                error: "Only XmlHttpRequest requests allowed."
            });
        }

        return http.next()   
    }

};
```
if `http.req.xhr` is false an error response is returned else the request proceeds to the next request-cycle when `http.next()` is called.

## Using middlewares
There are two ways your middleware can be used in your application
 
* Router path middlewares
* Controller action middlewares

### Route path Middlewares
When declaring routes using `$.router.path()` you can assign a middleware that will affect all requests that has the router path prefixed in it.

For example, we want to add the `OnlyXhrRequest` to requests prefixed with `/api`
```javascript
$.router.path("/api", () => {

    $.router.get('user', 'Api@user');
    $.router.get('posts', 'Api@posts');

}).middleware('OnlyXhrRequest');

$.router.get('/api/comments', 'Api@comments');
```
`/api/user` and `/api/posts` will be guarded by the `OnlyXhrRequest` middleware.

**Note:** Routes prefixed `/api/` **outside** and **after** the child routes function will also be guarded by the middleware. e.g `/api/comments`

### Controller action middlewares
Every controller has a middleware handler where you assign middlewares to actions in that controller.
:::: tabs
::: tab "Controller Class"
```javascript
class TestController extends $.controller {

    /**
    * middleware - Set Middleware
    * @returns {Object}
    */
    static middleware(){
        return {}
    }

}
module.exports = TestController;
```
The object returned to the `middleware` function is where you assign middlewares to actions
:::

::: tab "Controller Object"
```javascript
const TestObjectController = {
    // Controller Name
    name: "TestObjectController",
    // Controller Middlewares
    middlewares: {},
    // Controller Default Service Error Handler.
    e: (http, error) => http.send({error}),
};

module.exports = TestObjectController;
```
The `middlewares` field is where you assign middlewares to action.
:::
::::