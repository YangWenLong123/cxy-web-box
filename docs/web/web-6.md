Server-Sent Events是一种服务器向浏览器推送信息的方法，与WebSocket类似，但更适合只需要服务端向客户端推送通知或数据的场景。以下是使用Server-Sent Events的步骤：

1.  在服务端发送流信息。严格地说，HTTP协议无法做到服务器主动推送信息，但可以通过声明接下来要发送的是流信息的方式来实现。这意味着发送的不是一次性的数据包，而是一个数据流，会连续不断地发送过来。客户端不会关闭连接，会一直等待服务器发过来的新的数据流。

<!---->

2.  客户端通过创建EventSource对象与服务器建立连接，接收服务端的数据流。EventSource对象会自动处理流信息，将其作为事件推送给页面。

<!---->

3.  服务端通过设置HTTP响应头Content-Type为text/event-stream来指定数据流的格式。每条数据流都由一个或多个事件组成，每个事件由一个事件标识符、事件类型和数据组成。事件标识符用于区分不同的事件，事件类型用于指定事件的类型，数据就是要推送的内容。

以下是一个使用Server-Sent Events的示例代码：

服务端代码：

```js
const http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  setInterval(() => {
    const data = `data: ${new Date().toISOString()}\n\n`;
    res.write(data);
  }, 1000);
}).listen(3000);


```

客户端代码：

```js
const eventSource = new EventSource('/stream');

eventSource.addEventListener('message', function(event) {
  console.log(event.data);
});


```

在上面的示例中，服务端会每秒钟向客户端推送一条数据流，数据流的内容是当前时间的ISO格式字符串。客户端通过创建EventSource对象与服务端建立连接，并监听message事件，在事件处理函数中输出推送的数据流。这里的服务端代码使用Node.js实现，可以通过运行`node app.js`命令启动服务端。
需要注意的是，虽然Server-Sent Events是一种基于HTTP协议的轻量级通信机制，但并不是所有浏览器都支持。在使用Server-Sent Events时，需要注意兼容性问题。