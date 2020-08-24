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

    // Find first user in users connection
    let user = await User.findOne({});

    // If user is found
    if (user) {
        // Log user data and full name
        console.log(user);
        return console.log(`FirstName: ${user.fullName()}`)
    }

    console.log('No user found, creating one....');

    // Create new user
    user = await User.new({
        firstName: 'John',
        lastName: 'Doe'
    })

    // Log user data and full name
    console.log(user);
    return console.log(`FirstName: ${user.fullName()}`)

}

run().catch(error => console.log(error))