## 功能函数

1. [isRef()](#isref)
2. [unRef](#unref)
3. [toRef](#toref)
4. [toRefs](#torefs)
5. [toValue](#tovalue)
6. [isProxy](#isproxy)
7. [isReactive](#isreactive)
8. [isReadonly](#isreadonly)

## isRef()
检查某个值是否为 ref。

```ts
function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
```

`示例`

```js
import { reactive, isRef, ref } from "vue";
const count = ref(1);
const testObj = reactive({
  a: 1,
});
console.log(isRef(count)); //true
console.log(isRef(testObj)); //false
```


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



## toRef()
为源响应式对象上的某个属性创建一个ref对象，二者内部操作的是同一个数据值,更新时二者是同步的。相当于浅拷贝一个属性.

区别ref: 拷贝的是一份新的数据单独操作，更新时相互不影响，相当于深拷贝。

场景：当要将某个prop的ref传递给某个复合函数时，toRef很有用.

```js
import { reactive, ref, toRef } from 'vue'

export default {
  setup () {
    const m1 = reactive({
      a: 1,
      b: 2
    })

    const m2 = toRef(m1, 'a');
    const m3 = ref(m1.a);

    const update = () => {
      // m1.a++;//m1改变时，m2也会改变
      // m2.value++; //m2改变时m1同时改变
      m3.value++; //m3改变的同时，m1不会改变
    }

    return {
      m1,
      m2,
      m3,
      update
    }
  }
}
```

可以将值、refs 或 getters 规范化为 refs (3.3+)。

```js
// 按原样返回现有的 ref
toRef(existingRef)

// 创建一个只读的 ref，当访问 .value 时会调用此 getter 函数
toRef(() => props.foo)

// 从非函数的值中创建普通的 ref
// 等同于 ref(1)
toRef(1)
```


## toRefs()
torefs()函数可以将reactive()创建出来的响应式对象转换为普通的对象，只不过这个对象上的每个属性节点都是ref()类型的响应式数据

1. 当从组合式函数中返回响应式对象时，toRefs 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性
```js
<template>
    <p>
      <!-- 可以不通过state.value去获取每个属性 -->
      {{ count }} {{ value }}
    </p>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
export default {
  setup () {
    const state = reactive({
      count: 0,
      value: 'hello',
    })

    return {
      ...toRefs(state)
    };
  }
};
</script>
```

2. 链接reactive

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型：{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// 这个 ref 和源属性已经“链接上了”
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```

## toValue() <sup style="color:#42b883">3.3+</sup>

将值、refs 或 getters 规范化为值。这与 unref() 类似，不同的是此函数也会规范化 getter 函数。如果参数是一个 getter，它将会被调用并且返回它的返回值。

```js
toValue(1) //       --> 1
toValue(ref(1)) //  --> 1
toValue(() => 1) // --> 1
```

在组合式函数中规范化参数：

```ts
import type { MaybeRefOrGetter } from 'vue'

function useFeature(id: MaybeRefOrGetter<number>) {
  watch(() => toValue(id), id => {
    // 处理 id 变更
  })
}

// 这个组合式函数支持以下的任意形式：
useFeature(1)
useFeature(ref(1))
useFeature(() => 1)
````

`异步状态示例`

在做异步数据请求时，我们常常需要处理不同的状态：加载中、加载成功和加载失败。

```js
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
```

如果在每个需要获取数据的组件中都要重复这种模式，那就太繁琐了。让我们把它抽取成一个组合式函数：

```js
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

现在我们在组件里只需要：

```js
<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

接收响应式状态

useFetch() 接收一个静态 URL 字符串作为输入——因此它只会执行一次 fetch 并且就此结束。如果我们想要在 URL 改变时重新 fetch 呢？为了实现这一点，我们需要将响应式状态传入组合式函数，并让它基于传入的状态来创建执行操作的侦听器。

举例来说，useFetch() 应该能够接收一个 ref：

```js
const url = ref('/initial-url')

const { data, error } = useFetch(url)

// 这将会重新触发 fetch
url.value = '/new-url'
```

或者接收一个 getter 函数：

```js
// 当 props.id 改变时重新 fetch
const { data, error } = useFetch(() => `/posts/${props.id}`)
```

我们可以用 `watchEffect()` 和 `toValue()` API 来重构我们现有的实现：

```js
// fetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  watchEffect(() => {
    // 在 fetch 之前重置状态
    data.value = null
    error.value = null
    // toValue() 将可能的 ref 或 getter 解包
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  })

  return { data, error }
}
```

toValue() 是一个在 3.3 版本中新增的 API。它的设计目的是将 ref 或 getter 规范化为值。如果参数是 ref，它会返回 ref 的值；如果参数是函数，它会调用函数并返回其返回值。否则，它会原样返回参数。它的工作方式类似于 unref()，但对函数有特殊处理。

## isProxy()

检查一个对象是否是由 `reactive()`、`readonly()`、`shallowReactive()` 或 `shallowReadonly()` 创建的代理。

```ts
function isProxy(value: unknown): boolean
```

## isReactive()

检查一个对象是否是由 reactive() 或 shallowReactive() 创建的代理。

```ts
function isReactive(value: unknown): boolean
```

## isReadonly()
检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。

通过 `readonly()` 和 `shallowReadonly()` 创建的代理都是只读的，因为他们是没有 set 函数的 computed() ref。

```ts
function isReadonly(value: unknown): boolean
```