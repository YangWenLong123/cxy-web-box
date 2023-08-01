## 介绍
gzip压缩是解决编译产物体积过大、缩短静态资源请求时长的常用手段之一，我们在网站上经常能看到 Content-Encoding: gzip 这个 http 响应头，表示内容使用 gzip 压缩；gzip压缩分为动态压缩与静态压缩，下面浅浅的介绍下这两种方式以及使用；


## 动态压缩
在Nginx中，我们可以编辑Nginx的配置文件nginx.conf的http、https模块中来启用gzip压缩。以下是一个常见的gzip配置示例：
```js
http {
  gzip  on;
  gzip_min_length  1k;
  gzip_buffers  4 16k;
  gzip_http_version 1.1;
  gzip_comp_level 6;
  gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php application/javascript application/json;
  gzip_vary on;
}

```
![f.png](http://cdn.alongweb.top/images/webbox/f.png)

<br />

这个配置中的各个指令的含义如下：
- gzip on;：开启gzip压缩。
- gzip_min_length 1k;：设置gzip压缩的最小文件大小，如果文件大小小于这个值，那么就不会进行压缩。
- gzip_buffers 4 16k;：设置系统获取几个单位的内存用于临时存放gzip的压缩结果数据流。这里4个16k，即获得了64k内存。
- gzip_http_version 1.1;：识别http协议的版本，旧版本的浏览器可能不识别gzip压缩。
- gzip_comp_level 6;：gzip压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间。
- gzip_types：进行gzip压缩的文件类型。
- gzip_vary on;：让前端的缓存服务器发送经过gzip压缩的页面。
- 配置完成后，需要重启Nginx服务，使配置生效。

<br />

改完配置，重启nginx服务器，查看静态资源响应头，出现Content-Encoding: gzip ****则代表开启成功；
![d.png](http://cdn.alongweb.top/images/webbox/d.png)


## 静态压缩
态压缩是在服务器上进行的，压缩级别越高越耗性能，静态压缩就是为了解决这个问题而生的，开启静态压缩后，nginx会自动寻找.gz后缀的文件，如果没有则返回源文件；于是乎，我们就可以在前端构建的时候进行gzip压缩；

以vite为例，我们需要引入vite-plugin-compression插件，并且在vite.config.js中按照下面的方式配置；

```js
  import commpressPlugin from "vite-plugin-compression";

  plugins: [
    commpressPlugin({
      verbose: true, // 默认即可
      disable: false, // 开启压缩(不禁用)，默认即可
      deleteOriginFile: false, // 删除源文件
      threshold: 1, // 压缩前最小文件大小
      algorithm: "gzip", // 压缩算法
      ext: ".gz", // 文件类型
    })
  ]
```

我们在本地打包，可以看待编译文件会多出一份.gz结尾的产物。
![e.png](http://cdn.alongweb.top/images/webbox/e.png)


需要在Nginx配置启用静态压缩
```js
   gzip_static on
```

![g.png](http://cdn.alongweb.top/images/webbox/g.png)
