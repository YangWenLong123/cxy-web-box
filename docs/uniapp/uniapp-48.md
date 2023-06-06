# **概述**

**插件简介**

UZK-AlibcsdK插件 封装了阿里百川电商sdk(目前为官方最新版本Android V4.0.0.15，IOS V 4.0.1.6),能够使你的app快速集成淘宝的电商功能,包括授权登录,查看商品详情,查看店铺,渠道授权，使用本插件需要遵从阿里百川的申请流程,需要登录阿里百川,进入控制台,创建应用并获取sdk的安全图片。

# **安卓使用demo**

链接：<https://pan.baidu.com/s/1jZXiHsoSfE2ff9VWAKTpgA> 提取码：xfme

# **插件使用攻略**

使用之前须从阿里百川控制台创建应用，获取 appkey。 UZK-Alibcsd阿里百川SDK，目前为官方最新版本Android V4.0.0.15，IOS V4.0.1.6。

使用之前先阅读[百川SDK升级FAQ](https://baichuan.taobao.com/docs/doc.htm?spm=a3c0d.7662649.0.0.5b48be48FaIGUy&treeId=129&articleId=118171&docType=1)

在使用插件中出现任何问题可以通过邮箱：hkeda@qq.com，或者QQ：474938261与我联系，交流群：262521283

# **准备事项**

1.首先加入百川<http://baichuan.taobao.com/>,在阿里百川控制台创建应用获取appkey：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92d8ace3a1f64099b2299f07fbf700e3~tplv-k3u1fbpfcp-zoom-1.image)

2.在阿里百川控制台“我的产品后台”中申请百川电商SDK:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5a30d533c62487ebdac0570de711856~tplv-k3u1fbpfcp-zoom-1.image)

# **重要提示**

**如果你的百川应用是刚创建的，或者百川电商SDK是刚开通的，试用插件的时候会有可能使用不了拉起手淘授权登录，刚开通的电商权限百川那边会有一段时间的缓存，需要过段时间重新生成安全图片再进行测试。**

3.套件申请（通过url打开淘系页面时，可以透传登录状态）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/858ce148792f4c8a9193659cb3d96786~tplv-k3u1fbpfcp-zoom-1.image)

4.生成安全图片:(使用V5版安全图片,android 需要上传apk,iOS只需要填写 bundleId)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3708f54381c84c29bf6a7afe440a67c0~tplv-k3u1fbpfcp-zoom-1.image)

5.分别替换掉安卓和IOS的安全图片（很重要）！

# **IOS和Android的安全图片下载下来后都需要重新命名为yw_1222_baichuan.jpg，否则会初始化失败**

android安全图片路径

复制代码 UZK-Alibcsdk/android/res/drawable/yw_1222_baichuan.jpg

ios安全图片路径

复制代码 UZK-Alibcsdk/ios/yw_1222_baichuan.jpg

# **必须提交云打包 或 制作自定义基座 ,才能有效果.**

#### 1.点击插件页面右上角的购买或者试用按钮，绑定到项目中

#### 2.在项目中的manifest.json的原生插件配置中选择插件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7199e02d10ee4208b85d05dad50d5833~tplv-k3u1fbpfcp-zoom-1.image)

#### 3.本地 uniapp 项目 需要在根目录下,放上 nativeplugins 插件文件夹, 主要是存放安全图片用于提交到服务器上打包使用,包含 ios 和 android 子目录, 插件名称: UZK-Alibcsdk 文件夹名不能修改, 具体看图片所示.

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e23d6a05816447ce8a0336a442840983~tplv-k3u1fbpfcp-zoom-1.image)

### 提示： 如果你的APP同时也集成了支付宝SDK,要把插件包中的 UTDID.framework 和 utdid4all-1.1.5.3_proguard.jar 文件删除否则会提示冲突。，如果没有集成则保留一起打包。

# **提醒: 文件在右上角: 下载示例项目ZIP 中.**

#### 4. IOS 要在配置 manifest.json 文件中找到 ios 项,加入以下代码。。

复制代码 "ios" : { "urltypes" : [ { "urlschemes" : ["tbopen+你在百川创建应用的appkey"]//不加会导致拉起手淘回不到自己的app。或者登陆失败 } ], "urlschemewhitelist" : "tbopen,tmall"//不加会导致拉不起手淘 }

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8151251b1db7496699845e9c10861c6d~tplv-k3u1fbpfcp-zoom-1.image)

#### 5. 点击HBuilderX的运行-》制作自定义调试基座。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ceb09eec6114a23950a4aee47cebec3~tplv-k3u1fbpfcp-zoom-1.image)

## **插件接口**

| **方法名**       | **说明**        |
| ------------- | ------------- |
| init()        | 初始化           |
| login()       | 淘宝授权登录        |
| logout()      | 退出登录          |
| opendetail()  | 通过商品ID打开商品详情页 |
| openshop()    | 通过店铺id打开店铺首页  |
| openmycart()  | 打开我的购物车       |
| openurl()     | 打开优惠券         |
| getuserinfo() | 获取用户授权信息      |
| getpublisher  | 用于H5渠道备案（新增）  |
| getutdid      | 获取UTDID(新增)   |
| qdByhide      | 渠道备案（静默式）     |

# **1. 实例化插件 ,在需要用到插件的页面引入**

复制代码const plug= uni.requireNativePlugin('UZK-Alibcsdk');

# **2.百川初始化 init() , 传入参数: 无**

复制代码 plug.init(result=>{ });

-   初始化成功后,返回数据格式

复制代码{ "status":true, "msg": "初始化成功", }

-   初始化失败,返回数据格式

复制代码{ "status":false, "msg": "初始化失败", }

# **3.淘宝授权登录 login() , 传入参数: 无**

复制代码 plug.login(result=>{ });

-   登录成功后,返回数据格式

复制代码{ "status":true, "msg": "登录成功", "data": { "userId":"" "openSid": "", "nick": "", "avatar": "", "topAuthCode": "", "topAccessToken": "", "openId": "", "topExpireTime":"", "utdid":"" } }

-   登录失败,返回数据格式

复制代码{ "status":false, "msg": "登录失败", }

# **4.通过url打开指定页面openurl()**

拉起手淘打开指定url（比如优惠券二合一领券页面）

# **特别注意：**

1.新版百川SDK取消了使用H5方式打开优惠券二合一页面，该类页面只支持拉起手淘打开。详见下方补充说明。或者查看[百川SDK升级FAQ](https://baichuan.taobao.com/docs/doc.htm?spm=a3c0d.7629140.0.0.3543be48e3YOa4&treeId=129&articleId=118171&docType=1#)

2.用户在未安装手淘的情况下，建议在调用该方法前先判断用户是否安装了手淘，如果没有安装手淘，url参数可以传入新人福利社 https://mos.m.taobao.com/activity_newer (此页面在套件“淘宝客基础页面包”中)，引导手淘拉新，会有相应的拉新奖励。

3.当url传入的地址为百川控制台/套件申请/淘宝客基础页面包里面的地址时改方法不支持拉起手淘，将打开一个百川的webview页面。 ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/85b8901195ea4bdba48a3fde7f5a6242~tplv-k3u1fbpfcp-zoom-1.image)

openurl({params}, result=>{

})

## 传入的参数params

url：

-   类型：字符串
-   描述：（必传）如优惠券二合一领券页面，也可打开百川SDK套件内的相关页面

linkkey：

-   类型：字符串
-   描述：（可选项）拉起淘宝或者天猫客户端，默认拉起淘宝客户端
-   默认值：taobao
-   取值范围：

<!---->

-   taobao（淘宝）
-   tmall（天猫）IOS暂不支持拉起天猫客户端

pid：

-   类型：字符串
-   描述：(可选项)采用联盟PID方式打点。

adzoneid：

-   类型：字符串
-   描述：(可选项)采用联盟adzoneid方式打点，**传入该参数之后pid参数失效,adzoneid为pid三段式第三段，如pid : mm_123_456_789,adzoneid为789**

appkey：

-   类型：字符串
-   描述：（可选项）淘宝联盟Appkey，当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。
-   特别说明：当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。

nativeFailedMode：

-   类型：字符串
-   描述：（可选项）唤端失败模式（用户在未安装手淘的一些操作）
-   默认值：download
-   取值范围：

<!---->

-   h5(应用内webview打开)
-   download(跳转到淘宝下载页)
-   none（不做处理）

## 示例代码

复制代码plug.openurl({ url: '', pid: 'mm_123_456_789', adzoneid: '789', appkey:'2459134', linkkey: 'taobao', nativeFailedMode:'download' }, result=> { });

# **5.qdByhide()渠道备案（静默无感式）**

支持code的方式进行授权备案，也支持token的方式进行备案。

-   用code的方式链接格式为： https://oauth.m.taobao.com/authorize?response_type=code&client_id=你的淘宝联盟APPKEY&redirect_uri=你的回调地址&state=你的自定义参数&view=web
-   用token的方式链接格式为： https://oauth.m.taobao.com/authorize?response_type=token&client_id=你的淘宝联盟APPKEY&redirect_uri=你的回调地址&state=你的自定义参数&view=web

链接拼接参数见淘宝联盟FAQ[页面地址](https://open.taobao.com/doc.htm?docId=118&docType=1&spm=a219a.7395903.0.0.7ef4397107L4Jv)

## 关于回调地址

1.  在你的回调地址中引入一个百川的js,这个很重要。

复制代码<script type="text/javascript" src="https://g.alicdn.com/mtb/lib_BC/0.1.0/p/index/index.js"></script>

1.  在页面中执行一段js,达到自动关闭当前的百川webview

复制代码<script type="text/javascript"> setTimeout(function () { console.log(JSON.stringify(Baichuan)); Baichuan.closeWebView(); },2000); </script>

详情见百川相关文档[页面地址](https://baichuan.taobao.com/docs/doc.htm?spm=a3c0d.7629140.0.0.4304be48773ifA&treeId=129&articleId=105646&docType=1)

## 示例代码

复制代码plug.qdByhide({ url:"https://oauth.m.taobao.com/authorize?response_type=token&client_id=28002500&redirect_uri=http://m.baidu.com&state=1212&view=web" },result=> { var access_token = result.data.access_token; });

## 注意事项

1.  所谓静默式就是用户无需二次授权就可以获取到用户的渠道。该接口无任何ui界面，无感知的。
1.  该方法命中率不敢保证百分百，可以多执行几次。
1.  调用该接口前一定要先进行一次手淘授权即login（）方法，详情见示例代码。

# **6 . getpublisher()渠道授权备案**

调用该接口前一定要先进行一次手淘授权即login（）方法，详情见示例代码。

支持code的方式进行授权备案，也支持token的方式进行备案。

-   用code的方式链接格式为： https://oauth.m.taobao.com/authorize?response_type=code&client_id=你的淘宝联盟APPKEY&redirect_uri=你的回调地址&state=你的自定义参数&view=web
-   用token的方式链接格式为： https://oauth.m.taobao.com/authorize?response_type=token&client_id=你的淘宝联盟APPKEY&redirect_uri=你的回调地址&state=你的自定义参数&view=web

链接拼接参数见淘宝联盟FAQ[页面地址](https://open.taobao.com/doc.htm?docId=118&docType=1&spm=a219a.7395903.0.0.7ef4397107L4Jv)

## 传入的参数params

url：

-   类型：字符串
-   描述：（必传）H5授权登录页面

## 示例代码

复制代码 plug.getpublisher({ url:"https://oauth.m.taobao.com/authorize?response_type=token&client_id=28002500&redirect_uri=http://m.baidu.com&state=1212&view=web" },result=> { });

-   用code的方式进行备案，用户授权成功后返回

复制代码 { "status": true, "data": { "state": "1212", "code": "pfFyW3fuvgNy3HyntWarRCXr6212457" }, "msg": "获取数据成功" }

-   用token的方式进行备案，用户授权成功后返回

复制代码 { "status": true, "data": { "state": "URL传入的自定义参数原样返回", "token_type": "Bearer", "expires_in": "7776000", "w2_expires_in": "0", "top_sign": "1C66899F7050F89376D18F69D85CD1EF", "refresh_token": "61018271bf3078a02d962fdf452bd21ff20125e2efbb0693712744257", "r2_expires_in": "0", "w1_expires_in": "1800", "taobao_user_nick": "tb05013736", "r1_expires_in": "1800", "re_expires_in": "0", "access_token": "6102727177562d9610e50ca142405d62ac7134cd06636b83712744257", "taobao_open_uid": "AAE3948hAJhcrF0RzlRVnOR5" }, "msg": "获取数据成功" }

-   用户关闭页面后的回调

复制代码 { "status": false, "data": "", "msg": "用户关闭了页面" }

# **7.通过商品id打开指定商品详情opendetail()**

拉起手淘打开指定商品详情页面

opendetail({params}, result=>{ })

## 传入的参数params

itemid：

-   类型：字符串
-   描述：（必选）要打开的商品id

linkkey：

-   类型：字符串
-   描述：（可选项）拉起淘宝或者天猫客户端，默认拉起淘宝客户端
-   默认值：taobao
-   取值范围：

<!---->

-   taobao（淘宝）
-   tmall（天猫）IOS暂不支持拉起天猫客户端

pid：

-   类型：字符串
-   描述：(可选项)采用联盟PID方式打点。

adzoneid：

-   类型：字符串
-   描述：(可选项)采用联盟adzoneid方式打点，**传入该参数之后pid参数失效,adzoneid为pid三段式，如pid : mm_123_456_789,adzoneid为789**

appkey：

-   类型：字符串
-   描述：（可选项）淘宝联盟Appkey，当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。
-   特别说明：当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。

nativeFailedMode：

-   类型：字符串
-   描述：（可选项）唤端失败模式（用户在未安装手淘的一些操作）
-   默认值：download
-   取值范围：

<!---->

-   h5(应用内webview打开)
-   download(跳转到淘宝下载页)
-   none（不做处理）

## 示例代码

复制代码 plug.opendetail({ itemid: '599977932601', pid: 'mm_123_456_789', adzoneid: '456', appkey:'2459134', linkkey: 'taobao', nativeFailedMode:"download" }, result=> { });

# **8. openmycart()**

拉起手淘打开我的购物车页面

tbopenmycart({params}, result=>{})

## 传入的参数params

pid：

-   类型：字符串
-   描述：(可选项)采用联盟PID方式打点。

adzoneid：

-   类型：字符串
-   描述：(可选项)采用联盟adzoneid方式打点，**传入该参数之后pid参数失效,adzoneid为pid三段式，如pid : mm_123_456_789,adzoneid为789**

appkey：

-   类型：字符串
-   描述：（可选项）淘宝联盟Appkey，当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。
-   特别说明：当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。

linkkey：

-   类型：字符串
-   描述：（可选项）拉起淘宝或者天猫客户端，默认拉起淘宝客户端
-   默认值：taobao
-   取值范围：

<!---->

-   taobao（淘宝）
-   tmall（天猫）IOS暂不支持拉起天猫客户端

nativeFailedMode：

-   类型：字符串
-   描述：（可选项）唤端失败模式（用户在未安装手淘的一些操作）
-   默认值：download
-   取值范围：

<!---->

-   h5(应用内webview打开)
-   download(跳转到淘宝下载页)
-   none（不做处理）

## 示例代码

复制代码plug.openmycart({ pid: 'mm_123_456_789', adzoneid: '456', appkey:'2459134', linkkey: 'taobao', nativeFailedMode:"download" }, result=> { });

## 补充说明

在没有安装手淘的情况下会默认打开手淘下载页面

# **9 . openshop()**

拉起手淘打开店铺页面

tbopenshop({params}, result=>{ })

## 传入的参数params

shopid:

-   类型：字符串
-   描述：（必须）淘宝店铺ID

sellerid：

-   类型：字符串
-   描述：（可选项）淘宝卖家ID

appkey：

-   类型：字符串
-   描述：（可选项）淘宝联盟Appkey，当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。
-   特别说明：当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。

pid：

-   类型：字符串
-   描述：(可选项)采用联盟PID方式打点。

adzoneid：

-   类型：字符串
-   描述：(可选项)采用联盟adzoneid方式打点，**传入该参数之后pid参数失效,adzoneid为pid三段式，如pid : mm_123_456_789,adzoneid为789**

linkkey：

-   类型：字符串
-   描述：（可选项）拉起淘宝或者天猫客户端，默认拉起淘宝客户端
-   默认值：taobao
-   取值范围：

<!---->

-   taobao（淘宝）
-   tmall（天猫）IOS暂不支持拉起天猫客户端

nativeFailedMode：

-   类型：字符串
-   描述：（可选项）唤端失败模式（用户在未安装手淘的一些操作）
-   默认值：download
-   取值范围：

<!---->

-   h5(应用内webview打开)
-   download(跳转到淘宝下载页)
-   none（不做处理）

## 示例代码

复制代码plug.openshop({ pid: 'mm_123_456_789', adzoneid: '789', appkey:'2459134', linkkey: 'taobao', nativeFailedMode:"download" }, result=> { });

# **10 . logout()**

退出登录

logout(result{ })

## 示例代码

复制代码plug.logout( result=> { if (result.status) { console.log('登出成功'); } });

# **11. getuserinfo()**

获取授权登录用户信息

getuserinfo(result=>{})

## 获取数据成功,返回数据格式

复制代码{ status: true //布尔型；true||false; true:获取成功，false：未授权登录 data:{ "openId":"", "nick":"", "avatarUrl":"" "openSid":"", "topAccessToken":"", "topAuthCode":"", "userid":"", "topExpireTime":"" } }

## 示例代码

复制代码plug.getuserinfo( result=> { if (result.status) { console.log(JSON.stringify(resultt.data)); } else { console.log('未授权登录'); } });

# **12 . getutdid()**

获取UTDID

## 示例代码

复制代码plug.getutdid( result=> { if (result.status) { console.log(result.utdid); } });

# **插件使用FAQ**

# 一.安卓初始化失败。

-   假如生成安全图片中上传的apk的包名为com.test.alibcsdk,签名文件为a,那么后续在使用插件的时候打包也要使用com.test.alibcsdk这个包名来进行打包，签名文件也一定要为a，否则就一定会初始化失败。

# 二.ios初始化失败。

-   假如使用百川应用appkey：123456的应用来生成安全图片，生成安全图片的时候填写的BundleID为com.test.alibcsdk,那么后续打包的时候也一定要使用com.test.alibcsdk这个BundleID来进行打包，并且urltypes里面配置的urlschemes参数一定要为tbopen123456,其中123456为生成安全图片时候的appkey

# 三.ios授权登陆后回不到自己的app,停在了淘宝首页。

-   出现这个情况是ios配置urltypes里面的urlschemes参数“tbopen+ appkey”中的appeky和生成安全图片的时候的不一致。

# 四.初始化成功，授权登陆没有办法正常使用。

-   初始化成功，调用授权登陆的时候没有拉起手淘，打开的四一个webview页面，出现这个问题的因为你在百川创建的应用没有开通百川权限，获取刚开通不久的电商权限。可以在百川控制台-我的产品后台找到相应权限并申请开通。