### 导入

```shell
$ svn import /Users/apple/Documents/eclipse_workspace/weibo svn://localhost/mycode/weibo --username=mj --password=123 -m
```

### 检出

```shell
$ svn checkout svn://localhost/mycode --username=mj —password=123
```

### 解决冲突

```shell
$ svn update   //更新代码

$ svn resolve --accept working main.c   //解决冲突

$ svn ci -m ''   //提交

$ svn delete 删除文件／文件夹

$ svn delete —force 强制删除
```
>  (p) postpone 暂时推后处理，我可能要和那个和我冲突的家伙商量一番 
>
>  (df) diff-full 把所有的修改列出来，比比看 
>
>  (e) edit 直接编辑冲突的文件 
>
>  (mc) mine-conflict 如果你很有自信可以只用你的修改，把别人的修改干掉 
>
>  (tc) theirs-conflict 底气不足，还是用别人修改的吧 
>
>  (s) show all options 显示其他可用的命令

### 查看提交日志

```shell
$ svn log -l 5   // 查看最近5条记录
```

### 撤销修改

```shell
$ svn revert [-R] file
```

当需要撤销文件时，加 -R 递归。

### 查看版本差异

```shell
$ svn diff -r 7808:7920 src/views/memberManager/index.vue
```

### tags

```shell
$ svn cp trunk tags/1.1.0
```

