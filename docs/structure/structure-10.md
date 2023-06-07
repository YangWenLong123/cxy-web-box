### 生成changelog

1.  安装插件

```js
npm i conventional-changelog-cli --save-dev
```

2.在package.js中加入配置

```js
"scripts": {
    "changelog": "conventional-changelog -p angular -u -i CHANGELOG.md -s -r 0"
}
```

3.执行命令

```js
npm run changelog
```

4.查看文件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/827d4b0673f44371aeff9557413d9021~tplv-k3u1fbpfcp-zoom-1.image)