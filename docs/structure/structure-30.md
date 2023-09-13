## 安装

```bash
npm install -D @commitlint/config-conventional @commitlint/cli
```

## commitlint

在项目下新建文件 `commitlint.config.js` 文件写入配置

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // 校验规则
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "revert",
        "build",
      ],
    ],
    "type-case": [0],
    "type-empty": [0],
    "scope-empty": [0],
    "scope-case": [0],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
    "header-max-length": [0, "always", 72],
  },
};
```

也可以添加自定义配置规则，相关文档 [commitlint rules](https://commitlint.js.org/#/reference-rules)。
