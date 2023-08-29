## 前言

 `script setup` 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。当同时使用 SFC 与组合式 API 时该语法是默认推荐。相比于普通的 `script` 语法，它具有更多优势：

- 更少的样板内容，更简洁的代码。
- 能够使用纯 TypeScript 声明 props 和自定义事件。
- 更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)。
- 更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)。

## 基本语法

1. 要启用该语法，需要在 `script` 代码块上添加 `setup` attribute：

```js
<script setup>
console.log('hello script setup')
</script>
```

里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的 `script` 只在组件被首次引入的时候执行一次不同，`script setup`中的代码会在每次组件实例被创建的时候执行。

2. 当使用 `script setup` 的时候，任何在 `script setup` 声明的顶层的绑定 (包括变量，函数声明，以及 import 导入的内容) 都能在模板中直接使用：

  ```js
  <script setup>
  // 变量
  const msg = 'Hello!'

  // 函数
  function log() {
    console.log(msg)
  }
  </script>

  <template>
    <button @click="log">{{ msg }}</button>
  </template>
  ```

  3. `import` 导入的内容也会以同样的方式暴露。这意味着我们可以在模板表达式中直接使用导入的 `helper` 函数，而不需要通过 `methods` 选项来暴露它：

  ```js
  <script setup>
  import { capitalize } from './helpers'
  </script>

  <template>
    <div>{{ capitalize('hello') }}</div>
  </template>
  ```


## 响应式
响应式状态需要明确使用响应式 API 来创建。和 `setup()` 函数的返回值一样，ref 在模板中使用的时候会自动解包：

```js
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## 使用组件
1. `script setup` 范围里的值也能被直接作为自定义组件的标签名使用：

    ```js
    <script setup>
    import MyComponent from './MyComponent.vue'
    </script>

    <template>
      <MyComponent />
    </template>
    ```

2. 动态组件

    由于组件是通过变量引用而不是基于字符串组件名注册的，在 `script setup` 中要使用动态组件的时候，应该使用动态的 :is 来绑定：

    ```js
    <script setup>
    import Foo from './Foo.vue'
    import Bar from './Bar.vue'
    </script>

    <template>
      <component :is="Foo" />
      <component :is="someCondition ? Foo : Bar" />
    </template>
    ```

    请注意组件是如何在三元表达式中被当做变量使用的。

3. 归组件

    一个单文件组件可以通过它的文件名被其自己所引用。例如：名为 FooBar.vue 的组件可以在其模板中用 `FooBar` 引用它自己。请注意这种方式相比于导入的组件优先级更低。如果有具名的导入和组件自身推导的名字冲突了，可以为导入的组件添加别名：

    ```js
    import { FooBar as FooBarChild } from './components'
    ```

4. 命名空间组件

    可以使用带 . 的组件标签，例如 `Foo.Bar` 来引用嵌套在对象属性中的组件。这在需要从单个文件中导入多个组件的时候非常有用：

    ```js
    <script setup>
    import * as Form from './form-components'
    </script>

    <template>
      <Form.Input>
        <Form.Label>label</Form.Label>
      </Form.Input>
    </template>
    ```

## 使用自定义指令
全局注册的自定义指令将正常工作。本地的自定义指令在 `script setup` 中不需要显式注册，但他们必须遵循 vNameOfDirective 这样的命名规范：

```js
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // 在元素上做些操作
  }
}
</script>
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

如果指令是从别处导入的，可以通过重命名来使其符合命名规范：

```js
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```



## defineProps

获取组件传值

```js
<template>
  <h1>{{ msg }}</h1>
<div @click="clickThis">1111</div>
</template>

<script setup lang="ts">
  defineProps<{ // 采用ts专有声明，无默认值
  msg: string,
  num?: number
}>()
// 采用ts专有声明，有默认值
interface Props {
  msg?: string
  labels?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})

defineProps({ // 非ts专有声明
  msg: String,
  num: {
    type:Number,
    default: ''
  }
})
</script>

<style scoped lang="less">
</style>
```

## defineEmits

子组件向父组件事件传递

```js
<template>
  <div @click="clickThis">点我</div>
</template>

<script setup lang="ts">
    /*ts专有*/
  const emit= defineEmits<{
    (e: 'click', num: number): void
  }>()
    /*非ts专有*/
  const emit= defineEmits(['click'])

  const clickThis = () => {
    emit('click',2)
  }
</script>

<style scoped lang="less">
</style>
```

## defineExpose

子组件暴露自己的属性，父组件直接获取

```js
<template>
  <div>子组件helloword.vue</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(123456)
defineExpose({
  count
})
</script>

<style scoped lang="less">
</style>
```

```js
<template>
  <div @click="helloClick">父组件</div>
  <helloword ref="hello"></helloword>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import helloword from './components/HelloWorld.vue'
const hello = ref(null)
const helloClick = () => {
  console.log(hello.value.count) // 123456
}
</script>


<style lang="less" scoped>
</style>
```

在Vue 3中调用子组件的方法可以通过以下步骤实现：

1.  在子组件中定义需要调用的方法，并使用`defineExpose`语法糖将其暴露出来。这是因为在Vue 3中，使用`<script setup>`标签的变量或方法需要手动暴露才能在组件外部直接访问到。

```js
   <!-- 子组件 Child.vue -->
   <script setup>
   const childMethod = () => {
     console.log('child method.')
   }
   // 主动暴露childMethod方法
   defineExpose({ childMethod })
   </script>


```

2.  在父组件中引用子组件，并使用`ref`给子组件添加一个引用。

```js
   <!-- 父组件 Parent.vue -->
   <template>
     <div>
       <Child ref="childRef" />
     </div>
   </template>
   <script>
   import { ref } from 'vue'
   import Child from './Child.vue'

   export default {
     components: {
       Child
     },
     setup() {
       const childRef = ref(null)
       return {
         childRef
       }
     }
   }
   </script>


```

3.  在父组件的代码中，通过访问`childRef.value`来调用子组件的方法。

```js
   <!-- 父组件 Parent.vue -->
   <script>
   export default {
     // ...
     methods: {
       callChildMethod() {
         this.$refs.childRef.value.childMethod()
       }
     }
   }
   </script>


```

## defineOptions <sup style="color: #10b981">3.3+</sup>

可以通过 defineOptions 宏在 `script setup` 中使用选项式 API，也就是说可以在一个宏函数中设置 `name`, `props`, `emits`, `render`。

1. 基本用法

```js
<script setup lang="ts">
import { useSlots } from 'vue'
defineOptions({
  name: 'Foo',
  inheritAttrs: false,
  mounted() {
    console.log('mounted')
  },
  ...
})
const slots = useSlots()
</script>
```

2. `script setup` 中使用 JSX

```ts
<script setup lang="tsx">
defineOptions({
  render() {
    return <h1>Hello World</h1>
  },
})
</script>
```


## defineSlots <sup style="color: #10b981">TS、3.3+</sup>

使用 defineSlots 可以在 `script setup` 中声明 SFC 中插槽的类型

```ts
<script setup lang="ts">
defineSlots<{
  // 插槽名称
  title: {
    // 作用域插槽
    foo: 'bar' | boolean
  }
}>()
</script>
```

`例子`

比如我们有一个分页器组件，我们可以通过插槽来控制具体的 item 要如何渲染。

```ts
<script setup lang="ts" generic="T">
// 子组件 Paginator
defineProps<{
  data: T[]
}>()

defineSlots<{
  default(props: { item: T }): any
}>()
</script>
```

```ts
<template>
  <!-- 父组件 -->
  <Paginator :data="[1, 2, 3]">
    <template #default="{ item }">{{ item }}</template>
  </Paginator>
</template>

```
我们在传递了 data 参数，它是 number[]，所以 item 也会被推断为 number。item 的类型会根据传给 data 参数的类型而改变。

## useSlots和useAttrs

在 `script setup` 使用 `slots` 和 `attrs` 的情况应该是相对来说较为罕见的，因为可以在模板中直接通过 `$slots` 和 `$attrs` 来访问它们。在你的确需要使用它们的罕见场景中，可以分别用 `useSlots` 和 `useAttrs` 两个辅助函数：

```js
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```
`useSlots` 和 `useAttrs`是真实的运行时函数，它的返回与 `setupContext.slots` 和 `setupContext.attrs` 等价。它们同样也能在普通的组合式 API 中使用。`

## 泛型 <sup style="color: #10b981">TS</sup>

可以使用 `script` 标签上的 `generic` 属性声明泛型类型参数：

```ts
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

`generic` 的值与 `TypeScript` 中位于 <...> 之间的参数列表完全相同。例如，您可以使用多个参数，`extends` 约束，默认类型和引用导入的类型：

```ts
<script
  setup
  lang="ts"
  generic="T extends string | number, U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```