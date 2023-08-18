

## 资讯

Vue 2 将于 2023 年 12 月 31 日停止维护。详见 [Vue 2 延长 LTS](https://v2.vuejs.org/lts/)

Vue3版本更新记录。详见[CHANGELOG.MD](https://github.com/vuejs/core/blob/main/CHANGELOG.md)

Vue3 Composition API如何替换Vue Mixins。[pdf](https://www.yuque.com/attachments/yuque/0/2020/pdf/636979/1594884858405-b9052caa-bd82-4a89-ae75-c9a47f86094f.pdf)

Vue博客，[详见](https://blog.vuejs.org/)

## Vue 2 和 Vue 3 之间的区别是什么？

Vue 3 是 Vue 当前的最新主版本。它包含了一些 Vue 2 中没有的新特性 (比如 Teleport、Suspense，以及多根元素模板)。同时它也包含了一些与 Vue 2 非兼容性的变更。细节文档请参考 [Vue 3 迁移指南](https://v3-migration.vuejs.org/zh/)。

尽管存在差异，但大多数 Vue API 在两个大版本之间是共享的，所以你的大部分 Vue 2 知识将继续在 Vue 3 中发挥作用。需要注意的是，组合式 API 原本是一个 Vue 3 独有的特性，但目前已兼容至 Vue 2 且在[ Vue 2.7](https://github.com/vuejs/vue/blob/main/CHANGELOG.md#270-2022-07-01) 中可用。

总的来说，Vue 3 提供了更小的包体积、更好的性能、更好的可扩展性和更好的 TypeScript/IDE 支持。如果你现在要开始一个新项目，我们推荐你选择 Vue 3。但也仍然存在一些考虑使用 Vue 2 的理由：

你需要支持 IE11。Vue 3 用到了一些 IE11 不支持的现代 JavaScript 特性。
如果你打算将现有的 Vue 2 应用迁移到 Vue 3，请查阅迁移指南。

## Vue 支持哪些浏览器？​
最新版本的 Vue (3.x) 只支持原生支持 [ES2015 的浏览器](https://caniuse.com/es6)。这并不包括 IE11。Vue 3.x 使用的 ES2015 功能无法在旧版本的浏览器中进行兼容，如果你需要支持旧版本的浏览器，请使用 Vue 2.x 替代。



## 文章

焕然一新的 Vue 3 中文文档要来了🎉 , [详见](https://juejin.cn/post/7077701166397653028)

Vue3源码学习, [详见](https://vue3js.cn/start/)


## Vue3模版编译在线体验

<https://vue-next-template-explorer.netlify.app/>


