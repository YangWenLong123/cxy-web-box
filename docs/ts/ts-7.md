## 前言

never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时。

never类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

## 如何定义never

-   在函数内部永远会抛出错误，导致函数无法正常结束

```js
function error(message: string): never {
    throw new Error(message);
}
```

-   推断的返回值类型为never

```js
function fail() {
  return error("Something failed");
}
```

-   死循环，永远无法运行到的代码

```js
function infiniteLoop(): never {
  while (true) {}
}
```

## never与void的区别

-   **void** 可以被赋值为 **null** 和 **undefined** 类型。**never** 则是一个不包含值的类型
-   拥有 **void** 返回值类型的函数能正常运行。拥有 **never** 返回值类型的函数无法正常返回，无法终止或会抛出异常

## 相关文章

[TypeScript中的Never类具体有什么用](https://www.zhihu.com/question/354601204)