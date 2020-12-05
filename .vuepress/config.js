const extendMarkdown = require('./markDownIt');

module.exports = {
  
  globalUIComponents: [
    'ToggleTheme',
  ],
  
  plugins: [
    '@vuepress/register-components',
    [
      'vuepress-plugin-code-copy',
      {staticIcon: true},
    ],
  ],
  
  markdown: {
    lineNumbers: true,
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
        text: 'Home',
        link: '/',
      },
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
            text: 'Xpresser Instance ($)',
            link: '/dollar-sign',
          },
          {
            text: 'Repl',
            link: '/cli/repl.md',
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
            text: 'Middlewares',
            link: '/middlewares/',
          },
          {
            text: 'Session',
            link: '/http/session.md',
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
        ],
      },
    ],
    sidebar: 'auto',
  },
};
