## 前言

Vue路由刷新404的问题，通常是由于Vue是单页应用（SPA），在刷新页面时，浏览器会向服务器请求对应的路由，但在服务器端并没有对应的路由设置，所以返回了404错误。

要解决这个问题，你需要在服务器端做一些配置，让所有的路由请求都返回到Vue的入口文件，然后由Vue Router来处理路由。具体的配置方式取决于你的服务器类型。

例如，如果你使用的是Nginx服务器，你可以在Nginx的配置文件中添加一条重写规则：

```js
location / {
    try_files $uri $uri/ /index.html;
}

```

这条规则的意思是，当请求一个路由时，首先尝试访问对应的文件或者目录，如果都不存在，那么就返回`index.html`。

或者也可以这样配置

```js
location / {
  try_files $uri $uri/ @router;
}
location @router {
  rewrite ^.*$ /index.html last;
}
```

此外，你还可以在Vue Router的配置中添加一个通配符路由，用于匹配所有不存在的路由，然后重定向到一个404页面：

```js
const routes = [
    // 你的其他路由
    {
        path: '/:catchAll(.*)',
        component: () => import('@/views/404.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
```

这段代码的意思是，当访问一个不存在的路由时，就显示404.vue这个组件。

这样，无论是直接访问一个不存在的路由，还是刷新页面，都可以正确地显示404页面。