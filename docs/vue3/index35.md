## defineAsyncComponent()
`defineAsyncComponent`是Vue3中的一个函数，用于定义异步加载的组件。它可以在需要的时候才动态地加载组件代码，以提高应用的性能和加载速度。`defineAsyncComponent`接受一个工厂函数作为参数，该函数返回一个Promise，用于异步加载组件的代码



在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。Vue 提供了 defineAsyncComponent 方法来实现此功能：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

如你所见，defineAsyncComponent 方法接收一个返回 Promise 的加载函数。这个 Promise 的 resolve 回调方法应该在从服务器获得组件定义时调用。你也可以调用 reject(reason) 表明加载失败。


ES 模块动态导入也会返回一个 Promise，所以多数情况下我们会将它和 defineAsyncComponent 搭配使用。类似 Vite 和 Webpack 这样的构建工具也支持此语法 (并且会将它们作为打包时的代码分割点)，因此我们也可以用它来导入 Vue 单文件组件：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

与普通组件一样，异步组件可以使用 app.component() 全局注册：

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

也可以直接在父组件中直接定义它们：

```js
<script setup>
import { defineAsyncComponent } from 'vue'

const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
</script>

<template>
  <AdminPage />
</template>
```

## 加载与错误状态
异步操作不可避免地会涉及到加载和错误状态，因此 defineAsyncComponent() 也支持在高级选项中处理这些状态：

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```

## 场景

我们简单的模拟请求文章数据的 ArticleList.vue 组件：

```js
// ArticleList.vue
<template>
  <div> {{ article }} </div>
</template>

<script setup>
// API call
const getArticleInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const article = {
    title: 'Vue3 中使用 defineAsyncComponent 延迟加载组件',
    author: 'lio'
  }
  return article
}

const article = await getArticleInfo()
</script>

```

我们使用 defineAsyncComponent 延迟加载 组件，并使用 Suspense 元素包装这个组件：

```js
<template>
  <button @click="show = true"> Login </button>
  <Suspense v-if="show">
    <template #default>
      <ArticleList />
    </template>
    <template #fallback>
      <p> Loading... </p>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const ArticleList = defineAsyncComponent(() => import('@/components/ArticleList.vue'))
const show = ref(false)
</script>
```

默认情况下，我们使用 defineAsyncComponent 定义的所有组件都是可挂起的。

这意味着，如果组件的父链中存在 Suspense，它将被视为该 Suspense 的异步依赖项。我们的组件加载、错误、延迟和超时选项将被忽略，而将由 Suspense 处理。

最终效果如下：

![Alt text](image-6.png)

用户将看到 Loading...，然后在 1s 之后请求完数据后，展示完整的组件。