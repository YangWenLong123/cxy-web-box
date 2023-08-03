## 介绍

ESLint 是一个根据方案识别并报告 ECMAScript/JavaScript 代码问题的工具，其目的是使代码风格更加一致并避免错误。在很多地方它都与 JSLint 和 JSHint 类似，除了：

- ESLint 使用 Espree 对 JavaScript 进行解析。
- ESLint 在代码中使用 AST 评估方案。
- ESLint 完全是插件式的，每个规则都是一个插件，你可以在运行时中添加更多插件。


## 配置
在项目中，我们通常在根目录下创建一个 .eslintrc.js 或 .eslintrc.json 文件来配置 ESLint。以下是一个基本的 .eslintrc.js 文件配置示例

```json
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};

```

在这个配置中cn.eslint.org：

- env 定义了预定义的全局变量。
- extends 指定了一组预定义的规则。
- globals 定义了全局变量。
- parserOptions 定义了解析器的选项。
- rules 自定义了一组规则。

ESLint 的配置是完全可定制的，你可以调整已有的规则，或者添加自定义的规则以满足你的项目需求 [官网](https://zh-hans.eslint.org/docs/latest/use/getting-started)


## 配置详解

点击查看，[Eslint](http://www.alongweb.top/structure/structure-12.html)