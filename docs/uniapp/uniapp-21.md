## 前言

随着项目的庞大，在中低端手机的使用中会有卡死或者反应很慢的现象，这也是非原生app的弊端, 包括React Native与Flutter,这些非原生框架，在与原生通信上，或多或少都会有许多折损.

## 运行原理

uniapp在非h5端运行时，从架构上分为逻辑层与视图层两个部分.逻辑层负责执行页面逻辑,视图层负责页面渲染.

逻辑层详解:

-   逻辑层是运行在一个独立的jscore里的，它不依赖于本机的webview，所以一方面它没有浏览器兼容问题，可以在Android4.4上跑es6代码，另一方面，它无法运行window、document、navigator、localstorage等浏览器专用的js API。
-   jscore就是一个标准js引擎，标准js是可以正常运行的，比如if、for、各种字符串、日期处理等。js和浏览器的区别要注意区分开来。

js引擎详解:

-   所谓浏览器的js引擎，就是jscore或v8的基础上新增了一批浏览器专用API，比如dom；
-   node.js引擎，则是v8基础上补充一些电脑专用API，比如本地io；
-   那么uni-app的App端和小程序端的js引擎，其实是在jscore上补充了一批手机端常用的JS API，比如扫码。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6241b18972a84dc181aa9827e2b6c383~tplv-k3u1fbpfcp-zoom-1.image)

视图层详解:

-   h5和小程序平台，以及app-vue，视图层是webview。而app-nvue的视图层是基于weex改造的原生渲染视图。
-   在iOS上，只能使用iOS提供的Webview（默认是WKWebview）。它有一定的浏览器兼容问题，iOS版本不同，它的表现有细微差异（一般可忽略）
-   Android上小程序大多自带了一个几十M的chromium webview，而App端没办法带这么大体积的三方包，所以App端默认使用了Android system webview，这个系统webview跟随手机不同而有差异。当然App端也支持使用腾讯X5引擎，此时可以在Android端统一视图层。

逻辑层和视图层分离的利与弊：

-   利：窗体动画稳
-   弊：逻辑层与视图层通信有损耗,尤其是连续高帧率绘制canvas动画与滚动事件，手势操作等。需要不停的反馈给逻辑层，逻辑处理完成再通知视图层作出更新.
-   解决方法：

<!---->

-   webview渲染的视图层

<!---->

-   在app-vue和微信小程序上，提供了一种运行到视图层的专属js，微信叫做[wxs](https://uniapp.dcloud.io/frame?id=wxs)
-   app端提供了更强大的[renderjs](https://uniapp.dcloud.io/frame?id=renderjs), 官方也提供了案例，基于renderjs运行echart的案例[传送门](https://ext.dcloud.net.cn/plugin?id=1207)，如F2,threejs等web库都可以运行.

<!---->

-   原生渲染视图层

<!---->

-   weex提供了一套bindingX动画渲染引擎，可以在js里一次性传一个表达式给原生层，由原生层解析后根据指令操作原生的视图层，避免反复跨层通信
-   插件市场也有提供了跨平台动画插件,[lottie](https://ext.dcloud.net.cn/search?q=lottie)

## 优化建议

1.  1.  App如果不是v3模式，请改为V3编译模式,[传送门](https://ask.dcloud.net.cn/article/36599)
    1.  避免使用大图资源，不要在一屏内将多张大图缩小后放在一个屏幕内，非常容易白屏奔溃.
    1.  定义在data中的数据每次改变都会通知视图层重新渲染页面.所以如果不是视图所需要的变量,可以不定义在data中，直接在外部定义变量或者挂在到vue实例上.
    1.  长列表数据

<!---->

1.  1.  1.  使用nvue进行渲染
        1.  数据进行分页加载
        1.  每个item做成一个组件
        1.  尽量减少滚动事件监听，必须要监听可以添加节流

<!---->

1.  5.  减少组件数量，每个组件都会进行渲染通信，可以封装成一个组件尽量不要搞成两个
    5.  减少节点嵌套层级，因为渲染过程，会对真实dom进行遍历生成vdom等一些操作,所以建议减少深层的节点嵌套
    5.  app-nvue和H5，支持页面预加载,[传送门](https://uniapp.dcloud.io/api/preload-page)

## 优化启动速度

1.  1.  工程代码越多，包括背景图和本地字体文件越大，对小程序启动速度有影响，应注意控制体积。组件引用的前景图不影响性能。app端在v3以前也存在和小程序一样的问题，但v3起解决了这个问题。
    1.  App端的 splash 关闭有白屏检测机制，如果首页一直白屏或首页本身就是一个空的中转页面，可能会造成 splash 10秒才关闭，可参考此文解决<https://ask.dcloud.net.cn/article/35565>
    1.  App端使用v3编译器，首页为nvue页面时，并设置为[fast启动模式](https://ask.dcloud.net.cn/article/36749)，此时App启动速度最快。
    1.  App设置为纯nvue项目（manifest里设置app-plus下的renderer:"native"），这种项目的启动速度更快，2秒即可完成启动。因为它整个应用都使用原生渲染，不加载基于webview的那套框架。

## 使用骨架屏

1.  1.  对于进入一个新的页面,触发生命周期函数，加载html，js，css，调用接口返回数据，可能需要一段时间，页面会员白屏或者空数据的情况，用户体验很差，那么如何优化？
    1.  常用的是加载loading，但是比较low
    1.  常用方法

<!---->

1.  1.  1.  ui给出骨架屏图片
        1.  css画骨架屏
        1.  骨架屏这种很多公司采用，相对于vue有比较成熟的方案[vue-content-loader](https://github.com/egoist/vue-content-loader)
        1.  ......

<!---->

1.  4.  我写了一个方案：[传送门](https://www.yuque.com/along-n3gko/ezt5z9/zlfxor)

## 预渲染

1.  1.  预加载页面，是一种性能优化的技术，目前只支持Nvue,H5，预加载触发页面生命周期，`onLoad` `onReady`, 不触发onShow。[页面预渲染](https://uniapp.dcloud.io/api/preload-page)

## 使用nvue

1.  1.  使用nvue进行页面开发,nvue页面渲染引擎属于原生渲染，相对于webview减少通信损耗,提高性能.
    1.  nvue于vue的区别，[传送门](https://www.yuque.com/along-n3gko/ezt5z9/bnwa2t)
    1.  首页建议都使用nvue进行渲染

## 动画使用Lottie,bindingX

1.  1.  [lottie](https://ext.dcloud.net.cn/plugin?id=1255)
    1.  [bindingX](https://www.yuque.com/along-n3gko/ezt5z9/hgw7yv)

## 使用work线程处理数据

1.  1.  处理倒计时 [传送门](https://www.yuque.com/along-n3gko/ezt5z9/rq65up)

## 图片优化

1.  1.  页面结构复杂，css样式太多情况，在app.vue里加image { will-change: transform }, 可优化图片加载缓慢问题.
    1.  大于50k，全部进行压缩，压缩地址：[传送门](https://tinypng.com/)
    1.  添加图片懒加载属性

## 页面组合

1.  1.  一个比较好的页面应该由多个字组件组成，PageA = ComponentsA + ComponentsB + ComponentsC ...

<!---->

1.  1.  1.  数据更新，只会更新当前组件，减少无用的更新。
        1.  组件复用减少工作量，代码层次更加清晰，便于维护

## 懒加载

1.  1.  图片懒加载参考：[传送门](https://ext.dcloud.net.cn/plugin?id=872)
    1.  页面懒加载可以添加loading，数据加载完成后关闭loading

## 数据优化

1.  1.  页面数据量大的时候采用数据分页加载
    1.  页面中一些常量无需挂载在data中，直接定义变量就可以了。
    1.  一些数据可以挂载到vue实例中
    1.  ...

## 节流防抖

1.  1.  常用点击事件和搜索，放置重复点击多次调用。

```js
let timer, flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func, wait = 500, immediate = true) {
	if (immediate) {
		if (!flag) {
			flag = true;
			// 如果是立即执行，则在wait毫秒内开始时执行
			typeof func === 'function' && func();
			timer = setTimeout(() => {
				flag = false;
			}, wait);
		}
	} else {
		if (!flag) {
			flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func();
			}, wait);
		}

	}
};
export default throttle
```

```js
let timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func, wait = 500, immediate = false) {
	// 清除定时器
	if (timeout !== null) clearTimeout(timeout);
	// 立即执行，此类情况一般用不到
	if (immediate) {
		var callNow = !timeout;
		timeout = setTimeout(function() {
			timeout = null;
		}, wait);
		if (callNow) typeof func === 'function' && func();
	} else {
		// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
		timeout = setTimeout(function() {
			typeof func === 'function' && func();
		}, wait);
	}
}

export default debounce
```

## 相关文章

-   [flutter、rn、uniapp性能比较](https://ask.dcloud.net.cn/article/36083)
-   [uniapp从运行原理上解决性能优化](http://auan.cn/front/2239.html)
-   [vue3和vite双向加持，uniapp性能再次提升](https://my.oschina.net/hbcui/blog/5392914)