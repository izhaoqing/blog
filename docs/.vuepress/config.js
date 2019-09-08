// const sidebar = require('./sidebarConf.js');

module.exports = {
    title: 'zhaoq',
    discription: 'a blog site demo',
    themeConfig: {
        // displayAllHeaders: true,
        activeHeaderLinks: true,
        lastUpdated: 'last updated',
        sidebar: {
            '/js/': [
                '',
                'es6',
                'angularJs'
            ],
            '/': [
                '',
                '/about/'
            ],
        },
        nav: [
            { text: '首页', link: '/' },
            { 
                text: '文档',
                items: [
                    {
                        text: 'js',
                        link: '/js/angularJs'
                    }
                ]
            },
            { text: 'Github', link: 'https://google.com' },
        ]
    }
}