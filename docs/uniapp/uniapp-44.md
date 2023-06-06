# Keystore

## 制作Keystore文件

以别名student，密码pwd1为例子

```js
keytool -genkey -alias student -keyalg RSA -keysize 2048 -validity 36500 -keystore student.keystore

Enter keystore password:  pwd1 //输入证书文件密码，输入完成回车
Re-enter new password:   pwd1 //再次输入证书文件密码，输入完成回车
What is your first and last name?
  [Unknown]: LiangYu Zhang //输入名字和姓氏，输入完成回车
What is the name of your organizational unit?
  [Unknown]: Android Development Team //输入组织单位名称，输入完成回车
What is the name of your organization?
  [Unknown]: Hangzhou Xin Mai Technology LTD //输入组织名称，输入完成回车
What is the name of your City or Locality?
  [Unknown]: HangZhou //输入城市或区域名称，输入完成回车
What is the name of your State or Province?
  [Unknown]: ZheJiang //输入省/市/自治区名称，输入完成回车
What is the two-letter country code for this unit?
  [Unknown]: CN //输入国家/地区代号（两个字母），中国为CN，输入完成回车
Is CN=XX, OU=XX, O=XX, L=XX, ST=XX, C=XX correct?
  [no]: y //确认上面输入的内容是否正确，输入y，回车

Enter key password for <testalias>
        (RETURN if same as keystore password):  //确认证书密码与证书文件密码一样（HBuilder|HBuilderX要求这两个密码一致），直接回车就可以

keytool -list -v -keystore student.keystore
```

# 360加固

## 1、下载程序

根据操作系统，下载360加固保并安装应用（<https://jiagu.360.cn/#/global/download>）

## 2、配置签名

启动应用，使用360应用市场账号登录（详见[https://zsdx.yuque.com/ck6ubz/iwgklf/942599](https://zsdx.yuque.com/ck6ubz/iwgklf/942599#729e)）。

点击签名设置，选择keystore路径和填写相应信息，添加签名，成功之后设置为默认签名。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3db4b9edb664866ad4d7a935b4219c3~tplv-k3u1fbpfcp-zoom-1.image)

## 3、加固应用

将apk文件拖入到应用加固界面，等待上传、加固、下载和签名完成。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4475601a37cd47f78aef2c0932d418d7~tplv-k3u1fbpfcp-zoom-1.image)

# 乐固加固

## 1、登录控制台

使用微信登录，然后访问<https://console.cloud.tencent.com/ms>。

## 2、上传应用

点击立即去加固，然后上传apk文件，等待应用加固完成。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea41cef553fc4f82af6fbf64c04546c1~tplv-k3u1fbpfcp-zoom-1.image)

## 3、下载应用

应用加固完成后，点击下载加固包，保存至本地文件夹。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/848989c4bb64484e9d63926d8b29c5b6~tplv-k3u1fbpfcp-zoom-1.image)

## 4、应用签名

使用360加固保进行加固后APK的签名，位置：工具包->签名APK。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b4e6af28955440b9e1b5d1259cc5575~tplv-k3u1fbpfcp-zoom-1.image)