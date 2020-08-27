# Xpress-Mongo Schema
Mongodb is a schemaless database, so you have the choice to use without schema.
The schema xpress-mongo provides does not force any type unless defined. it also serves a structure for your models, gives you insight on what your data should look like in the database.

## Defining a Schema
xpress-mongo comes with predefined schema builders and they are store in an exported variable named **`is`**
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

When defining schemas we have DataTypes above out of the box.
<br/> You can also define custom DataTypes.

### Default Value
Each schema's function expects an optional argument that defines the default value for that schema.
e.g
```javascript
const schema = {
    status: is.String('none').required(),
    age: is.Number(18).isOptional(),
    // if date is required a default value will be set to the current date.
    last_seen: is.Date().required()
}
```


### Usage
```javascript
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
    constructor(){
        super()
        this.useSchema(UserSchema);
    }
}

module.exports = Users;
```