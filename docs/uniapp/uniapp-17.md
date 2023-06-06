-   监听页面的上下左右滑动，作出对应的动作

```js
<template>
	<view
		class="relative"
		@touchmove="handletouchmove"
		@touchstart="handletouchstart"
		@touchend="handletouchend"
	>
	</view>
</template>
```

```js
export default {
		data () {
			return {
				flag: 0,
				text: '',
				lastX: 0,
				lastY: 0
			}
		},
		methods: {
			handletouchmove: function(event) {
				// console.log(event)
				if (this.flag !== 0) {
					return;
				}
				let currentX = event.touches[0].pageX;
				let currentY = event.touches[0].pageY;
				let tx = currentX - this.lastX;
				let ty = currentY - this.lastY;
				let text = '';
				this.mindex = -1;
				//左右方向滑动
				if (Math.abs(tx) > Math.abs(ty)) {
					if (tx < 0) {
						text = '向左滑动';
						this.flag = 1;
						uni.showToast({
							title: '向左滑动',
							icon: 'none'
						})
					} else if (tx > 0) {
						text = '向右滑动';
						this.flag = 2;
						uni.showToast({
							title: '向右滑动',
							icon: 'none'
						})
					}
				}
				//上下方向滑动
				else {
					if (ty < 0) {
						text = '向上滑动';
						this.flag = 3;
						uni.showToast({
							title: '向上滑动',
							icon: 'none'
						})
					} else if (ty > 0) {
						text = '向下滑动';
						this.flag = 4;
						uni.showToast({
							title: '向下滑动',
							icon: 'none'
						})
					}
				}

				//将当前坐标进行保存以进行下一次计算
				this.lastX = currentX;
				this.lastY = currentY;
				this.text = text;
			},
			handletouchstart: function(event) {
				this.lastX = event.touches[0].pageX;
				this.lastY = event.touches[0].pageY;
			},
			handletouchend: function(event) {
				this.flag = 0;
				this.text = '没有滑动';
			},
		}
	}
```

```js
.relative, page {
		width: 750rpx;
		height: 100%;
	}
```