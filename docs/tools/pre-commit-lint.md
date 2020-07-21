# Git hooks with Husky

提交代码（commit）前做 ESLint 检查，可以使用 git 的钩子（pre-commit）执行 ESLint 命令，每一个 git 项目在 .git/hook 文件夹下存在许多可执行文件，找到 pre-commit 文件，修改内容即可。默认的文件名可能是 pre-commit.sample，需要修改文件名。

直接修改 git 钩子文件只会在本地起作用，不能提交到远程仓库，更简单的方法是使用 [husky](https://github.com/typicode/husky#readme) 。安装后在 package.json 中增加配置，或者新建一个单独的配置文件。

```shell
npm install husky -D
```

```json
{
  "script": {
    "serve": "vue-cli-service serve",
    "lint": "vue-cli-service lint --quiet",
    "build": "vue-cli-service build --mode fordev"
  }
  "husky": {
    "hooks": {
      "pre-commit": "vue-cli-service lint"
    }
  }
}
```

每次运行 `git commit`会先执行 `npm run lint` ，如果有 error，commit 操作就不会执行。这样可以避免提交有问题的代码。例如开发时使用 console，ESLint 配置文件设置规则是 `"no-console": 0`，为了防止提交代码前忘记删除，就需要再做一次代码检测，而且还需要给 ESLint 增加一个额外的配置文件，包含`"no-console": 2` 的规则。额外指定的配置文件优先级更高。

```js
// .ESLintrc-pre-commit.js
module.exports = {
  rules: {
    "no-console": 2
  }
}
```

修改 package.json 文件：

```diff
-- "pre-commit": "vue-cli-service lint"
++ "pre-commit": "vue-cli-service lint -c ./.ESLintrc-pre-commit.js"
```

此时 ESLint 检测范围是整个项目，使用 [lint-staged](https://github.com/okonet/lint-staged) 工具可以将范围缩小至需要提交的文件（staged files）速度更快。安装后修改 package.json 文件：

```shell
npm install lint-staged -D
```

```diff
   "husky": {
     "hook": {
--     "pre-commit": "vue-cli-service lint -c ./.eslintrc-pre-commit.js"
++     "pre-commit": "lint-staged"
     }
   },
++ "lint-staged": {
++   "*.{js,vue}": [
++     "vue-cli-service lint --c ./.eslintrc-pre-commit.js"
++   ]
++ }
```

加上 `--fix` 会自动修复。

```diff
--- "vue-cli-service lint --c ./.eslintrc-pre-commit.js"
+++ "vue-cli-service lint --c ./.eslintrc-pre-commit.js --fix"
```

> 1. vue 项目可以使用 [gitHooks](https://cli.vuejs.org/guide/cli-service.html#git-hooks)。
> 2. husky 要求 node 版本 >= 10，Git 版本 >= 2.13.0。
> 3. 安装 husky 会自动修改 git 钩子文件，使用 cnpm 可能会导致使用时 ESLint 命令不执行。



