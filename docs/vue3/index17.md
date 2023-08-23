## toRaw

`toRaw()`函数是一个非常有用的工具，它可以用来获取响应式对象的原始版本.`toRaw()` 可以返回由 `reactive()`、`readonly()`、`shallowReactive()` 或者 `shallowReadonly()` 创建的代理对应的原始对象。

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```