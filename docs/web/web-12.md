xe-ajax用于浏览器和node.js的HTTP客户端的请求

<https://github.com/xuliangzhan/xe-ajax>

#### 介绍

1.  fetch请求默认不带cookie

<!---->

1.  1.  前端请求会涉及到token权限验证,很多情况下需要携带，fetch里面有一个参数credentials，它有三个值

<!---->

1.  1.  1.  omit: 默认值,忽略cookie的发送
        1.  same-origin: 表示cookie只能同域发送，不能跨域发送
        1.  include: cookie既可以同域也可以跨域发送

<!---->

2.  fetch跨域问题，对应参数mode

<!---->

1.  1.  same-origin:该模式不允许跨域，需要遵守同源策略
    1.  cors:该模式支持跨域请求，该模式也可以同域请求不需要后端额外的cors支持，对应的respones type为cors
    1.  no-cors：该模式用于跨域请求但服务器不带cors响应头,也就是服务端不支持cors,这也是特殊的跨域请求方式,对应response type为opaque。

<!---->

3.  兼容性

<!---->

1.  1.  chrome,edge,firefox,opera新版兼容
    1.  ie，safari未兼容

#### 语法    

```js
Promise<Response> fetch(input[, init]);
```

#### 参数

1.  input

<!---->

1.  1.  定义获取的资源，可能的值：

<!---->

1.  1.  1.  一个字符串，包含获取资源的url。一些浏览器会接受blob:和data:作为schemes.
        1.  一个request对象

<!---->

2.  init

<!---->

1.  1.  methods:请求使用的方法，例如post,get
    1.  headers:请求头的信息
    1.  body:请求的body信息，可能是一个blob，BufferSource,FormData,URLSearchParames或USVString对象。注：get和head方法的请求不能包含body信息
    1.  mode：请求的模式，如cors，no-cors，same-origin
    1.  credentials: cookie携带的方式。如omit,same-origin,include

<!---->

3.  cache:请求的cache模式:default,no-store,reload,no-cache,force-cache,only-if-cached
3.  redirect:可用的redirect模式:follow自动重定向,error如果产生重定向将自动终止并跑出一个错误,manual手动处理重定向，chrome47现在默认manual
3.  referrerPolicy:指定了HTTP头部的referer字段的值。可能为：no-referrer,no-referrer-when-downgrade,origin,origin-when-cross-origin,unsafe-url
3.  integrity:包含请求的 [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)

#### 用法

-   基础用法

```js
fetch('https://unidemo.dcloud.net.cn/api/news').then(response => {
		return response.json();
}).then(myJson => {
    console.log(myJson);
});
```

-   Jsonp用法

```js
cnpm i fetch-jsonp --save-dev

import fetchJSonp from 'fetch-jsonp';

fetchJsonp('http://f.apiplus.net/time.json').then(response => {
		return response.json();
}).then(myJson => {
		console.log(myJson);
});
```

-   post基础用法

```js
postData('http://example.com/answer', {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error))

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}
```

-   上传json数据

```js
var url = 'https://example.com/profile';
var data = {username: 'example'};

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
```

-   上传文件

可以通过HTML的<input type='file' />

```js
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
```

-   上传多个文件

可以通过HTML的<input type='file' mutiple />

```js
var formData = new FormData();
var photos = document.querySelector("input[type='file'][multiple]");

formData.append('title', 'My Vegas Vacation');
// formData 只接受文件、Blob 或字符串，不能直接传递数组，所以必须循环嵌入
for (let i = 0; i < photos.files.length; i++) {
    formData.append('photo', photos.files[i]);
}

fetch('https://example.com/posts', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
```

-   自定义请求对象

```js
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request('flowers.jpg', myInit);

fetch(myRequest).then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
```