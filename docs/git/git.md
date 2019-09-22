# Git基础命令

### 关键词介绍

+ __remote__: 一般指远程github服务器
+ __clone__: 克隆，将github上项目克隆到本地
+ __origin__: 远程代码仓库，即源文件
+ __master__: 主分支
+ __pull__: 从远程仓库拉代码到本地
+ __push__: 本地代码提交到远程仓库

###GIT教程 

#### 安装

linux安装：

```shell
$ sudo apt-get install git
```

mac安装：通过安装homebrew，然后通过homebrew安装Git。或者安装xcode，Xcode集成了Git。

windows安装：从Git官网直接[下载安装程序](https://git-scm.com/downloads)，安装完成后，在开始菜单里找到“Git”->“Git Bash”。

安装完成后需要设置：

```shell
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

注意`git config`命令的`--global`参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

#### 创建版本库

```shell
$ mkdir learngit
$ cd learngit
$ git init
```

#### 添加文件到版本库

```shell
$ git add readme.md
$ git commit -m 'wrote a readme file'
```

#### 查看不同

```shell
$ git diff readme.md
```

#### 版本回退

每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为`commit`。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个`commit`恢复，然后继续工作。

Git中，我们用`git log`命令查看历史记录。

```shell
$ git log
```

Git必须知道当前版本是哪个版本，在Git中，用`HEAD`表示当前版本，也就是最新的提交`3628164...882e1e0`（注意我的提交ID和你的肯定不一样），上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。

回到上一个版本

```shell
$ git reset --hard HARD^
```

回到某个版本

```shell
$ git reset --hard commit_id
```

Git提供了一个命令`git reflog`用来记录你的每一次命令，可以查看版本id。

#### 工作区和暂存区

第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

#### 管理修改

Git管理的是修改，当你用`git add`命令后，在工作区的第一次修改被放入暂存区，准备提交，工作区的第二次修改如果没有放入暂存区（不使用 `git add`），`git commit`只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。

提交后，用`git diff HEAD -- readme.txt`命令可以查看工作区和版本库里面最新版本的区别:

```shell
$ git diff HEAD -- readme.txt
```

两次提交可以连续使用`git add`再`git commit`，也可以别着急提交第一次修改，先`git add`第二次修改，再`git commit`，就相当于把两次修改合并后一块提交了。

#### 撤销修改

丢弃工作区的修改：

```shell
$ git checkout -- readme.txt
```

命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add后的状态。

撤销暂存区修改：

```shell
$ git reset HEAD <file>
```

#### 删除文件

在文件管理器中把没用的文件删了，或者用`rm`命令删了。

```shell
$ rm test.txt
```

如果确实要从版本库中删除该文件，那就用命令`git rm`删掉，并且`git commit`。也可以使用 `git add`。

```shell
$ git rm test.txt
```

如果误删，使用`git checkout -- <file>`。

```shell
$ git checkout -- test.txt
```

#### 远程仓库

以github为远程仓库。

由于本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，需要设置：

第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

```shell
$ ssh-keygen -t rsa -C "a@163.com"
```

第2步：登陆GitHub，打开“SSH Keys”页面，添加key：

```shell
cat ~/.ssh/id_rsa.pub
```

#### 添加远程仓库

先在github上创建一个仓库。

关联远程仓库

```shell
$ git remote add origin git@github.com:chingchao/test.git
```

把本地库的所有内容推送到远程库上：

```shell
$ git push -u origin master
```

实际上是把当前分支`master`推送到远程。由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

#### 克隆

先有本地库，后有远程库的时候，关联远程库。

先创建远程库，可以从远程库克隆。

```shell
$ git clone git@github.com:chingchao/test.git
```

Git支持多种协议，包括`https`，但通过`ssh`支持的原生`git`协议速度最快，无需每次提交都输入口令。

#### 创建/合并分支

每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。

创建并切换分支：

```shell
$ git checkout -b dev
```

相当于以下两条命令：

```shell
$ git branch dev
$ git checkout dev
```

创建远程`origin`的`dev`分支到本地：

```shell
$ git checkout -b origin/dev
```

查看当前分支：

```shell
$ git branch
```

合并当前分支到master：

```shell
$ git merge master
```

通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

添加`--no-ff`参数，表示禁用`Fast forward`。

```shell
$ git merge --no-ff -m "merge with no-ff" dev
```

删除分支：

```shell
$ git branch -d dev
```

如果分支未合并，删除会失败。如果要强行删除，需要使用命令：

```shell
$ git branch -D dev
```

#### 解决冲突

手动解决conflicts后，再提交。

```shell
$ git add readme.txt 
$ git rebase --continue
$ git commit -m "conflict fixed"
```

用带参数的`git log`也可以看到分支的合并情况：

```shell
$ git log --graph --pretty=oneline --abbrev-commit
```

用`git log --graph`命令可以看到分支合并图：

```shell
$ git log --graph
```

#### Bug分支

Git提供了一个`stash`功能，可以把当前工作现场“储藏”起来。

```shell
$ git stash
```

此时用`git status`查看工作区，就是干净的。

首先确定要在哪个分支上修复bug，假定需要在`master`分支上修复，就从`master`创建临时分支：

```shell
$ git checkout master
$ git checkout -b issue-101
```

解决后合并分支，再删除 issue-101。

回到刚才的工作现场，用`git status`查看，工作区是干净的。

用`git stash list`命令查看。

```shell
$ git stash list
stash@{0}: WIP on dev: 6224937 add merge
```

恢复stash有两个方法：

一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

```shell
$ git stash apply
$ git stash drop
Dropped refs/stash@{0} (fe3b60470eb88919715b9ba6f36f6bd4d1847ffc)
```

另一种方式是用`git stash pop`，恢复的同时把stash内容也删了：

```shell
$ git stash pop
```

你可以多次stash，恢复的时候，先用`git stash list`查看，然后恢复指定的stash，用命令：

```shell
$ git stash apply stash@{0}
```

#### 多人协作

因此，多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin branch-name`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin branch-name`推送就能成功！

如果`git pull`提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`。

#### 创建标签

切换到需要打标签的分支上：

```shell
$ git checkout master
```

然后，敲命令`git tag <name>`就可以打一个新标签：

```shell
$ git tag v1.0
```

查看所有标签：

```shell
$ git tag
v1.0
```

默认标签是打在最新提交的commit上的，打历史版本标签，先找到commit id。

```shell
$ git log --pretty=oneline --abbrev-commit
7825a50 merge with no-ff
6224937 add merge
d17efd8 remove test.txt
...
```

要对`add merge`这次提交打标签，它对应的commit id是`6224937`。

```shell
$ git tag v0.9 6224937
```

查看标签信息：

```shell
$ git show v0.9
```

创建带有说明的标签，用`-a`指定标签名，`-m`指定说明文字：

```shell
$ git tag -a v0.1 -m "version 0.1 released" 3628164
```

#### 操作标签

删除标签：

```shell
$ git tag -d v0.1
Deleted tag 'v0.1' (was e078af9)
```

推送某个标签到远程：

```shell
$ git push origin v1.0
```

一次性推送全部尚未推送到远程的本地标签：

```shell
$ git push origin --tags
```

如果标签已经推送到远程，先从本地删除：

```shell
$ git tag -d v0.9
```

然后，从远程删除：

```shell
$ git push origin :refs/tags/v0.9
To git@github.com:chingchao/learngit.git
 - [deleted]         v0.9
```



### git常用指令

#### 源文件

+ __git remote -v__ ：查看远程关联的仓库，包括源文件和上一层源文件
+ __git remote add origin + 网址__ ：添加一个源文件，即与一个远程仓库关联
+ __git remote add upstream + 网址__ ：添加一个上层源文件，即fork项目的源文件
+ __git remote remove origin/upstream + 网址__ ：删除一个源文件或上层源文件，即取消与远程仓库的关联



#### git相关常用命令
```
pwd 查看路径
Git diff  查看不同
git log 查看日志
git remote add origin git@server-name:path/repo-name.git 关联远程库
git push -u origin master 第一次推送
git config user.name  查看当前仓库用户名，后面加用户名表示配置。
git config —global user.name  查看全局配置用户名
```
#### 本地仓库和远程仓库关联
```
git init   //生成.git文件
git config user.name ‘zq’   //配置用户名
git config user.email ‘a@163.com'  
ssh-keygen -t rsa -C “a@163.com”   //生成密钥
cat ~/.ssh/id_rsa.pub   //显示key，再复制粘贴到github上。
git remote add origin git@server-name:path/repo-name.git 关联远程库
```

### 撤销和比较

工作区 ----> 暂存区 ----> 本地仓库 ----> 远程仓库

#### 撤销操作

|   阶段 | 操作 |
| ------ | ------ |
| 已修改，未暂存（`git add`之前) | `git checkout .` 或 `git reset --hard` |
| 已暂存，未提交（`git add`之后） | `git reset`+`git checkout .` 或 `git reset --hard` |
| 已提交，未推送（`git commit`之后) | `git reset --hard origin/master` |
| 已推送（`git push`之后) | `git reset --hard HEAD^`+`git push -f` |

git pull —rebase origin dev 后有冲突，修改冲突后，git add . 再 git rebase —continue 即可，如果再 —continue 之前 git  commit ，则需要撤销提交，git rest —soft HEAD^，否则提交会在一个未命名的分枝上。

#### 查看修改

| 操作 | 说明 |
| ------ | ---- |
| `git diff` | 工作区与暂存区 |
| `git diff --cached` | 暂存区与本地仓库 |
| `git diff HEAD` | 工作区与本地仓库 |
| `git diff master origin/master` | 本地仓库与远程仓库 |

####  取消 git 代理

```bash
$ git config --global --unset http.proxy
$ git config --global --unset https.proxy
```

