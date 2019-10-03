/**
* AppController
* @class
* @extends $.controller
*/
class AppController extends $.controller {

    /**
    * middleware - Set Middleware
    * @returns {Object}
    */
    static middleware(){
        return {}
    }

    note(x) {
        return x.toApi({msg: 'yes'});
    }

}


module.exports = AppController;
