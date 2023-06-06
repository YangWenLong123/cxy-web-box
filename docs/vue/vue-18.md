## 前言

如果我们要请求这个接口是存在跨域问题：<https://wanandroid.com/article/listproject/0/json>，那么如何解决呢？

```js
http://localhost:8080/
https://wanandroid.com
浏览器默认不允许 跨域请求，因为同源策略  即 wanandroid.com 是不允许 localhost:8080 的请求的

this.$axios.get("https://wanandroid.com/article/listproject/0/json").then(res => {
	console.log(res);
});
//浏览器会报跨域请求的错误提示
```

## proxy配置

```js
module.exports = {
  devServer: {
    proxy: {
      // api是发送请求的一个代理
      // 比如我们之前'https://wanandroid.com/article/listproject/0/json'
      // 代理之后请求写成'/api/article/listproject/0/json'
      '/api': {
        target: 'https://wanandroid.com/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

## 使用代理转发请求

```js
this.$axios.get("/api/article/listproject/0/json").then(res => {
	console.log(res.data);
});
```

## 文档

<https://www.webpackjs.com/configuration/dev-server/#devserver-proxy>

## 扩展

cors跨域资源共享，需要后端去配置<https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS>

| 开发环境  | 生产环境  |
| ----- | ----- |
| proxy | nginx |
| cors  | cors