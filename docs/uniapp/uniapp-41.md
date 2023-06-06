Xcode11不再继续支持Application Loader，上传应用至appstore。以下整理上传的几种方式可供选择。

##  一、下载Application Loader拷贝至如下位置（不推荐）

```js
/Applications/Xcode.app/Contents/Applications/
```

如果上传的时候报错，提示下载jar包，解决如下

```js
/Applications/Xcode.app/Contents/Applications/Application Loader.app/Contents/itms/bin/iTMSTransporter
```

在这个路径下，双击运行这个iTMSTransporter，会自动下载，根据网速，等一下，当提示进程结束时说明下载完了，就可以关闭了，重启xcode之后重新上传就可以了。

##  二、transporter 可视化上传（推荐）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6775c935b3c4552b04eddaee4ff3e76~tplv-k3u1fbpfcp-zoom-1.image)

功能类似 Application Loader 更简洁方便。

下载地址（<https://apps.apple.com/cn/app/transporter/id1450874784?mt=12>）

有的时候transporter 会一直卡在“正在验证APP-正在通过APP store进行认证”

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4cbda49615348ff8f21ce8cf2c4a8c7~tplv-k3u1fbpfcp-zoom-1.image)

解决步骤

1.  cd ~
1.  mv .itmstransporter/ .old_itmstransporter/
1.  /Applications/Xcode.app/Contents/Applications/transporter/app/Contents/itms/bin/iTMSTransporter

第三步可能会出现长时间等待没有结果的情况。可以尝试以下操作

1.  切换4G
1.  打开梯子
1.  添加sudo 管理员运行

如果还是不能上传，请用第三种方式进行上传

##  三、xcrun altool或者xcodebuild

命令行操作：

1.  运行 `xcrun altool` 显示如下，证明已经安装xcrun altool 工具


```js
xcrun altool --validate-app -f 包体绝对路径.ipa -t iOS -u 用户名 -p 密码
```

3.上传包

```js
xcrun altool --upload-app -f 包体绝对路径.ipa -t iOS -u 用户名 -p 密码
```

## ##  可能出现的问题

-   问题1：密码问题

```js
*** Error: Unable to validate archive './Desktop/__UNI__570B465_0302221207.ipa': (
    "Error Domain=ITunesSoftwareServiceErrorDomain Code=-22020 "We are unable to create an authentication session." UserInfo={NSLocalizedDescription=We are unable to create an authentication session., NSLocalizedFailureReason=Unable to validate your application.}"
)
```

出现上述提示，更换动态密码即可。（需要使用动态密，而不是原来账号的密码。需要先登录账号，获取到动态密码）

获取方式登录（<https://appleid.apple.com/>）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b1ad9a1540f45acb142354aa0e40df9~tplv-k3u1fbpfcp-zoom-1.image)

-   问题二：
    上传包过程中（--upload-app）一直没有任何反应，等待时间过长。
    解决方案：--upload-app 命令前增加sudo 使用管理员账号登录。

至此，三方方案可以满足大多数情况的应用上传，还有一种使用秘钥上传的方式未经验证。待更新。0

##  四、相关文章

<https://segmentfault.com/a/1190000037518926>