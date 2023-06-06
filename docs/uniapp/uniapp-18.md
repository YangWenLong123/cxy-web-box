-   思路

<!---->

 -   首次启动展示引导页，之后启动不再展示。那么就意味着，我们需要一个标识来确定，App是否已经启动过。
 -   我们可以在本地存储一个key来做为已经启动过App的标识。那么，我们在入口这里，就可以读取这个key，来决定是否展示引导页。

```js
"pages" : [
		{	//引导页判断跳转
		    "path" : "pages/common/index",
		    "style" : {
		        "app-plus" : {
		            "scrollIndicator" : "none",
		            "bounce" : "none",
		    		"titleNView": false
		        },
		        "h5" : {
		            "titleNView" : false,
		            "type" : "default",
		            "scrollIndicator" : "none"
		        }
		    }
		},
		{
		    "path" : "pages/index/index",
		    "style" : {
		        "navigationBarTitleText" : "首页",
		        "enablePullDownRefresh" : true,
						"navigationBarTextStyle": "black",
		        "app-plus" : {
		            "titleNView" : false,
		            "scrollIndicator" : "none",
		            "bounce" : "none",
		            "pullToRefresh" : {
		                "support" : false
		            }
		        },
		        "h5" : {
		            "titleNView" : false,
		            "type" : "default",
		            "pullToRefresh" : {
		                "offset" : "45px"
		            }
		        }
		    }
		}
  ]
```

```js
  首页：/pages/index/index
  引导页：/pages/index/guide
  当前页：/pages/common/index

  try {
        const value = uni.getStorageSync('launchFlag');
        if (value) {
            if (value == true) {
                uni.switchTab({
                    url: '/pages/index/index'
                });
            } else {
                uni.redirectTo({
                    url: '/pages/index/guide'
                });
            }
        } else {
            uni.setStorage({
                key: 'launchFlag',
                data: true
            });
            uni.redirectTo({
                url: '/pages/index/guide'
            });
        }
    } catch(e) {
        // error
        uni.setStorage({ key: 'launchFlag',
            data: true
        });
        uni.redirectTo({
            url: '/pages/index/guide'
        });
    }
```

-   测试代码块

```js
uni.showModal({
    title: '清除launchFlag值',
    content: '确定要清除launchFlag值，进行重启测试？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        // 清除缓存
        uni.clearStorage();
        uni.showToast({
          icon: 'none',
          duration:3000,
          title: '清除成功2秒后重启'
        });
        // 两秒后重启
        setTimeout(function() {
          uni.hideToast();
          plus.runtime.restart();
        }, 2000);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
});
```