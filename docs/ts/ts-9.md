## 介绍

BigInt 类型在 TypeScript3.2 版本被内置，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了JavaScript构造函数 Number 能够表示的安全整数范围。

```js
let res: BigInt = BigInt(Number.MAX_SAFE_INTEGER)
```

同 Symbol 情况类似，在使用 BigInt 的时候，必须添加 ESNext 的编译辅助库, 如下：

```js
"lib": ["es6", "dom", "ESNext"]
```

## 文章

[BigInt-MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)