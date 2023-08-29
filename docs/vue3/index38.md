## 前言

仅列出了一些可能需要解释其使用方式的常用工具类型。有关导出类型的完整列表，请查看[源代码](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131)。


## PropType <T />
用于在用运行时 props 声明时给一个 prop 标注更复杂的类型定义。
```ts
import type { PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

export default {
  props: {
    book: {
      // 提供一个比 `Object` 更具体的类型
      type: Object as PropType<Book>,
      required: true
    }
  }
}
```

## MaybeRef<T/> <sup style="color: #42b883">3.3+</sup>

T | Ref<T/> 的别名。对于标注[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)的参数很有用。


## MaybeRefOrGetter<T/><sup style="color: #42b883">3.3+</sup>

T | Ref<T/> | (() => T) 的别名。对于标注[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)的参数很有用。

## ExtractPropTypes<T/>

从运行时的 props 选项对象中提取 props 类型。提取到的类型是面向内部的，也就是说组件接收到的是解析后的 props。这意味着 boolean 类型的 props 和带有默认值的 props 总是一个定义的值，即使它们不是必需的。

要提取面向外部的 props，即父组件允许传递的 props，请使用 `ExtractPublicPropTypes`。

```ts
const propsOptions = {
  foo: String,
  bar: Boolean,
  baz: {
    type: Number,
    required: true
  },
  qux: {
    type: Number,
    default: 1
  }
} as const

type Props = ExtractPropTypes<typeof propsOptions>
// {
//   foo?: string,
//   bar: boolean,
//   baz: number,
//   qux: number
// }
```

## ExtractPublicPropTypes<T/>

从运行时的 props 选项对象中提取 prop。提取的类型是面向外部的，即父组件允许传递的 props。

```ts
const propsOptions = {
  foo: String,
  bar: Boolean,
  baz: {
    type: Number,
    required: true
  },
  qux: {
    type: Number,
    default: 1
  }
} as const

type Props = ExtractPublicPropTypes<typeof propsOptions>
// {
//   foo?: string,
//   bar?: boolean,
//   baz: number,
//   qux?: number
// }
```

## ComponentCustomProperties
用于增强组件实例类型以支持自定义全局属性。

```ts
import axios from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

## ComponentCustomOptions
来扩展组件选项类型以支持自定义选项。

```ts
import { Route } from 'vue-router'

declare module 'vue' {
  interface ComponentCustomOptions {
    beforeRouteEnter?(to: any, from: any, next: () => void): void
  }
}
```

## ComponentCustomProps
用于扩展全局可用的 TSX props，以便在 TSX 元素上使用没有在组件选项上定义过的 props。

```ts
declare module 'vue' {
  interface ComponentCustomProps {
    hello?: string
  }
}

export {}
```

## CSSProperties
用于扩展在样式属性绑定上允许的值的类型。

允许任意自定义 CSS 属性：
```ts
declare module 'vue' {
  interface CSSProperties {
    [key: `--${string}`]: string
  }
}
```
```tsx
<div style={ { '--bg-color': 'blue' } }>
```
```tsx
<div :style="{ '--bg-color': 'blue' }"></div>
```