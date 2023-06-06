# 原生插件通用使用流程：

1.  购买插件，选择该插件绑定的项目。
1.  在HBuilderX里找到项目，在manifest的app原生插件配置中勾选模块，如需要填写参数则参考插件作者的文档添加。
1.  根据插件作者的提供的文档开发代码，在代码中引用插件，调用插件功能。
1.  打包自定义基座，选择插件，得到自定义基座，然后运行时选择自定义基座，进行log输出测试。
1.  开发完毕后正式云打包

[

](https://nativesupport.dcloud.net.cn/NativePlugin/offline_package/ios)

注意事项：使用HBuilderX2.7.14以下版本，如果同一插件且同一appid下购买并绑定了多个包名，提交云打包界面提示包名绑定不一致时，需要在HBuilderX项目中manifest.json->“App原生插件配置”->”云端插件“列表中删除该插件重新选择

# 京东联盟插件使用说明

## 1. 首先要在京东联盟网站申请：[京东联盟官网](https://union.jd.com/index)

## 2. 在京东联盟-》App管理 中添加你的应用，分别有Android 和 IOS

-   下载 Android sdk 文件中 src\main\res\raw 目录有一张 安全图片，把它复制到 插件目录下的 src\main\res\raw 中
-   下载 IOS sdk 文件中 有一个 JDSDK.bundle 文件，把它复制到插件目录下.
-   在uniapp 项目根目录中 新建一个插件目录:nativeplugins/Html5App-JdUnion/ ,插件名称不能改变
-   新建一个插件 android 目录用于存放安卓应用的安全图片

```js
/android/src/main/res/raw/safe.jpg
```

-   新建一个插件ios 目录用于存放ios 应用的安全图片

```js
/ios/JDSDK.bundle
```

## *本地插件目录如下所示, 勾选该云端插件即可

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/498b489cba034b48aad42f04ddac0f3f~tplv-k3u1fbpfcp-zoom-1.image)

## 3. 然后在uniapp 项目 配置文件中-》 原生插件配置中，云端插件勾选该插件，

## 4. 填写上 appkey，secretkey

## 5. IOS 还要配置白名单,方式是 sdkback+appkey，不然无法返回App

```js
"ios" : {
  "urltypes" : [
    {

      "urlidentifier" : "$(PRODUCT_BUNDLE_IDENTIFIER)",
      "urlschemes" : [ "sdkbackad2e6eaf1343fc3962a6e17cb1ce0ae" ]
    }
  ],
    "urlschemewhitelist" : "jdlogin,openapp.jdmobile"
}


======================================================================

  "urltypes" : [
    {
      "urlidentifier" : "zsdxstu",
      "urlschemes" : [ "tbopen27760514" ]
    },
    {
      "urlidentifier" : "zsdxstu",
      "urlschemes" : [ "sdkbackaea374511dde4d75ad543dc286be4fcd" ]
    }
  ],
    "urlschemewhitelist" : "baidumap,iosamap,qqmap,tbopen,tmall,mqq,weixin,jdlogin,openapp.jdmobile",
```

## 6. 实例化插件

```js
//实例化插件

const jd=uni.requireNativePlugin("Html5App-JdUnion");
```



## 7.方法调用, 本插件比普通的调起京东App多出一个返回键

## 只有一个openURL , type-> 参数包含两个选择：1. App ,2. H5 url-> 可以打开任意京东网站链接.

App->如果用户有安装京东App侧使用App打开页面，否则用H5打页面。

H5->就是不管有没有安装京东App都使用应用内H5打开页面。

```js
//打开京东 任意页面
jd.openURL({type:"App",url:"https://u.jd.com/ajP7AA"},result=>{

});
```

## 8 返回值 格式：{code:0,msg:"呼起京东成功"}

| **状态码** | **说明**   |
| ------- | -------- |
| 0       | 呼起京东成功   |
| 1       | 协议错误     |
| 2       | 未安装京东    |
| 3       | URL不在白名单