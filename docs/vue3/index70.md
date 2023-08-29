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


## 2.6.10 升级 2.7

Vue 2.7 是 Vue 2 最新的次级版本。其提供了内置的组合式 API 支持。

`Vue CLI / webpack`

1. 将本地的 `@vue/cli-xxx` 依赖升级至所在主版本范围内的最新版本 (如有)：

    - v4 升级至 `~4.5.18`
    - v5 升级至 `~5.0.6`

2. 将 `vue` 升级至 `^2.7.0`。同时你可以从依赖中移除 `vue-template-compiler` ——它在 2.7 中已经不再需要了。
    - 注意：如果你在使用 @vue/test-utils，那么 vue-template-compiler 需要保留，因为该测试工具集依赖了一些只有这个包会暴露的 API。

3. 检查包管理工具的版本锁定文件，以确保以下依赖的版本符合要求。它们可能是间接依赖所以未必罗列在了 package.json 中。
    - vue-loader: ^15.10.0
    - vue-demi: ^0.13.1

      否则，你需要移除整个 node_modules 和版本锁定文件，然后重新安装，以确保它们都升到了最新版本。
4. 如果你曾经使用了 `@vue/composition-api`，将其导入语句切换至 `vue` 即可。注意有些之前通过插件暴露的 API，例如 `createApp`，并没有被移植回 2.7。

5. 如果你在 `script setup` 中遇到了未使用变量的 `lint` 错误，请更新 `eslint-plugin-vue` 至最新版本 (9+)。

6. 2.7 的单文件组件编译器使用了 PostCSS 8 (从 7 升级而来)。PostCSS 8 应该向下兼容了绝大多数插件，但是该升级可能在你使用了一些只支持 PostCSS 7 的自定义插件时遇到问题。这种情况下，你需要升级相应的插件至其兼容 PostCSS 8 的版本。

7. [@vue/compiler-sfc] the >>> and /deep/ combinators have been deprecated. Use :deep() instead. 

        这个错误是因为 Vue 2.7.0 不再支持 >>> 和 /deep/ 这两个深度选择器，而推荐使用 :deep() 选择器。

        你可以通过以下步骤来解决这个问题：

        1. 打开你的代码编辑器，找到使用 >>> 或 /deep/ 的地方。
        2. 将 >>> 或 /deep/ 替换为 :deep()。
