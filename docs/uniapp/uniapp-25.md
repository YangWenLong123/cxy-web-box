## 前言

uniapp微信支付

## 流程

app微信支付

```js
uni.getProvider({
  service: 'payment',
  success: resp => {
    if(resp.provider.indexOf('wxpay') > -1) {
      //TODO 获取支付订单信息 由服务端处理
      uni.requestPayment({
        provider: provider,
        orderInfo: '',
        success: e => {
        	//支付成功回调
        },
        fail: e => {
          console.log('支付失败,原因为: ', e);
        }
      });
    } else {
      uni.showToast({
        title: '支付通道异常',
        icon: 'none'
      })
    }
  }
});
}
```

H5微信支付：<https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_1>

微信浏览器支付

市场上已经为我们有集成好的插件，

市场上已经为我们有集成好的插件，[https://www.npmjs.com/package/jweixin-module]

流程：

1.配置config方法

2.调用ready方法

3.判断授权状态，拉起支付，支付有服务商支付和普通回复

```js
...
```

## 文档

商户平台微信支付接入：[https://pay.weixin.qq.com](https://pay.weixin.qq.com/index.php/core/home/login?return_url=%2F)

支付接口文档：<https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_12&index=2>