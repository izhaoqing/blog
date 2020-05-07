// 文档路径
const docsPath = process.cwd() + '/docs'
const fs = require('fs')

// 获取文件名、创建目录文件（README）
function getFileName(root, dir) {
    let path = root + dir
    let fileNames = []
    let readmeContent = ''
    // 当前文件夹下的所有文件
    const files = fs.readdirSync(path).map(file => {
        if (/.md$/.test(file)) {
            let name = file.replace(/(README)?.md$/, '')
            fileNames.push(dir + name)
            if (!/README.md/.test(file)) {
                // 取文档中的 title
                let title = fs.readFileSync(path + file, 'utf-8').match(/(?<=#\s+)[^\n]+(?=\n)/m)
                readmeContent += `+ [${title ? title[0] : name}](${encodeURI(file)})\n`
            }
        }
        return file
    })
    // 第一次打包，README 文件不存在，需要添加到 fileNames 中
    if (!files.find(f => 'README.md' === f)) fileNames.push(dir)
    // 按文件名排序
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
    {
        path: '/vueCom/',
        title: 'Vue组件精讲'
    }
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
