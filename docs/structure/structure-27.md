## 介绍

`.eslintignore` 文件是用来告诉 ESLint 忽略特定文件和目录的。这个文件是一个纯文本文件，其中的每一行都是一个 glob 模式，表明哪些路径应该被忽略检测。

当 ESLint 运行时，在确定哪些文件要检测之前，它会在当前工作目录中查找一个 .eslintignore 文件。如果找到了这个文件，当遍历目录时，将会应用这些偏好设置。

## 示例

```
# 忽略所有的 .js 文件
**/*.js

# 忽略 node_modules 目录
node_modules/

# 忽略 dist 目录
dist/

# 忽略特定的文件
src/someFileToIgnore.js

```

更多配置请参考:https://zh-hans.eslint.org/docs/latest/use/configure/ignore