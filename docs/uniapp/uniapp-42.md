## 步骤一、更改接口版本号

1.  打开APP.vue - appInfo - zsdx-version
1.  将zsdx-version 更改为当前版本号

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7acb44bd8843480685043325cfdff652~tplv-k3u1fbpfcp-zoom-1.image)

## 步骤二、更改应用版本名称和应用版本号

1.  打开manifest.json - 基础配置
1.  找到应用版本名称及应用版本号
1.  更改至当前版本

注意：

1.  应用版本名称与应用版本号必须高于上一次设置的值。
1.  应用版本名称与应用版本号规则一致。
1.  应用版本名称与APP.vue 中的接口版本号一致。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95f35b9df0e64d0e920bc4140e990110~tplv-k3u1fbpfcp-zoom-1.image)

## 步骤三、更改推送设置

1.  打开 manifest.json - 源码视图
1.  找到 push 模块
1.  将推送设置改为正式环境所需配置

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc38b074876b483998416779d1634e75~tplv-k3u1fbpfcp-zoom-1.image)

## 步骤四、提交云打包配置

1.  HBuilder - 发行 - 原生APP云打包
1.  勾选打包应用
1.  填写证书密码
1.  选择对应的证书文件
1.  点击打包

注意：正式包云打包需选择 apple_store_cn_zsdx_student.mobileprovision 证书文件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdf3d988ab3b4aec8b40d1d7e970cad1~tplv-k3u1fbpfcp-zoom-1.image)

## 步骤五、下载应用包

1.  云打包完毕后，会在HBuilder控制台输出下载地址
1.  点击下载即可

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c36229121a074fe4bd259cfba9bef43e~tplv-k3u1fbpfcp-zoom-1.image)

## 步骤六、上传应用包至testflight进行构建（多种上传方式可参考 [点击跳转](https://github.com/Wangenbo/notes/blob/master/Tools/ipa%E4%B8%8A%E4%BC%A0%E8%87%B3appstore%20%E7%9A%84%E5%87%A0%E7%A7%8D%E6%96%B9%E5%BC%8F.md)）

1.  打开 Transporter 应用
1.  添加APP
1.  等待上传成功
1.  稍作等待后，testflight 会收到最新的应用包测试通知

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e46e82275254f588e5859c6cb30a67c~tplv-k3u1fbpfcp-zoom-1.image)

## 步骤七、在 Testflight 中进行发布验收

1.  测试工程师验收
1.  UI设计师验收
1.  产品经理验收

## 步骤八、苹果开发者后台构建提交版本

1.  登录苹果开发者后台 <https://developer.apple.com/>
1.  选择APP Stroe Connect - 进入APP Stroe Connect - 选择"我的APP"
1.  找到对应的应用进入
1.  添加版本和平台
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecc3c107fc954c378e5823c0fce61446~tplv-k3u1fbpfcp-zoom-1.image)
1.  添加版本

添加版本 应与APP内应用版本号一致

6.  上传构建的版本包
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12dd3096a201469c96d24e0ebd92896b~tplv-k3u1fbpfcp-zoom-1.image)
6.  完善其他信息
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5471f2c51732475e965994a0a1ada292~tplv-k3u1fbpfcp-zoom-1.image)
6.  点击存储
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2893448e628c4c2086aaca81b1d07718~tplv-k3u1fbpfcp-zoom-1.image)
6.  点击提交以供审核
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eee7e26d336444918070a315161f9081~tplv-k3u1fbpfcp-zoom-1.image)