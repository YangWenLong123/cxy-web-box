-   使用 是vue提供的需要在将组件在内存中进行“持久化”的方法，可以将包含的组件状态维持不变，即使是组件切换，已久维持旧的状态在内存中。在下一显示时，不会中心渲染。
-   项目应用

```js
select-seat/index.vue 使用的是 <router-view></router-view>控制展示场馆还是看台
<template>
    <div class="select-seat">
        // 由于中网BBC需要进行缓存看台页
        <template v-if="projectType === 'BBC'">
            <keep-alive>
                <router-view v-if="isDataReady"></router-view>
            </keep-alive>
        </template>
        <template v-else>
            <router-view v-if="isDataReady"></router-view>
        </template>
    </div>
</template>
```

-   keep-alive几种用法

```js
<!-- 逗号分隔字符串，只有组件a与b被缓存。这样使用场景变得更有意义了 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (需要使用 v-bind，符合匹配规则的都会被缓存) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- Array (需要使用 v-bind，被包含的都会被缓存) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

-   keep-alive注意事项

```js
<keep-alive> 先匹配被包含组件的 name 字段，如果 name 不可用，则匹配当前组件 components 配置中的注册名称。
<keep-alive> 不会在函数式组件中正常工作，因为它们没有缓存实例。
当匹配条件同时在 include 与 exclude 存在时，以 exclude 优先级最高(当前vue 2.4.2 version)。比如：包含于排除同时匹配到了组件A，那组件A不会被缓存。
包含在 <keep-alive> 中，但符合 exclude ，不会调用activated 和 deactivated。
```