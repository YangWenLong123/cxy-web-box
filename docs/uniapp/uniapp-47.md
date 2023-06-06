在部分场景下，用户在微信内访问网页时需要跳转到 APP 使用完整服务，因此微信提供了[“微信开放标签”](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html)以满足微信内网页跳转到 APP 的需求。 微信内网页跳转 APP 功能已向全体开发者开放，当用户访问已认证服务号的 JS 接口安全域名时，可以通过“微信开放标签”打开符合条件的 APP 。具体说明[点击查看](https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_H5_Launch_APP.html)。

## 使用方式

由于我们的h5使用uniapp开发，因此一下介绍在uniapp项目中使用微信开放标签的使用方法

1.  按照文档设置好安全域名与appid
1.  在需要添加跳转的页面加入开放标签内容

```js
<!-- html部分 -->
<!-- #ifdef H5 -->
			<wx-open-launch-app @error="fnError" id="launch-btn" appid="这里填写配置的appid" extinfo="这里填写传递参数">
				<script type="text/wxtag-template">
				    <style>.btn { padding: 12px;background-color: blue; }</style>
				    <button class="btn">App内查看</button>
				</script>
			</wx-open-launch-app>
<!-- #endif -->
```

```js
// js代码
onReady() {
		// #ifdef H5
			const that = this;
			var wxjs = require('jweixin-module');// 1.6
			var ua = navigator.userAgent;
			var isWX = ua.match(/MicroMessenger/([\d.]+)/);
			uni.showLoading({
				title: '加载中',
				icon: 'none',
				mask: true
			});
			// 获取签名
			getApp().globalData.post({
				url: '/student/WxWap/getJsConfig',
				data: {
					// 由于ios需要获取最初的url
					web_url: getApp().globalData.sysInfo.platform == 'ios' ? getApp().globalData.initUrl : location.href
				},
				success: (res) => {
					console.log(res);
					if (res.code == 1) {
						let json = res.data;
						wxjs.config({
							debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: json.appId, // 必填，公众号的唯一标识
							timestamp: json.timestamp, // 必填，生成签名的时间戳
							nonceStr: json.nonceStr, // 必填，生成签名的随机串
							signature: json.signature, // 必填，签名
							url: json.url,
							jsApiList: ['checkJsApi'], // 必填，需要使用的JS接口列表
							openTagList: ['wx-open-launch-app'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']

						})
						// config配置失败
						wxjs.error(function(res) {
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
							console.log('出现错误：', res);
							return false;
						});

					} else {
            // 获取签名失败
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 3000
						});
					}
					uni.hideLoading();
				},
				fail: e => {
					console.log(e);
				}
			})
		// #endif
	},
  methods: {
    	// 开启失败，跳转下载页
			fnError(e) {
				uni.showModal({
				    title: '提示',
				    content: JSON.stringify(e),
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
                  window.location.href = 'https://cdn.zsdx.cn/student/app/download.html';
				        }
				    }
				});
			}
	},

```

3.  此时运行，会报错提示标签错误，需要对微信开放标签进行忽略标记，在main.js中加入如下代码

```js
// 此处需要用concat,以集成uniapp忽略标签，防止报错
Vue.config.ignoredElements = Vue.config.ignoredElements.concat(['wx-open-launch-app']);
```

4.  此时若配置正确之后，用微信打开该页面，则会出现蓝色按钮，点击若安装有对应app则会直接打开app，尚未安装app则会触发fnError()。
4.  传递参数的读取,在App.js的onShow(）生命钩子中，加入参数读取，具体如下

```js
onShow(){
	let args = plus.runtime.arguments;
	console.log('getInfo', args);	//此处输出的即为extinfo填写的内容
}
```

至此整个流程即开发完毕，真是开发中需要对微信环境进行判断，普通h5环境可以使用URL Schemes/ios UniversalLink / android appLink进行打开