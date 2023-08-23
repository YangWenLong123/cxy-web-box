## isReadonly()
检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。

通过 `readonly()` 和 `shallowReadonly()` 创建的代理都是只读的，因为他们是没有 set 函数的 computed() ref。

```ts
function isReadonly(value: unknown): boolean
```