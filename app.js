require('dotenv').config();
const env = process.env;
const StartXpresser = require('xpresser');


const config = {
    name: "Xpresser Docs",
    server: {
        domain: env.APP_DOMAIN,
        port: env.APP_PORT
    },
    paths: {
        // Base Folder (MUST).
        base: __dirname,
        // Controller Folder
        controllers: 'base://',
        // Public Folder
        public: '.vuepress/dist',
        // Routes File
        routesFile: 'routes.js'
    },
};

StartXpresser(config);
