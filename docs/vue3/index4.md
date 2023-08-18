## 基本使用
setup() 钩子是在组件中使用组合式 API 的入口，通常只在以下情况下使用：

1. 需要在非单文件组件中使用组合式 API 时。
2. 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时。

我们可以使用响应式 API 来声明响应式的状态，在 setup() 函数中返回的对象会暴露给模板和组件实例。其他的选项也可以通过组件实例来获取 setup() 暴露的属性：

```js
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

在模板中访问从 setup 返回的 ref 时，它会自动浅层解包，因此你无须再在模板中为它写 .value。当通过 this 访问时也会同样如此解包。

setup() 自身并不含对组件实例的访问权，即在 setup() 中访问 this 会是 undefined。你可以在选项式 API 中访问组合式 API 暴露的值，但反过来则不行。

setup() 应该同步地返回一个对象。唯一可以使用 async setup() 的情况是，该组件是 [Suspense](https://cn.vuejs.org/guide/built-ins/suspense.html) 组件的后裔


## 执行时机
在beforecreate之后，create之前执行.


## 访问 Props

setup 函数的第一个参数是组件的 props。和标准的组件一致，一个 setup 函数的 props 是响应式的，并且会在传入新的 props 时同步更新。

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```