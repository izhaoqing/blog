const sidebar = require('./sidebarConf.js')

module.exports = {
    head: [
        ['meta', { name: 'referrer', content: 'no-referrer' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        // ['link', { rel: 'manifest', href: '/manifest.json' }],
        // ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        // ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        // ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        // ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        // // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    plugins: [
        '@vuepress/back-to-top', 
        require('./vuepress-plugin-comment.js'),
        [
            '@vuepress/pwa', {
                serviceWorker: true,
                updatePopup: true
            }
        ]
    ],
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
        /* sidebar: {
            '/git/': [
                {
                    title: "Git",
                    collapsable: true,
                    sidebarDepth: 0,
                    children: [
                        ["/git/", '目录'],
                        "/git/configTwoGit",
                        "/git/git",
                    ]
                }
            ]
        }, */
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
                text: 'Vue组件精讲',
                link: '/vueCom/'
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