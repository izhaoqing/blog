# Git

## 安装

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

## Feature Branching

### 提交

```bash
$ git push <远程仓库名称> <本地分支>:<远程分支>
$ git push origin branch
```

### 拉取

```bash
$ git pull [--rebase] <远程主机名> <远程分支名>:<本地分支名>  # 多部操作合并
```

如果`git pull`提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream branch-name origin/branch-name`。

### 提交

```shell
$ git commit -m 'msg' 
```

### 修改错误提交

```shell
git commit --amend
```

只修改提交信息：`git commit --amend -m 'massage'`

将一个新的改动添加进提交中：`git add .` + `git commit --amend --no-edit`，不改变 commit message

修改提交的作者：`git commit --amend --author "Author Name <Author Email>"`

### Bug分支

Git提供了一个`stash`功能，可以把当前工作现场“储藏”起来。

```shell
$ git stash
```

先确定要在哪个分支上修复bug，假定需要在`master`分支上修复，就从`master`创建临时分支：

```shell
$ git checkout master
$ git checkout -b issue-101
```

解决后合并分支，再删除分支。回到刚才的工作现场，用`git status`查看，工作区是干净的。用`git stash list`命令查看。

```shell
$ git stash list
stash@{0}: WIP on dev: 6224937 add merge
```

恢复`stash`有两个方法：

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

## 分支

### 查看分支

```shell
$ git branch
$ git branch -a  # 查看本地和远程所有分支
$ git fetch  # 远程有新的分支，git branch -a 也查看不到，需要先拉取
```

### 新建分支

```shell
$ git branch new_feature  # 新建分支
$ git checkout new_feature  # 切换分支
$ git switch new_feature  # 切换分支
```

```shell
$ git checkout -b new_feature  # 新建并切换分支
$ git switch -c new_feature  # 新建并切换分支
$ git checkout -b new_feature origin/master  # 从远程仓库 master 分支新建一个 new_feature 分支，再切换到新建的分支
```

### 删除分支

```shell
$ git branch -d branch
$ git branch -D branch  # 强制删除分支
$ git push origin -d branch  # 删除远程分支
```

### 找回分支

```shell
git reflog
git checkout c08de9a
git checkout -b branch_name
```

 ### 合并分支

```shell
$ git merge branch  # 将 branch 合并到当前分支
```

```shell
# 若有冲突 手动解决后
$ git add .
$ git commit
```

```shell
# 撤销合并
$ git merge --abort  # 不解决冲突直接撤销
$ git reset --hard  # 解决冲突后，回滚到合并前
```

## 查看

### 查看提交

| 命令                                    | 说明                   |
| --------------------------------------- | -------------------------- |
| \$ git log                              | 查看历史记录               |
| \$ git log -p                           | 查看详细历史               |
| \$ git log -stat                        | 查看简要统计               |
| \$ git log --graph --pretty=oneline     | 查看分支合并情况            |
| \$ git show                             | 查看当前 commit            |
| \$ git show \<commit 引用>              | 查看指定 commit            |
| \$ git show \<commit 引用> \<file name> | 查看指定 commit 的指定文件 |


### 比较差异

| 命令                                                 | 说明                      |
| ---------------------------------------------------- | ------------------------- |
| \$ git diff                                          | 比对工作目录和暂存区      |
| \$ git diff --staged （--cached）                    | 比对暂存区和上一条提交    |
| \$ git diff HEAD                                     | 比对工作目录和上一次提交  |
| \$ git diff \<commit>                                | 比对工作目录和指定 commit |
| \$ git diff \<本地分支名> <远程主机名>/\<远程分支名> | 比对本地仓库与远程仓库    |

Git 提供了一个命令`git reflog`用来记录你的每一次命令，可以查看版本id。

## 撤销

| 命令                                                | 说明        |
| --------------------------------------------------- | :---------- |
| \$ git checkout . /  \$ git checkout -- \<filename> | 撤销改动    |
| \$ git reset  /  \$ git reset \<filename>           | 撤销 add    |
| \$ git reset HEAD^                                  | 撤销 commit |

如果新增加文件，没有被跟踪 (untracked)，使用 `git checkout .` 是不起作用的，可以使用 `git clean -n`，先查看要被删除的文件，再使用 `git clean -f` 删除。

如果需要撤销操作到 add 之前，且不保存修改：

| 阶段                              | 操作                                               |
| --------------------------------- | -------------------------------------------------- |
| 已修改，未暂存（`git add`之前)    | `git checkout .` 或 `git reset --hard`             |
| 已暂存，未提交（`git add`之后）   | `git reset`+`git checkout .` 或 `git reset --hard` |
| 已提交，未推送（`git commit`之后) | `git reset --hard origin/master`                   |
| 已推送（`git push`之后)           | `git reset --hard HEAD^`+`git push -f`             |

`git reset` 的本质是移动 HEAD 以及它所指向的 branch ，可以移动到任意的 commit 上，默认的参数是

1. `--hard`：重置位置的同时，清空工作目录的所有改动；
2. `--soft`：重置位置的同时，保留工作目录和暂存区的内容，并把重置 `HEAD` 的位置所导致的新的文件差异放进暂存区。
3. `--mixed`（默认）：重置位置的同时，保留工作目录的内容，并清空暂存区。

在Git中，用`HEAD`表示当前版本，也就是最新的提交，上一个版本就是`HEAD^`，上两个版本就是`HEAD^^`，往上100个版本写成`HEAD~100`。

## 远程仓库

### 添加密钥

以`github`为远程仓库，由于本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，需要设置：

1. 创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有`id_rsa`和`id_rsa.pub`这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

```shell
$ ssh-keygen -t rsa -C "a@163.com"
```

2. 登陆GitHub，打开“SSH Keys”页面，添加key：

```shell
cat ~/.ssh/id_rsa.pub
```

### 添加远程仓库

先在github上创建一个仓库。再关联远程仓库

```shell
$ git remote add origin git@github.com:user/test.git
```

把本地库的所有内容推送到远程库上：

```shell
$ git push -u origin master
```

实际上是把当前分支`master`推送到远程。由于远程库是空的，第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。

### 设置远程仓库地址

```bash
$ git remote set-url origin [url]
```

## 冲突

手动解决 conflicts 后，再提交。

```shell
$ git pull --rebase origin branch
$ git add readme.txt 
$ git rebase --continue
$ git commit -m "conflict fixed"
```

## 标签

### 创建标签

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

默认标签是打在最新提交的`commit`上的，打历史版本标签，先找到 commit id。

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

### 操作标签

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

## 忽略文件

忽略已提交的文件

```shell
git rm --cached [file]
git rm -r --cached folder
git commit -m 'delete files'
```

## 参考

[易百教程-Git](https://www.yiibai.com/git)  

[廖雪峰Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)

















