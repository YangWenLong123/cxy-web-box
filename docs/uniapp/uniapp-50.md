## **使用demo**

链接：<https://pan.baidu.com/s/1jZXiHsoSfE2ff9VWAKTpgA> 提取码：xfme

## **准备事项**

1.  绑定插件到项目中，在项目的app原生插件配置中选择云端插件
1.  IOS 要在配置 manifest.json 文件中找到 ios 项,加入以下代码。

```js
"ios" : {
  "urlschemewhitelist" : "pinduoduo"//不加会导致拉不起客户端
}
```

3.  制作自定义基座并运行自定义基座（点击运行->运行到手机或模拟器->运行基座选择->自定义调试基座）

## **方法**

| **方法名**         | **说明**                   |
| --------------- | ------------------------ |
| openPdd()       | 唤起拼多多app                 |
| openPddByback() | 唤起拼多多app（带返回按钮，需要开通相应权限） |

## **实例化插件 ,在需要用到插件的页面引入**

```js
const plug= uni.requireNativePlugin('UZK-Pinduoduo');
```

## **1.唤起拼多多app**

```js
 plug.openPdd({
   url:"https://p.pinduoduo.com/mpGFX7xe"
 });
```

## **2.唤起拼多多app（带返回按钮，需要开通相应权限）**

```js
plug.openPddByback({
  url:"https://p.pinduoduo.com/mpGFX7xe"//打开拼多多后跳转的落地页
  appkey:"2293bd2ab56d480bb4afefd4d03e317",//为源app在拼多多开放平台上注册的应用唯一标识，对应client_id
  packageId:"com.test.alibcsdk",//源应用包名
  backUrl:"hkeda://"//返回源app的schemaUrl，和申请的schema保持一致
});
```

## **3.如何申请返回APP按钮**

当前返回按钮仅针对V2及以上等级开放申请。

若您满足等级条件，并接入了SDK，您可以在等级权益页面[https://jinbao.pinduoduo.com/level-right]()，找到APP返回按钮下的申请入口，进行相关信息的填写。