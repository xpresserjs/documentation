const [user, account] = await Promise.all([
    User.find(),
    Account.find()
])