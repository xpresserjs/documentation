const {Client} = require('xpress-mongo');

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

    // Your Model extends a class for your collection
    class User extends connection.model('users') {

        /**
         * Returns the full name of the user.
         * @return {string}
         */
        fullName() {
            return this.data.firstName + ' ' + this.data.lastName
        }
    }

    const user = await User.findById('5f43e78c9da24b1444d7c998');

    user.set('lastName', 'Joe')

    console.log(user.changes());
}

run().catch(error => console.log(error))