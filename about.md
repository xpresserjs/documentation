::: warning
Xpresser is still under development.
:::

[GIT](https://github.com/xpresserjs/framework) |
[NPM](https://www.npmjs.com/package/xpresser) |
[Yarn](https://yarn.pm/xpresser)

## What is Xpresser?
**Xpresser** is a server side and command line framework for Nodejs built using [express](https://www.npmjs.com/package/express) as it's server.

The need for this framework increased when we needed the following: <br/> 
#### Rapid Development & One language
We got tired of rewriting express required setups for most project.
Even when we copy old codes and reuse, we also end up modifying/updating new functions that are not in the old codes repo.
Thereby causing chaos and confusion. 

#### Separate Routes from Controllers.
We see most frameworks do this, but it does not seem right to us when thinking about large applications where you have over 500+ routes. 
With xpresser-router you define routes in your **routesFile** and point requests to **controllers**.


#### A Very Flexible MVC structure.
xpresser **is the only MVC framework** that you can boot up with **one file**, manually all by yourself with all folders configurable to your choice.

#### Reusable, Plug and Play Plugins
express supports plugins but only on the server side. not on your project as a whole.
Sometimes there are functions you want to call on Boot before server starts, or group of related task you always perform, and you need them as plug and play.


#### Run Commands
In a situation where you have already connected to the database in your project, then you need to run a task on the fly, 
like maybe convert files and update database. You find yourself importing your database file or maybe do a new database connection to run such task.
With xpresser **jobs** you can run commands with all your connections active, The only difference is: Your server did not start.


## Express vs Xpresser
**express** is only a server while **xpresser** is express and more. if you have been looking for extra functions on your express application then xpresser should be your choice.

### Request Example
:::: xTabs Xpresser|Express
::: xTab Xpresser

```javascript
$.router.get('/', (http) =>  {
    return http.res.send("Hello World");
});
```

The `http` variable carries express `req` and `res` with extra functions todo more.
:::

::: xTab Express
```javascript
app.get('/', (req, res) =>  {
    return res.send("Hello World");
})
```
:::
::::

## What's added?
- Boot Middleware Support
- MVC (Model, View, Controller) support out of the box.
- Plugin Support
- Helpers for faster development 
- Events.
- Commands & Cron Jobs


#### NEXT: [INSTALLATION](./installation.md)

