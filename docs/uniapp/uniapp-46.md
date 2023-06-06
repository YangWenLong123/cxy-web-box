# uni-app app跳转mini程序

##1. uni-app打开分享功能

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d1985c3cc8e4e41a1c376e98501fda5~tplv-k3u1fbpfcp-zoom-1.image)

打开共享功能

##2. 获取mini程序原始id

[小程序的原始id获取url](https://links.jianshu.com/go?to=https%3A%2F%2Fmp.weixin.qq.com%2F)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/322b1595b1c34d92be762eabe409ed36~tplv-k3u1fbpfcp-zoom-1.image)

点击设置

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0b9e3fffdbc46f998b39549cda4fa31~tplv-k3u1fbpfcp-zoom-1.image)

AppID(小程序ID)

##3. 编写代码

###template

```js
<view class="" @tap="test">打开小程序</view>
```

###data

```js
sweixin: ''
```

## onLoad

```js
let that = this
// #ifdef APP-PLUS
console.log("plus");
plus.share.getServices(function(s) {
  var shares = {};
  for (var i = 0; i < s.length; i++) {
    var t = s[i];
    console.log(t);
    shares[t.id] = t;
    console.log(t.id);
  }
  that.sweixin = shares['weixin']

}, function(e) {
  console.log("获取分享服务列表失败：" + e.message);
});
//#endif
```

## methods

```js
test: function() {
  var n = this;
  //#ifdef APP-PLUS
  console.log(n.sweixin);
  n.sweixin ? n.sweixin.launchMiniProgram({
    id: '请填写mini程序的原始id',
    type: 0, //小程序版本  0-正式版； 1-测试版； 2-体验版。
    path: 'pages/home/home?id=' + 1 //小程序的页面,用传的参数在小程序接值判断跳转指定页面
  }) : plus.nativeUI.alert('当前环境不支持微信操作!');

  //#endif
},
```