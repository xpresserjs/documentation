# XMongoModel

**xpress-mongo's** parent model class
is [`XMongoModel`](https://github.com/xpresserjs/xpress-mongo/blob/master/src/XMongoModel.ts)
<br/>

## Creating a Model

A xpress-mongo Model is simply a Class that extends `XmongoModel` and is linked to a collection.

### Basic Model

:::: xTabs JS|TS
::: xTab 0

```javascript
const {XMongoModel} = require("xpress-mongo");
const connection = require("./your_connection")

// Make model by extending Base Model "XMongoModel"
class User extends XMongoModel {}

// Link User model to "users" collection.
connection.link(User, "users");

// Export Model
module.exports = User;
```

:::
::: xTab 1

```typescript
import {XMongoModel} from "xpress-mongo";
import connection from "./your_connection";

// Make model by extending Base Model "XMongoModel"
class User extends XMongoModel {
}

// Link User model to "users" collection.
connection.link(User, "users");

// Export Model
export = User;
```

:::
::::

**Note:** A model will not be able to make database calls until it is **linked** to a collection.

A Model can also be linked to a collection by extending the auto-generated Model returned by
calling `connection.model("collection")`. See Advanced Model example below.

### Advanced Model

:::: xTabs JS|TS|TS (Strictly Typed)
::: xTab 0

```javascript
import {is} from "xpress-mongo";
import connection from "./your_connection";

// Class User now extends model generated for `users`
class User extends connection.model('users') {
  
  // Declare schema (optional)
  static schema = {
    firstName: is.String(),
    lastName: is.String(),
  }
  
  // Define custom model methods
  fullName() {
    // Model's data is stored in `this.data`
    return this.data.firstName + ' ' + this.data.lastName;
  }
}

module.exports = User;
```

:::
::: xTab 1

```typescript
import {is} from "xpress-mongo";
import connection from "./your_connection";

// Class User now extends model generated for `users`
class User extends connection.model('users') {

    // Declare schema (optional)
    static schema = {
        firstName: is.String(),
        lastName: is.String(),
    }

    // Define custom model methods
    fullName() {
        // Model's data is stored in `this.data`
        return this.data.firstName + ' ' + this.data.lastName;
    }
}

export = User;
```

:::
::: xTab 2

```typescript
import {is, XMongoDataType, XMongoTypedModel, XMongoSchema} from "xpress-mongo";
import connection from "./your_connection";

// Model Data type interface
interface UserDataType {
    firstName: string;
    lastName: string;
}

// XMongoTypedModel is the strictly typed version of XMongoModel
class User extends XMongoTypedModel<UserDataType> {

    // Declare schema (optional)
    static schema: XMongoSchema<UserDataType> = {
        firstName: is.String(),
        lastName: is.String(),
    }

    // Define custom model methods
    fullName() {
        // Model's data is stored in `this.data`
        return this.data.firstName + ' ' + this.data.lastName;
    }
}

// Link to collection
connection.link(User, "user");

// Export Model
export = User;
```

:::
::::

## Static Methods

### native()

`XMongoModel.native()` returns mongodb native collection instance for you to run any mongodb native queries.

Adding a document using mongodb native

```javascript
await Users.native().insertOne({
  email: 'john@doe.com',
  firstName: 'John',
  lastName: 'Doe'
});
```

### thisCollection() - Deprecated

Use [.native()](#native) instead - `v0.0.40`

### on()

`XMongoModel.on(event: string, run: function)` is used to listen for **create, created, update, watch or deleted**
events. See [Model Events](./events.md).

```javascript
Model.on('update', modelInstance => {
  // Make changes
})
```

### new() - `async`

`XMongoModel.new(data: {}, save: boolean = true)` is used to add a new document to the collection.

```javascript
await Users.new({
  email: 'john@doe.com',
  firstName: 'John',
  lastName: 'Doe'
});
```

The second argument `save` if set to false returns model instance without saving to the database.

```javascript
const newUser = await Users.new({
  email: 'john@doe.com',
  firstName: 'John',
  lastName: 'Doe'
}, false);

newUsers.set('age', 18);

await newUsers.save();
```

The above also has a function that makes it easier to understand. See `XMongoModel.make()` below.

### make()

`XMongoModel.make(data: {})` creates a model instance with the data provided. this instance does not have any link to
the database unless the `save` method is called.

```javascript
const newUser = Users.make({
  email: 'john@doe.com',
  firstName: 'John',
  lastName: 'Doe'
});

newUsers.set('age', 18);

await newUsers.save();
```

### use()

`XMongoModel.use(data: {})` creates and returns a model instance using the data provided. Mostly used to convert an
object to model instance.

Let's assume you have a raw data returned from the native client `findOne` query, it can be converted to a model
instance using `use()`

```javascript
const rawData = await Users.native().findOne({});
const user = Users.use(rawData);

// Updates same document
await user.update({
  age: 20
})
```

### fromArray()

`XMongoModel.fromArray(list: any[] | NativeQueryFn )` is used to convert arrays of raw data to an array of instance
models.
<br/>
For example when using `XMongoModel.find()` the results returned is a clean array not an array of model instances.
<br/>
You can convert that result using `fromArray([])`

```javascript
const rawList = await Users.find({});
const users = Users.fromArray(rawList);

// Updates the first document
await users[0].update({
  age: 20
});
```

#### From Query Result

The `fromArray` method can also make a database call if a `function` that returns a **mongodb native query** is passed
instead of an array, The query returned will be executed, and the result will be converted to model instances.

For Example

```javascript
const users = await Users.fromArray(native => native.find())
// `native` is same as `Model.native()` i.e Mongodb native query builder.
// Now you can access model instance functions
if (users.length) {
  console.log(users[0].fullName()) // John Doe
}
```

This also makes it easy to convert native **aggregate** results.

```javascript
const users = await Users.fromArray(native => native.aggregate([]))

if (users.length) {
  console.log(users[0].fullName()) // John Doe
}
```

NOTE: `fromArray` only supports queries that returns an array. E.g `find` `aggregate`

### id()

`XMongoModel.id(id: string)` converts the string passed to a mongodb ObjectID

```javascript
const userId = Users.id('5f43e78c9da24b1444d7c998')
// returns ObjectId("5f43e78c9da24b1444d7c998")
```

### isValidId()

`XMongoModel.isValidId(id: any)` verifies if id passed as argument is a valid mongodb ObjectID.

```javascript
if (Users.isValidId('5f43e78c9da24b1444d7c998'))
  return true;
```

### find() - `async`

`XMongoModel.find(query: {}, options?: {}, raw?: false)`
This method is used to find documents in a collection and does not return results as model instances

```javascript
// Find all users with `age` greater than or equals to `18`
let users = await Users.find({
  age: {$gte: 18}
});

// Convert results to model instances
users = Users.fromArray(users);
```

**`options?`** accepts mongodb native `FindOneOptions` <br/>
E.g sort by email and return only `{email, age}`

```javascript
const users = await Users.find({
  age: {$gte: 18}
}, {
  sort: {email: 1},
  projection: {email: 1, age: 1}
});
```

**`raw?`** is set to false by default but when set to true, the native `find` query builder is returned instead of query
results.

```javascript
const users = await Users.find({
  age: {$gte: 18}
}, true).limit(1).skip(10).toArray();
```

### findOne() - `async`

`XMongoModel.findOne(query: {}, options?: {}, raw?: false)` same as `find()` but returns only one document as model
instance.

```javascript
const john = await Users.findOne({firstName: 'John'});
```

### findById() - `async`

`XMongoModel.findById(_id: any, options?: {})` is used to find one document using the `_id`

```javascript
const user = await Users.findById('5f43e78c9da24b1444d7c998')
```

### count() - `async`

`XMongoModel.count(query?: {})` is used to count documents that matches the query passed. if no query is passed, it
counts all elements.

```javascript
const numberOfUsers = await Users.count();
const numberOfAdults = await Users.count({
  age: {$gte: 18}
})
```

### countAggregate() - `async`

`XmongoModel.countAggregate(query: [], options?: {})` is same as `count()` but used to count results from an aggregate
query.

### paginate() - `async`

`XmongoModel.paginate(page: number, perPage: number, query: {}, options?: {})` is used to paginate results

```javascript
// Assuming this is a controller action
async function getAllUsers(req, res) {
  
  // Get page from
  const page = req.query.page || 1;
  const perPage = 30;
  
  // Pagination of all users with age >= 18, sort by firstName
  const users = await Users.paginate(page, perPage, {
    age: {$gte: 18}
  }, {
    sort: {firstName: 1}
  });
  
  // Return response
  return res.json({users});
};
```

The result

```json
{
  "total": 1,
  "perPage": 20,
  "page": 1,
  "lastPage": 1,
  "data": [
    {
      "_id": "5f43e78c9da24b1444d7c998",
      "email": "john@doe.com",
      "firstName": "John",
      "lastName": "Doe",
      "age": 18
    }
  ]
}
```

### paginateAggregate() - `async`

`XmongoModel.paginateAggregate(page: number, perPage: number, query: {}, options?: {})` is same
with `XMongoModel.paginate` but works with aggregation query.

```javascript
// Assuming this is a controller action
async function getAllUsers(req, res) {
  
  const page = req.query.page || 1;
  const perPage = 30;
  
  // Pagination of all users with age >= 18, sort by firstName
  const users = await Users.paginateAggregate(
      page,
      perPage,
      [/* Pagination Query */],
      {/* Collection Options */}
  );
  
  // Return response
  return res.json({users});
};
```

## Instance Methods

### changes()

`this.changes()` shows the difference between original model data and current data. so if you make any changes it is
returned when calling this method

```javascript
/**
 * Assuming Data is {
 *     _id: 5f43e78c9da24b1444d7c998,
 *     firstName: 'John',
 *     lastName: 'Doe',
 * }
 */

const user = await Users.findById('5f43e78c9da24b1444d7c998');

user.set('lastName', 'Joe')

console.log(user.changes());
// => {lastName: 'Joe'}
```

### delete() - `async`

`this.delete()` deletes the current document from the collection.

```javascript
const john = await Users.findOne({firstName: 'John'});

if (john) await john.delete();
```

### get()

`this.get(key: string, $default: any)` gets field value from the current document.

```javascript
const john = await Users.findOne({firstName: 'John'});

john.get('firstName');
john.get('lastName');

// Set defualt value if key is not found.
john.get('verified', false);
```

### has()

`this.has(key: string, value: any | (() => any) = undefined): boolean` checks if a field exists or if its value matches
the specified value.  <br/> If `value` is function, it will be called and its return value will be used to Compare
against the fields value.

:::: xTabs Has | Has Value | Example Data
::: xTab 2

```json
[
  {
    "email": "john@doe.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "avatars": {
      "main": "/crop/avatar.png",
      "200": "/crop/avatar.200.png",
      "500": "/crop/avatar.500.png"
    }
  }
]
```

:::
::: xTab 0

```js
const user = await User.findOne({email: "john@doe.com"})

user.has("email") // true
user.has("phone") // false

user.has("avatars.700") // false
user.has("avatars.main") // true
```

:::

::: xTab 1

```js
const user = await User.findOne({email: "john@doe.com"})

user.has("firstName") // true
user.has("firstName", "Paul") // false
user.has("firstName", "John") // true

user.has("role", "user") // false
user.has("role", "admin") // true

// Passing a fubnction
user.has("role", () => "admin") // true
```

:::
::::

### hasChanges()

`this.hasChanges(): boolean` checks if the current document has unsaved changes

```javascript
const user = await User.findOne({email: "john@doe.com"})

user.hasChanges() // false

// Change Email
user.set("email", "john@doe1.com");

user.hasChanges() // true
```

### hasChanged()

`this.hasChanged(keys: string | string[]): boolean` checks if a field has unsaved changes.

```javascript
// Data from update form
const body = {
  email: "john@doe1.com",
  firstName: "John",
  lastName: "Doe"
}

// Fetch User
const user = await User.findOne({email: "john@doe.com"})

// Update data
user.set(body);

if (user.hasChanged("email")) {
  // validate new email
}

// Then save
await user.save()
```

### id()

`this.id()` returns the current _id of the document

### idEqualTo()

`this.idEqualTo(to: any, key: '_id')` is used to Compare model id with a string or ObjectId type field.

```javascript
/**
 * Data: {
 *     _id: 5f43e78c9da24b1444d7c998,
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     userId: 5e0ee7f56a5df504e669f876
 * }
 */

const john = await Users.findOne({firstName: 'John'});

console.log(john.idEqualTo('not-object-id-string'));
// false

console.log(john.idEqualTo('5f43e78c9da24b1444d7c998'));
// true

/**
 * When key is specified it compares the id provided
 * with the value of the key specified.
 */
console.log(john.idEqualTo('5f43e78c9da24b1444d7c998', 'userId'));
// false
console.log(john.idEqualTo('5e0ee7f56a5df504e669f876', 'userId'));
// True
```

### pushToArray()

`this.pushToArray(key: string, value: any, strict?: boolean = false)` is used to push an item to an array in the current
data held by the model.

```javascript
/**
 * Data: {
 *     _id: 5f43e78c9da24b1444d7c998,
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     userId: 5e0ee7f56a5df504e669f876,
 *     about: {
 *         brothers: ['Paul', 'Peter'],
 *         hobbies: ['Eat', 'Code', 'Sleep']
 *     }
 * }
 */
const user = await User.findById('5f43e78c9da24b1444d7c998');

// Push hobby 'BasketBall` to hobbies array
user.pushToArray('about.hobbies', 'Basketball')

await user.save();
```

**Note:** if the key requested for does not exist or is not an array, an error is throwed.

### save() - `async`

`this.save()` updates a document if model has **_id** in its data object. if **_id** is missing it creates the document
and saves the new **_id** to the model instance. Can be used when creating or when updating a document.

##### Creating

```javascript
const user = new User().set({
  firstName: 'Paul',
  lastName: 'Dean'
});

await user.save();
```

`user.save()` will create a new document because the model data has no _id

##### Updating

```javascript
const user = await User.findById('5f43e78c9da24b1444d7c998');

user.set('about.address', 'no 44 billboard avenue.')

await user.save();
```

`user.save()` will update the document using its _id

**Note** The `save()` method does not return a model instance or document. It returns the default `mongodb`
insert/update operation result.

### saveAndReturn() - async

This is similar to [save](#save) but returns the model instance.

```javascript
const user = await new User().set({name: 'John'}).saveAndReturn();
```

### set()

`this.set(key: string | {}, value: any)` is used to add or update fields and value to the model's data. This data does
not save to database until `save()` is called.

```javascript
const user = new User();

user.set('firstName', 'John')
user.set('lastName', 'Doe')

await user.save();
```

if the first argument is an object and `value===undefined` each key and value in the object will be set as fields and
value respectively.

The above code can also be written like this:

```javascript
const user = new User();

user.set({
  firstName: 'John',
  lastName: 'Doe'
})

await user.save();
```

### toCollection()

`this.toCollection()` returns an [object-collection](https://www.npmjs.com/package/object-collection) instance of models
data, giving you all the functions of the object-collection library.

Below are some examples.

```javascript
/**
 * Data: {
 *     _id: 5f43e78c9da24b1444d7c998,
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     userId: 5e0ee7f56a5df504e669f876,
 *     about: {
 *         brothers: ['Paul', 'Peter'],
 *         hobbies: ['Eat', 'Code', 'Sleep']
 *     }
 * }
 */
const user = await User.findById('5f43e78c9da24b1444d7c998');
const userCollection = user.toCollection();

userCollection.pick(['firstName', 'lastName']);
// => {firstName: 'John', lastName: 'Doe'}

// add `address` in about object
userCollection.path('about').set('address', 'No 10, some street avenue.')

// Read `address`
userCollection.get('about.address')
// => No 10, some street avenue.
```

### toJson()

`this.tojson(replacer?: any, spacing?: number)` simply returns the data of the model as json string. It
uses: `JSON.stringify()` in the background.

```javascript
const user = await User.findOne({firstName: 'John'});
console.log(user.toJson(null, 2));
```

### unset() - `async`

`this.unset(keys: string | string[], options?: UpdateOneOptions)` unsets key or keys passed from the database and model
data.

```javascript
/**
 * Data: {
 *     _id: 5f43e78c9da24b1444d7c998,
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     userId: 5e0ee7f56a5df504e669f876,
 *     about: {
          address: 'No 10, some street avenue.',
 *         brothers: ['Paul', 'Peter'],
 *         hobbies: ['Eat', 'Code', 'Sleep']
 *     }
 * }
 */
const user = await User.findById('5f43e78c9da24b1444d7c998');

await user.unset('userId');
await user.unset(['about.brothers', 'about.hobbies'])

console.log(user)

/**
 * User {
    data {
 *     _id: 5f43e78c9da24b1444d7c998,
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     about: {
 *       address: 'No 10, some street avenue.',
 *     }
 *   }
 * }
 */
```

### update() - `async`

`this.update(data?: {})` is a shortcut for **set** and **save**, it will throw an error if there is no _id in the
model's data.

```javascript
await user.update({
  firstName: "Lorem",
  lastName: "Ipsum"
})

// Same as
await user.set({
  firstName: "Lorem",
  lastName: "Ipsum"
}).save();
```

**Note:** Updates will not occur if there are no changes in data.

### updateRaw() - `async`

`this.updateRaw(updateQuery: {}, options?: UpdateOneOptions)` unlike `this.update()` allows you to perform other
operations other than {$set} operations.
<br/> The updateQuery has to be a mongo native query syntax.

Example: Let's increment orders of John Doe's profile

```javascript
/**
 *   Data {
 *       firstName: 'John',
 *       lastName: 'Doe',
 *       orders: 10,
 *   }
 */
const john = await user.findOne({firstName: 'John'});

await john.updateRaw({
  $inc: {orders: 1}
})
```

### $useSchema()

`this.$useSchema(schema: {})` is used to register the model's schema, with schemas you get a validation check and auto
generated fields.

**Note:** `$useSchema` must be in the constructor() but will be called for you if you have `static schema` set.

```javascript
// Import Xpress-Mongo Schema builder.
const {is} = require('xpress-mongo');

// Build Schema
const UserSchema = {
  firstName: is.String().required(),
  lastName: is.String().required(),
  orders: is.Number(0),
  updatedAt: is.Date().required(),
  createdAt: is.Date().required()
}

class Users extends connection.model('users') {
  constructor() {
    super()
    this.$useSchema(UserSchema);
  }
}

module.exports = Users;
```

### validate()

`this.validate()` is used internally to validate model's data against model schema whenever you call `this.update()`
, `this.save()` and `Model.new()`. Throws error if validation fails.

Eg: using the schema defined in [$useSchema](#$useSchema)

```javascript
const user = await User.findById('5f43e78c9da24b1444d7c998');

user.set('firstName', ['an array instead of string']);

console.log(user.validate())
// TypeError: (firstName) is not a String
```

<Pagination/>