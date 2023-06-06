## uniapp项目的使用方式

-   安装依赖

```js
$ npm install weex-bindingx --save
import BindingX from weex-bindingx;
```

或

```js
const Binding = uni.requireNativePlugin('bindingx');
const domModule = weex.requireModule('dom');
```

-   编写对应的表达式

<!---->

-   据业务场景，选择您需要的EventType。 比如，要监听手势，evenType值为pan，监听滚动容器scrollOffset变化，eventType值为scroll。
-   根据交互行为，选择要改变的属性，并编写相应的表达式。比如，交互行为是"用户横滑100单位，透明度从1变化到0"。则属性为"opacity"，表达式为"1-x/100"。

<!---->

-   绑定表达式

```js
var result = BindingX.bind({
     eventType: 'pan',       ==> 事件类型
     anchor: 'foo',          ==> anchor指的是事件的触发者，如果是eventType是"orientation"或"timing",则不用填
     props: [
         {
             element: view.ref,     ==> 要改变的视图的引用或者id
             expression: "1-x/100", ==> 表达式
             property: "opacity"    ==> 要改变的属性
         }
     ]
 })
```

-   解绑

```js
BindingX.unbind({
    token: result.token,
    eventType: 'pan'
})
```

## 属性详解

```js
eventType:事件类型（必选）
	pan：监听手势
  timing：监听时间变化，用来做动画
  scroll：监听容器scroll运动
  orientation：监听设备方向运动
exitExpression：边界条件（可选）
props：运行时参数（必选）
	element：作用元素，获取元素见下方getEl方法
  property:作用的属性
  expression：运行时的表达式
```

-   property详解

| 属性                    | 功能                        |
| --------------------- | ------------------------- |
| transform.translate   | x&y方向平移                  |
| transform.translateX  | x方向平移                     |
| transform.translateY  | y方向平移                     |
| transform.scale       | x&y方向缩放                  |
| transform.scaleX      | x方向缩放                     |
| transform.scaleY      | y方向缩放                     |
| transform.rotateZ     | 绕z轴旋转(2d)                 |
| transform.rotateX     | 绕x轴旋转(3d)                 |
| transform.rotateY     | 绕y轴旋转(3d)                 |
| opacity               | 透明度                       |
| width                 | 宽度                        |
| height                | 高度                        |
| background-color      | 背景色                       |
| color                 | 文字颜色                      |
| scroll.contentOffset  | 控制scroller#contentOffset  |
| scroll.contentOffsetX | 控制scroller#contentOffsetX |
| scroll.contentOffsetY | 控制scroller#contentOffsetY |

##

-   expression详解  <https://alibaba.github.io/bindingx/guide/cn_api_expressionSyntax>

##   简单的动画运动

```js
<view class="container">
		<text ref="orderFlush" class="container-text">一去二三里</text>
	</view>
```

```js
	const Binding = uni.requireNativePlugin('bindingx');
	const domModule = weex.requireModule('dom');
	export default {
		data() {
			return {

			};
		},
		onLoad: function() {
			this.init();
		},

		methods: {
			getEl: function(el) {
			    if (typeof el === 'string' || typeof el === 'number') return el;
			    if (WXEnvironment) {
			        return el.ref;
			    } else {
			        return el instanceof HTMLElement ? el : el.$el;
			    }
			},
			init () {
				this.$nextTick(() => {
				    let result = domModule.getComponentRect(this.$refs.orderFlush, option => {
				        let order = this.getEl(this.$refs.orderFlush);
				        let width = uni.upx2px(750);

				        this.orderBinding  = Binding.bind({
				            eventType: 'timing',
				            exitExpression: 't>6000',
				            props: [{
				                element: order,
				                property: 'transform.translateX',
				                expression: 'linear(t, 0,'+(-width*2-option.size.width)+',8000)'
				            }]
				        }, (res) => {
				            if (res.state === 'exit') {
                      	//解绑操作
				                Binding.unbind({
				                    token: this.orderBinding,
				                    eventType: 'timing',
				                });
				                this.orderBinding = '';
                        uni.showToast({
                          title: '运动结束',
                          icon: 'none'
                        })
				            }
				        });
				    });
				});
			}
		}
	}
```

```js
.container {
		width: 750rpx;
		height: 100%;
		flex-direction: column;
	}
	.container-text {
		position: absolute;
		left: 500rpx;
		top: 20rpx;
		background-color: rgba(0,0,0,.5);
		padding: 10rpx 30rpx;
		color: #FFFFFF;
		font-size: 20rpx;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		transition-property: opacity;
		transition-duration: 1.3s;
		transition-delay: 0s;
		transition-timing-function: ease-out;
	}
```

##

##   消息滚动通知

消息通知很多场景都会用到，下面说下在uniapp项目中的应用。

##  # #c3动画实现

如果是H5页面，或者不用太考虑性能，可以使用css3动画去实现。

思路：

1.文字默认在手机屏幕右侧向左边滚动，首先定位元素到750rpx处，此时不可见。

2.计算元素的宽度，滚动距离应为（元素宽度+屏幕宽度）,滚动速度可自行定义，下面我写的是10s.

2.使用keyframes实现匀速无限滚动.

```
animation: name 10s linear infinite;
@keyframes  name {}
```

##  # #bindingX实现

如果你很了解bindingX的使用，那将会很简单的实现，大致思路和上方一致,难点是运动公式的计算。大致代码如下

```
getEl (el) {
  if (typeof el === 'string' || typeof el === 'number') return el;
  if (WXEnvironment) {
    return el.ref;
  } else {
    return el instanceof HTMLElement ? el : el.$el;
  }
},
  init () {
    this.$nextTick(() => {
      let result = domModule.getComponentRect(this.$refs.orderFlush, option => {
        let order = this.getEl(this.$refs.orderFlush);
        let page_width = uni.upx2px(750);
        setTimeout(()=>{
          domModule.getComponentRect(this.$refs.orderFlush, option => {
            const width = option.size.width;
            const time = Number(width) * 1000 / 40;
            this.orderBinding  = Binding.bind({
              eventType: 'timing',
              exitExpression: 't>' + time,
              props: [{
                element: order,
                property: 'transform.translateX',
                expression: `linear(t, 0, -${page_width + width}, ${time})`
              }],
            }, (res) => {
              if (res.state === 'exit') {
                Binding.unbind({
                  token: this.orderBinding,
                  eventType: 'timing',
                });
                /* ---运动结束后重置状态--- */
                this.orderBinding = '';
                this.left = 750;
                /* ---运动结束后轮询--- */
                this.init();
              }
            });
          });
        },100)
      });
    });
  }
```

##   背景色渐变

```
domModule.getComponentRect(this.$refs.dialogPage, option => {
  this.orderBinding = Binding.bind({
    eventType: 'timing',
    exitExpression: 't>300',
    props: [{
      element: this.getEl(this.$refs.dialogPage),
      property: 'opacity',
      expression: {
        origin:'t/300'
      }
    }],
  }, (res) => {
    if (res.state === 'exit') {
      Binding.unbind({
        token: this.orderBinding,
        eventType: 'timing',
      });
      console.log('---动画结束---');
    }
  });
});
```

##   缩放

```
domModule.getComponentRect(this.$refs.dialogloop, option => {
  this.orderBinding = Binding.bind({
    eventType: 'timing',
    exitExpression: 't>300',
    props: [{
      element: this.getEl(this.$refs.dialogloop),
      property: 'transform.scale',
      expression: 't< 200 ? 0.2 : t/300'
    }],
  }, (res) => {
    if (res.state === 'exit') {
      Binding.unbind({
        token: this.orderBinding,
        eventType: 'timing',
      });
      console.log('---动画结束---');
    }
  });
});
```

##   旋转

```
domModule.getComponentRect(this.$refs.dialogloop, option => {
  this.orderBinding = Binding.bind({
    eventType: 'timing',
    exitExpression: 't>1000000',
    props: [{
      element: this.getEl(this.$refs.dialogloop),
      property: 'transform.rotateZ',
      expression: 't / 600 * 50'
    }],
  }, (res) => {
    if (res.state === 'exit') {
      Binding.unbind({
        token: this.orderBinding,
        eventType: 'timing',
      });
      console.log('---动画结束---');
    }
  });
});
```

##   官方案例

[http://dotwe.org/vue/e50f76a6c13337b6fa4201a045c5dc0c](https://link.jianshu.com?t=http%3A%2F%2Fdotwe.org%2Fvue%2Fe50f76a6c13337b6fa4201a045c5dc0c)

[http://dotwe.org/vue/2dff486956044ea59b3d38a2cf20b506](https://link.jianshu.com?t=http%3A%2F%2Fdotwe.org%2Fvue%2F2dff486956044ea59b3d38a2cf20b506)

[http://dotwe.org/vue/64998432f2a249f5cb35b4de0040526d](https://link.jianshu.com?t=http%3A%2F%2Fdotwe.org%2Fvue%2F64998432f2a249f5cb35b4de0040526d)

[http://dotwe.org/vue/cd942c4bee9c4b7bcceda4e3aaf94c70](https://link.jianshu.com?t=http%3A%2F%2Fdotwe.org%2Fvue%2Fcd942c4bee9c4b7bcceda4e3aaf94c70)