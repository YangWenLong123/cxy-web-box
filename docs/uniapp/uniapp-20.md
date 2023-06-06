## 前言

自定义代码片段可以提高工作效率,只要敲上几个简单的字母,就能生成大段代码.

## 文档

<https://ask.dcloud.net.cn/article/35924>

## 自定义代码片段

步骤： 工具 -> 代码块设置 -> vue代码块

```js
"vue-template": {
		"prefix": "vue-components",
		"body": [
			"<template>",
			"\t<view class="container">",
			"\t\t<view class="__header" :style="{height: statusBarHeight + 44 + 'px', paddingTop: statusBarHeight + 'px'}">",
			"\t\t\t<text class="zsdxfont zsdxzuojiantou1" @click="fnNavigateBack()"></text>",
			"\t\t\t<text class="__title">页面模版</text>",
			"\t\t</view>",
			"\t</view>",
			"</template>",
			" ",
			"<script>",
			"import { mapState } from 'vuex';",
			"export default {",
			"\tcomponents: {",
			"\t},",
			"\tdata() {",
			"\t\treturn {",
			"\t\t\tstatusBarHeight: 0",
			"\t\t};",
			"\t},",
			"\tfilter: {",
			"\t},",
			"\tcomputed: {",
			"\t\t...mapState({",
			"\t\t\tuserInfo: state => state.userinfo.userInfo,",
			"\t\t\thasLogin: state => state.hasLogin",
			"\t\t})",
			"\t},",
			"\twatch: {",
			"\t},",
			"\t// life cycle start",
			"\tonShow() {",
			"\t\tthis.init()",
			"\t},",
			"\tonLoad(options) {},",
			"\t// life cycle end",
			"\tmethods: {",
			"\t\tinit(){",
			"\t\t\tthis.statusBarHeight = getApp().globalData.sysInfo.statusBarHeight;",
			"\t\t},",
			"\t\t",
			"\t\t// 返回上一页",
			"\t\tfnNavigateBack(){",
			"\t\t\tuni.navigateBack()",
			"\t\t},",
			"\t},",
			"",
			"};",
			"</script>",
			" ",
			"<style lang="scss" scoped>",
			".container{",
			"\twidth:100%;",
			"\theight:100%;",
			"\tbackground-color: #FFFFFF;",
			"\tdisplay: flex;",
			"\tflex-direction: column;",
			"\t.__header{",
			"\t\twidth: 750rpx;",
			"\t\tbox-sizing: border-box;",
			"\t\tdisplay: flex;",
			"\t\talign-items: center;",
			"\t\tbackground-color: #FFFFFF;",
			"\t\t.zsdxzuojiantou1{",
			"\t\t\tcolor: rgba(51, 51, 51, 1);",
			"\t\t\tfont-size: 32rpx;",
			"\t\t\tfont-size: 32rpx;",
			"\t\t\tfont-weight: 500;",
			"\t\t\tmargin-left: 30rpx;",
			"\t\t}",
			"\t\t.__title{",
			"\t\t\tcolor: rgba(51, 51, 51, 1);",
			"\t\t\tfont-size: 32rpx;",
			"\t\t\tfont-weight: 500rpx;",
			"\t\t\tmargin-left: 250rpx;",
			"\t\t\tletter-spacing: 0;",
			"\t\t}",
			"\t}",
			"}",
			"</style> "
		],
		"description": "自定义vue组件代码段"
	}
```

## 使用

只要在编辑及敲上vue就会出现我们定义的代码片段，这样我们就可以将一些常用的方法和api生成代码片段，这样就大大的提高了我们的效率.

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51b4d7c3dacc4d14a8367ea0561fbd30~tplv-k3u1fbpfcp-zoom-1.image)