#### 前言

模拟一个简单在线的socket请求，服务端使用node.js。

#### readyState

```js
CONNECTING：值为0，表示正在连接。
OPEN：值为1，表示连接成功，可以通信了。
CLOSING：值为2，表示连接正在关闭。
CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
```

#### 服务端

```js
//index.js

let ws = require('ws');

var server = new ws.Server({
    host: "127.0.0.1",
    port: 6080,
});

server.on('connection', socket => {
    //默认连接发送
    socket.send(`ECHO: connection()`, err => {
        if (err) {
            console.log(`[SERVER] error: ${err}`);
        }
    });

    // 监听客户端信息
    socket.on('message', message => {
        console.log(`[SERVER] Received: ${message}`);

        socket.send(`${message}`, err => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    });
});
```

#### 客户端

```js
<!DOCTYPE html>
<html>
<head>
	<title>websocket example</title>
</head>
<style>
.item {
    display: flex;
    height: 32px;
    align-items: center;
}
#send {
    width: 120px;
    height: 32px;
    background: #409EFF;
    text-align: center;
    line-height: 32px;
    color: #fff;
    cursor: pointer;
    margin-right: 10px;
}
#input {
    width: 120px;
    height: 32px;
    line-height: 32px;
}
</style>
<body>
    <div class="item">
        <p id="send">发送</p>
        <input type="text" id="input">
    </div>
    <div class="item">
        <p>默认发送数据:Hello!</p>
    </div>
    <div class="item">
        <p>接收数据:</p>
        <p id="data"></p>
    </div>
	<script>
	var ws = new WebSocket("ws://127.0.0.1:6080");

	ws.onopen = function(){
        console.log('发送数据:WebSocket  hellowrold!!')
        ws.send('Hello!');
	};

	ws.onmessage = function(ev){
        console.log('接收数据' + ev.data);
        document.getElementById('data').innerHTML = ev.data;
	};
	ws.onclose = function(ev){
		alert("close");
	};
	ws.onerror = function(ev){
		console.log(ev);
		alert("error");
	};

    let button = document.getElementById('send');

    button.addEventListener('click', () => {
        let value = document.getElementById('input').value;

        ws.send(value);

        document.getElementById('input').value = '';
    }, false);

	</script>
</body>

</html>
```

#### 心跳保活

在实际使用 WebSocket 中，长时间不通消息可能会出现一些连接不稳定的情况，这些未知情况导致的连接中断会影响客户端与服务端之前的通信，

为了防止这种的情况的出现，有一种心跳保活的方法：客户端就像心跳一样每隔固定的时间发送一次 ping，来告诉服务器，我还活着，而服务器也会返回 pong，来告诉客户端，服务器还活着。ping/pong 其实是一条与业务无关的假消息，也称为心跳包。

可以在连接成功之后，每隔一个固定时间发送心跳包，比如 60s:

```js
setInterval(() => {
    ws.send('这是一条心跳包消息');
}, 60000)
```

#### 运行

```js
nodemon index.js

运行index.html文件
```