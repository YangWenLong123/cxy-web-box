## 例:nvue的list容易不能滚动，需要重置

```js
this.$refs.[''][0].resetLoadmore();
```

## 例：nvue的样式默认为flex布局

## 例：tabbar的图片只能使用本地图片，建议尺寸81px

## 例：获取当前页面栈

```js
//写法比较冗余，但是剋获取页面栈中的任意一个页面
let pages = getCurrentPages();
let page = pages[pages.length - 1];
let currentWebview = page.$getAppWebview();

//写法简单，可以获取当前页面的webview
const currentWebview = this.$mp.page.$getAppWebview();

//在当前页面添加内容
currentWebview.append('');
```

## 例：子组件的生命周期onShow,onHide之类都不可以使用，必须使用vue的生命周期函数。

## 例：去掉安全区

```js
"safearea": {
		    "bottom": {
		        "offset": "none"
		    }
		},
```