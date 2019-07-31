module.exports = {
    title: 'XpresserJs',
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
                text: 'Getting Started',
                link: '/getting-started'
            },
            {
                text: 'Core',
                items: [
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
