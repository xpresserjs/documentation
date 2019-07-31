// Require Xpresser
const xpresser = require('xpresser');

// Boot Xpresser With Your Config
const $ = xpresser({
    name: 'My Xpresser App',
    paths: {base: __dirname},
    server: {
        port: 2000,
        startOnBoot: false,
    }
});

// Add Route
$.router.get('/', (x) => {
    return x.res.send('<h1>Hello World</h1>');
});

$.router.get('/about', (x) => {
    return x.res.send('<h1>About Page</h1>');
});

// Start Server
$.startHttpServer();
