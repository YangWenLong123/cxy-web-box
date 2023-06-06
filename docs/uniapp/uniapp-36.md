此处为语雀视频卡片，点击链接查看：[normal video.mp4](https://www.yuque.com/along-n3gko/oifl5c/heen4w##  WJEaw)

##  思路

1.由于要兼容H5使用c3动画去实现

2.计算自动滚动高度

##  动画

所使用的动画效果是是一个向上弹跳进入动画，根据实际情况去调整所需要的值

```js
//animation
	动画name,动画时长,延迟执行时间,运动效果，规定动画在播放之前或之后其动画效果是否可见

##  animation{
  -webkit-animation:bounceInUp 1s .2s ease both;
	-moz-animation:bounceInUp 1s .2s ease both;
}
@-webkit-keyframes bounceInUp{
  0%{
    opacity:0;
    -webkit-transform:translateY(2000px)
	}
	60%{
    opacity:1;
    -webkit-transform:translateY(-30px)
	}
  80%{
    -webkit-transform:translateY(10px)
	}
  100%{
    -webkit-transform:translateY(0)}
	}
@-moz-keyframes bounceInUp{
  0%{
    opacity:0;
    -moz-transform:translateY(2000px)
	}
	60%{
    opacity:1;-moz-transform:translateY(-30px)
	}
  80%{
    -moz-transform:translateY(10px)
	}
  100%{
    -moz-transform:translateY(0)}
	}
```

##  计算高度

```js
注:由于导航栏为自定义需要计算statusBarHeight与headerHeight的高度。

<scroll-view
			scroll-y="true"
			:show-scrollbar="false"
			:scroll-top="top"
			:scroll-with-animation="true"
			class="container-scroll"
		>
			<view class="container-wrap">
        //...
      </view>
</scroll-view>

this.$nextTick(()=>{
  let view = uni.createSelectorQuery().in(this).select(".container-wrap");
  view.boundingClientRect(data => {
    this.top = data.height + this.statusBarHeight + this.headerHeight - this.windowHeight - 20;
  }).exec();
})
```