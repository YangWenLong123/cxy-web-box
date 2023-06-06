### #subNvue

-   由于应用首页tabbar的层级高，普通弹窗无法遮盖，官方提供了subNvue的方法

<!---->

 -   <https://uniapp.dcloud.io/api/window/subNVues>
-   使用步骤如下

##  pages.json配置

详解：<https://uniapp.dcloud.io/collocation/pages?id=app-subnvuesstyle>

```js
{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "组件",
				"navigationBarBackgroundColor": "#007AFF",
				"navigationBarTextStyle": "white",
				"app-plus" : {
				    "titleNView" : true,
				    "scrollIndicator" : "none",
				    "bounce" : "none",
				    "pullToRefresh" : {
				        "support" : false
				    },
					"subNVues":[{
						"id": "homeNvue",	//弹窗id唯一
						"path": "pages/index/al-home-subNvue",	//弹窗路径
						"type": "popup",
						"style": {
							"position": "absolute",
							// "mask": "rgba(0，0，0，0)",	//弹窗背景
							"left":"0px",
							"bottom":"0px",
							"width": "750px",
							"height":"225px",
							"margin":"auto",
							"zindex": "999"
						}
					}]
				}
			}
		}
```

##  打开弹窗

```js
// #ifdef APP-PLUS
const subNVue = uni.getSubNVueById('homeNvue');

subNVue.setStyle({
  'background': 'transparent'
})

subNVue.show('slide-in-bottom', 300, function(){
  uni.showToast({
    title: '弹窗已打开',
    duration: 2000,
    icon: 'none'
  });
});
// #endif
```

详解：<https://uniapp.dcloud.io/api/window/subNVues?id=subnvueshow>

##  关闭弹窗

```js
data () {
  return {
    subNvue: uni.getCurrentSubNVue()
  }
}
this.subNvue.hide('slide-out-bottom',300);
```

详解：<https://uniapp.dcloud.io/api/window/subNVues?id=subnvuehide>

##  设置样式

```js
subNVue.setStyle({
  'background': 'transparent'
})
```

详解：<https://uniapp.dcloud.io/api/window/subNVues?id=subnvuesetstyle>

##  通讯

详解： <https://ask.dcloud.net.cn/article/35948>

### #自定义弹窗

  思路：新建nvue页面，封装一个弹窗组件，打开这个页面，把页面背景设置透明度。

1.  pages.json配置

```js
{
  "path": "pages/index/al-global-popup",
    "style": {
      "navigationBarBackgroundColor": "#007AFF",
        "navigationBarTextStyle": "white",
          "background": "transparent",	//把页面背景设置透明，默认是白色
            "animationType": "fade-in"
    }
},

//或者
{
  "path" : "pages/ucenter/agent-task-dialog",
    "style": {
      "navigationBarBackgroundColor": "#007AFF",
        "navigationBarTextStyle": "white",
          "background": "transparent",
            "animationType": "fade-in",
              "backgroundColor": "rgba(255,255,255,0)",
                "app-plus": {
                  "titleNView": false
                }
    }
}
```

2.nvue页面要设置蒙层

```js
<div class="popup"></div>

.popup {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,.4);
	justify-content: center;
	align-items: center;
}
```

3.打开弹窗

```js
uni.navigateTo({
  url: '/pages/index/al-global-popup'
})
```

4.关闭弹窗

```js
uni.navigateBack();
```