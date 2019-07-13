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


    index(x){
        return x.res.sendFile($.path.base('.vuepress/dist/index.html'));
    }

}


module.exports = AppController;
