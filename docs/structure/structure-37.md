## 安装

```
npm install -D husky
```

检测提交  `commit`  提交记录是否符合规范需要  `commitlint`

```
npm install -D @commitlint/config-conventional @commitlint/cli
```

检测提交暂存区的代码是否合规需要  `lint-staged`

```
npm install -D lint-staged
```

## 配置

### lint-staged

在  `package.json`  文件中添加相关配置

```
"lint-staged": {
  "*.{js,ts}": "eslint --fix"
}
```

### commitlint

在项目下新建文件  `commitlint.config.js`  文件写入配置

```
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

也可以添加自定义配置规则，相关文档  [commitlint rules](https://link.segmentfault.com/?enc=2545RGmGP5YJOFmHNigLVw%3D%3D.5NSoYP%2Bxyn6MrKYIdhyc9ZaKG011F3WmVx1LY5DXe1P5wnGSVvn6%2FEfJzdrLYxpA)。

### husky

上面已经配置好了相关依赖，我们需要使用  `husky`  将他们与实际操作关联起来。

网上及官方文档提供的命令无法在我本机跑起来，有部分命令像是  `husky add`  只能使用  `yarn`  执行成功，所以这里主要使用手动添加的方式说明。

在  `package.json`  中添加新的  `scripts` （对应命令：`npm set-script prepare "husky install"`）

```
"scripts": {
  "prepare": "husky install"
}
```

> `prepare`  是  `NPM`  操作生命周期中的一环，在执行  `install`  的时候会按生命周期顺序执行相应钩子：  
> `NPM7`： `preinstall -> install -> postinstall -> prepublish -> preprepare -> prepare -> postprepare`  文档  [npm7 scripts](https://link.segmentfault.com/?enc=gTeJAGWdy%2BLp5AnE57qKFQ%3D%3D.yv7jFKoJXRNv%2FOvY6j5mgnJC%2BdMvkiLPGTHy8U2kd7NCrnDP0n3aUgfvv2ZPWXgM)  
> `NPM6`： `preinstall` -> `install` -> `postinstall`，同时也会触发  `prepublish`、`prepare`  文档  [npm6 scripts](https://link.segmentfault.com/?enc=YiYJhERveiGzakF1z4sJPQ%3D%3D.F0fMNoLl7Iqr9N1d6N0cwlPYlns7TUiNKkNosxLvUwFZ7nWGdiyXO9cusEA07KCo)

执行  `npm run prepare` ，在项目下会生成一个  `.husky`  文件夹，用户可以在其中配置相关  `git hooks`。

在  `.husky`  下添加一个文件，名称为相关  `git hooks`  的名称。

添加  `pre-commit`  文件，写入配置（对应命令：`npx husky add .husky/pre-commit "npx lint-staged --allow-empty $1"`）

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged --allow-empty $1
```

这样就与  `lint-staged`  关联起来了，在提交代码的时候就会按  `lint-staged`  配置去检测文件。

添加  `commit-msg`  文件，写入配置（对应命令：`npx husky add .husky/commit-msg "npx commitlint --edit $1"`）

这样在提交时会检查  `commit`  信息是否符合开发规范

> `git hooks`中，提交时的钩子有：`pre-commit`  提交之前执行（`git commit --no-verify`  可以跳过此阶段） -> `prepare-commit-msg`  启动提交信息编辑之前 -> `commit-msg`  填写提交信息之后 -> `post-commit`  提交过程结束最后。 相关文档  [Git Hooks](https://link.segmentfault.com/?enc=RYN2PbIeLk8QQ1URCA0kQQ%3D%3D.lTsxhpHH4mrfXQPT9LMa2nrD5%2BqFfZ5kVe0yly4M8AsxdjaCBNy1ZivDkaGM%2FLTZ%2B1KRkXmQJNl47KPUmPFrjkrx2hr%2Fgrzj3gYvmdulCT8UuZBcJlWxzz8iO%2BddilSm)

## 测试

最后可以提交一个不规范的文件测试一下，看看配置的钩子是否有正常运行。

## 旧版升级

旧版的升级其实差不多，就是将  `package.json`  中的配置信息移动到外部文件中，并且添加一个 NPM 的生命周期。 `husky`  官方也有提供一个升级工具，可以试一试  [husky-4-to-7](https://link.segmentfault.com/?enc=288fVU7X59JCQDTvRAGk0A%3D%3D.CobpE3KdjYJhdBHAf1FZ5jvI587WrV8t5irEmu9SOW3catwTkAVvbV6tlZOH9lFh)
