## 介绍

Browserslist 是一个前端项目配置工具，功能是在前端工具之间共享目标环境的浏览器信息。它通过向 caniuse 传递查询字符串（queries）来获取目标环境信息。这些 queries 可以写在 .browserslistrc 文件或 package.json 文件中。


## 配置
 - [npm传送门](https://www.npmjs.com/package/browserslist)
  - [github传送门]( https://github.com/browserslist/browserslist)

  1、默认配置

  ```json
    "browserslist": [
      "defaults and supports es6-module",
      "maintained node versions"
    ]
  ```

  Browserslist 的数据都是来自[Can I Use](https://caniuse.com/)的。如果你想知道配置语句的查询结果可以使用[online demo] (https://browserl.ist/)

  下面可以看下默认配置的兼容性查询结果,你就可以看到最新的各个浏览器版本

  ![h.png](http://cdn.alongweb.top/images/webbox/h.png)

  2、推荐配置

  `package.json `
  ```json
    {
      "browserslist": [
        "last 1 version",
        "> 1%",
        "maintained node versions",
        "not dead"
      ]
    }
  ```

  `.browserslistrc`
  ```json
  # Browsers that we support

  last 1 version
  > 1%
  maintained node versions
  not dead
  ```

  3、配置详解


  - `last 1 version`：支持各类浏览器最近的一个版本，这里的 1 是可变的数字。
  - `> 1%`： 支持市场份额大于 1% 的浏览器, 全球超过1%的人使用的浏览器。
  - `> 5% in US`：指定国家使用率覆盖
  - `Firefox ESR`：火狐最新版本
  - `Firefox > 20`： 指定浏览器的版本范围
  - `not ie <=8`：方向排除部分版本
  -  `Firefox 12.1`：指定浏览器的兼容到指定版本
  -  `unreleased versions`： 所有浏览器的beta测试版本
  - `unreleased Chrome versions	`： 指定浏览器的测试版本
  - `since 2013`: 2013年之后发布的所有版本


  比如自己项目这样的配置

  ```json
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
  ```

  筛选后查询,验证：npx browserslist 打印出所有浏览器版本支出情况

  ![i.png](http://cdn.alongweb.top/images/webbox/i.png)

  ## Browsers

  下表将浏览器名称及其目标设备映射为浏览器列表使用的标识符。

  Browser Name                                                                                          | Desktop     | Android               | iOS         | Other Mobile  |
| ----------------------------------------------------------------------------------------------------- | ----------- | --------------------- | ----------- | ------------- |
| Android (WebView)                                                                                     |             | Android               |             |               |
| Baidu                                                                                                 | Baidu       |                       |             |               |
| BlackBerry                                                                                            |             |                       |             | BlackBerry bb |
| Chrome                                                                                                | Chrome      | ChromeAndroid and_chr | ↪︎ ios_saf2 |               |
| Edge                                                                                                  | Edge        | ↪︎ and_chr            | ↪︎ ios_saf2 |               |
| Electron                                                                                              | Electron    |                       |             |               |
| Firefox                                                                                               | Firefox ff  | FirefoxAndroid and_ff | ↪︎ ios_saf2 |               |
| Internet Explorer                                                                                     | Explorer ie |                       |             | ie_mob        |
| Node.js                                                                                               | Node        |                       |             |               |
| [KaiOS Browser](https://medium.com/design-at-kai/what-you-didnt-know-about-kaios-browser-53937ea1636) |             |                       |             | kaios         |
| Opera                                                                                                 | Opera       | op_mob 1              | ↪︎ ios_saf2 |               |
| [Opera Mini](https://en.wikipedia.org/wiki/Opera_Mini)3                                               |             | OperaMini             |             |               |
| [QQ browser](https://en.wikipedia.org/wiki/QQ_browser)                                                |             | and_qq                |             |               |
| Safari                                                                                                | Safari      |                       | iOS ios_saf |               |
| Samsung Internet                                                                                      |             | Samsung               |             |               |
| [UC Browser](https://en.wikipedia.org/wiki/UC_Browser)                                                |             | UCAndroid and_uc

## 支持的插件

Browserslist这个东西单独是没用的，（补充: 在vue官方脚手架中，browserslist字段会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀）下面的搭配的工具列表：

- `Autoprefixer`
- `Babel`
- `postcss-preset-env`
- `eslint-plugin-compat`
- `stylelint-no-unsupported-browser-features`
- `postcss-normalize`

了解更多查看[传送门](https://github.com/browserslist/browserslist-example)