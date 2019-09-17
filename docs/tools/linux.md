###  端口被占用

显示端口信息：

```shell
$ sudo -s lsof -i tcp:8887
```

杀掉进程

```shell
$ kill 22995
```

### 查看路径

```shell
$ pwd
```

### node升级

```shell
$ npm install -g n
$ n stable # 升级到最新版
$ n v4.4.7 # 升级到指定版本
```

### node 版本控制



### npm

```shell
$ npm -v          #显示版本，检查npm 是否正确安装。
 
$ npm install express   #安装express模块
 
$ npm install -g express  #全局安装express模块
 
$ npm list         #列出已安装模块

$ npm list -g --depth 0 # 显示已安装的包
 
$ npm show express     #显示模块详情
 
$ npm update        #升级当前目录下的项目的所有模块
 
$ npm update express    #升级当前目录下的项目的指定模块
 
$ npm update -g express  #升级全局安装的express模块
 
$ npm uninstall express  #删除指定的模块

$ npm cache clean  #清除缓存

```

### npm 源 (nrm)

1，使用淘宝的源

```shell
$ npm config set registry https://registry.npm.taobao.org
```

2，使用官方的源

```shell
$ npm config set registry https://registry.npmjs.org/
```

3，查看源地址

```shell
$ npm config get registry
```

### 常用命令

```shell
$ mv docs blog #重命名
$ touch config.js #新建文件
```

### 启动 mongodb

```hell
$ ./mongod --dbpath=/Users/zhaoqing/project/DOClever-6.2.0/db --port=27017
```

### 启动 http-server

```shell
$ http-server ./dist -P http://10.11.4.12/ -o
```

### node 系统环境判断

```js
if (process.platform === 'win32') {
  'windows'
} else if (process.platform === 'darwin') {
  'macos'
} else if (process.platform === 'linux') {
  'linux'
}
```

