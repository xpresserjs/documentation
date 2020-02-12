# Introduction to Controllers
Controllers are responsible for controlling the flow of the application execution. When you make a request, a controller is responsible for returning the response to that request. The controller can perform one or more actions.

## Creating a controller
A controller file can be created manually or automatically using **xjs-cli** `make:controller`  command.

Xpresser has 3 types of controllers.
- A Class file controller
- An Object file controller
- An Object with custom services controller

Don't get overwhelmed, they all serve the same purpose with just a little preference difference, For a start we will be using a the class based controllers in our documentation.

#### Class file controller
**Filename:** PostsController.js
```javascript
class PostController extends $.controller {
    all() { /** take action here **/ }
    static create() { /** same as above but static **/}
}

module.exports = PostController;
```

The above is an example of a **class file** controller.

The class file controller **MUST** extend xpresser's base controller (`$.controller`), this extension lets xpresser know that you are using a class and not an object.
this is because javascript has no official way of checking if a variable is a class.

The `PostController` contains a **static** method and a **non-static** method, both works exactly the same way. Usage depends on your preference.

## Handling Requests.
In the method of your controller class is where you are likely to spend most of your time because it is where the action for a routed request is taken place.

You can route to a controller action like so:
```javascript
$.router.get('/posts/all', 'PostsController@all');
```

Now, when a request matches the specified route URI, the `all` method on the `PostsController` class will be executed.

We can send a basic response like so
```javascript
class PostController extends $.controller {

    all(http) {
        http.send("List of all posts.");
        // Or like in express
        http.res.send("List of all posts.")
    }

}
```
The `http` variable includes express `req` and `res` variables with more functions/helpers

##### --- To be continued ---