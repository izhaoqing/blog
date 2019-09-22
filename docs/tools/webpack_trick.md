# WebPack笔记

### sourceMap for Less

打包后的less/css文件以 style 标签引入，为了区分样式属于那个文件，需要把css文件分开，以 link 标签引入，目前没有实现，因为 minicssplugin 是把所有css文件合并成一个，他不能和 style-loader 同时存在，只能在production环境中使用。sourceMap for less 能够解决。在浏览器中可以看到 less 文件。

```js
rules: [
    {
        test: /.less$/,
        use: [
            'style-loader', 
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                }
            },
            {
                loader: 'less-loader',
                options: { sourceMap: true, strictMath: true, strictUnits: true }
            }
        ]
    }
]
```

### 获取webpack打包环境

webpack.config.js

```js
module.exports = (env, argv) => {
  // argv.mode 
}
```

### 打包前删除 dist

```js
let CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  // ...
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ]
}
```

### devServer.proxy

[慕课网-webpack-devServer](https://www.imooc.com/read/29/article/272)

`changeOrigin=true` 开启跨域；需要转发的网站是支持 https 的，那么需要增加`secure=false`，来防止转发失败。

```js
module.exports = {
    //...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://baidu.com',
                pathRewrite: {'^/api': ''},
              	secure: false,
                changeOrigin: true
            }
        }
    }
};
```

当前配置只能代理`json`接口的数据，对于`html`文件，还是使用打包后 dist 文件夹中文件，那么我们使用`bypass`来实现这个需求。

```js
module.exports = {
    //...
    devServer: {
        proxy: {
            '/api': {
                target: 'http://baidu.com',
                pathRewrite: {'^/api': ''},
              	bypass(req, res, proxyOptions) {
                    // 判断请求头中的 accept 值
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        // 返回的是 contentBase 的路径
                        return '/index.html';
                    }
                }
            }
        }
    }
};
```

代理一个域名下的两个地址，可以使用 `context`。

```js
module.exports = {
    //...
    devServer: {
        proxy: [
            {
                context: ['/auth', '/api'],
                target: 'http://baidu.com'
            }
        ]
    }
};
```

`dev-server` 使用了 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) , `http-proxy-middleware` 基于 `http-proxy` 实现的，可以查看 http-proxy 的源码和文档:[https://github.com/nodejitsu/...](https://github.com/nodejitsu/node-http-proxy) 。

更多的参数设置：

```js
target：要使用url模块解析的url字符串
forward：要使用url模块解析的url字符串
agent：要传递给http（s）.request的对象（请参阅Node的https代理和http代理对象）
ssl：要传递给https.createServer（）的对象
ws：true / false，是否代理websockets
xfwd：true / false，添加x-forward标头
secure：true / false，是否验证SSL Certs
toProxy：true / false，传递绝对URL作为路径（对代理代理很有用）
prependPath：true / false，默认值：true - 指定是否要将目标的路径添加到代理路径
ignorePath：true / false，默认值：false - 指定是否要忽略传入请求的代理路径（注意：如果需要，您必须附加/手动）。
localAddress：要为传出连接绑定的本地接口字符串
changeOrigin：true / false，默认值：false - 将主机标头的原点更改为目标URL
```

### 开发环境 chunkhash 

+ hash：每次编译 Compilation 对象的 hash，全局一致，跟单次编译有关，跟单个文件无关，不推荐使用；
+ chunkhash：chunk 的 hash，根据不同的 chunk 及其包含的模块计算出来的 hash，chunk 中包含的任意模块发生变化，则 chunkhash 发生变化，推荐使用；
+ contenthash：CSS 文件特有的 hash 值，是根据 CSS 文件内容计算出来的，CSS 发生变化则其值发生变化，推荐 CSS 导出中使用。

在开发环境，使用热更新不能同时使用 [chunkhash] 或 [contenthash] ，需要注释掉热更新相关内容，或者根据环境设置 filname。

```
ERROR in chunk main [entry]
[name].[chunkhash].js
Cannot use [chunkhash] or [contenthash] for chunk in '[name].[chunkhash].js' 
(use [hash] instead)
```

The solution was to change the filename depending on whether the mode is production or development: [stackoverflow](https://stackoverflow.com/questions/50217480/cannot-use-chunkhash-or-contenthash-for-chunk-in-name-chunkhash-js-us#) 

```js
{
  filename: mode === 'production' ? '[name].[chunkhash].js' : '[name].[hash].js'
}
```