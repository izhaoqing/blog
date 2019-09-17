## npm --save 和--save-dev的区别

有两种命令参数可以把它们的信息写入`package.json`文件，一个是`npm install --save`另一个是`npm install --save-dev`，他们表面上的区别是`--save` 会把依赖包名称添加到`package.json`文件`dependencies`键下，`--save-dev`则添加到`package.json`文件`devDependencies` 键下。

`dependencies`下的安装是运行时的依赖，如react安装包。`devDependencies`下的安装是开发时的依赖，如js压缩工具`gulp-uglify`，发布后不会再使用。

可以使用 `-S` 和 `-D` 来代替 `--save` 和 `--save-d`。

> 使用`npm install`会安装`dependencies`和`devDependencies`两部分的依赖，当使用`npm install –production`或者注明`NODE_ENV`变量值为`production`时，只会下载`dependencies`中的模块。
