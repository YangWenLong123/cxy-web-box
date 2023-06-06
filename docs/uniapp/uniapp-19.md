骨架屏也是优化的一个重要环节，如若遇到网络不佳时，接口数据返回的比较慢，然后再渲染页面，页面会有空白的情况，那么骨架凭无疑是一个不错的解决方案.

看了插件市场的案例，进行的修改调整.

## 方案

市场上有这么几种解决方案

-   UI给定每个页面的骨架屏图片

<!---->

-  缺点：ui那里比较耗时间

<!---->

-   前端根据页面进行页面股价进行css绘制

<!---->

-  前端这里比较耗时间

<!---->

-   根据dom节点进行绘制

<!---->

-  一次组件封装，可重复调用

## 思路

等待页面HTML加载完成，获取页面的dom节点信息，进行绘制展示骨架屏组件，接口数据请求完成，隐藏骨架屏，渲染页面.

那么dom节点如何获取？

在每个节点上定义个类名，获取该元素节点信息即可。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ba81a8189de4be8bc50a0074c2003d7~tplv-k3u1fbpfcp-zoom-1.image)

## skeleton组件

```js
<template>
	<view
		v-if="show"
		:style="{
			width: systemInfo.width + 'px',
			height: systemInfo.height + 'px',
			backgroundColor: bgcolor,
			position: 'absolute',
			left: 0,
			top: 0,
			zIndex: 9998,
			overflow: 'hidden'
		}"
	>
		<view
			v-for="(item, rect_idx) in skeletonRectLists"
			:key="rect_idx + 'rect'"
			:class="[loading == 'chiaroscuro' ? 'chiaroscuro' : '']"
			:style="{
				width: item.width + 'px',
				height: item.height + 'px',
				backgroundColor: skebgcolor,
				position: 'absolute',
				left: item.left + 'px',
				top: item.top + 'px'
			}"
		></view>
		<view
			v-for="(item, circle_idx) in skeletonCircleLists"
			:key="circle_idx + 'circle'"
			:class="loading == 'chiaroscuro' ? 'chiaroscuro' : ''"
			:style="{
				width: item.width + 'px',
				height: item.height + 'px',
				backgroundColor: skebgcolor,
				borderRadius: item.width + 'px',
				position: 'absolute',
				left: item.left + 'px',
				top: item.top + 'px'
			}"
		></view>
		<view class="spinbox" v-if="loading == 'spin'"><view class="spin"></view></view>
	</view>
</template>

<script>
export default {
	name: 'skeleton',
	props: {
   	//骨架屏背景色
		bgcolor: {
			type: String,
			value: '#FFF'
		},
    //绘制形状
		selector: {
			type: String,
			value: 'skeleton'
		},
    //是否显示loading
		loading: {
			type: String,
			value: 'spin'
		},
    //是否显示骨架屏组件
		show: {
			type: Boolean,
			value: false
		},
    //发生变化就开始获取don节点信息
		isNodes: {
			type: Number,
			value: false
		},
    //绘制形状背景
		skebgcolor: {
			type: String,
			default: 'rgb(194, 207, 214)'
		}
	},
	data() {
		return {
			loadingAni: ['spin', 'chiaroscuro'],
			systemInfo: {},
			skeletonRectLists: [],
			skeletonCircleLists: []
		};
	},
	watch: {
		isNodes(val) {
			this.readyAction();
		}
	},
	mounted() {
		this.attachedAction();
	},
	methods: {
		attachedAction () {
			//默认的首屏宽高，防止内容闪现
			const systemInfo = uni.getSystemInfoSync();
			this.systemInfo = {
				width: systemInfo.windowWidth,
				height: systemInfo.windowHeight
			};
			this.loading = this.loadingAni.includes(this.loading) ? this.loading : 'spin';
		},
		readyAction () {
			console.log('子组件readyAction');
			const that = this;
			//绘制背景
			uni.createSelectorQuery()
				.selectAll(`.${this.selector}`)
				.boundingClientRect()
				.exec(function(res) {
					that.systemInfo.height = res[0][0].height + res[0][0].top;
				});

			//绘制矩形
			this.rectHandle();

			//绘制圆形
			this.radiusHandle();
		},
		rectHandle () {
			const that = this;

			//绘制不带样式的节点
			uni.createSelectorQuery()
				.selectAll(`.${this.selector}-rect`)
				.boundingClientRect()
				.exec(function(res) {
					that.skeletonRectLists = res[0];
				});
		},
		radiusHandle() {
			const that = this;

			uni.createSelectorQuery()
				.selectAll(`.${this.selector}-radius`)
				.boundingClientRect()
				.exec(function(res) {
					that.skeletonCircleLists = res[0];
				});
		}
	}
};
</script>

<style>
.spinbox {
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	z-index: 9999;
}
.spin {
	display: inline-block;
	width: 64rpx;
	height: 64rpx;
}
.spin:after {
	content: ' ';
	display: block;
	width: 46rpx;
	height: 46rpx;
	margin: 1rpx;
	border-radius: 50%;
	border: 5rpx solid #409eff;
	border-color: #409eff transparent #409eff transparent;
	animation: spin 1.2s linear infinite;
}
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.chiaroscuro {
	width: 100%;
	height: 100%;
	background: rgb(194, 207, 214);
	animation-duration: 2s;
	animation-name: blink;
	animation-iteration-count: infinite;
}

@keyframes blink {
	0% {
		opacity: 0.4;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0.4;
	}
}

@keyframes flush {
	0% {
		left: -100%;
	}
	50% {
		left: 0;
	}
	100% {
		left: 100%;
	}
}
.shine {
	animation: flush 2s linear infinite;
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100%;
	background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0) 100%);
}
</style>
```

## demo

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dedc5401f6540ebb791f18d315f20d7~tplv-k3u1fbpfcp-zoom-1.image) ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbb7d241b8df4861bc9812882c912d6a~tplv-k3u1fbpfcp-zoom-1.image)

```js
<template>
	<view class="controller">
		<view class="container skeleton" :style="{ visibility: showSkeleton ? 'hidden' : 'visible' }">
			<view class="userinfo">
				<block>
					<!--skeleton-radius 绘制圆形-->
					<image class="userinfo-avatar skeleton-radius" :src="userInfo.avatarUrl" mode="cover"></image>
					<!--skeleton-rect 绘制矩形-->
					<text class="userinfo-nickname skeleton-rect">{{ userInfo.nickName }}</text>
				</block>
			</view>
			<view style="margin: 20px 0">
				<view v-for="(item, index) in lists" :key="index" class="lists">
					<text class="skeleton-rect">{{ item }}</text>
				</view>
			</view>
			<view class="__desc skeleton-rect">123</view>
			<view class="__desc skeleton-rect">123</view>
			<view class="__desc skeleton-rect">123</view>
		</view>
		<!--引用组件-->
		<skeleton :show="showSkeleton" :isNodes="isNodes" ref="skeleton" loading="chiaroscuro" selector="skeleton" bgcolor="#FFF" :skebgcolor="'rgb(194, 207, 214)'"></skeleton>
	</view>
</template>

<script>
import skeleton from '@/components/skeleton.vue';
export default {
	data() {
		return {
			userInfo: {
				avatarUrl: 'http://pic.wxhand.com/dev/student_image/d4305c73c610aa4f0841243c7455c76f',
				nickName: 'along'
			},
			lists:  ['第1行数据', '第2行数据', '第3行数据', '第4行数据', '第5行数据', '第6行数据'], //如果没有默认数据
			showSkeleton: true, //骨架屏显示隐藏
			isNodes: 0 //控制什么时候开始抓取元素节点,只要数值改变就重新抓取
		};
	},
	components: {
		skeleton
	},
	onLoad () {
		this.$nextTick(() => {
			this.isNodes++;
		})

		setTimeout(() => {
			this.showSkeleton = false;
		}, 10000);
	}
};
</script>

<style>
.container {
	padding: 20rpx 60rpx;
}
.userinfo {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 40rpx;
}
.userinfo-avatar {
	width: 128rpx;
	height: 128rpx;
	margin: 20rpx;
	border-radius: 50%;
}
.userinfo-nickname {
	color: #aaa;
}
.usermotto {
	margin-top: 200px;
}
.lists {
	margin: 10px 0;
}
.list {
	margin-right: 10px;
}
.__desc {
	font-size: 24rpx;
	margin-top: 10rpx;
}
</style>
```