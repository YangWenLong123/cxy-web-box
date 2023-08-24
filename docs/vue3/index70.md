## 迁移变化内容

-   [介绍](https://www.bookstack.cn/read/vue-3.0-zh/15a0993c4926bec1.md)
-   [v-for 中的 Ref 数组](https://www.bookstack.cn/read/vue-3.0-zh/e171a635a4b49b03.md)
-   [异步组件](https://www.bookstack.cn/read/vue-3.0-zh/cd0b788c9e39cf48.md)
-   [attribute 强制行为](https://www.bookstack.cn/read/vue-3.0-zh/a1798e58e4dd5d8d.md)
-   [自定义指令](https://www.bookstack.cn/read/vue-3.0-zh/6c8f14446cde00fa.md)
-   [自定义元素交互](https://www.bookstack.cn/read/vue-3.0-zh/bf11790c67db7f03.md)
-   [Data 选项](https://www.bookstack.cn/read/vue-3.0-zh/eae1660ba011b414.md)
-   [事件 API](https://www.bookstack.cn/read/vue-3.0-zh/f3e04fad32d270d2.md)
-   [过滤器](https://www.bookstack.cn/read/vue-3.0-zh/b3c15fea5d9216ac.md)
-   [片段](https://www.bookstack.cn/read/vue-3.0-zh/311688527620a948.md)
-   [函数式组件](https://www.bookstack.cn/read/vue-3.0-zh/b62f3dbf0377a1eb.md)
-   [全局 API](https://www.bookstack.cn/read/vue-3.0-zh/b62e32b0a4722d1e.md)
-   [全局 API Treeshaking](https://www.bookstack.cn/read/vue-3.0-zh/9a639bd219402038.md)
-   [内联模板 Attribute](https://www.bookstack.cn/read/vue-3.0-zh/599cb7518d7ea915.md)
-   [key attribute](https://www.bookstack.cn/read/vue-3.0-zh/953f3b9719a0389a.md)
-   [按键修饰符](https://www.bookstack.cn/read/vue-3.0-zh/042235eaf42161b8.md)
-   [在 prop 的默认函数中访问 this](https://www.bookstack.cn/read/vue-3.0-zh/715c9fc8d10870ad.md)
-   [渲染函数 API](https://www.bookstack.cn/read/vue-3.0-zh/20f302abaeefe7e9.md)
-   [Slot 统一](https://www.bookstack.cn/read/vue-3.0-zh/84795b9f156c8e42.md)
-   [过渡的 class 名更改](https://www.bookstack.cn/read/vue-3.0-zh/e25d530df0347e9c.md)
-   [v-model](https://www.bookstack.cn/read/vue-3.0-zh/a6c964cc40610f48.md)
-   [v-if 与 v-for 的优先级对比](https://www.bookstack.cn/read/vue-3.0-zh/747373645ce0ba0b.md)
-   [v-bind 合并行为](https://www.bookstack.cn/read/vue-3.0-zh/a82844146d2a95a1.md)

1.不再使用 new Vue,而是使用application概念，创建一个App.

2.不再使用Vue.prototype

```js
// before - Vue 2
Vue.prototype.$http = () => {}

// after - Vue 3
const app = Vue.createApp({})
app.config.globalProperties.$http = () => {}
```

3.全局方法挂载到app实例上

| vue2.x        | vue3          |
| ------------- | ------------- |
| Vue.component | app.component |
| Vue.directive | app.directive |
| Vue.mixin     | app.mixin     |
| Vue.use       | app.use       |

4.Tree-shaking

没有用到的方法不会打包到最终代码里，可以优化包的体积，用法也需要改变

```js
import { nextTick } from 'vue'
nextTick(() => {
  // something DOM-related
})
```

5.异步组件需要显示定义

```js
import { defineAsyncComponent } from 'vue'
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))
```

6.新特性fragments,允许组件有多个根元素。

7.template允许设置key

8.scopedSlots正式弃用

vue2.6中对slot进行改版，但是仍然对scopedSlots兼容,vue3正式弃用.

9.监听数组变化需要用到deep属性，如果不加deep只能检测数组被替换

10.$children被移除

11.事件api被移除

$on,$off,$once不再使用.

12.不能再使用 | filter，可以使用计算属性替换