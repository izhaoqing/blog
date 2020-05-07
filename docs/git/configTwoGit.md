# 配置两个git账户

公司的代码在 gitlab 上，还有自己项目托管在 github，需要存在两个 git 账户。

### 修改配置

多个账户需要在每个项目中分别配置用户名和邮箱，如果有配置过全局用户名和邮箱，可以删除。
```bash
$ git config --global --unset user.name
$ git config --global --unset user.email
```
### 生成密钥
需要给每个账户生成一对密钥；
```shell
$ ssh-keygen -t rsa -b 4096 -C <email>
```
然后提示 `Enter a file in which to save the key (/Users/zq/.ssh/id_rsa): [Press enter]`, 两次生成需要不同的密钥文件。
```shell
Enter a file in which to save the key (/Users/zq/.ssh/id_rsa): id_rsa_github
```
```shell
Enter a file in which to save the key (/Users/zq/.ssh/id_rsa): id_rsa_gitlab
```
分别生成了两组文件，名称分别是 `id_rsa_github1、id_rsa_github2`。

当提示输入密码信息时，直接回车跳过，否则每次拉代码都需要输入密码。

### 添加私钥到本地
```shell
$ ssh-add ~/.ssh/id_rsa_github
$ ssh-add ~/.ssh/id_rsa_gitlab
```
添加后可以使用 `ssh-add -l` 命令进行查看。
### 配置本地密钥
进入 `.ssh` 文件加，修改 `config` 文件，如果没有此文件需要新建。
```shell
$ cd ~/.ssh
$ vim config
```
文件内容：
```
Host github  # 别名，自定义
HostName gitlab.com  # 托管网站的域名
User user2  # 用户名
IdentityFile ~/.ssh/id_rsa_github  # 使用的密钥文件

Host gitlab
HostName gitlab.com
User suer1
IdentityFile ~/.ssh/id_rsa_gitlab
```
### 添加 ssh keys
分别在 gitlab 和 github 上添加 ssh keys，都有详细的添加步骤介绍。比如在 github 添加 ssh keys 页面点击 `generating SSH keys`。

显示公钥再粘贴到 github/gitlab.
```shell
$ cat ~/.ssh/id_rsa_github
$ cat ~/.ssh/id_rsa_gitlab
```

### 测试配置是否成功
直接使用别名就可以。
```shell
$ ssh -T github
$ ssh -T gitlab
```
### 克隆代码
需要将地址更改为别名
```shell
$ git clone git@github.com:zq/test.git
$ git clone git@github:zq/test.git  # 使用别名
```
### 配置已有仓库
如果已经拉取本地仓库，除了修改 `用户名和邮箱`，还需要配置文件。
```shell
$ cd .git
$ vim config
```

修改 config 文件中已有 remote "origin" 信息。
```
[remote "origin"]
    url = git@github.com:zq/test.git
    fetch = +refs/heads/*:refs/remotes/origin/*
```
将 `github.com` 修改为 `github` 别名。