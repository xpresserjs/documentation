# xpress-mongo - Joi Schema

## What is Joi?

[Joi](http://npmjs.com/package/joi) is the most powerful schema description language and data validator for JavaScript.

## Why support Joi Schema?

Aside having a similar structure, The [default xpress-mongo schema](./schema.md) is focused more on **data type check** than **data value validation**.
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

The default schema, Just like the `email` example above, does NOT validate the keys in an object. It only checks if data
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

The schema above will **NOT** throw an error if `phone or website` does not exist. It only checks if `contact`
is an object and will set the default passed if `contact` is `undefined`.

With Joi we can validate objects like so:

```js
const {joi} = require("xpress-mongo");
const {urlRegex, phoneRegex} = require("./expressions");

const UserSchema = {
  contact: joi.object({
    // validate `contact.phone` with regex
    phone: joi.string().regex(phoneRegex).required(),
    // validate `contact.website` with regex
    website: joi.string().regex(urlRegex).required(),
  })
}
```

## No Conflict

Both **Default & Joi** Schemas can be mixed up in a xpress-mongo schema object.

For example

```js
const {is, joi} = require("xpress-mongo");

const UserSchema = {
  username: is.String().required(), // default
  email: joi.string().email().required(), // joi
  age: joi.number().greater(18).required(), // joi
  verified: is.Boolean().required() // default
}
```

## Performance
The default schema is faster because it only runs data type checks.

The Joi schema is slower in terms of performance and this is expected because it does more than just data type checks.
Time difference is not noticeable unless you are updating/creating **millions** of documents.


## Joi Documentation
See [joi.dev](https://joi.dev)



<Pagination/>