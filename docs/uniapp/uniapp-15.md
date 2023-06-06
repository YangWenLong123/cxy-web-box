 ## UniversalLinks

<http://strivingboy.github.io/blog/2015/09/27/ios9/>

<https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html#//apple_ref/doc/uid/TP40016308-CH12-SW1>

 ## 跳转淘宝商品搜索页

```js
try {
  // #ifdef APP-PLUS
  if (plus.runtime.isApplicationExist({ pname: 'com.taobao.taobao', action: 'taobao://' })) {
    if (plus.os.name == 'Android') {
      plus.runtime.openURL('taobao://s.taobao.com/search?q=1', error => {
        console.log('Open system default browser failed: ' + error);
      }, 'com.taobao.taobao');
    } else if (plus.os.name == 'iOS') {
      const action = {
        action: `taobao://s.taobao.com/search?q=` + encodeURI(this.title)
      };
      plus.runtime.launchApplication(action, function(e) {
        console.log('Open system default browser failed: ' + e.message);
      });
    }
  } else {
    uni.showToast({
      title: '未检测到淘宝',
      icon: 'none'
    });
    //TODO
  }
  // #endif

  // #ifdef H5
  location.href = 'taobao://s.taobao.com/search?q=' + this.title;
  // #endif
} catch (e) {
  // TODO
}
```

 ## 淘宝首页跳转

```js
//android
plus.runtime.launchApplication({
  pname: 'com.taobao.taobao'
},function(e) {
  console.log('Open system default browser failed: ' + e.message);
});

plus.runtime.openURL(`taobao://s.taobao.com`, error => {
  console.log('Open system default browser failed: ' + error);
}, 'com.taobao.taobao');

//ios
plus.runtime.openURL('taobao://s.taobao.com');

const action = {
  action: `taobao://s.taobao.com`
};

plus.runtime.launchApplication(action, function(e) {
  console.log('Open system default browser failed: ' + e.message);
});
```

 ## 常用Scheme

```js
[
    // 只在 ios 中生效
    {
        name: 'App Store',
        scheme: 'itms-apps://'
    },
    {
        name: '支付宝',
        pname: 'com.eg.android.AlipayGphone',
        scheme: 'alipay://'
    },
    {
        name: '淘宝',
        pname: 'com.taobao.taobao',
        scheme: 'taobao://'
    },
    {
        name: 'QQ',
        pname: 'com.tencent.mobileqq',
        scheme: 'mqq://'
    },
    {
        name: '微信',
        pname: 'com.tencent.mm',
        scheme: 'weixin://'
    },
    {
        name: '京东',
        pname: 'com.jingdong.app.mall',
        scheme: 'openApp.jdMobile://'
    },
    {
        name: '新浪微博',
        pname: 'com.sina.weibo',
        scheme: 'sinaweibo://'
    },
    {
        name: '优酷',
        pname: 'com.youku.phone',
        scheme: 'youku://'
    }
]
```

 ## 微信跳转

```js
// #ifdef APP-PLUS
				if(plus.runtime.isApplicationExist({ pname: 'com.taobao.taobao', action: 'taobao://' })) {
					if(this.platform == 'ios') {
						plus.runtime.openURL('weixin://');
					} else {
						plus.runtime.openURL(`weixin://`, error => {
						  console.log('Open system default browser failed: ' + error);
						}, 'com.tencent.mm');
					}
				} else {
					uni.showToast({
						title: '未检测到微信',
						icon: 'none'
					});
				}
				// #endif

				// #ifdef H5
				  location.href = 'weixin://';
				 // #endif
```

```js
//安卓跳转解决方案

var Intent = plus.android.importClass("android.content.Intent");
var ComponentName = plus.android.importClass('android.content.ComponentName')
var intent = new Intent();
intent.setComponent(new ComponentName("com.tencent.mm", "com.tencent.mm.ui.LauncherUI"));
// intent.putExtra("LauncherUI.From.Scaner.Shortcut", true);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
intent.setAction("android.intent.action.VIEW");
var main = plus.android.runtimeMainActivity();
main.startActivity(intent);
```

 ## 参考文档

<https://ask.dcloud.net.cn/article/35621>

<http://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.openURL>