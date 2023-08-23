## unref()
如果参数是 ref，则返回内部值，否则返回参数本身。这是`val = isRef(val) ? val.value : val `计算的一个语法糖。

```ts
function unref<T>(ref: T | Ref<T>): T
```

通过这个语法糖我们可以看出它可以对响应式对象解除响应式引用,比如我们只想获取一个响应式的值,但不想要它的响应式可以使用它解除引用


```js
<template>
  <div>
    {{ unRefAsCount }}
    {{ count }}
    <button @click="addCount">+1</button>
  </div>
</template>

<script lang='ts' setup>
import { unref, ref } from "vue"
const count = ref(1)
let unRefAsCount = unref(count)
const addCount = () => {
    count.value++
}
</script>

```
代码中的 unRefAsCount 是不具备响应式的

![a3.png](http://cdn.alongweb.top/images/webbox/a3.webp)