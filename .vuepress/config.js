module.exports = {
    plugins: ['tabs'],
    markdown: {
        lineNumbers: true
    },
    title: 'XpresserJs (Beta)',
    description: 'Express yourself more...',

    head: [
        [
            "link",
            {
                rel: "stylesheet",
                href: "/style.css"
            }
        ]
    ],

    themeConfig: {
        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'About',
                link: '/about'
            },
            {
                text: 'Start',
                items: [
                    {
                        text: 'Installation',
                        link: '/installation'
                    },
                    {
                        text: 'Hello World',
                        link: '/hello-world'
                    },
                    {
                        text: 'Xjs new',
                        link: '/getting-started'
                    },
                ]
            },
            {
                text: 'Core',
                items: [
                    {
                        text: 'Configuration',
                        link: '/configuration/'
                    },
                    {
                        text: '$ (The Dollar Sign)',
                        link: '/dollar-sign'
                    }
                ]
            },
            {
                text: 'Http',
                items: [
                    {
                        text: 'Routing',
                        link: '/router/'
                    },
                    {
                        text: 'Controllers',
                        link: '/controllers/'
                    },
                    {
                        text: 'Middlewares',
                        link: '/middlewares/'
                    }
                ]
            },
            {
                text: 'Packages',
                items: [
                    {
                        text: 'xjs-cli',
                        link: '/xjs-cli'
                    },
                    {
                        text: 'xpress-mongo',
                        items: [
                            {
                                text: 'Getting Started',
                                link: '/xpress-mongo/'
                            },

                            {
                                text: 'Model',
                                link: '/xpress-mongo/model'
                            }
                        ]
                    }
                ]
            }
        ],
        sidebar: 'auto'
    }
};
