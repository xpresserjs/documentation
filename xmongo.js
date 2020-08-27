const {Client, is} = require('xpress-mongo');

async function run() {
    // Initialise connection
    const connection = Client('mongodb://127.0.0.1:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


    try {
        // Try Connecting
        await connection.connect();
        // Set Database name
        connection.useDb('xmongo');

        console.log('Connected to mongodb')
    } catch (e) {
        throw e;
    }

// Build Schema
    const UserSchema = {
        firstName: is.String().required(),
        lastName: is.String().required(),
        orders: is.Number(0),
        updatedAt: is.Date().isOptional(),
        createdAt: is.Date().isOptional()
    }

    // Your Model extends a class for your collection
    class User extends connection.model('users') {

        constructor(){
            super();
            this.useSchema(UserSchema);
        }

        /**
         * Returns the full name of the user.
         * @return {string}
         */
        fullName() {
            return this.data.firstName + ' ' + this.data.lastName
        }
    }

    const user = await User.findById('5f43e78c9da24b1444d7c998');

    user.set('firstName', 'an array instead of string');

    console.log(user.validate())

    // TypeError: (firstName) is not a String
}

run().catch(error => console.log(error))