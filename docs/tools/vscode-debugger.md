# vscode 调试 webpack

使用 webpack 都是通过 npm 启动的，而不是简单的运行一个 nodejs 文件，vscode 可以调试通过 npm 启动的 nodejs 程序，package.json 文件如下：

```json
{
  "script": {
    "debug": "webpack-dev-server --config build/webpack.demo.js"
  }
}
```

修改后如下：

```json
{
  "script": {
    "debug": "node --inspect-brk=9229 ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --config build/webpack.demo.js"
  }
}
```

点击调试，点击增加配置，在 lanuch.json 中增加一项配置，输入 `node` 可以看到很多个场景可以选择，选择 `Node.js: Launch via NPM` ，生成如下配置：

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch via NPM",
  "runtimeExecutable": "npm",
  "runtimeArgs": [
    "run-script",
    "debug"
  ],
  "port": 9229
},
```

+ `runtimeExecutable`: 程序执行器，就是启动程序的脚本。默认是 `node`，但这里用 npm 来启动 webpack debug 指令，所以这里要配 `npm`

+ `runtimeArgs`: 传递给程序执行器的参数

+ `port`: node 调试端口号，和刚才在 package.json script 中配的 `--inspect-brk` 保持一致

点击开始调试，即可运行 `npm run debug`。