const sidebar = require('./sidebarConf.js');

module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'zhaoq',
            description: 'Vue 驱动的静态网站生成工具'
        }
    },
    themeConfig: {
        activeHeaderLinks: true,
        lastUpdated: '上次更新',
        repo: 'chingchao',
        sidebar,
        // sidebar: [
        //     {
        //         "title": "Javascript",
        //         "collapsable": false,
        //         "sidebarDepth": 1,
        //         "children": [
        //             "/js/",
        //             "/js/angularJs",
        //             "/js/array_method",
        //             "/js/array_reduce",
        //         ],
        //     }
        // ],
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'JavaScript',
                link: '/js/'
            },
            {
                text: 'CSS',
                link: '/css/'
            },
            {
                text: 'Flutter',
                link: '/flutter/'
            },
            {
                text: 'Git',
                link: '/git/'
            },
            {
                text: 'HTML',
                link: '/html/'
            },
            {
                text: 'Node',
                link: '/node/'
            },
            {
                text: 'SVG',
                link: '/svg/'
            },
            {
                text: '工具',
                link: '/tools/'
            },
            {
                text: 'Vue',
                link: '/vue/'
            },
        ]
    }
}