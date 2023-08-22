## ref()

接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。

```js
function ref<T>(value: T): Ref<UnwrapRef<T>>

interface Ref<T> {
  value: T
}
```

`详细信息`

1. ref 对象是可更改的，也就是说你可以为 .value 赋予新的值。它也是响应式的，即所有对 .value 的操作都将被追踪，并且写操作会触发与之相关的副作用。
2. 如果将一个对象赋值给 ref，那么这个对象将通过 reactive() 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。
3. 若要避免这种深层次的转换，请使用 shallowRef() 来替代。

`示例`
```js
import { ref, defineComponent } from 'vue';
export default defineComponent ({
  setup () {
    const valueNumber = ref(0);
    const valueString = ref('hello world!');
    const valueBoolean = ref(true);
    const valueNull = ref(null);
    const valueUndefined = ref(undefined);

    console.log(valueNumber.value) // 0
    valueNumber.value++
    console.log(valueNumber.value) // 1

    return {
      valueNumber,
      valueString,
      valueBoolean,
      valueNull,
      valueUndefined
    };
  }
});
```

## 在template中访问ref创建的响应式数据
```js
import { ref } from 'vue';
export default {
  setup () {
    const value = ref(1);

    return {
      value,
      msg: 'hello world!'
    };
  }
};
```

```js
<template>
  <p>
    {{ value }} {{ msg }}
  </p>
</template>
```


## 为ref()标注类型

ref 会根据初始化时的值推导其类型：

```ts
import { ref } from 'vue'

// 推导出的类型：Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 Ref 这个类型：

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // 成功！
```

或者，在调用 ref() 时传入一个泛型参数，来覆盖默认的推导行为：

```ts
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // 成功！
```
如果你指定了一个泛型参数但没有给出初始值，那么最后得到的就将是一个包含 undefined 的联合类型：

```ts
// 推导得到的类型：Ref<number | undefined>
const n = ref<number>()
```