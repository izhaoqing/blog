### 使用 webpack 搭建 vue 项目

#### 创建项目及初始化

```shell
mkdir vue-project
cd vue-project
npm init
```

安装依赖包，vue，bable，less等

```shell
npm install webpack babel-core babel-loader less vue-loader -D
```

安装完成后 package.json 文件如下：

```json
{
  "name": "vue-project",
  "version": "1.0.0",
  "description": "搭建vue项目",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node_modules/.bin/webpack-dev-server --open --inline --progress --hot"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "css-loader": "^2.1.0",
    "less": "^3.9.0",
    "less-loader": "^4.1.0",
    "vue-loader": "^15.6.2",
    "vue-template-compiler": "^2.6.4",
    "webpack": "^4.29.3",
    "webpack-cli": "^3.2.3",
    "webpack-dev-server": "^3.1.14"
  },
  "dependencies": {
    "vue": "^2.6.4"
  }
}
```

创建 webpack.config.js，使用 `vue-loader`，`less-loader`，`babel-loader`，`url-loader`。

```js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: resolve('dist'),
        filename: 'demo.js'
    },
    devServer: {
        port: '8989'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    			loader: 'url-loader',
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
```

使用 `webpack-dev-server` 启动项目，加上 `hot` 参数实现热更新。