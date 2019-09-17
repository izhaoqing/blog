## 安装webpack

`npm install -g webpack`全局安装   
`npm install --save-dev webpack`安装在项目中，package.json中devDependencies下。
[--save-dev --save区别](npm--save-dev.md)

## 在终端打包文件

`webpack {入口文件} {存放路径}` 例如 `webpack app/main.js public/bundle.js`

## webpack 配置文件

在根目录创建 `webpack.config.js` 文件，webpack配置模版如下：

```
module.exports ={
    entry:{},
    output:{},
    module:{},
    plugins:[],
    devServer:{}
}
```

+ entry：配置入口文件的地址，可以是单一入口，也可以是多入口；
+ output：配置出口文件的地址，支持多出口配置；
+ module：配置模块，主要解析CSS和图片转换压缩等功能；
+ plugins：配置插件；
+ devServer：配置开发服务功能；

### entry output配置

如指定入口文件和打包后文件存放路径和文件名，配置如下：

```
module.exports = {
    entry: __dirname + '/app/main.js',  //入口文件
    output: {
        path: __dirname + '/public',    //打包后文件存放路径
        filename: 'bundle.js'           //打包后文件名
    }
}
```

> `__dirname` 是nodejs中的全局变量，指当前执行脚本所在的路径。

输入命令 `webpack` 即可引用配置选项。

### 多入口，出口配置

```
module.exports = {
    entry: {								  //入口文件
        entry1: __dirname + '/app/main.js', 
        entry2: __dirname + '/src/index.js',
    },
    output: {
        path: __dirname + '/public',    //打包后文件存放路径
        filename: '[name].js'           //打包后文件名
    }
}
```

> `[name].js`表示将入口文件打包成相同名字的出口文件，有几个入口文件就打包生成几个出口文件。即使可以存在多个`入口`起点，但只指定一个`输出`配置。

### mode 模式

提供 `mode` 配置选项，告知 webpack 使用相应模式的内置优化。

```js
module.exports = {
  mode: 'production'
};
```

会将 `process.env.NODE_ENV` 的值设为 `production`。

### devServer配置搭建本地服务器

其实Webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，浏览器监听你的代码的修改，并自动刷新显示修改后的结果。不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖。

`npm install --save-dev webpack-dev-server`

在webpack.config.js中添加：

```js
devServer: {
    contentBase: './public',        //本地服务器加载的页面所在的目录
    inline: true,                   //实时刷新
    historyApiFallback: true,       //不跳转，直接打开 index.html
    port: '8808'                    //端口，默认8080
} 
```

配置参数说明：
> **contentBase**： 默认webpack dev server是从项目的根目录提供服务，如果要从不同的目录提供服务，可以通过contentBase来配置。  
> **port**：默认webpack是用 8080端口起的，通过port可以配成其他的端口。    
> **historyApiFallback**：对于单页面程序，浏览器的brower histroy可以设置成html5 history api或者hash，而设置为html5 api的，如果刷新浏览器会出现404 not found，原因是它通过这个路径（比如： /activities/2/ques/2）来访问后台，所以会出现404，而把historyApiFallback设置为true那么所有的路径都执行index.html。 

在`package.json`中的`script`对象下添加`server`，用`npm run server`即可执行`webpack-dev-server --open`命令开启服务器。

```js
"scripts": {
    "start": "webpack",
    "server": "webpack-dev-server --open"
},
```
> `webpack-dev-server --open`启动服务器后控制台只会显示`webpack: Compiled successfully`。      
> `webpack-dev-server --progerss`用于显示build的进度。

只有在通过 DevServer 去启动 Webpack 时配置文件里 `devServer` 才会生效。

## 使用 npm 引导执行

在终端中输入 `webpack` (未安装全局webpack情况下，需输入 `node_modules/.bin/webpak`)比较麻烦，`npm` 可以引导任务执行，配置 `package.json` 中的 `script` 对象后，使用 `npm start` 代替。

```js
{
    'script' : {
        'start': 'webpack'
    }
}
```

> 1. 此处如果没安装全局 `webpack` 也不用指定命令对应的位置，`npm` 会按照一定的顺序查找，`node_modules/.bin` 在寻找的列表中。
> 2. 使用 `npm` 引导执行，命令格式是 `npm run {script name}`，如 `npm run start` `npm run biuld`, `start` 是一个特殊的脚本名称, 可以直接输入 `npm start`。

## 生成 source map 方便调试

通过配置打包生成一个`.map`文件，使编译文件与源文件对应，方便调试代码。

```js
module.exports = {
    devtool: 'eval-source-map',
    entry:  __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    }
}
```

> `devtool`有多个配置选项，还有`source-map`, `cheap-module-source-map`, `cheap-module-eval-source-map`, `cheap-module-eval-source-map`等。
> 配置都是由`eval`, `cheap`, `module`, `source-map`, `inline`五个关键字组合，分别代表五种特性。

> 1. eval： 使用eval包裹模块代码
> 2. source-map： 产生`.map`文件
> 3. cheap： 不包含列信息也不包含loader的sourcemap
> 4. module： 包含loader的sourcemap
> 5. inline： 将`.map`作为DataURI嵌入，不单独生成.map文件
> 
> 如果包含cheap关键字，则产生的.map文件不包含列信息。也就是说当你在浏览器中点击该代码的位置时， 光标只定位到行数，不定位到具体字符位置。
> 
> 包含loader的sourcemap，定位到的将是原始代码，而非经过编译后的代码位置。比如用babel编译js代码，定位到源代码更方便调试。

## Loader

loader使webpack具有调用外部脚本和工具的能力，实现对文件的处理。loader需要单独安装，在`webpack.config.js`文件中`modules`下配置后使用。配置参数：

+  `test`：匹配loaders所处理文件的拓展名的正则表达式（必须）
+  `loader`：loader的名称（必须）
+  `include/exclude`：手动添加必须处理的文件/文件夹，或屏蔽不需要处理的文件/文件夹 (可选）
+  `query`：为loaders提供额外的设置选项（可选）

### 配置loader

有三种配值方式：

```js
modules: {
    rule: [
        {
            test: /\.less$/,
            use:['style-loader','css-loader']
        }
    ]
}
```

```js
modules: {
    rules: [
        {
            test: /\.less$/,
            loader:['style-loader','css-loader']
        }
    ]
}
```

```js
modules: {
    rules: [
        {
            test: /\.less$/,
            use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'}
            ]
        }
    ]
}
```

### include exclude onParse enforce

```js
{
    loader:'babel-loader',
    options:{
      cacheDirectory:true,
    },
    // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
    // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
    enforce:'post'
}
```

`noParse` 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理。

```js
// 使用正则表达式
noParse: /jquery|chartjs/

// 使用函数，从 Webpack 3.0.0 开始支持
noParse: (content)=> {
  // content 代表一个模块的文件路径
  // 返回 true or false
  return /jquery|chartjs/.test(content);
}
```

## Babel使用

Babel可以将新版本的 js(es6)，和js拓展语言(jsx)等编译成浏览器支持的js代码。它是几个模块化的包，核心功能位于`babel-core`的npm包中，要使用某个功能，需单独安装相应的包。

先通过npm安装相应的包：

```
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
```
+ `bable-core`：babel的核心包
+ `bable-loader`：babel的loader包
+ `babel-env-preset`：解析es6的包
+ `babel-preset-react`：解析jsx的包

babel配置如下：   

```
modules: {
    rules: [
        {
            test: /(\.js|\.jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        "env", "react"
                    ]
                }
            },
            exclude: 'node_modules/'
        }
    ]
}
```

可以将babel的配置单独写入`.babelrc`中，减少`webpack.config.js`文件的内容，webpack会自动调用。修改后如下：

```
/* webpack.config.js */

module: {
    rules: [
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }
    ]
}
```

```
/* .babelrc */

{
    parents: ['env', 'react']
}
```

## Resolve

Resolve 配置 Webpack 如何寻找模块所对应的文件，可以根据自己的需要修改默认的规则。

### alias

`resolve.alias` 配置项通过别名来把原导入路径映射成一个新的导入路径。

```js
// Webpack alias 配置
resolve:{
  alias:{
    components: './src/components/'
  }
}
```

通过 `import Button from 'components/button'` 导入。将所有路径中有 `components` 的都替换掉。

```js
resolve:{
  alias:{
    'react$': '/path/to/react.min.js'
  }
}
```

支持 `$` 符号来缩小范围到只命中以关键字结尾的导入语句，只会命中以 `react` 结尾的导入语句。

### extensions

在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。默认是：

```js
extensions: ['.js', '.json']
```

想让 Webpack 优先使用目录下的 TypeScript 文件，可以这样配置：

```js
extensions: ['.ts', '.js', '.json']
```

### modules

`resolve.modules` 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 `node_modules` 目录下寻找。

```js
modules:['./src/components','node_modules']
```

可以简单通过 `import 'button'` 导入，在 `/src/components` 下寻找 `button`。

## Plugins

插件目的在于解决 [loader](https://www.webpackjs.com/concepts/loaders) 无法实现的**其他事**。针对文件模块转换要做的使用 loader，而其他干涉构建内容的可以使用 plugin。

用法：由于**插件**可以携带参数/选项，必须在 webpack 配置中，向 `plugins` 属性传入 `new` 实例。

## webpack资料

[Webpack 中文指南](http://zhaoda.net/webpack-handbook/index.html)       

[webpack0基础入门](https://www.jianshu.com/p/42e11515c10f)



