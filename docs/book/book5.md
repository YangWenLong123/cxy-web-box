## 说明

当前的浏览器完全没有任何一个可靠、通用、准确区分用户关闭和刷新操作的 API

## 先来看看浏览器在刷新/关闭时的顺序

在浏览器关闭或刷新页面时，onbeforeunload 和 onunload 事件的执行顺序是固定的。

1.  当用户关闭浏览器标签、窗口或者输入新的 URL 地址时，首先会触发 onbeforeunload 事件。
2.  在 onbeforeunload 事件处理完成后，如果用户选择离开页面（关闭或刷新），则会触发 onunload 事件。

因此，onbeforeunload 事件在用户决定离开页面之前执行，而 onunload 事件在用户离开页面之后执行。这两个事件提供了在用户离开页面前后执行代码的机会，可以用于执行清理操作或者提示用户确认离开等操作。通过对比两个事件的执行时间差，我们就可以简单判断浏览器的关闭或刷新行为啦。

## 简易判断 Chrome 浏览器关闭或刷新行为的方法

```js
let beforeTime = 0,
  leaveTime = 0;
// 获取浏览器onbeforeunload时期的时间戳
window.onbeforeunload = () => {
  beforeTime = new Date().getTime();
};
window.onunload = () => {
  // 对比onunload时期和onbeforeunload时期的时间差值
  leaveTime = new Date().getTime() - beforeTime;
  if (leaveTime < 5) {
    // 如果小于5就是关闭
    // 你可以在这发送请求
  } else {
    // 如果大于5就是刷新
    // 你可以在这发送请求
  }
};
```

方法仅支持 Chrome 浏览器,谨慎使用

## 如何发送请求

1、使用 Navigator.sendBeacon()

该方法主要用于将统计数据发送到 Web 服务器，同时避免了用传统技术，如 XMLHttpRequest 所导致的各种问题。

他的使用方法也很简单：

```js
navigator.sendBeacon(url, data);

// url参数表明 data 将要被发送到的网络地址
// data (可选) 参数是将要发送的 ArrayBuffer、ArrayBufferView、Blob、DOMString、FormData 或 URLSearchParams 类型的数据。
// 当用户代理成功把数据加入传输队列时，sendBeacon() 方法将会返回 true，否则返回 false。

//数据是通过 POST 请求发送的
```

2、使用 fetch + keepalive
方法用于发起获取资源的请求。它返回的是一个 promise。他支持 POST 和 GET 方法，配合 keepalive 参数，可以实现浏览器关闭/刷新行为前发送请求。keepalive 可用于超过页面的请求。可以说 keepalive 就是 Navigator.sendBeacon() 的替代品。

```js
fetch("url", {
  method: "GET",
  keepalive: true,
});
```

## 最优解

后端感知 web 退出本就不推荐由前端来处理，更优解为 持续 ping 或者后端 心跳机制发包 来检测。
