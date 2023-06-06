## 单位

uniapp支持通用的css单位包括px与rpx。不推荐使用upx。

## 样式导入

使用@import语句可以导入外联样式表

```js
<style>
    @import "../../common/uni.css";

    .uni-card {
        box-shadow: none;
    }
</style>
```

## 设置背景

在uniapp不能使用*选择器，page相当于body

```js
<!-- 设置页面背景颜色 -->
page {
  background-color:#ccc;
}
```

##

## 全局样式与局部样式

定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。

在app.vue通过@import导入的样式同样作用于每个页面

## css变量

uniapp提供内置的css变量

| CSS变量                | 描述          | App                                                                                                     | 小程序  | H5                |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------- | ---- | ----------------- |
| --status-bar-height | 系统状态栏高度     | [系统状态栏高度](http://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.getStatusbarHeight)、nvue注意见下 | 25px | 0                 |
| --window-top        | 内容区域距离顶部的距离 | 0                                                                                                       | 0    | NavigationBar 的高度 |
| --window-bottom     | 内容区域距离底部的距离 | 0                                                                                                       | 0    | TabBar 的高度        |

****

快速书写css变量的方法是：在css中敲hei，在候选助手中即可看到3个css变量。（HBuilderX 1.9.6以上支持）

示例1 - 普通页面使用css变量：

```js
<template>
    <!-- HBuilderX 2.6.3+ 新增 page-meta, 详情：https://uniapp.dcloud.io/component/page-meta -->
    <page-meta>
        <navigation-bar />
    </page-meta>
    <view>
        <view class="status_bar">
            <!-- 这里是状态栏 -->
        </view>
        <view> 状态栏下的文字 </view>
    </view>
</template>
<style>
    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }
</style>
```

```js
<template>
    <view>
        <view class="toTop">
            <!-- 这里可以放一个向上箭头，它距离底部tabbar上浮10px-->
        </view>
    </view>
</template>
<style>
    .toTop {
        bottom: calc(var(--window-bottom) + 10px)
    }
</style>
```

示例2 - nvue页面获取状态栏高度

```js
<template>
    <view class="content">
        <view :style="{ height: iStatusBarHeight + 'px'}"></view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
                iStatusBarHeight:0
            }
        },
        onLoad() {
            this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
        }
    }
</script>
```

## <template/>与<block/>

uniapp支持在templat中嵌套block用来进行列表渲染和条件渲染。