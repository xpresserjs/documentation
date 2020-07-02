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
                        text: 'Create App',
                        link: '/getting-started'
                    },
                    {
                        text: 'Hello World',
                        link: '/hello-world'
                    }
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
                text: 'Xjs-Cli',
                link: '/xjs-cli'
            }
        ],
        sidebar: 'auto'
    }
};
