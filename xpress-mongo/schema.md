# Xpress-Mongo Schema
Mongodb is a schemaless database, so you have the choice to use without schema.
The schema xpress-mongo provides does not force any type unless defined. it also serves a structure for your models, gives you insight on what your data should look like in the database.


### Basic Example
```javascript
const {is} = require('xpress-mongo');

// Build Schema
const OrderSchema = {
    itemId: is.ObjectId().required(),
    itemTitle: is.String(),
    qunatity: is.Number().required(),
    status: is.String('pending').required(),
    paypalPaymentId: is.String(),
    updatedAt: is.Date().required(),
    createdAt: is.Date().required()
}

class Orders extends connection.model('orders') {
    constructor(){
        super()
        this.useSchema(OrderSchema);
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
    ObjectId: () => XMongoDataType,
    Array: { (def?: () => Array<any>): XMongoDataType },
    Object: { (def?: () => StringToAnyObject): XMongoDataType },
    String: { (def?: string): XMongoDataType },
    Boolean: { (def?: boolean): XMongoDataType },
    Date: { (def?: () => Date): XMongoDataType },
    Number: { (def?: 0): XMongoDataType },
    Types: { (types: XMongoDataType[]): XMongoDataType },
};
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

<div style="margin-top: 50px; text-align: right">
<a href="/xpress-mongo/model.html"><b>Next &gt;&gt; Model</b></a>
</div>