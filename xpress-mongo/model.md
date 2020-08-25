# XMongoModel
**xpress-mongo's** parent model class is [`XMongoModel`](https://github.com/xpresserjs/xpress-mongo/blob/master/src/XMongoModel.ts)
<br/>

## Creating a Model
To create a model all you need todo is extend the model returned by calling `connection.model(collection)`
```javascript
class User extends connection.model('users') {
    // Model methods here
    fullName(){
        return this.data.firstName + ' ' + this.data.lastName;
    }
}

const user = new User();

user.set('firstName', 'John');
user.set('lastName', 'Doe');

console.log(user.fullName())
// => "John Doe"

user.save().catch(e => throw e)
```

## Static Methods
### thisCollection()
`XMongoModel.thisCollection()` returns mongodb native collection instance for you to run any mongodb native queries.


Adding a document using mongodb native
```javascript
await Users.thisCollection().insertOne({
    email: 'john@doe.com', 
    firstName: 'John',
    lastName: 'Doe'
});
```

### new()
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
The above also has a function that makes it easier to understand.
See `XMongoModel.make()` below.

### make()
`XMongoModel.make(data: {})` creates a model instance with the data provided. this instance does not have any link to the database unless the `save` method is called.
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
`XMongoModel.use(data: {})` creates and returns a model instance using the data provided. Mostly used to convert an object to model instance.

Let's assume you have a raw data returned from the native client `findOne` query, it can be converted to a model instance using `use()` 
```javascript
const rawData = await Users.thisCollection().findOne({});
const user = Users.use(rawData);

// Updates same document
await user.update({
    age: 20
})
```

### fromArray()
`XMongoModel.fromArray(list: any[])` is used to convert arrays of raw data to an array of instance models.
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

### find()
`XMongoModel.find(query: {}, options?: {}, raw?: false)`
This method is used to find documents in a collection, this does not return results as model instances
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
**`raw?`** is set to false by default but when set to true, the native `find` query builder is returned instead of query results.
```javascript
const users = await Users.find({
    age: {$gte: 18}
}, true).limit(1).skip(10).toArray();
```

### findOne()
`XMongoModel.findOne(query: {}, options?: {}, raw?: false)` same as `find()` but returns only one document as model instance.
```javascript
const john = await Users.findOne({firstName: 'John'});
```

### findById()
`XMongoModel.findById(_id: any, options?: {})` is used to find one document using the `_id`
```javascript
const user = await Users.findById('5f43e78c9da24b1444d7c998')
```

### count()
`XMongoModel.count(query?: {})` is used to count documents that matches the query passed.
if no query is passed, it counts all elements.
```javascript
const numberOfUsers = await Users.count();
const numberOfAdults = await Users.count({
    age: {$gte: 18}
})
```

### countAggregate()
`XmongoModel.countAggregate(query: [], options?: {})` is same as `count()` but used to count results from an aggregate query.


### paginate()
`XmongoModel.paginate(page: number, perPage: number, query: {}, options?: {})` is used to paginate results 
```javascript
// Assuming this is a controller action
async function getAllUsers(http){

    const page = http.query('page', 1);
    const perPage = 30;

    // Pagination of all users with age >= 18, sort by firstName
    const users = await Users.paginate(page, perPage, {
        age: {$gte: 18}
    }, {
        sort: {firstName: 1}
    });

    // Return response
    return http.json({users});

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

### paginateAggregate()
`XmongoModel.paginateAggregate(page: number, perPage: number, query: {}, options?: {})` is same with `XMongoModel.paginate` but works with aggregation query.


## Instance Methods
### changes()
`this.changes()` shows the difference between original model data and current data.
so if you make any changes it is returned when calling this method
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

### delete()
`this.delete()` is used to delete the current document from the collection.
```javascript
const john = await Users.findOne({firstName: 'John'});

if (john) await john.delete();
```

### get()
`this.get(key: string)` is used to get fields value from the current document.
```javascript
const john = await Users.findOne({firstName: 'John'});

const firstName = john.get('firstName');
const lastName = john.get('lastName');
```


### id()
`this.id()` returns the current _id of the document

### idEqualTo()
`this.idEqualTo(to: any, key: '_id')` is used to Compare model id with a string or ObjectId type variable.
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
`this.pushToArray(key: string, value: any, strict?: boolean = false)` is used to push an item to an array in the current data held by the model.
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

### save()
`this.save()` updates a document if model has **_id** in its data object. if **_id** is missing it creates the document and saves the new **_id** to the model instance.
Can be used when creating or when updating a document.

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

user.set('about.address','no 44 billboard avenue.')

await user.save();
```
`user.save()` will update the document using its _id

### set()
