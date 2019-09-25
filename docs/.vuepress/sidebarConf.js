// 文档路径
const docsPath = process.cwd() + '/docs'
const fs = require('fs')

// 获取文件名
function getFileName(root, dir) {
    let path = root + dir
    let fileNames = []
    let readmeContent = ''
    fs.readdirSync(path).forEach(file => {
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
    fileNames.sort()
    // 无`编辑此页`
    readmeContent = '---\neditLink: false\n---\n# 目录\n' + readmeContent
    fs.writeFileSync(root + dir + 'README.md', readmeContent)
    return fileNames
}

let dirs = [
    {
        path: '/js/',
        title: 'Javascript'
    },
    {
        path: '/css/',
        title: 'CSS'
    },
    {
        path: '/flutter/',
        title: 'Flutter'
    },
    {
        path: '/git/',
        title: 'Git'
    },
    {
        path: '/html/',
        title: 'HTML'
    },
    {
        path: '/node/',
        title: 'Node'
    },
    {
        path: '/svg/',
        title: 'Svg'
    },
    {
        path: '/tools/',
        title: '工具'
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
