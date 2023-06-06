## 介绍

-   unknown 是 TypeScript 3.0 引入了新类型,是 any 类型对应的安全类型。

| 相同点                     | let value: any | let value: unknown |
| ----------------------- | -------------- | ------------------ |
| value = true;           | OK             | OK                 |
| value = 1;              | OK             | OK                 |
| value = "Hello World";  | OK             | OK                 |
| value = Symbol("type"); | OK             | OK                 |
| value = {}              | OK             | OK                 |
| value = []             | OK             | OK                 |

-   unknown 和 any 的主要区别是 unknown 类型会更加严格: 在对unknown类型的值执行大多数操作之前,我们必须进行某种形式的检查, 而在对 any 类型的值执行操作之前,我们不必进行任何检查。
-   当 unknown 类型被确定是某个类型之前,它不能被进行任何操作

| 不同点            | let value: any | let value: unknown |
| -------------- | -------------- | ------------------ |
| value.foo.bar; | OK             | ERROR              |
| value();       | OK             | ERROR              |
| new value();   | OK             | ERROR              |
| value[0][1]; | OK             | ERROR              |

## 例子

有这么一个函数

```js
function divide(param: any) {
  return param / 2;
}
```

把 param 定义为 any 类型，TS 就能编译通过，没有把潜在的风险暴露出来，万一传的不是 number 类型，不就没有达到预期了吗。

把 param 定义为 unknown 类型 ，TS 编译器就能拦住潜在风险，如下图，

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee9f77b1ea204183a23af02d99b1af62~tplv-k3u1fbpfcp-zoom-1.image)

因为不知道 param 的类型，使用运算符 /，导致报错。

再配合类型断言，即可解决这个问题，

```js
function divide(param: unknown) {
  return param as number / 2;
}
```