## 获取系统信息[uni.getSystemInfo](https://uniapp.dcloud.io/api/system/info?id=getsysteminfo)

| 参数                          | 说明                                   | 平台差异说明                      |
| --------------------------- | ------------------------------------ | --------------------------- |
| brand                       | 手机品牌                                 | App、微信小程序、百度小程序、头条小程序、QQ小程序 |
| model                       | 手机型号                                 |                             |
| pixelRatio                  | 设备像素比                                |                             |
| screenWidth                 | 屏幕宽度                                 |                             |
| screenHeight                | 屏幕高度                                 |                             |
| windowWidth                 | 可使用窗口宽度                              |                             |
| windowHeight                | 可使用窗口高度                              |                             |
| windowTop                   | 可使用窗口的顶部位置                           | App、H5                      |
| windowBottom                | 可使用窗口的底部位置                           | App、H5                      |
| statusBarHeight             | 状态栏的高度                               | 头条小程序不支持                    |
| navigationBarHeight         | 导航栏的高度                               | 百度小程序                       |
| titleBarHeight              | 标题栏高度                                | 支付宝小程序                      |
| language                    | 应用设置的语言                              | 头条小程序不支持                    |
| version                     | 引擎版本号                                | H5不支持                       |
| storage                     | 设备磁盘容量                               | 支付宝小程序                      |
| currentBattery              | 当前电量百分比                              | 支付宝小程序                      |
| appName                     | 宿主APP名称                              | 头条小程序                       |
| AppPlatform                 | App平台                                | QQ小程序                       |
| host                        | 宿主平台                                 | 百度小程序                       |
| app                         | 当前运行的客户端                             | 支付宝小程序                      |
| cacheLocation               | 上一次缓存的位置信息                           | 百度小程序                       |
| system                      | 操作系统版本                               |                             |
| platform                    | 客户端平台，值域为：`ios`、`android`            |                             |
| fontSizeSetting             | 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px | 微信小程序、支付宝小程序、百度小程序、QQ小程序    |
| SDKVersion                  | 客户端基础库版本                             | 支付宝小程序和H5不支持                |
| swanNativeVersion           | 宿主平台版本号                              | 百度小程序                       |
| albumAuthorized             | 允许微信使用相册的开关（仅 iOS 有效）                | 微信小程序                       |
| cameraAuthorized            | 允许微信使用摄像头的开关                         | 微信小程序                       |
| locationAuthorized          | 允许微信使用定位的开关                          | 微信小程序                       |
| microphoneAuthorized        | 允许微信使用麦克风的开关                         | 微信小程序                       |
| notificationAuthorized      | 允许微信通知的开关                            | 微信小程序                       |
| notificationAlertAuthorized | 允许微信通知带有提醒的开关（仅 iOS 有效）              | 微信小程序                       |
| notificationBadgeAuthorized | 允许微信通知带有标记的开关（仅 iOS 有效）              | 微信小程序                       |
| notificationSoundAuthorized | 允许微信通知带有声音的开关（仅 iOS 有效）              | 微信小程序                       |
| bluetoothEnabled            | 蓝牙的系统开关                              | 微信小程序                       |
| locationEnabled             | 地理位置的系统开关                            | 微信小程序                       |
| wifiEnabled                 | Wi-Fi 的系统开关                          | 微信小程序                       |
| safeArea                    | 在竖屏正方向下的安全区域                         | App、H5、微信小程序                |
| safeAreaInsets              | 在竖屏正方向下的安全区域插入位置（2.5.3+）             | App、H5、微信小程序                |

****

## 拨打电话

```js
uni.makePhoneCall({
    phoneNumber: '17521192130'
});

//number：手机号码  confirm：true:用户确认后拨打  false:直接拨打
plus.device.dial(number, confirm)

Android不弹出询问框直接拨打电话：https://ask.dcloud.net.cn/question/4035
发送短信：http://www.html5plus.org/doc/zh_cn/messaging.html
Android读取短信验证码：http://ask.dcloud.net.cn/article/676
Android遍历读取短信：https://ask.dcloud.net.cn/article/12934 注意需要赋予相关权限。
```

## 扫码

```js
// 允许从相机和相册扫码
uni.scanCode({
    success: function (res) {
        console.log('条码类型：' + res.scanType);
        console.log('条码内容：' + res.result);
    }
});

// 只允许通过相机扫码
uni.scanCode({
    onlyFromCamera: true,
    success: function (res) {
        console.log('条码类型：' + res.scanType);
        console.log('条码内容：' + res.result);
    }
});

// 调起条码扫描
uni.scanCode({
    scanType: 'barCode',
    success: function (res) {
        console.log('条码类型：' + res.scanType);
        console.log('条码内容：' + res.result);
    }
});

自定义扫码：https://www.html5plus.org/doc/zh_cn/barcode.html
```

## 录音

参考：<https://uniapp.dcloud.io/api/media/record-manager?id=getrecordermanager>

```js
//语音识别文字
plus.speech.startRecognize({
    continue: false,
    engine: 'baidu',
    lang: 'zh-cn',
    nbest: 1,
    timeout: 1000,
    userInterface: true,
}, (res)=>{
    uni.showToast({
        title: JSON.stringify(res),
        icon: 'none',
        duration: 3000
    })
}, (error)=>{
    uni.showToast({
        title: JSON.stringify(error),
        icon: 'none',
        duration: 3000
    })
} );

var text = null;
plus.speech.addEventListener("start", function(){
		text = null;
}, false);
plus.speech.addEventListener("recognition", function(e){
		text += e.result;
}, false);
plus.speech.addEventListener("end", function(){
		alert("Success: "+text);
}, false);
```

## 闪光灯

```js
	open () {
    	if(plus.os.name == "iOS") {
    		var avcaptClass = plus.ios.importClass("AVCaptureDevice");
        if(avcaptClass) {
            var device = avcaptClass.defaultDeviceWithMediaType("vide");
            plus.ios.invoke(device, "lockForConfiguration:", null);
            if(this.isOn) {
                plus.ios.invoke(device, "setTorchMode:", 1);
                plus.ios.invoke(device, "setFlashMode:", 1);
            } else {
                plus.ios.invoke(device, "setTorchMode:", 0);
                plus.ios.invoke(device, "setFlashMode:", 0);
            }
                plus.ios.invoke(device, "unlockForConfiguration");
            }
        }
        this.isOn = !this.isOn;
	}
```

## 是否安装某个软件

```js
baidumap://		百度云
taobao://			淘宝

var isInstall = isInstallApp.isInstallApp(url);
uni.showToast({
    title: JSON.stringify(isInstall),
    icon: 'none'
})
```

## 打开某个软件

```js

plus.runtime.openURL(appurl, function(res) {
		console.log(res);
});
```

## 使用浏览器打开网址

```js
plus.runtime.openURL(url)
```

## 获取APPID

```js
uni.showToast({
    title: plus.runtime.appid,
    icon: 'none',
    duration: 3000
})
```

## 设置APP角标

```js
number：提示数据，0则清空
plus.runtime.setBadgeNumber(number);
```

## 打开文件

```js
//相对路径
plus.runtime.openFile('/static/zsdx.pdf')
```

## 发出蜂鸣

```js
number:次数
plus.device.beep(number)
```

## 震动

```js
plus.device.vibrate();//默认500ms

uni.vibrate({
    success: function () {
        console.log('success');
    }
});

//400ms
uni.vibrateLong({
    success: function () {
        console.log('success');
    }
});

//15ms
uni.vibrateShort({
    success: function () {
        console.log('success');
    }
});

iOS上只有长震动，没有短震动
iOS上需要手机设置“打开响铃时震动”或“静音时震动”，否则无法震动
vibrate只适用于钉钉小程序、支付宝小程序
```

## 键盘

```js
//隐藏键盘
uni.hideKeyboard()
plus.key.hideSoftKeybord();

//监听键盘高度变化
uni.onKeyboardHeightChange(res => {
  console.log(res.height)
})
```

## 发短信

```js
var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
msg.to = ['18611497504', '15811140520'];
msg.body = 'This is HTML5 Plus example test message';
plus.messaging.sendMessage( msg );
```

## 弹出框

```js
//系统对话弹窗框
plus.nativeUI.actionSheet({
    title:"晚餐吃什么?",
    cancel:"取消",
    buttons:[{
          title:"烧鸡"
      },{
          title:"烤鸭"
      }
		]},
    function(e){
    		let option = ['取消','烧鸡','烤鸭'];
        uni.showToast({
            title: option[e.index],
            icon: 'none',
            duration: 3000
        })
    }
);

//alert
plus.nativeUI.alert("Hello HTML5 plus!", function(){
		console.log("User pressed!");
}, "nativeUI", "OK");

//系统确认对话框
let option = ['确认','取消'];
plus.nativeUI.confirm("Are you sure ready?", function(e){
  uni.showToast({
    title: option[e.index],
    icon: 'none',
    duration: 3000
  })
});

//交互反馈
https://uniapp.dcloud.io/api/ui/prompt?id=showtoast
```

## 添加应用快捷方式

```js
plus.navigator.createShortcut({
    name: '测试快捷',
    toast: '创建成功'
});
```

## 预览图片

```js
plus.nativeUI.previewImage([
    'http://pic.wxhand.com/student_image/1d7af20d6ffa8c9b5c3e693415a90594!Thumbwidth320',
    'http://pic.wxhand.com/student_image/1d7af20d6ffa8c9b5c3e693415a90594!Thumbwidth320',
    'http://pic.wxhand.com/student_image/1d7af20d6ffa8c9b5c3e693415a90594!Thumbwidth320',
    'http://pic.wxhand.com/student_image/1d7af20d6ffa8c9b5c3e693415a90594!Thumbwidth320'
],{
    current:1,
    loop:true,
    onLongPress:function(e){	// 预览界面长按显示ActionSheet
    var bts=[
    {title:"随便来个标题",style:"destructive"},
    {title:"测试按钮一"},
    {title:"测试按钮二"}
];
plus.nativeUI.actionSheet({
    title:"ActionSheet标题",
    cancel:"取消",
    buttons:bts,
},
		function(e){
      let title = e.index > 0 ? bts[e.index-1].title : "取消";
      uni.showToast({
          title: title,
          icon: 'none',
          duration: 3000
        })
        }
      );
    }
});
```

## 设置系统状态栏颜色

```js
color: dark/light
plus.navigator.setStatusBarStyle(color);
```

## 获取系统状态栏高度

```js
uni.showToast({
  title: JSON.stringify(plus.navigator.getStatusbarHeight()),
  icon: 'none',
  duration: 3000
})
```

## 图片压缩

```js
plus.zip.compressImage({
    src: res.tempFilePaths[0],
    dst: res.tempFilePaths[0],
    quality: 10,  //1-100 1最小
    width: '50%'
},resp =>  {
    console.log(resp,'compressImage');
})
```

## 上传图片

```js
uni.chooseImage({
    count: 6, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: function (res) {
        console.log(JSON.stringify(res.tempFilePaths));
    }
});
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d86b7f1f80404181a9609e8820688d7d~tplv-k3u1fbpfcp-zoom-1.image)

## 预览图片

```js
uni.previewImage({
  urls: res.tempFilePaths,
  longPressActions: {
    itemList: ['发送给朋友', '保存图片', '收藏'],
    success: function(data) {
      console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
    },
    fail: function(err) {
      console.log(err.errMsg);
    }
  }
});
```

## 获取图片信息

```js
uni.getImageInfo({
  src: res.tempFilePaths[0],
  success: function (image) {
    console.log(image.width);
    console.log(image.height);
  }
});
```

## 保存图片到相册

-   app 
-   h5 不兼容

```js
uni.saveImageToPhotosAlbum({
  filePath: res.tempFilePaths[0],
  success: function () {
    console.log('save success');
  }
});
```

......