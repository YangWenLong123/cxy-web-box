##  介绍

Babel是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。Babel主要可以为您做以下事情：

  - 转换语法
  - 目标环境中缺少的 Polyfill 功能（通过第三方 Polyfill，例如`core-js`）
  - 源代码转换（`codemods`）
  - [查看更多](https://babeljs.io/videos)


文档：https://www.babeljs.cn/docs/

## 结构
很多人以为Babel只有plugins、presets等几个配置。其实不止，我们看看Babel配置文件大致架构：

`babel.config.js`
```js
  module.exports = {
    ...,
    envName: "development",
    plugins: [],
    presets: [],
    passPerPreset: false,
    targets: {},
    browserslistConfigFile: true,
    browserslistEnv: undefined,
    inputSourceMap: true
    ...
  }
```
我们一般主要用到的就是plugins、presets这两个

## @babel/preset-env

安装：`npm install --save-dev @babel/preset-env`

1、项目中主要通过`@babel/preset-env`来配置编译降级，会根据收集到的特性支持情况，确定需要转换的特性和语法。这包括需要转换的 ECMAScript 版本、需要转换的特性和语法等


babel.config.json,建议使用这种,
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

babel.config.js
```js
const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = { presets };
```

2、指定浏览器版本
默认情况下`@babel/preset-env`将使用`browserslist` 配置源 ，除非设置了targets或ignoreBrowserslistConfig选项。

例如，仅包含浏览器市场份额 >0.25% 的用户所需的填充和代码转换（忽略没有安全更新的浏览器，如 IE 10 和 BlackBerry）：

`babel.config.json`
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": "3.22"
      }
    ]
  ]
}
```

`.browserslistrc`
```json
> 0.25%
not dead
```

or

`package.json`
```
{ "browserslist": "> 0.25%, not dead" }
```

3、如果的文档targets中没有指定与 browserslist 相关的选项，Babel 会假设你的目标是最旧的浏览器，例如，`@babel/preset-env`将所有 `ES2015-ES2020` 代码转换为 `ES5` 兼容。

我们建议设置targets以减少输出代码大小。

`babel.config.json`

```json
{
  "targets": "> 0.25%, not dead"
}
```


## @babel/core

从`core`可以看出，它是Babel实现编译的核心。所以我们如果要使用`Babel`，`@babel/core`这个包一定是必不可少的。另外我们平常说的`Babel 6`、`Babel 7`指的就是`@babele/core`的版本


## @babel/cli
官网解释：Babel自带了一个内置的CLI命令行工具，可通过命令行编译文件,简单地说就是，让我们可以在终端里使用命令来编译（这样可以更好的调试打印信息）：

```js
  npx babel index.js
```

## polyfill
ES6+除了提供很多简洁的语法（let、class、() => {}等）外，还为我们提供了很多便捷的API（Promise、Symbol、Array.prototype.includes等）。但旧版本浏览器是不支持这些API的，而polyfill存放了这些API的方法与实现，所以它可以使得这些不支持的浏览器，支持这些API。

Babel配置polyfill的过程，就是实现旧版本浏览器对这些API支持的过程。


...