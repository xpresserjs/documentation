# Xpress-Mongo Schema
Mongodb is a schemaless database, so you have the choice to use without schema.
The schema xpress-mongo provides does not force any type unless defined. it also serves a structure for your models, gives you insight on what your data should look like in the database.


### Basic Example
```javascript
const {is} = require('xpress-mongo');

// Build Schema
const OrderSchema = {
    itemID: is.ObjectId().required(),
    itemTitle: is.String(),
    qunatity: is.Number().required(),
    status: is.String('pending').required(),
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

When defining schemas we have DataTypes above out of the box.
<br/> You can also define custom DataTypes.

**Note:** all schema functions returns an instance of `XMongoDataType`

### is.ObjectId()
Set a field to type of mongodb `ObjectId` and has no default option.
```javascript
const schema = {userId: is.ObjectId()}
```
### is.Array()
`is.Array(def: () => any[])`
### is.Object()
### is.String()
### is.Boolean()
### is.Date()
### is.Number()
### is.Types()

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

<div style="margin-top: 50px; text-align: right">
<a href="/xpress-mongo/model.html"><b>Next &gt;&gt; Model</b></a>
</div>