### Flutter 环境搭建

按照文档说明一步一步操作，整个过程非常艰难，主要是下载依赖包太慢，即使开了代理可以访问外网，github 克隆非常慢，下载速度只有几k。

下载好 Flutter SDK 后解压，配置环境变量，按照文档介绍并没有什么问题，不过使用 flutter 命令就会无响应，试过很多次，最后发现不是 SDK 的问题，也不是环境变量配置的问题，第一次使用 flutter 命令需要下载依赖，需要花时间，而且下载速度很慢，经过多次尝试加长时间等待，终于，运行 `flutter -h` 有反应了。

运行 `flutter doctor` 查看当前环境还需要安装的依赖，果然需要安装或者更新的有好几个。首先是 android sdk，按照提示运行命令，说需要安装 java 先，然后在运行提示的命令，报了一些看不懂的错。不是提示说需要安装 android sdk 28 嘛，直接去 android 官网下载，然后放在指定的文件夹内，不过还是不行。最后打开 android studio，提示需要下载 sdk，终于成功了。再是安装 flutter 插件，速度太慢，尝试了很多次才安装好。

升级 xcode 又需要下载一个大文件。`pod setup` 命令输入后拉取 github 上的资源，速度简直了，最后找了多种方法，还是不行，那些声称提速到几M每秒的教程，也不见效，估计是自己设置的问题吧。我直接在 github 上下载 zip 包，解压后放在 pod 的目录里，好了。

不过 xcode 和 android studio 都是为了能够使用虚拟机，代码开发还是在 vscode 里。

[cocoapods的setup慢的解决办法](http://www.masteryu.site/2018/08/20/2018-08-20-cocoapods-setups-md/)