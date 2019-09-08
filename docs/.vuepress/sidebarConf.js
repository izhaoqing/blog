const path = require("path")
const docs = path.resolve('./vuepress/docs');
const utils = require(path.resolve('../vuepress/utils/index.js'));
const filehelper = require('../../utils/getFilenames');

/**
 * 侧边栏的配置（顺序无所谓）
 * utils.genSidebar('Java基础', filehelper.getFileName(docs+"/Java/Basic/"), false),
 */
 module.exports = {
     
     // .... 省略部分

     // 其他
     '/js/': utils.genSidebar('Js', filehelper.getFileName(docs + '/js'), false),
    //  '/Other/Finance/': utils.genSidebar('金融', filehelper.getFileName(docs + "/Other/Finance/"), false),
    //  '/Other/Git/': utils.genSidebar('Git', filehelper.getFileName(docs + "/Other/Git/"), false),
    //  '/Other/Hexo/': utils.genSidebar('Hexo', filehelper.getFileName(docs + "/Other/Hexo/"), false),
    //  '/Other/Vue/': utils.genSidebar('Vue', filehelper.getFileName(docs + "/Other/Vue/"), false),
    //  '/Other/VuePress/': utils.genSidebar('VuePress', filehelper.getFileName(docs + "/Other/VuePress/"), false),

     // 关于我
    //  '/About/': utils.genSidebar('关于我', filehelper.getFileName(docs + "/About/"), false),

     // 一定要放在最后！！！
     // 根目录下的 sidebar, 对于所有未匹配到的都会应用该 sidebar
     // '/': [''] // 此处选择禁用
 };