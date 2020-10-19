const extendMarkdown = require("./markDownIt");

module.exports = {
    plugins: [
        // 'tabs',
        '@vuepress/register-components'
        // 'vuepress-plugin-element-tabs'
    ],

    markdown: {
        lineNumbers: true
    },

    extendMarkdown,

    title: 'XpresserJs',
    description: 'Express yourself more...',

    head: [
        [
            "link",
            {
                rel: "stylesheet",
                href: "/style.css"
            }
        ],
        //
        // [
        //     "link",
        //     {
        //         rel: "stylesheet",
        //         href: "https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap"
        //     }
        // ],
    ],

    themeConfig: {
        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Typescript',
                link: '/typescript'
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
                        link: '/xpress-mongo/'
                    }
                ]
            },

            {
                text: 'Plugins',
                items: [
                    {
                        text: '@xpresser/auth',
                        link: '/plugins/@xpresser/auth/'
                    },
                    {
                        text: '@xpresser/file-uploader',
                        link: '/plugins/@xpresser/file-uploader/'
                    }
                ]
            }
        ],
        sidebar: 'auto'
    },
};
