## 监听双击事件

-   思路：监听用户第一次点击屏幕时间与第二次点击屏幕的时间差。 点击第二次时时间清空重新计算。

```js
<template>
	<view class="container" @tap="fndbClick()">双击我，come on !</view>
</template>

<script>
export default {
	data() {
		return {
			index: 0,
			start_time: 0,
			end_time: 0
		};
	},
	methods: {
		fndbClick() {
			this.index = this.index == 0 ? 1 : this.index + 1;
			if (this.index == 1) {
				this.start_time = new Date().getTime();
				setTimeout(()=>{
					this.index = this.start_time = this.end_time = 0;
				},800)
			} else if (this.index == 2) {
				this.end_time = new Date().getTime();
				if (this.end_time - this.start_time < 800) {
					uni.showToast({
						title: '双击了屏幕',
						icon: 'none'
					})
				}
				this.index = this.start_time = this.end_time = 0;
			}
		}
	}
};
</script>

<style lang="less" scoped>
page {
	width: 100%;
	height: 100%;
}
.container {
	width: 750rpx;
	height: 100vh;
	box-sizing: border-box;
	border: 1px red solid;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #000000;
}
</style>
```