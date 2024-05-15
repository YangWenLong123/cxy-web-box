## 引用组件

传统 vue 项目开发，引用组件需要导入 - 注册 - 使用三个步骤，如下：

`Vue 3.x` 增加了 `script setup` 特性，将三步优化为两步，无需注册步骤，更为简洁：

```vue
<template>
  <view>
    <uni-rate text="1"></uni-rate>
  </view>
</template>
<script setup>
import uniRate from "@/components/uni-rate/uni-rate.vue";
</script>
```

`uni-app` 的 `easycom` 机制，将组件引用进一步优化，开发者只管使用，无需考虑导入和注册，更为高效：

```vue
<template>
  <view>
    <uni-rate text="1"></uni-rate>
  </view>
</template>
<script></script>
```

## easycom

`HBuilderX 2.5.`5 起支持`easycom`组件模式。

1. 安装在项目根目录的 components 目录下，并符合 components/组件名称/组件名称.vue
2. 安装在 uni_modules 下，路径为 uni_modules/插件 ID/components/组件名称/组件名称.vue

```bash
┌─components
│  └─comp-a
│    └─comp-a.vue      符合easycom规范的组件
└─uni_modules          [uni_module](/plugin/uni_modules.md)中符合easycom规范的组件
   └─uni_modules
     └─uni-list
       └─components
         └─uni-list
           └─ uni-list.vue
```

不管 components 目录下安装了多少组件，easycom 打包会自动剔除没有使用的组件，对组件库的使用尤为友好。

## 自定义 easycom 配置的示例

`easycom`是自动开启的，不需要手动开启，有需求时可以在 pages.json 的 easycom 节点进行个性化设置，如关闭自动扫描，或自定义扫描匹配组件的策略。设置参数如下：

| 属性     | 类型    | 默认值 | 描述                                                                                     |
| -------- | ------- | ------ | ---------------------------------------------------------------------------------------- |
| autoscan | Boolean | true   | 是否开启自动扫描，开启后将会自动扫描符合`components/组件名称/组件名称.vue`目录结构的组件 |
| custom   | Object  | -      | 以正则方式自定义组件匹配规则。如果`autoscan`不能满足需求，可以使用`custom`自定义匹配规则 |

如果你的组件，不符合`easycom`前述的路径规范。可以在 pages.json 的 easycom 节点中自行定义路径规范。

如果需要匹配`node_modules`内的 vue 文件，需要使用`packageName/path/to/vue-file-$1.vue`形式的匹配规则，其中 packageName 为安装的包名，`/path/to/vue-file-$1.vue`为 vue 文件在包内的路径。

```json
"easycom": {
  "autoscan": true,
  "custom": {
    "^uni-(.*)": "@/components/uni-$1.vue", // 匹配components目录内的vue文件
    "^vue-file-(.*)": "packageName/path/to/vue-file-$1.vue" // 匹配node_modules内的vue文件
  }
}
```

说明

- easycom 方式引入的组件无需在页面内 import，也不需要在 components 内声明，即可在任意页面使用。
- easycom 方式引入组件不是全局引入，而是局部引入。例如在 H5 端只有加载相应页面才会加载使用的组件。
- 在组件名完全一致的情况下，easycom 引入的优先级低于手动引入（区分连字符形式与驼峰形式）。
- 考虑到编译速度，直接在 pages.json 内修改 easycom 不会触发重新编译，需要改动页面内容触发。
- easycom 只处理 vue 组件，不处理小程序专用组件（如微信的 wxml 格式组件）。不处理后缀为.nvue 的组件。因为 nvue 页面引入的组件也是.vue 组件。可以参考 uni ui，使用 vue 后缀，同时兼容 nvue 页面。
- nvue 页面里引用.vue 后缀的组件，会按照 nvue 方式使用原生渲染，其中不支持的 css 会被忽略掉。这种情况同样支持 easycom。
- vue 与 uvue 组件优先级，[详见](https://doc.dcloud.net.cn/uni-app-x/component/#priority)。
