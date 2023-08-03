## 介绍
`prettier`是一种代码格式化工具，可以让整个项目按照统一的代码风格来编写，避免不同开发者使用不同的缩进、引号等风格，使代码看起来混乱不一致.[官网](https://www.prettier.cn/)


## 在线调试工具

https://www.prettier.cn/playground

## 默认配置

配置详情请参考：https://prettier.io/docs/en/options.html

```json
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": false,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "printWidth": 80, //当行字符的长度，推荐80，也有人喜欢100或者120；
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true, //语句末尾是否要加分号，默认值true，选择false表示不加；
  "singleAttributePerLine": false,
  "singleQuote": true,  //使用单引号还是双引号，选择true，使用单引号；
  "tabWidth": 2,  //tab是空格的情况下，是几个空格，选择2个；
  "trailingComma": "es5", //在多行输入的尾逗号是否添加，不需要添加设置为 `none`，需要添加设置为 all；
  "useTabs": true,   //使用tab缩进还是空格缩进，false表示空格缩进；
  "vueIndentScriptAndStyle": false  //表示.vue文件中，<script>和<style>标签中的代码缩进两个单元格
}
```

## 支持文件类型

1、json文件
```json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

2、`JS(ESM)`文件类型,如prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs
```js
const config = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true,
};

export default config;
```

3、`JS(CommonJS)`文件类型，如prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs
```js
const config = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true,
};

module.exports = config;
```

4、YAML
```json
# .prettierrc or .prettierrc.yaml
trailingComma: "es5"
tabWidth: 4
semi: false
singleQuote: true
```

5、TOML
```json
# .prettierrc.toml
trailingComma = "es5"
tabWidth = 4
semi = false
singleQuote = true
```

## .prettierignore文件配置

忽略要格式代码的文件

```
/dist/*
/node_modules/**

**/*.svg
**/*.sh

/public/*
```