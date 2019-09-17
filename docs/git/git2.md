### Feature Branching

提交分支到远程仓库

```shell
git push origin books
git push <远程仓库名称> <本地分支>:<远程分支>
```

合并分支到 master

```shell
git checkout master
git pull
git merge books
```

拉取代码

```shell
git pull --rebase <远程主机名> <远程分支名>:<本地分支名>  # 多部操作合并
```

提交并删掉分支

```shell
git push
git branch -d books
git push origin -d books  # 用 -d 参数把远程仓库的 branch 也删了
```

新建分支并切换

```shell
git checkout master
git checkout -b new_feature
```

```shell
git fetch  # 如果拉取的分支为新提交的，git branch -a 也查看不到，需要先拉取
git checkout -b new_feature origin/master  # 从远程仓库 master 分支新建一个 new_feature 分支，再切换到新建的分支
```

### 查看改动

查看历史

```shell
git log
git log -p  # 详细历史，改动细节
git log --stat  # 查看简要统计
git log --pretty=oneline  # 一行简要显示
```

查看改动内容

```shell
git show  # 查看当前 commit 的改动
```

```shell
git show 5e68b0d8 index.html
```

查看暂存区和版本库的差异

```shell
git diff --cached  # 看到「如果你立即输入 git commit，你将会提交什么」
```

查看工作区和暂存区的差异

```shell
git diff  # 看到「如果你现在把所有文件都 add，你会向暂存区中增加哪些内容」
```

查看工作区和版本库之间的差异

```shell
git diff HEAD   # 看到「如果你现在把所有文件都 add 然后 git commit，你将会提交什么」
```

查看 git 操作

```shell
git reflow
```

### Merge

```shell
git merge branch1
# 若有冲突 手动解决后
git add .
git commit
```

取消 merge

```shell
git merge --abort  # 不解决冲突直接撤销
git reset --hard  # 解决冲突后，回滚到合并前
```

### 修改错误提交

```shell
git commit --amend
```

只修改提交信息：`git commit --amend -m 'massage'`

将一个新的改动添加进提交中：`git add .` + `git commit --amend --no-edit`，不改变 commit message

修改提交的作者：`git commit --amend --author "Author Name <Author Email>"`

### 撤销

撤销已 push 的代码

```shell
git revert --HADE^  # 新增一条和倒数第二个 commit 内容相反的提交，再 push。
```

### stash

```shell
git stash -u  # -u 表示没有被 track 的文件也会被包含
git stash pop
```

### 找回branch

```shell
git reflog
git checkout c08de9a
git checkout -b branch_name
```

#### 忽略已提交的文件

```bash
git rm --cached [file]
git rm -r --cached folder
git commit -m 'delete files'
```

