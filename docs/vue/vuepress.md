# VuePress 构建静态网站

用 Markdown 写文档是很方便的，Typora 可以实时预览是一个好用的编辑器，配合 iPic 可以将粘贴进来的图片自动上传再替换成链接，VuePress 可以将文档打包生成静态网站，为了在写完文档后更加方便的发布，除了普通的配置外还需要做一个自动生成文档列表的功能，写完文档后不用做其他配置修改用一条命令即可发布。

### 自动生成侧边栏

配置侧边栏类型有多种，我的需求是侧栏显示某一个分类下的所有文章列表，通过头部的 nav 切换分类。默认情况下侧边栏会自动地显示由当前页面的标题（headers）组成的链接，并按照页面本身的结构进行嵌套，通过设置 `themeConfig.sidebarDepth = 0` 禁止显示嵌套，只显示文章标题(自动提取h1标题)。示例效果：

![image-20190926140809218](https://tva1.sinaimg.cn/large/006y8mN6gy1g7cvza3c53j327s0cg76l.jpg)

`sidebar` 设置成[多个侧边栏]([https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%A4%9A%E4%B8%AA%E4%BE%A7%E8%BE%B9%E6%A0%8F](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#多个侧边栏))，配置格式如下，`children` 的值每一项都是字符串链接，侧栏标题都会从文章内取，如果需要显示地指定链接的文字，使用一个格式为 `[link, text]` 的数组。

```js
sidebar: {
  '/git/': [
    {
      title: "Git",
      collapsable: true,
      sidebarDepth: 0,
      children: [
        "/git/",
        "/git/one",
        "/git/two",
        ["/git/rebase", "变基"]
      ]
    }
  ]
}
```

自动生成侧栏是通过读取文件夹，生成一个对象作为 `sidebar` 的 value 值，属性值都是一个文件夹路径，`children` 是文件夹下的所有文档的链接。假设文件目录结构如下：

```
├─ README.md
├─ contact.md
├─ about.md
├─ git/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ vue/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

生成我需要的 sidebar 数据格式。

```js
// 文档路径
const docsPath = process.cwd() + '/docs'
const fs = require('fs')

// 获取文件名
function getFileName(root, dir) {
    let path = root + dir
    let fileNames = []
    let readmeContent = ''
    fs.readdirSync(path).forEach(file => {
        // 只处理 .md 文件
        if (/.md$/.test(file)) {
            let name = file.replace(/(README)?.md$/, '')
            fileNames.push(dir + name)
        }
    })
  	// 做排序，可以将文档命名成：1.xx.md, 2.xx.md
    fileNames.sort()
    return fileNames
}

// 文件夹路径
let dirs = [
    {
        path: '/git/',
        title: 'Git'
    },
    {
        path: '/vue/',
        title: 'Vue'
    },
]  // 读取 /docs 下的文件夹生成 dirs 也是可以的，不过我需要设置 title，使用手动配置

module.exports = dirs.reduce((obj, item) => {
    obj[item.path] = [
        {
            title: item.title,
            collapsable: true,
            sidebarDepth: 0,
            children: getFileName(docsPath, item.path)
        }
    ]
    return obj;
}, {})
```

### 自动生成 README.md

每一个文件夹下都需要一个 README.md 文件，当访问 `xxx/git/` 时就是将 /git/README.md 这个文件作为首页打开，如果文件不存在则显示 404，所以我的做法是生成一个 README.md 文件，作为目录页，显示当前分类下的所有文章链接，[VuePress文档-主题](https://vuepress.vuejs.org/zh/theme/)首页内容是主题功能的介绍，也有一个本栏的主要内容列表，虽然和侧边栏的内容重复，但手机端页面默认是不显示侧边栏的，就可以直接点击目录进入文章了。

在获取文件名时读取文件，从文件内容中截取标题，拼接成一个完整的 README.md 文件。

```js
let readmeContent = ''
fs.readdirSync(path).forEach(file => {
  // 只处理 .md 文件
  if (/.md$/.test(file)) {
    if (!/README.md/.test(file)) {
      // 取文档中的 title
      let title = fs.readFileSync(path + file, 'utf-8').match(/(?<=#\s+)[^\s]+(?=\s)/m)
      readmeContent += `+ [${title ? title[0] : name}](${file})\n`
    }
  }
})
// 关闭`在GitHub上编辑此页`功能
readmeContent = '---\neditLink: false\n---\n# 目录\n' + readmeContent
fs.writeFileSync(root + dir + 'README.md', readmeContent)
```

生成的 README.md 文件内容:

```
---
editLink: false
---
# 目录
+ [title1](link1)
+ [title2](link2)
```

完整的代码：

```js
// /docs/.vuepress/sidebarConf.js

// 文档路径
const docsPath = process.cwd() + '/docs'
const fs = require('fs')

// 获取文件名
function getFileName(root, dir) {
    let path = root + dir
    let fileNames = []
    let readmeContent = ''
    fs.readdirSync(path).forEach(file => {
        // 只处理 .md 文件
        if (/.md$/.test(file)) {
            let name = file.replace(/(README)?.md$/, '')
            fileNames.push(dir + name)
            if (!/README.md/.test(file)) {
                // 取文档中的 title
                let title = fs.readFileSync(path + file, 'utf-8').match(/(?<=#\s+)[^\s]+(?=\s)/m)
                readmeContent += `+ [${title ? title[0] : name}](${file})\n`
            }
        }
    })
    //  关闭`在GitHub上编辑此页`功能
    readmeContent = '---\neditLink: false\n---\n# 目录\n' + readmeContent
    fs.writeFileSync(root + dir + 'README.md', readmeContent)
  	// 做排序，可以将文档命名成：1.xx.md, 2.xx.md
    fileNames.sort()
    return fileNames
}

let dirs = [
    {
        path: '/git/',
        title: 'Git'
    },
    {
        path: '/vue/',
        title: 'Vue'
    },
]

module.exports = dirs.reduce((obj, item) => {
    obj[item.path] = [
        {
            title: item.title,
            collapsable: true,
            sidebarDepth: 0,
            children: getFileName(docsPath, item.path)
        }
    ]
    return obj;
}, {})
```

### 新浪图床403问题

推送到 github pages，打开页面出现图片403的情况，搜索后找到解决办法，在`<head>` 中增加 `<meta name="referrer" content="no-referrer" />` 后图片正常。[新浪图床外链图片不显示(403)解决办法](https://www.liedun.top/972.html)。

应该是新浪开始限制外链图片的调用了，所以被禁止访问了。在页面引入图片、JS 等资源，都会产生新的 HTTP 请求，浏览器一般都会给这些请求头加上表示来源的 Referrer 字段，禁用referrer后则可避免。

在配置文件 config.js 中增加：

```js
modules.exports = {
  head: [
      ['meta', { name: 'referrer', content: 'no-referrer' }],
  ]
}
```

### 评论功能

评论的所有功能用一个 `<comment/>` 组件实现，不管用第三方评论工具还是自己写接口，逻辑都放在这个组件内，再通过插件的方式在每个页面中使用这个组件即可。

先新建插件文件 comment-plugin.js，插件需要做的就是返回一个有 [globalUIComponents](https://vuepress.vuejs.org/zh/plugin/option-api.html#globaluicomponents) 属性的对象，给每一个页面注入一个全局 UI 组件。在 .md 文件中直接使用 `<comment/>` 组件也是可以实现的，但避免直接修改原文件，还是使用插件的方式。

```js
// /docs/.vuepress/comment-plugin.js
module.exports = {
    return {
        name: 'comment-plugin',
        globalUIComponents: [
            'comment',
        ]
    }
}
```

新建一个评论组件 /docs/.vuepress/components/comment.vue。打包的时候会自动注册成全局组件。

```vue
<template>
    <div class="comment-wrap" v-if="show">
        <div id="commentEl"  class="comment"></div>
    </div>
</template>

<script>
// import Valine from 'valine'

export default {
    name: 'Comment',
    data() {
        return {
            show: false
        }
    },
    mounted() {
        import('valine').then(module => {
            window.Valine = module.default;
            this.fetchComment();
        })
    },
    methods: {
        fetchComment() {
            // 目录页面不显示评论
            this.show = /.html$/.test(this.$route.path);
            this.show && this.$nextTick(() => {
               new Valine({
                    el: '#commentEl',
                    appId: '<appId>',
                    appKey: '<appKey>',
                    path: this.$page.key
                })
            })
        }
    },
    watch: {
        '$route': function(route) {
            this.fetchComment();
        }
    }
}
</script>
<style scoped>
    .comment-wrap {
        padding-left: 20rem;
    }
    .comment {
        max-width: 740px;
        margin: 0 auto;
        padding: 0 2.5rem 4rem;
    }
    @media (max-width: 959px) {
        .comment-wrap {
            padding-left: 16.4rem;
        }
    }
    @media (max-width: 719px) {
        .comment-wrap {
            padding-left: 0;
        }
    }
    @media (max-width: 959px) {
        .comment {
            padding: 0 2rem 2rem;
        }
    }
    @media (max-width: 419px) {
        .comment {
            padding: 0 1.5rem 1.5rem;
        }
    }
</style>
```

评论功能使用的是 [valine](https://valine.js.org/)。其中 [path](https://valine.js.org/configuration.html#path) 表示当前`文章页`路径，用于区分不同的`文章页`，以保证正确读取该`文章页`下的评论列表， `$page.key` 是页面唯一的 hash key，更改文章内容 key 值不变，就可以实现文章和评论一一对应。

使用插件：

```js
// /docs/.vuepress/config.js
module.exports = {
    plugins: [
        require('./vuepress-plugin-comment.js'),
    ],
}
```

### 使用自定义域名

按照[VuePress文档-部署](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)，如果发布到自定义域名，将 `deploy.sh` 文件第13行注释去掉即可。

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -

```

在域名服务商做一个解析配置，点击修改记录，类型选择 CNAME，记录值填 `<USERNAME>.github.io`。




