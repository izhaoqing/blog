const sidebar = require('./sidebarConf.js');

module.exports = {
    head: [
        ['meta', { name: 'referrer', content: 'no-referrer' }],
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    plugins: ['@vuepress/back-to-top'],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Code Space',
            description: 'Vue 驱动的静态网站生成工具'
        }
    },
    themeConfig: {
        activeHeaderLinks: true,
        lastUpdated: '上次更新',
        repo: 'chingchao',
        sidebar, 
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'JavaScript',
                link: '/js/'
            },
            {
                text: 'Vue',
                link: '/vue/'
            },
            {
                text: 'Node',
                link: '/node/'
            },
            {
                text: '工具',
                items: [
                    {
                        text: 'Git',
                        link: '/git/'
                    },
                    {
                        text: '其他',
                        link: '/tools/'
                    }
                ],
            },
            {
                text: '其他',
                items: [
                    {
                        text: 'HTML',
                        link: '/html/'
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
                        text: 'SVG',
                        link: '/svg/'
                    },
                ]
            },
        ],
        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: '/chingchao/blog',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'master',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '编辑此页'
    },
}