// 跟路径
const rootPath = process.cwd()
const docs = rootPath + "/docs"
const fs = require('fs')

// 获取文件名
function getFileName(root, dir) {
    let path = root + dir
    let fileNames = []
    fs.readdirSync(path).forEach(file => {
        if (/.md$/.test(file)) {
            file = file.replace(/(README)?.md/, '')
            fileNames.push(dir + file)
        }
    })
    fileNames.sort()
    return fileNames
}

// 生成 sidebar 对象
function genSidebar(title, children = [''], collapsable = true, sidebarDepth = 0) {
    var arr = new Array()
    arr.push({
        title,
        collapsable,
        sidebarDepth,
        children
    })
    return arr
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

const sidebarObj = dirs.reduce((obj, next) => {
    return {
        [next.path]: genSidebar(next.title, getFileName(docs, next.path), false),
        ...obj
    }
}, {})

module.exports = sidebarObj