# 协商缓存

协商缓存是一种缓存策略，它依赖于客户端和服务器之间的通信。当客户端再次请求一个资源时，它会把上次请求返回的Last-Modified或者Etag标头发送到服务器，然后服务器会比较这个标头和资源的当前版本，如果没有变化，服务器就返回304状态码，表示资源没有变化，客户端可以使用缓存的版本。如果资源有变化，服务器就返回新的资源和新的Last-Modified或者Etag标头。

在Nginx服务器中，你可以使用expires指令来设置Cache-Control和Expires标头，这两个标头用于控制浏览器的缓存行为。你也可以使用add_header指令来设置Etag标头。

浏览器缓存有两种：200 OK (from memory/disk cache)  和   304 Not Modified


1、200 OK (from memory/disk cache)

这种缓存方式已经很普遍，大部分网站的静态文件都采用了，200 OK (from memory cache)或者200 OK (from disk cache)都是直接读取客户端的缓存，无需再请求服务器。一般是在Apache或者Nginx里设置，比如Nginx配置里会有类似这样的配置：

```js
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)${
  expires      30d;
}

location ~ .*\.(js|css)?${
  expires      12h;
}
```
这样就可以给静态文件缓存了，在有效期内，浏览器会直接读取客户端的缓存，而不用再请求服务器，除非用户清除了缓存或者使用Ctrl+F5强制刷新了页面。


2、304 Not Modified

304缓存和上面最大的区别是浏览器需要向服务器询问一次，如果服务器端认为没有内容更新，直接返回304状态码，无需返回body内容，浏览器就会直接取缓存内容输出，这样省掉了没必要的数据传输，也就提升了访问速度。

304出现的情状就是expires过期。