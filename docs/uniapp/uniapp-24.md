## 首页

```js
<template>
	<view class="container">
		<scroll-view scroll-y="true" class="container-scroll">
			<view class="container-box">
				<view class="list-item">省份：{{obj.liveData.province || ''}}</view>
				<view class="list-item">位置：{{obj.liveData.city || ""}}</view>
				<view class="list-item">湿度：{{obj.liveData.humidity || 0}}%</view>
				<view class="list-item">温度：{{obj.liveData.temperature || 0}} 摄氏度</view>
				<view class="list-item">天气：{{obj.liveData.weather || ""}}</view>
				<view class="list-item">风向：{{obj.liveData.winddirection || ""}}</view>
				<view class="list-item">风力：{{obj.liveData.windpower || 0}}级</view>
			</view>
			<view class="container-wrap">
				<button type="default" class="container-button" @click="fnGetWeather()">获取当前城市天气</button>
				<button type="default" class="container-button" @click="fnGetCityCode()">获取其它城市天气</button>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	const amap = require('@/libs/amap-wx.js')
	// 需要去高德开发平台注册小程序密钥 https://console.amap.com/dev/key/app
	// 接口文档：https://lbs.amap.com/api/webservice/guide/api/weatherinfo
	export default {
		data () {
			return {
				amapPlugin: null,
				key: "0ce6bce83bfd0f7a023849c4648747f8",
				obj: {
					liveData: {}
				}
			}
		},
		onShow() {

		},
		onLoad () {
			//监听城市列表选择城市code
			uni.$on('sendCode', res => {
				// console.log(res,'res');
				let item = JSON.parse(res);
				//city 城市编码表
				//key web服务类型的key值
				uni.showLoading({
					title: '请稍候...'
				})
				getApp().globalData.http.get('https://restapi.amap.com/v3/weather/weatherInfo', {
					params: {
						parameters: 'base',
						key: '9248c2a26dc611f751cec20a5cd23e48',
						city: item.adcode
					},
					header: {}
				}).then(res=> {
					// console.log({res:res})
					// console.log(res.data.lives, '1');
					uni.hideLoading()
					this.obj.liveData = res.data.lives;
					this.$set(this.obj, 'liveData', res.data.lives[0]);
				})
			})

			//sdk实例化
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			})
		},
		methods: {
			fnGetWeather () {
				uni.showLoading({
					title: '请稍候...'
				})
				this.amapPlugin.getWeather({
					success: (data) => {
						console.log({data: data})
						uni.hideLoading()
						this.obj.liveData = data.liveData;
					},
					fail: function(info) {
						console.log(info)
					}
				})
			},
			fnGetCityCode () {
				uni.navigateTo({
					url: '/pages/index/al-city'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		.container-scroll {
			flex: 1;
			.container-box {
				padding: 30rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				.list-item {
					background: #fff;
					font-size: 28rpx;
					padding-left: 20rpx;
					padding-bottom: 20rpx;
				}
			}
			.container-wrap {
				width: 750rpx;
				font-size: 28rpx;
				.container-button {
					width: 620rpx;
					margin-top: 30rpx;
				}
			}
		}
	}
</style>
```

## 城市列表页

```js
<template>
	<view class="container">
		<scroll-view scroll-y="true" class="container-scroll">
			<view class="container-wrap" v-if="cityList.length > 0">
				<view
					class="container-list"
					v-for="(item,index) in cityList"
					:key="index"
					@click="fnGetCode(item)"
				>
					{{ item['中文名']}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const city = require('@/common/js/city.json');
	export default {
		data () {
			return {
				cityList: []
			}
		},
		onLoad() {
			this.cityList = city ? city : [];

			// this.init();
		},
		methods: {
			fnGetCode (item) {
				uni.$emit('sendCode', JSON.stringify(item));
				// console.log(item,'item')
				uni.navigateBack();
			},
			init () {
				let list = [];
				if(city.length > 0) {
					city.map(item=>{
						list.push({
							city: item['中文名'],
							adcode: item.adcode
						})
					})
					this.cityList = list;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		.container-scroll {
			flex: 1;
			.container-wrap {
				width: 750rpx;
				padding: 30rpx;
				box-sizing: border-box;
				.container-list {
					width: 690rpx;
					height: 90rpx;
					line-height: 90rpx;
					background-color: #F4F4F4;
					margin-bottom: 40rpx;
					padding-left: 30rpx;
				}
			}
		}
	}
</style>
```

## 城市编码表

<https://www.yuque.com/along-n3gko/ezt5z9/vlogui>