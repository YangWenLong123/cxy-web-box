##  微信开发平台

<https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html>

##  系统内置分享

#share

<http://www.html5plus.org/doc/zh_cn/share.html>

#示例

```js
plus.share.sendWithSystem({
  type:'text',
  content:'我要分享一个内容',
  href:'http://cdn.zsdx.cn/wei/images/hire/home/home.zsdx.png',
}, resp=>{
  //...
}, error=>{
  //...
});
```

##  官网封装api

<https://uniapp.dcloud.io/api/plugins/share?id=share>

##  获取分享通道

```js
uni.getProvider({
  service: 'share',
  success: (e) => {
    console.log('success', e);
    let data = []
    for (let i = 0; i < e.provider.length; i++) {
      switch (e.provider[i]) {
        case 'weixin':
          data.push({
            name: '分享到微信好友',
            id: 'weixin',
            sort:0
          })
          data.push({
            name: '分享到微信朋友圈',
            id: 'weixin',
            type:'WXSenceTimeline',
            sort:1
          })
          break;
        case 'sinaweibo':
          data.push({
            name: '分享到新浪微博',
            id: 'sinaweibo',
            sort:2
          })
          break;
        case 'qq':
          data.push({
            name: '分享到QQ',
            id: 'qq',
            sort:3
          })
          break;
        default:
          break;
      }
    }
    this.providerList = data.sort((x,y) => {
      return x.sort - y.sort
    });

    console.log({msg: this.providerList}, 'providerList');
  },
  fail: (e) => {
    console.log('获取分享通道失败', e);
    uni.showModal({
      content:'获取分享通道失败',
      showCancel:false
    })
  }
			});
```

##  示例：获取分享通道数据

```js
{
  "msg": [{
    "name": "分享到微信好友",
    "id": "weixin",
    "sort": 0
  }, {
    "name": "分享到微信朋友圈",
    "id": "weixin",
    "type": "WXSenceTimeline",
    "sort": 1
  }, {
    "name": "分享到新浪微博",
    "id": "sinaweibo",
    "sort": 2
  }, {
    "name": "分享到QQ",
    "id": "qq",
    "sort": 3
  }]
}
```

##  分享参数

```js
const shareOPtions = {
  provider: '',	//分享服务商，weixin|qq|sinaweibo
  type: '',	//分享形式，0:图文，1:纯文字，2:纯图片，3:音乐，4:视频，5:小程序
  title: '',	//分享内容标题
  scene: '',	//分享场景，provider 为 weixin 时必选，微信聊天：WXSceneSession,朋友圈：WXSenceTimeline,微信收藏WXSceneFavorite
  summary: '',	//type 为 1 时必选,分享内容摘要
  href: '',	//type 为 0 时必选，跳转链接
  imageUrl: '',	//type 为 0、2、5 时必选，图片地址。type为0时，推荐使用小于20Kb的图片
  mediaUrl: '',	//type 为 3、4 时必选	音视频地址
  miniProgram: '',	//type 为 5 时必选	分享小程序必要参数
  success: Function,
  fail: Function,
  complete: Function
};
```

#miniProgram指说明

-   id：微信小程序原始id
-   path：点击链接进入的页面
-   type：微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0
-   webUrl：兼容低版本的网页链接

##  分享文字

```js
uni.share({
  provider: "weixin",
  scene: "WXSceneSession",
  type: 1,
  summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
  success: function (res) {
    console.log("success:" + JSON.stringify(res));
  },
  fail: function (err) {
    console.log("fail:" + JSON.stringify(err));
  }
});
```

##  分享图片

```js
uni.share({
  provider: "weixin",
  scene: "WXSceneSession",
  type: 2,
  imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
  success: function (res) {
    console.log("success:" + JSON.stringify(res));
  },
  fail: function (err) {
    console.log("fail:" + JSON.stringify(err));
  }
});
```

##  分享图文

```js
uni.share({
  provider: "weixin",
  scene: "WXSceneSession",
  type: 0,
  href: "http://uniapp.dcloud.io/",
  title: "uni-app分享",
  summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
  imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
  success: function (res) {
    console.log("success:" + JSON.stringify(res));
  },
  fail: function (err) {
    console.log("fail:" + JSON.stringify(err));
  }
});
```

##  微信朋友圈/文字

```js
uni.share({
  provider: "weixin",
  scene: "WXSenceTimeline",
  type: 1,
  summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
  success: function (res) {
    console.log("success:" + JSON.stringify(res));
  },
  fail: function (err) {
    console.log("fail:" + JSON.stringify(err));
  }
});
```

##  微信朋友圈/图片

```js
uni.share({
  provider: "weixin",
  scene: "WXSenceTimeline",
  type: 2,
  imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
  success: function (res) {
    console.log("success:" + JSON.stringify(res));
  },
  fail: function (err) {
    console.log("fail:" + JSON.stringify(err));
  }
});
```

##  微信朋友圈/图文

```js
uni.share({
  provider: "weixin",
  scene: "WXSenceTimeline",
  type: 0,
  href: "http://uniapp.dcloud.io/",
  title: "uni-app分享",
  summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
  imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
  success: function (res) {
    console.log("success:" + JSON.stringify(res));
  },
  fail: function (err) {
    console.log("fail:" + JSON.stringify(err));
  }
});
```

##  分享到微信小程序

```js
uni.share({
  provider: 'weixin',
  scene: "WXSceneSession",
  type: 5,
  imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
  title: '欢迎体验uniapp',
  miniProgram: {
    id: 'gh_abcdefg',
    path: 'pages/index/index',
    type: 0,
    webUrl: 'http://uniapp.dcloud.io'
  },
  success: ret => {
    console.log(JSON.stringify(ret));
  }
});
```

##  自定义分享权限配置/需后端处理

-  微信分享接口文档

<!---->

-  <https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#8>

```js
var wx = require('jweixin-module');

wx.config({
  debug: true, // 开启调试模式
  appId: 'wxd581a07854791a7b', // appId
  timestamp: '', //生成签名的时间戳
  nonceStr: '', //生成签名的随机串
  signature: '',// 签名 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
  jsApiList: ['checkJsApi',
              'onMenuShareQQ',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'editAddress',
              'getLocation',
              'openLocation'
             ]
})

//微信好友
wx.onMenuShareAppMessage({
  title: '', // 分享标题
  desc: '', // 分享描述
  link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: '', // 分享图标
  success: function() {
    //...
  },
  cancel: function() {
    //...
  }
});

//朋友圈
wx.onMenuShareTimeline({
  title: '', // 分享标题
  link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: '', // 分享图标
  success: function() {
    //...
  },
  cancel: function() {
    //...
  }
 });
```

##  分享配置

-   打开 manifest.json -> App模块权限配置，勾选 Share(分享)
-   App SDK配置例申请appid并填写

<!---->

-   微信appid申请步骤：<https://ask.dcloud.net.cn/article/208>
-   新浪微博appid申请步骤：<https://ask.dcloud.net.cn/article/209>
-   QQ开发平台：<https://connect.qq.com/index.html>