::: warning
Xpresser is still under development.
:::

[GIT](https://github.com/xpresserjs/framework) |
[NPM](https://www.npmjs.com/package/xpresser) |
[Yarn](https://yarn.pm/xpresser)

## What is Xpresser?
**Xpresser** is a micro framework for Nodejs built using [express](https://www.npmjs.com/package/express) as a server.

## Express vs Xpresser
**express** is only a server while **xpresser** is express and more. if you have been looking for extra functions on your express application then xpresser should be your choice.

### Request Example
:::: tabs
::: tab Express
```javascript
app.get('/', (req, res) =>  {
    return res.send("Hello World");
})
```
:::


::: tab Xpresser
```javascript
$.router.get('/', (x) =>  {
    return x.res.send("Hello World");
});
```
:::
::::

The `x` variable carries express `req` and `res` with extra codebase todo more.

