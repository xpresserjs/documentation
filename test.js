class UserService {
  static getUsersWithOutPassword(query){
    return User.find(query, {projection: {password: 0}})
  }
  
  static getLoggedUsers(){
    return User.find({
      lastSeenAt: {$lt: new Date()}
    })
  }
}


UserService.getLoggedUsers();
UserService.getUsersWithOutPassword()