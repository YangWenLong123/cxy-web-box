uniapp可通过process.env.NODE_ENV判断当前环境是开发环境还是生产环境。一般用于连接测试服务器或生产服务器的动态切换。

-   在HBuilderX 中，点击“运行”编译出来的代码是开发环境，点击“发行”编译出来的代码是生产环境
-   cli模式下，是通行的编译环境处理方式。

```js
if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
}else{
    console.log('生产环境')
}
```

如果你需要自定义更多环境，比如测试环境：

-   假设只需要对单一平台配置，可以 package.json 中配置，在HBuilderX的运行和发行菜单里会多一个出来。<https://uniapp.dcloud.io/collocation/package>
-   如果是针对所有平台配置，可以在 vue-config.js 中配置。<https://uniapp.dcloud.io/collocation/vue-config>