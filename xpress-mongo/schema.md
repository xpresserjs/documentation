# xpress-mongo Schema
Mongodb is a schemaless database, so you have the choice to use without schema.
The schema xpress-mongo provides does not force any type unless defined. it also serves a structure for your models, gives you insight on what your data should look like in the database.


### Basic Example
```javascript
const {is} = require('xpress-mongo');

class Orders extends connection.model('orders') {
    // Set Model Schema
    static schema = {
        itemId: is.ObjectId().required(),
        itemTitle: is.String(),
        qunatity: is.Number().required(),
        status: is.String('pending').required(),
        paypalPaymentId: is.String(),
        updatedAt: is.Date().required(),
        createdAt: is.Date().required()
    }
}

module.exports = Orders;
```

## is - SchemaBuilder
xpress-mongo comes with predefined schema builders, they are stored in an exported variable named **`is`**
```javascript
const {is} = require('xpress-mongo');
```
The `is` variable is of type `XMongoSchemaBuilder`
```typescript
type XMongoSchemaBuilder = {
    ObjectId(): XMongoDataType
    Uuid(version: number, options?: UuidOptions): XMongoDataType
    Array(def?: () => Array<any>): XMongoDataType
    Object(def?: () => StringToAnyObject): XMongoDataType
    String(def?: string): XMongoDataType
    Boolean(def?: boolean): XMongoDataType
    Date(def?: () => Date): XMongoDataType
    Number(def?: 0): XMongoDataType
    Types(types: XMongoDataType[]): XMongoDataType
}
```

When defining schemas we have the above DataTypes out of the box.
<br/> You can also define custom DataTypes.

**Note:** all schema functions returns an instance of `XMongoDataType`

### is.ObjectId()
Set a field to type of mongodb `ObjectId` and has no default value.
```javascript
const PostSchema = {
    userId: is.ObjectId().required()
}
```

### is.Uuid()
Set a field to type of ["Uuid String"](https://en.wikipedia.org/wiki/Universally_unique_identifier) specifying the version of uuid as first argument.

```javascript
class Transaction extends model('transactions'){
    
    // Set Model Schema
    static schema = {
        id: is.Uuid(4).required(),
        amount: is.Number().required()
    }
}

console.log(Transaction.make({amount: 200}));

/**
* Transaction {
*   data: {
*     id: 'efae452f-bd6f-4349-8cbf-7a755ef88702',
*     amount: 200
*   }
* }
*/
```
 
### is.Array()
Set a field to type of `Array`. Has default value of `() => []`.
```javascript
const UserSchema =  {
    hobbies: is.Array(),
    // with default value
    languages: is.Array(() => ["en"])
}
```
**Note:** when declaring a default value for `is.Array` and `is.Object` you must use a function. 
This is to prevent any mutation on default values.

### is.Object()
Set a field to type of `Object`. Has default value of `() => {}`.
```javascript
const UserSchema = {
    phones: is.Object(),
    // with default value
    address: is.Object(() => ({
        city: null,
        state: null,
        country: null
    })),
}
```
**Note:** when declaring a default value for `is.Array` and `is.Object` you must use a function. 
This is to prevent any mutation on default values.

### is.String()
Set a field to type of `String`. Has no default value.
```javascript
const UserSchema = {
    email: is.String(),
    // with default value
    status: is.String('pending')
}
```

### is.Boolean()
Set a field to type of `Boolean`. Has default value of `false`.

```javascript
const UserSchema = {
    isAdmin: is.Boolean(),
    // with default value
    sendNewsletters: is.Boolean(true)
}
```

### is.Date()
Set a field to type  of `Date`. Has default value of the current date: `new Date()
```javascript
const PostSchema = {
    createdAt: is.Date(),
    // with default value
    publishedAt: is.Date('Fri, 03 Apr 2020 00:00:00 GMT')
}
```

### is.Number()
Set a field to type of `Number`. Has default value of `0`.
```javascript
const VideoSchema = {
    views: is.Number(),
    // with default value
    minimumAge: is.Number(16),
}
```

### is.Types()
Set a field to multiple `Types`. Inherits default value of the first type if any.

```javascript
const CommentSchema = {
    // String or ObjectId (Default: 'admin')
    author: is.Types([
        is.String('admin'),
        is.ObjectId()
    ]),
    
    // Number or ObjectId (Default: 1)
    published: is.Types([
        is.Boolean(true),
        is.Number()
    ]).default(1)
}
```
The properties of the first type in the array will be inherited by `is.Types()`.
The default string defined on **line 4** `admin` will be inherited.

Default variables can also be defined using `.default(value)`

## Type Instance Methods
Methods available on `XMongoDataType` instance are:

### cast()
##### Args: `(cast: Function)`
Sets/Overrides the cast function of the schema. The cast function receives two arguments when it's been called. 
Whatever is returned by the cast function is sent to the database.

##### **`value` -** Value of the current field. **`key` -** Key of the current field.

```javascript
const stringToDate = (value, key) => {
    return new Date(value);
}

new XMongoDataType('ValidDateString', true).cast(stringToDate)
```

### default()
##### Args: `($default: any | function)`
Set/Override the default value of a schema. When default values are defined, xpress-mongo uses them and **won't throw any error** when a field is **required** but **undefined**.

**Note:** if a `function` is passed as a default value, it will be executed, and the return value will be used.
```javascript
is.String('pending');
// is same with
is.String().default('pending');
// is same with
is.String().default(() => 'pending');
```
usage depends on your preference, for readability you can decide to use `.default()`
Can also be used to override any previous default values
```javascript
// Default value overwriten to '404'
is.Number(200).default(404);
```

### isOptional()
Sets required to `false`. When a field **isOptional** xpress-mongo does not throw any error when it's `undefined` but will validate when a value is **defined**.
```javascript
is.String().isOptional()
// is same with
is.String().required(false);
```

### isUndefined()
Sets default value to `undefined`. if value of field is **undefined** and **required** xpress-mongo will throw an **error**.

```javascript
is.Number() // default value = 0

is.Number().isUndefined() // default value = undefined

is.Number().default(undefined) // default value = undefined
```

### required()
##### Args: `(value?: boolean)`
The required method sets if a particular field required or not.
```javascript
is.String().required()
// set to false
is.String().required(false)
```
**Note:** if schema has a default value, the schema validator will use the default value instead of throwing an error.

### validator()
Sets/Overrides the validator function/functions of the schema. 

#### Single Validator Function
The validation function receives the current value of the field being validated and can return either: `true|false`
```javascript
new XMongoDataType('adultOnly').validator(age => age > 18);
```

#### Multiple Validators (and|or)
xpress-mongo also provides a method for you to validate against multiple functions using the `and` or `or` object rules

**`and`** - All functions must return true  
**`or`** - Any of the functions must return true

Only one of the keys can be defined. if both is defined `or` will be used.
```javascript
new XMongoDataType('name').validator({
    or: [function1, function2]
});

new XMongoDataType('name').validator({
    and: [function1, function2]
});
```

### validatorError()
##### Args: `(errorFn: Function)`
Set/Override schema validation error. The function received given passed the current name of the field being validated as first argument.
 
```javascript
new XMongoDataType('name').validatorError(() => "Error Message")
// or with key
new XMongoDataType('name').validatorError(key => `${Key} is not valid!`)
```

## Custom Schema Type
Custom schema types can be created by making a function that returns new instance of  `XMongoDataType` class and providing the following:
- Name of schema.
- Validator function.
- Validator error message.
- Cast function _(optional)_.
- Default value _(optional)_.

The default types above were all created same way and bundled with the package.
```javascript
function customSchema(defaultValue) {
    return new XMongoDataType('SchemaName', defaultValue)
        .validator(currentFieldValue => {
            // do something with currentFieldValue
            return true | false;
        })
        .validatorError(currentField => `${currentField} is not what we want!`)
}

const modelSchema = {
    field: customSchema('A default value.').required()
}
```

### Examples
Below are examples of how `is.String()` && `is.Array()` was created.
```javascript
const is = {
    String(def = undefined) {
        return new XMongoDataType('String', def)
            .validator(str => typeof str === "string")
            .validatorError((key) => `(${key}) is not a String`);
    },

    Array(def = () => []){
        return new XMongoDataType('Array', def)
            .validator(array => Array.isArray(array))
            .validatorError((key) => `(${key}) is not an Array`);
    }
}
```

The method of using a function that returns a new `XMongoDataType` is only a concept to provide re-usability. 
There may be cases where you don't need to reuse i.e The Schema only applies to on Model's field, you can create them like below: 

**`isAnAdult`** - checks if the age passed is old enough <br/> **`isSixNumbers`** - checks if the ticket number is a valid ticket number.
```javascript
const isAnAdult = new XMongoDataType('isAnAdult')
    .validator(age => age >= 18)
    .validatorError(() => `Too young to see this movie.`)

const isValidTicket = new XMongoDataType('isValidTicket')
    .validator(str => str && !isNaN(str) && str.length === 6)
    // with key - Name of current field being validated
    .validatorError((key) => `${key} is not a six digits number.`)

const AdultMovieTicketSchema = {
    name: is.String().required(),
    age: isAnAdult.required(),
    ticketNumber: isValidTicket.required()
}
```

<Pagination/>
