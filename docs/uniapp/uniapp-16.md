 ## 介绍

由于部分地段安卓机不支持设置状态栏的前景色，默认是白色，如果产品也是白色系，那就一白到底了。下面看效果图。

 ## 效果图

图一：ios/android   图二：已经适配的低配不兼容android   图三：没有在低配不兼容android适配的淘宝（哈哈哈😂）

可以清晰的看到，淘宝app搜索框上面很白很白，没有对状态栏进行适配兼容。

 ## ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31a888fac78a4af5ad727b83a579c171~tplv-k3u1fbpfcp-zoom-1.image)![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2160523bd61a4978acc0d4c374b64061~tplv-k3u1fbpfcp-zoom-1.image)![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05b6fc750bc9492e85aadae6a9648cca~tplv-k3u1fbpfcp-zoom-1.image)

 ##

 ## 解决

不同app的开发语言可能不同，我这里说下uniapp的一种解决办法。

一开始尝试办法解决，但都在低配安卓机中不生效。

```js
//在pages.json中设置状态前景颜色
"navigationBarTextStyle": "black"

//使用官方api设置
uni.setNavigationBarColor({
  frontColor: "#000000"
})

//使用H5+方法设置
plus.navigator.setStatusBarStyle('dark');
```

最后解决办法

思路：

一、获取状态高度

二、用view标签元素定位在状态栏位置，设置标签背景色。

三、//给这个元素设置开关，显示与不显示逻辑