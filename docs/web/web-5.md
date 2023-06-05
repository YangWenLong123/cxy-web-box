## 简介

网页开发时，常常需要了解某个元素是否进入了“视口”（viewport），即用户能不能看到它。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4c851537091640bf801e166a6e5ab87a~tplv-k3u1fbpfcp-zoom-1.image)

上图的绿色方块不断滚动，顶部会提示它的可见性。

传统的实现方法是，监听到scroll事件后，调用目标元素（绿色方块）的事件后，调用目标元素（绿色方块）的`getBoundingClientRect()`方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于scroll事件密集发生，计算量很大，容易造成[性能问题](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)。

[IntersectionObserver API](https://wicg.github.io/IntersectionObserver/)，可以自动“观察”元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做“交叉观察器”（intersection oberserver）。


## IntersectionObserver 使用教程

IntersectionObserver 是一项新的 Web API，可以异步观察目标元素与根元素或顶级文档视口之间的交叉状态，从而可以实现一些常见的页面交互效果，例如图片延迟加载、懒加载、无限滚动等。以下是一个 IntersectionObserver 使用教程的博客，包含案例代码。

## 基本用法

首先需要创建一个 IntersectionObserver 实例，传入一个回调函数和一些配置选项：

```js
// 创建 IntersectionObserver 实例
const observer = new IntersectionObserver((entries, observer) => {
  // entries 是被观察的元素集合
  entries.forEach((entry) => {
    // 处理元素进入或离开视口的情况
    if (entry.isIntersecting) {
      // 元素进入视口
    } else {
      // 元素离开视口
    }
  });
}, {
  // 一些配置选项
  root: null, // 根元素，默认为浏览器视口
  rootMargin: '0px', // 根元素的 margin
  threshold: 0, // 目标元素与根元素交叉区域的比例
});


```

然后可以使用 `observe` 方法将需要观察的元素添加到 IntersectionObserver 实例中：

```js
// 监听元素
const element = document.querySelector('#my-element');
observer.observe(element);


```

最后，在回调函数中处理元素进入或离开视口的情况。

## 使用案例

### 图片延迟加载

使用 IntersectionObserver 可以实现图片延迟加载，即当图片进入视口时再加载图片，从而提升页面加载速度和用户体验。

```js
<!-- HTML 结构 -->
<img src="placeholder.jpg" data-src="image.jpg" alt="image">


```

```js
/* CSS 样式 */
img {
  width: 100%;
  height: auto;
}


```

```js
// JavaScript 代码
const images = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const image = entry.target;
      const src = image.getAttribute('data-src');
      image.setAttribute('src', src);
      image.removeAttribute('data-src');
      observer.unobserve(image); // 停止监听该图片
    }
  });
});
images.forEach((image) => {
  observer.observe(image); // 监听所有需要延迟加载的图片
});


```

### 无限滚动加载

使用 IntersectionObserver 可以实现无限滚动加载，即当滚动到页面底部时加载更多数据，从而实现流畅的加载效果。

```js
// JavaScript 代码
const container = document.querySelector('#my-container');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 加载更多数据
      // ...
    }
  });
});
observer.observe(container.lastElementChild); // 监听最后一个元素


```