## 介绍

`postcss.config.js` 是 PostCSS 的配置文件。PostCSS 是一个用 JavaScript 工具和插件转换 CSS 代码的工具。在这个配置文件中，你可以定义一些选项和插件，PostCSS 会按照这些配置来处理你的 CSS 代码。 [官网](https://postcss.org/api/#processoptions)

以下是一个基础的 postcss.config.js 文件的示例：

```js
module.exports = {
  plugins: [
    require('postcss-import'),
      require('postcss-mixins'),
      require('postcss-preset-env')({ stage: 1 }),
      require('cssnano'),
  ]
}

```


你也可以根据不同的文件或模式返回不同的配置：

```js
module.exports = (api) => {
  if (/\.sss$/.test(api.file)) {
    return {
      parser: "sugarss",
      plugins: [
        ["postcss-short", { prefix: "x" }],
        "postcss-preset-env",
      ],
    };
  }
  return {
    plugins: [
      ["postcss-short", { prefix: "x" }],
      "postcss-preset-env",
    ],
  };
};

```
在这个配置中，我们根据文件的后缀来返回不同的配置。如果文件的后缀是 .sss，我们会使用 sugarss 解析器，否则我们会使用默认的配置


## 示例
以下是一个使用了`autoprefixer` 和` postcss-px-to-viewport` 插件的 `postcss.config.js` 文件的示例：

```js
module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'not ie <= 11',
          'ff >= 30',
          '> 1%',
          'last 2 versions', // 所有主流浏览器最近2个版本
        ],
        grid: true ,
    },
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要转换的单位，默认为"px"
      viewportWidth: 1920, // 设计稿的视口宽度
      unitPrecision: 5, // 单位转换后保留的精度
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'vw', // 希望使用的视口单位
      fontViewportUnit: 'vw', // 字体使用的视口单位
      selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: false, // 媒体查询里的单位是否需要转换单位
      replace: true, //  是否直接更换属性值，而不添加备用属性
      exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw', // 横屏时使用的单位
      landscapeWidth: 1920 // 横屏时使用的视口宽度
    }
  }
}

```