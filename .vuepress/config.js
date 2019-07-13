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
        nav: [{
                text: 'Home',
                link: '/'
            },
            {
                text: 'Getting Started',
                link: '/install/'
            },
            {
                text: 'Router',
                link: '/router/'
            }
        ],
        sidebar: 'auto'
    }
};
