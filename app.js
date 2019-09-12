const env = require('xpresser/env')(__dirname);
const StartXpresser = require('xpresser');
const isDev = env.NODE_ENV !== 'production';

const config = {
    name: 'Xpresser Docs',
    env: env.NODE_ENV,


    server: {
        startOnBoot: false,
        domain: env.APP_DOMAIN,
        port: env.APP_PORT,
        root: '/',
        includePortInUrl: isDev,
        ssl: {
            enabled: env.SSL === 'true',
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

StartXpresser(config, {autoBoot: false});

// Run IfNotConsole
$.ifNotConsole(() => {
    $.router.all('/*', (x) => {
        return x.res.sendFile($.path.base('.vuepress/dist/index.html'));
    });
});

// Boot Xpresser
$.boot();
