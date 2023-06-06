## 前言

JavaScript 语言采用的是单线程模型，也就是说，所有任务只能在一个线程上完成，一次只能做一件事。前面的任务没做完，后面的任务只能等着。随着电脑计算能力的增强，尤其是多核 CPU 的出现，单线程带来很大的不便，无法充分发挥计算机的计算能力。

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行。在主线程运行的同时，Worker 线程在后台运行，两者互不干扰。等到 Worker 线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被 Worker 线程负担了，主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。

Worker 线程一旦新建成功，就会始终运行，不会被主线程上的活动（比如用户点击按钮、提交表单）打断。这样有利于随时响应主线程的通信。但是，这也造成了 Worker 比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。

## API

接受两个参数，jsUrl可以传递多个脚本文件地址, options是个对象可选，{name: 'name1'}，用于指定Worker的名称，页用来区分多个Worker线程.

```js
var myWorker = new Worker(jsUrl, options);
```

## 基本用法

主线程

主线程采用**new**命令,调用**Worker()** 构造函数,新建一个Worker线程.Worker()构造参数是一个脚本文件,该文件就是Worker线程所要执行的任务.由于Worker不能读取本地文件,所以这个脚本必须来自网络.

```js
if(window.Worker) {
	const worker = new Worker('work.js');
} else {
	console.log('Your browser doesn't support web workers.')
}
```

主线程调用**postMessage()** 方法与**Worker线程**通信，参数可以是任意数据类型，包括二进制数据,然后主线程通过**onmessage()** 方法监听子线程发回来的消息，然后执行相关任务, 执行完成后调用**terminate()方法关闭**子线程.

```js
worker.postMessage({
	name: 'along',
  age: '18'
});

worker.onmessage = function (event) {
	console.log(''Message received from worker', event.data);
  //TODO
  worker.terminate();
}
```

## Worker线程

Worker线程内部需要有一个onmessage方法来监听主线程发来的消息,有以下几种监听方式,推荐使用最后一种，因为代码量少.

```js
this.addEventListener('message', function (event) {
	//TODO
}, false)

addEventListener('message', function (event) {
	//TODO
}, false)

this.onmessage = function (event) {
	//TODO
}

onmessage = function (event) {
	//TODO
}
```

在监听到数据并处理完逻辑后,worker线程也可以主动调用**close()** 方法关闭当前线程.

```js
this.close();
```

## Worker加载脚本

Worker()内部如果要加载其它脚本,可以使用importScripts()方法,支持加载多个脚本.

```js
importScript('next.js', 'next2.js');
```

## Worker异常监听

主线程可以监听Worker是否发生错误，发生错误,就会触发主线程的error事件.

```js
worker.onerror = function (event) {
	//TODO
}

worker.addEventListener('error', function (event) {
	//TODO
})
```

注: Worker内部也可以监听error事件.

## Worker数据通信

主线程与Worker线程通信传输数据可以是任意数据类型，也可以是二进制数据，需要注意的是这种通信关系，是传值，而不是传引用地址，即Worker线程对数据进行修改，不会影响主线程的数据.

主线程可以与Worker线程交换二进制数据，比如File,Blob,ArrayBuffer等类型，如下：

```js
// 主线程
var uInt8Array = new Uint8Array(new ArrayBuffer(10));
for (var i = 0; i < uInt8Array.length; ++i) {
  uInt8Array[i] = i * 2; // [0, 2, 4, 6, 8,...]
}
worker.postMessage(uInt8Array);

// Worker 线程
self.onmessage = function (e) {
  var uInt8Array = e.data;
  postMessage('Inside worker.js: uInt8Array.toString() = ' + uInt8Array.toString());
  postMessage('Inside worker.js: uInt8Array.byteLength = ' + uInt8Array.byteLength);
};
```

但是，拷贝方式发送二进制数据，会造成性能问题。比如，主线程向 Worker 发送一个 500MB 文件，默认情况下浏览器会生成一个原文件的拷贝。为了解决这个问题，JavaScript 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了，这是为了防止出现多个线程同时修改数据的麻烦局面。这种转移数据的方法，叫做[Transferable Objects](http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#transferable-objects)。这使得主线程可以快速把数据交给 Worker，对于影像处理、声音处理、3D 运算等就非常方便了，不会产生性能负担。

如果要直接转移数据的控制权，就要使用下面的写法。

```js
// Transferable Objects 格式
worker.postMessage(arrayBuffer, [arrayBuffer]);

// 例子
var ab = new ArrayBuffer(1);
worker.postMessage(ab, [ab]);
```

## 同页面的Worker

一般情况下，Worker载入的是一个单独的Js脚本文件，但是页可以载入与主线程在同一个页面的代码.

思路：

将worker线程放入script标签内，设置type='app/worker'

将脚本代码转换为二进制对象

然后将二进制对象生成URL

使用new操作符构造Worker线程加载这个URL

```
<!DOCTYPE html>
  <body>
    <script id="worker" type="app/worker">
      addEventListener('message', function () {
        postMessage('some message');
      }, false);
    </script>
  </body>
</html>
```

```js
var blob = new Blob([document.querySelector('#worker').textContent]);
var url = window.URL.createObjectURL(blob);
var worker = new Worker(url);

worker.onmessage = function (e) {
  // e.data === 'some message'
};
```

## 示例

轮询查询状态的变化，比如支付状态，成功状态等

```js
function createWorker(f) {
  var blob = new Blob(['(' + f.toString() +')()']);
  var url = window.URL.createObjectURL(blob);
  var worker = new Worker(url);
  return worker;
}

var pollingWorker = createWorker(function (e) {
  setInterval(function () {
   console.log('11')
  }, 1000)
});

pollingWorker.onmessage = function () {
  // render data
}

pollingWorker.postMessage('init');
```

## 参考

web worker使用教程：<http://www.ruanyifeng.com/blog/2018/07/web-worker.html>

w3c: <https://www.w3school.com.cn/html5/html_5_webworkers.asp>

MDN: <https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API>

案例：<https://github.com/mdn/simple-web-worker>

使用场景：<https://segmentfault.com/a/1190000014938305>

如何在ES6+webpack中使用Web Worker: <https://juejin.im/post/6844903590503383054>

Web Worker实用指南: <https://segmentfault.com/a/1190000038495018>

##