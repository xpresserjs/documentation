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

    const users = await User.paginate(1, 20, {
        age: {$gte: 18}
    }, {
        sort: {firstName: 1}
    });

    console.log(users)
}

run().catch(error => console.log(error))