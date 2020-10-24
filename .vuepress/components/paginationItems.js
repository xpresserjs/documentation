export default {
    '/about': [
        {type: 'next', name: 'Installation', url: '/installation.html'}
    ],
    '/xpress-mongo/': [
        {type: 'next', name: 'Installation', url: '/xpress-mongo/installation.html'}
    ],
    '/xpress-mongo/installation': [
        {name: 'Menu', url: '/xpress-mongo/'},
        {name: 'Model', url: '/xpress-mongo/model.html'}
    ],
    '/xpress-mongo/events': [
        {type: 'prev', name: 'Schema', url: '/xpress-mongo/schema.html'}
    ],
    '/xpress-mongo/schema': [
        {name: 'Model', url: '/xpress-mongo/model.html'},
        {name: 'Events', url: '/xpress-mongo/events.html'}
    ],
    '/xpress-mongo/model': [
        {name: 'Installation', url: '/xpress-mongo'},
        {name: 'Schema', url: '/xpress-mongo/schema.html'}
    ],
    '/typescript/initialize-typescript': [
        {type: 'next', name: 'Hello World', url: '/hello-world.html'}
    ],
    '/getting-started': [
        {type: 'next', name: 'Routing', url: '/router/'}
    ]
}