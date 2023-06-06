## 介绍

Symbol 是在ES2015之后成为新的原始类型, 所以在使用 Symbol 的时候，必须添加 es6 的编译辅助库, 如下：

```js
"lib": ["es6", "dom"]
```

注意：如果不写 lib 时 TS 会自己默认识别编译， 但如果写了 lib 就必须指定所有需要使用的 辅助编译库， 否则就会导致编译不成功

```js
let only: Symbol = Symbol(18)
```

## 文章

[Symbol-阮一峰](https://es6.ruanyifeng.com/#docs/symbol)