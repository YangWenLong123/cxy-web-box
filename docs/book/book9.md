## 前言

在 WebSocket 中，携带身份验证信息（authorization ）通常是通过在握手阶段或连接建立后，使用类似于 HTTP 请求头的机制来传递的。本文将介绍在 WebSocket 的请求头中如何携带 Authorization 信息，以增强安全性。
![alt text](image-31.png)

## 基本概述

在 WebSocket 握手阶段或连接建立后，在发送或接收消息时，使用 HTTP 风格的授权头（Authorization Header）来传递身份验证信息。

理解 WebSocket 授权头的基本流程如下：

1. 握手阶段： WebSocket 通信的开始阶段是握手。在握手过程中，客户端和服务器之间会交换一些特定的信息，包括 HTTP 头。在这个阶段，可以使用类似于 HTTP 的授权头来传递身份验证信息。

2. Authorization Header： 通常情况下，HTTP 授权头包含一个字符串，该字符串由一个认证类型和凭证信息组成，中间使用空格分隔。例如，基本身份验证的 Authorization Header 可能如下所示：

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

在上面的例子中，"Basic" 是认证类型，后面的字符串是经过 Base64 编码的用户名和密码的组合。

3. 自定义授权头： 除了基本身份验证外，你还可以定义自己的授权头格式，以满足特定的身份验证需求。例如，可以使用类似于下面的格式：

```
Authorization: Bearer your_access_token
```

在这种情况下，"Bearer" 是认证类型，后面的字符串是访问令牌，用于验证用户的身份。

## 使用场景

在许多实时应用中，如在线聊天、实时协作和实时通知，使用 WebSocket 进行双向通信是很常见的。当应用涉及到敏感数据或需要用户身份验证时，携带 Authorization 信息就显得尤为重要。这确保了只有授权的用户能够与 WebSocket 服务器建立连接。

## 常用方法

### 方法 1：使用标准 HTTP 头

WebSocket 的握手阶段使用 HTTP 协议进行，因此可以在 WebSocket 的 HTTP 请求头中添加 Authorization 字段。示例代码如下：

```js
const socket = new WebSocket("wss://example.com/socket");

socket.addEventListener("open", (event) => {
  // 在握手阶段添加Authorization头
  socket.send("Authorization: Bearer " + YOUR_TOKEN);
});

socket.addEventListener("message", (event) => {
  // 处理接收到的消息
  console.log("Received:", event.data);
});
```

### 方法 2：使用自定义

WebSocket 子协议通过使用自定义的 WebSocket 子协议，可以在握手请求中定义 Authorization 信息。这需要服务器端和客户端都支持相应的子协议。示例代码如下：

```js
const socket = new WebSocket("wss://example.com/socket", "custom-protocol");

socket.addEventListener("open", (event) => {
  // 在握手阶段通过自定义协议传递Authorization信息
  socket.send("Authorization: Bearer " + YOUR_TOKEN);
});

socket.addEventListener("message", (event) => {
  // 处理接收到的消息
  console.log("Received:", event.data);
});
```

### 方法 3：使用 URL 参数

在 WebSocket 的连接 URL 中直接携带 Authorization 信息，这种方法简单直接，适用于一些简单的场景。示例代码如下：

```js
const socket = new WebSocket(
  "wss://example.com/socket?authorization=" + YOUR_TOKEN
);

socket.addEventListener("message", (event) => {
  // 处理接收到的消息
  console.log("Received:", event.data);
});
```

### 方法 4：使用 WebSocket 的扩展

某些 WebSocket 库支持使用扩展来携带 Authorization 信息。这通常需要在 WebSocket 的初始化阶段进行相应的设置。示例代码如下：

```js
const socket = new WebSocket("wss://example.com/socket", ["authorization"]);

socket.addEventListener("open", (event) => {
  // 在初始化阶段添加Authorization信息
  socket.send("Authorization: Bearer " + YOUR_TOKEN);
});

socket.addEventListener("message", (event) => {
  // 处理接收到的消息
  console.log("Received:", event.data);
});
```
