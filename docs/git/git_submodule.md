克隆项目

```shell
git clone --recurse-submodules <url>  # 不加参数不会拉取子模块的代码
```

```shell
git clone <url>
git submodule init
git submodule update
```

显示子模块

```shell
git submodule
```

添加子模块

```shell
git submodule add <url>
```

在主项目中更新子模块

```shell
git submodule update --remote <path>  # 跟新 master 分支
```

```shell
git config -f .gitmodules submodule.moduleA.branch dev  # 加 -f 参数，修改提交后对所有成员有效
git submodule update --remote moduleA  # 更新 moduleA 的 dev 分支
```

在子模块中修改（以 testModule 为例）

```shell
cd testModule
```

```shell
git commit -am ''
git push
```







