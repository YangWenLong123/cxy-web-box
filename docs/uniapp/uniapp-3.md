## 应用生命周期

```js
<script>
    // 应用周期只能在App.vue里监听
    export default {
    		//初始化完成出发，只触发一次
        onLaunch: function() {
            console.log('App Launch')
        },
        //从后台进入前台触发
        onShow: function() {
            console.log('App Show')
        },
        //从前台进入后台触发
        onHide: function() {
            console.log('App Hide')
        },
        //报错是触发
        onError: function() {
        		console.log('App Error')
        },
        //对nvue页面发送的数据进行监听
        onUniNViewMessage(e) {
        		console.log(JSON.stringify(e.data))
        }
    }
</script>
```

## 页面生命周期

```js
<script>
export default {
    onLoad(option) {}, // 监听页面加载，option为上个页面传递的数据，参数类型为Object
    onReady() {}, // 监听页面初次渲染完成
    onShow() {}, // 监听页面显示。页面每次出现在屏幕上都触发
    onHide() {}, // 监听页面隐藏
    onUnload() {}, // 监听页面卸载
    onResize() {}, // 监听窗口尺寸变化
    onPullDownRefresh() {},	//监听用户下拉动作，一般用于下拉刷新
    onReachBottom() {},	//页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据
    onTabItemTap() {},	//点击 tab 时触发，参数为Object
    onShareAppMessage() {},	//用户点击右上角分享
    onPageScroll() {},	//监听页面滚动，参数为Object
    onNavigationBarButtonTap() {},	//监听原生标题栏按钮点击事件
    onBackPress() {},	//监听页面返回，返回 event = {from:backbutton、 navigateBack} ，backbutton 表示来源是左上角返回按钮或 android 返回键；navigateBack表示来源是 uni.navigateBack
    onNavigationBarSearchInputChanged() {},	//监听原生标题栏搜索输入框输入内容变化事件
    onNavigationBarSearchInputConfirmed() {},	//监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
    onNavigationBarSearchInputClicked() {}	//监听原生标题栏搜索输入框点击事件
}
</script>
注意：
（2）建议使用 uni-app 的 onReady代替 vue 的 mounted。
（3）建议使用 uni-app 的 onLoad 代替 vue 的 created。
```

## 页面路由配置及跳转

```js
{
  "pages": [ //pages数组中第一项表示应用启动页
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页", // 导航标题
        "navigationBarBackgroundColor": "#F8F8F8", // 导航背景颜色
        "navigationBarTextStyle": "black", // 导航字体颜色
        "enablePullDownRefresh": true, // 下拉刷新
        "app-plus": { // App节点配置项
          "titleNView": {},
          "animationType": "fade-in",
          "animationDuration": 300
        },
        "h5" : {
        	"titleNView" : false,	//导航
        	"type" : "default",
        	"scrollIndicator" : "none"
        }
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black", // 导航字体颜色
    "navigationBarTitleText": "uni-app", // 导航标题
    "navigationBarBackgroundColor": "#F8F8F8", // 导航背景颜色
    "backgroundColor": "#F8F8F8" // 页面背景颜色
  },
  "tabBar": {
    "color": "#333333",
    "borderStyle": "black",
    "backgroundColor": "#FFFFFF",
    "selectedColor": "#333333",
    "list": [{
        "pagePath": "pages/index/index",
        "iconPath": "",
        "selectedIconPath": "",
        "text": "首页"
      },
      {
        "pagePath": "pages/my/my",
        "iconPath": "",
        "selectedIconPath": "",
        "text": "我的"
      }
    ]
  },
  "globalStyle" : {
  	"navigationBarTextStyle" : "white",
  	"navigationBarTitleText" : "名称",
  	"navigationBarBackgroundColor" : "#20A0FF",
  	"backgroundColor" : "#f4f4f4"
  // "backgroundColorBottom" : "#f4f4f4",
  // "backgroundColorTop" : "#f4f4f4"
  }
}
```

## 页面布局

-   [flex语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
-   [flex示例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## 条件编译

<https://uniapp.dcloud.io/platform?id=%e8%b7%a8%e7%ab%af%e5%85%bc%e5%ae%b9>

| 条件编译写法                                           | 说明                    |
| ------------------------------------------------ | --------------------- |
| #ifdef **APP-PLUS**需条件编译的代码#endif              | 仅出现在 5+App 平台下的代码     |
| #ifndef **H5**需条件编译的代码#endif                   | 除了 H5 平台，其它平台均存在的代码   |
| #ifdef **H5** || **MP-WEIXIN**需条件编译的代码#endif | 仅在 H5 平台或微信小程序平台存在的代码 |

%PLATFORM% 可取值如下：

| 值             | 平台                             | 参考文档                                                                   |
| ------------- | ------------------------------ | ---------------------------------------------------------------------- |
| APP-PLUS      | 5+App                          | [HTML5+ 规范](http://www.html5plus.org/doc/)                             |
| APP-PLUS-NVUE | 5+App nvue                     | [Weex 规范](https://weex.apache.org/cn/guide/)                           |
| H5            | H5                             |                                                                        |
| MP-WEIXIN     | 微信小程序                          | [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/api/)         |
| MP-ALIPAY     | 支付宝小程序                         | [支付宝小程序](https://docs.alipay.com/mini/developer/getting-started)       |
| MP-BAIDU      | 百度小程序                          | [百度小程序](https://smartprogram.baidu.com/docs/develop/tutorial/codedir/) |
| MP-TOUTIAO    | 头条小程序                          | [头条小程序](https://developer.toutiao.com/docs/framework/)                 |
| MP-QQ         | QQ小程序                          | （目前仅cli版支持）                                                            |
| MP            | 微信小程序/支付宝小程序/百度小程序/头条小程序/QQ小程序 |                                                                        |

## 页面跳转

```js
//在起始页面跳转到test.vue页面并传递参数
uni.navigateTo({
    url: 'test?id=1&name=uniapp'
});

// 在test.vue页面接受参数
export default {
    onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
        console.log(option.id); //打印出上个页面传递的参数。
        console.log(option.name); //打印出上个页面传递的参数。
    }
}

注意：url有长度限制，太长的字符串会传递失败，可使用encodeURIComponent（）

uni.navigateTo({
    url: 'test?item' + encodeURIComponent(JSON.stringify(item))
});

// 在test.vue页面接受参数
onLoad: function (option) {
    const item = JSON.parse(decodeURIComponent(option.item));
}

//保留当前页面，跳转到应用内的某个页面
```

```js
uni.redirectTo({
    url: 'test?id=1'
});

//关闭当前页面，跳转到应用内的某个页面。
```

```js
//在起始页面跳转到test.vue页面并传递参数
uni.reLaunch({
    url: 'test?id=1'
});

// 在test.vue页面接受参数
export default {
    onLoad: function (option) {
        console.log(option.id);
    }
}

//关闭所有页面，打开到应用内的某个页面。
```

```js
uni.switchTab({
    url: '/pages/index/index'
});

//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
```

```js
uni.navigateBack({
    delta: 2	//后退的页数，如果大于现有页面数，则返回首页
});

uni.navigateBack();	//	上一页
```

## 跳转窗口动画

    <https://uniapp.dcloud.io/api/router?id=animation>
