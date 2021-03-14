# Events & Getters

**xpress-mongo** emits events on **Create, Update & Delete** queries ran by model instance functions.

## Model

The code below shows a Model that has an `update` event registered to it. <br/>
Examples made on this page will make reference ro this model.

```javascript
const {is} = require('xpress-mongo');
const connection = require('path/to/your/connection');

class User extends connection.model('users') {
  
  static schema = {
    name: is.String().required(),
    avatar: is.String().required(),
    updatedAt: is.Date(),
    createdAt: is.Date().required()
  }
}

// Add on `update` event
User.on('update', (user) => {
  // set `updatedAt` to current date.
  user.set('updatedAt', new Date());
});
```

**Note:**  The instance of the current model will be passed to your event function on execution.

## Events

- [create](#create)
- [update](#update)
- [delete](#delete)
- [watch](#watch)

### create

This event runs **before** every new document is created.

```javascript
User.on('create', TodoFunction);

const user = {name: 'John Doe'};

await User.new(user); // TodoFunction is called
// OR
await new User().set(user).save(); // TodoFunction is called
```

The create event also supports targeting fields using the **dot** operator. <br/>
if value returned `!== undefined`, xpress-mongo will set the value of the targeted field to the value returned

```javascript
/**
 * on every new document `avatar` will be set to '/images/default.png' if undefined.
 * because a defined value is returned.
 */
User.on('create.avatar', (user) => {
  return user.get('avatar', '/images/default.png');
})

// The above is same thing as
User.on('create.avatar', (user) => {
  if (!user.data.avatar) return '/images/default.png';
})
```

### update

This event runs **before** a document is updated.

```javascript
User.on('update', onUpdateFunction);

const user = await User.findById(ObjectId) // Returns instance.

await user.update({name: 'Paul Dean'}); // onUpdateFunction is called
// OR
await user.set({name: 'Paul Dean'}).save(); // onUpdateFunction is called
```

The update event also supports targeting fields using the **dot** operator. <br/>
if a **!undefined** value is returned, xpress-mongo will set the value of the targeted field to the value returned

```javascript
/**
 * on every update and model has changes `updatedAt` date will be refreshed.
 * because a defined value is returned.
 */
User.on('update.updatedAt', (user) => {
  return user.hasChanges() ? new Date() : undefined
});
```

Notice the use of `.hasChanges()`, this is because all update event functions are called even when you have not made any
real changes.

### delete

This event **runs in background after** a document is deleted. <br/>
**Note:** The delete event **does not** support using **dot** operator on fields.

```javascript
// This event deletes user avatar every time a user is deleted.
User.on('delete', (user) => {
  try {
    fs.unlinkSync(user.data.avatar);
  } catch (e) {
    console.log(e)
  }
});

const user = await User.findById(ObjectId) // Returns instance.

await user.delete(); // event is called after delete
```

### watch

The watch event is a special event that occurs  **after** a real change has been made to a field. Just Like the **
delete** event, it runs in the background.

**Note:** The watch event only supports the **dot** target for field names.

```javascript
/** This event crops user avatar in the backround
 * every time the value of avatar is changed in any document. */
User.on('watch.avatar', user => {
  cropNewAvatar(user.data.avatar).catch(console.log);
});

await user.update({avatar: 'new avatar name'}); // function is called
// OR
await user.set({avatar: 'new avatar name'}).save(); // function is called
```

## Getters

Since fields can be modified using `update.fieldName` events before saving to the database we can call them setters. but
what about getters? This is where `static append = []` model property comes in.

### append

For Example

```js
const {is} = require("xpress-mongo");
const moment = require("moment");

class User extends XMongoModel {
  
  // Set Functions to be appended.
  static append = ["joinedTimeAgo"];
  
  // Schema
  static schema = {
    username: is.String().required(),
    joined: is.Date().required(),
  }
  
  // Convert joined field to TimeAgo String
  joinedTimeAgo() {
    return moment(this.data.joined).fromNow();
  }
}
```

The class above has the method `joinedTimeAgo` in it's `append` array. <br/>
This will automatically add the result of `joinedTimeAgo` to your **Model instance** results.

Using the above Model class

```js
const user = await User.findOne({/* Query */});
// Or
const user = await User.findById(/* ID */);

/*{
  _id: MongoID
  username: 'testuser'
  joined: '2020-01-01T00:00:00.000Z'
  joinedTimeAgo: '1 year ago'
}*/
```

Note: The appended data will only be available on a model instance document.

### Multiple Results

When handling multiple results you won't get the `append` function unless you convert the array of results to model
instances.

For Example
:::: xTabs Data | Single | Multiple | Multiple Instance
::: xTab 0

```json
[
  {
    "_id": "MongoID",
    "username": "testuser",
    "joined": "2018-01-01T00:00:00.000Z"
  },
  {
    "_id": "MongoID",
    "username": "testuser2",
    "joined": "2019-01-01T00:00:00.000Z"
  },
  {
    "_id": "MongoID",
    "username": "testuser3",
    "joined": "2020-01-01T00:00:00.000Z"
  }
]
```

:::
::: xTab 1
**Query:** Get one user.

```js
// 2. 
const user = await User.findOne({
  username: 'testuser2'
}); // returns Model Instance

console.log(user.data)
```

**Result:**

```
User {
  data: {
    _id: MongoID,
    username: "testuser2",
    joined: "2019-01-01T00:00:00.000Z",
    joinedTimeAgo: "2 years ago"
  }
}
```

:::

::: xTab 2
**Query:** Get all users.

```js
let users = await User.find(); // returns Raw Data
console.log(users)
```

**Result:** No appended Data

```json
[
  {
    "_id": "MongoID",
    "username": "testuser",
    "joined": "2018-01-01T00:00:00.000Z"
  },
  {
    "_id": "MongoID",
    "username": "testuser2",
    "joined": "2019-01-01T00:00:00.000Z"
  },
  {
    "_id": "MongoID",
    "username": "testuser3",
    "joined": "2020-01-01T00:00:00.000Z"
  }
]
```

:::

::: xTab 3
**Query:** Get all users as model instances.

```js
let users = await User.find(); // returns Raw Data
users = User.fromArray(users); // Converts all to model instances.

console.log(users)
```

**Result:** Has appended data.

```
[
  User {
    data: {
      _id: MongoID,
      username: "testuser",
      joined: "2018-01-01T00:00:00.000Z",
      joinedTimeAgo: "3 years ago"
    }
  },
  User {
    data: {
      _id: MongoID,
      username: "testuser2",
      joined: "2019-01-01T00:00:00.000Z",
      joinedTimeAgo: "2 years ago"
    }
  },
  User {
    data: {
      _id: MongoID,
      username: "testuser3",
      joined: "2020-01-01T00:00:00.000Z",
      joinedTimeAgo: "1 year ago"
    }
  }
]
```

:::
::::
<Pagination/>
