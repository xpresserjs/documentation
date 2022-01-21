const env = require('@xpresser/env')(__dirname);
const {init} = require('xpresser');
const isDev = env.NODE_ENV !== 'production';

const config = {
    name: 'Xpresser Docs',
    env: env.NODE_ENV || 'development',

    debug: {
      requests: {
          colored: true,
          showAll: true,
          ignore: [
              "/assets/",
              // exclude .js and .css files
              /\.(js|css|svg)$/
          ],
      }
    },

    server: {
        domain: env.APP_DOMAIN,
        port: env.APP_PORT,
        root: '/',
        includePortInUrl: isDev,
        ssl: {
            enabled: env.SSL,
            port: env.SSL_PORT || 443,
            files: {
                cert: env.SSL_CERT,
                key: env.SSL_KEY
            }
        }
    },

    paths: {
        // Base Folder (MUST).
        base: __dirname,
        // Public Folder
        public: '.vuepress/dist',
    },
};

const $ = init(config);

// Run IfNotConsole
$.on.boot((next) => {

    const route = $.router;

    route.all('/*', (x) => {
        return x.res.sendFile($.path.base('.vuepress/dist/index.html'));
    });

    return next();
});

// Boot Xpresser
$.boot();
