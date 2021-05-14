# xpress-mongo - Joi Schema

## What is Joi?

[Joi](http://npmjs.com/package/joi) is the most powerful schema description language and data validator for JavaScript.

## Why support Joi Schema?

The [default xpress-mongo schema](./schema.md) is focused more on **data type validation** than **input validation**.
With **Joi** we can do more at validation level than just data checking.

For Example:

```js
const {is} = require("xpress-mongo");

const UserSchema = {
  email: is.String().required(),
}
```

The schema above will check if the field `email` is a valid string but has no concern with checking if the string is
really an email address. With Joi we can check if `email` is `typeof "string"`, and a valid email address.

Like so:

```js
// Joi is exported as `joi` in xpress-mongo >= 1.0.0
const {joi} = require("xpress-mongo");

const UserSchema = {
    email: joi.string().email().required(),
}
```

`email` will throw an error if not a string, and a valid email address.

### Validating Objects

The default schema, Just like the `email` example above, does NOT validate the keys in objects. It Only checks if data
passed is an object.

```js
const {is} = require("xpress-mongo");

const UserSchema = {
    contact: is.Object(() => ({
        phone: null,
        website: null,
    })).required(),
}
```

The schema above will **NOT** throw an error if `phone, facebook or twitter` does not exist. It only checks if `contact`
is an object and will set the default passed if `contact` is `undefined`.

With Joi we can validate objects like so:

```js
const {joi} = require("xpress-mongo");
const {urlRegex, phoneRegex} = require("./expressions");

const UserSchema = {
    contact: joi.object({
        phone: joi.string().regex(phoneRegex).required(),
        website: joi.string().regex(urlRegex).required(),
    })
}
```