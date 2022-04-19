const extendMarkdown = require('./markDownIt');

module.exports = {
  
  globalUIComponents: [
    'ToggleTheme',
  ],
  
  plugins: [
    ['fulltext-search'],
    '@vuepress/register-components',
    [
      'vuepress-plugin-code-copy',
      {staticIcon: true},
    ],
  ],
  
  markdown: {
    lineNumbers: false,
  },
  
  extendMarkdown,
  
  title: 'XpresserJs',
  description: 'Express yourself more...',
  
  head: [
    [
      'script',
      {src: '/style.js'},
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: '/style.css',
      },
    ],
    
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@480&family=PT+Sans&family=Roboto+Condensed&display=swap',
      },
    ],
    
    // [
    //     "link",
    //     {
    //         rel: "stylesheet",
    //         href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap"
    //     }
    // ],
  
  ],
  
  themeConfig: {
    nav: [
      {
        text: 'Typescript',
        link: '/typescript',
      },
      {
        text: 'Start',
        items: [
          {
            text: 'Installation',
            link: '/installation',
          },
          {
            text: 'Hello World',
            link: '/hello-world',
          },
          {
            text: 'Xjs new',
            link: '/getting-started',
          },
        ],
      },
      {
        text: 'Core',
        items: [
          {
            text: 'Configuration',
            link: '/configuration/',
          },
          {
            text: 'Events',
            link: '/events/'
          },
          {
            text: 'Repl',
            link: '/cli/repl.md',
          },
          {
            text: 'Xpresser Instance ($)',
            link: '/dollar-sign',
          },
        ],
      },
      {
        text: 'Http',
        items: [
          {
            text: 'Routing',
            link: '/router/',
          },
          {
            text: 'Controllers',
            link: '/controllers/',
          },
          {
            text: 'Request Engine (http)',
            link: '/http/request-engine.md',
          },
          {
            text: 'Middlewares',
            link: '/middlewares/',
          },
          {
            text: 'Sessions',
            link: '/http/sessions.md',
          },
        ],
      },
      {
        text: 'Packages',
        items: [
          {
            text: 'xjs-cli',
            link: '/xjs-cli',
          },
          {
            text: 'xpress-mongo',
            link: '/xpress-mongo/',
          },
        ],
      },
      
      {
        text: 'Plugins',
        items: [
          {
            text: 'Xpresser Plugins',
            link: '/plugins/',
          },
          {
            text: '@xpresser/auth',
            link: '/plugins/@xpresser/auth/',
          },
          {
            text: '@xpresser/file-uploader',
            link: '/plugins/@xpresser/file-uploader/',
          },
          {
            text: '@xpresser/ngrok',
            link: '/plugins/@xpresser/ngrok.md',
          },
          {
            text: '@xpresser/params-loader',
            link: '/plugins/@xpresser/params-loader.md',
          },
          {
            text: '@xpresser/meilisearch',
            link: '/plugins/@xpresser/meilisearch.md',
          }
        ],
      },
      
      {
        text: 'Change logs',
        items: [
          {
            text: "Xpresser",
            link: '/change-logs/2021.md'
          },
          {
            text: "Xpress-Mongo",
            link: '/change-logs/2021-xm.md'
          }
        ]
      }
    ],
    sidebar: 'auto',
  },
};
