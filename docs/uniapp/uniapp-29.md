## 前言

uniapp苹果内购

## 流程

```js
let iapChannel;
let IAPOrders = ['test1', 'test2', 'test3'];//商品id
let id;
let username = '';

plus.payment.getChannels( ( channels ) => {
  console.log('@@@@getChannels@@@@', JSON.stringify(channels));
  for (var i in channels) {
    if (channels[i].id == 'appleiap') {
      iapChannel = channels[i];
      iapChannel.requestOrder(IAPOrders, ( event ) => {
        console.log('@@@@requestOrder@@@@', JSON.stringify(event));
        for (var index in event) {
          var OrderItem = event[index];
          id = OrderItem.productid;
          console.log('@@@@info@@@@', OrderItem.title + "Price:" + OrderItem.price + "Description:" + OrderItem.description + "ProductID:" + OrderItem.productid);

          plus.payment.request(iapChannel, {
            "productid": id,//商品标识
            "username": '',//购买用户昵称
            "quantity": 1//购买数量
          }, ( result ) => {
            console.log('@@@支付成功@@@', JSON.stringify(result));
            self.getInfo();
            //TODO
          }, ( e ) => {
            console.log('@@@支付失败@@@', "更多错误信息请参考支付(Payment)规范文档：http://www.html5plus.org/#specification#/specification/Payment.html", null, "支付失败：" + e.code);
          });
        }
      }, ( errormsg ) => {
        plus.nativeUI.alert(JSON.stringify(errormsg.message));
        console.log('@@@@获取支付通道失败1@@@@', JSON.stringify(errormsg.message));
      });
    }
  }
}, ( e ) => {
  console.log('@@@@获取支付通道失败2@@@@', JSON.stringify(e.message));
});
```

## 参考

<https://uniapp.dcloud.io/api/plugins/payment?id=faq>

<https://ask.dcloud.net.cn/article/497>

<http://www.html5plus.org/doc/zh_cn/payment.html#plus.payment.PaymentChannel.requestOrder>