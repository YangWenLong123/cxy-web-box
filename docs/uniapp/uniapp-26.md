## 前言

uniapp支付宝支付

## 流程

app支付宝支付

```js
uni.getProvider({
  service: 'payment',
  success: resp => {
    if(resp.provider.indexOf('alipay') > -1) {
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

h5支付宝支付

<https://opendocs.alipay.com/open/203/107090>

流程：

1.根据商品订单编号获取订单信息

2.设置回调链接，一般都是当前页面

3.拿到这两个数据，调用接口返回订单支付的网页端调整链接跳转

注意：需要在非微信浏览器中才可以支付