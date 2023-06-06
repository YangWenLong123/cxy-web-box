## 前言

uniapp绘制朋友圈海报分享图片

## 实现

```js
<canvas class="my-canvas" canvas-id="shareCanvas"></canvas>
```

```js
import Painter from "mp-painter";

let painter = new Painter(uni.createCanvasContext('shareCanvas', this));

return new Promise((resolve,reject) => {
	painter.draw({
  	type: "container",
    top: 0,
    left: 0,
    children: [
      {type: "rect", top: 0, width: 610, height: 970, background: "#fff"}
    ]
  }).then(() => {
  	Promise.all([
    	painter.draw({
        type: "container",
        top: 40,
        left: 210,
        children: [
          {type: "image", top: 0, left: 0, width: 40, height: 40, src: "http://cdn.zsdx.cn/student-app/images/hand-logo.png"},
        ]
      }),
      painter.draw({}),
      ...
    ]).then(resp => {
      //把指定画布内容倒醋和指定大小的图片
    	uni.canvasToTempFilePath( {
					canvasId: 'shareCanvas',
					quality: 0.01,
					success: res => {
						console.log('tempFilePath', resp.tempFilePath);
					},
					fail: error => {
						reject(error);
					}
				},this);
    })
  })
})
```

## API

注: 位置和宽高根据实际情况填写.

```js
//绘制图片
painter.draw({
  type: "container",
  top: x,
  left: y,
  children: [
    {type: "image", top: 0, left: 0, width: 40, height: 40, src: "http://cdn.zsdx.cn/student-app/images/hand-logo.png"},
  ]
})

//绘制文本
painter.draw({
  type: "container",
  top: x,
  left: y,
  children: [
    { type: "text", top: 0, left: 0,fontSize: 30,baseline: "middle", content: "掌上大学" }
  ]
})

//绘制矩形
painter.draw({
  type: "container",
  top: x,
  left: y,
  children: [
    {type: "rect", top: 0, left:0, width: 530, height: 530, background: '#FF2A2A'}
  ]
})

//矩形圆角渐变色
painter.draw({
  type: "container",
  top: x,
  left: y,
  children: [
    {type: "rect", top: 449, left: margin_price_1-104 - 70, width: 530 - (margin_price_1-104-70), height: 80, background: {
      type: "liner-gradient",
      x1: 0, y1: 0, x2: 280, y2: 80,
      colorStops: [
        { offset: 0, color: "#FF4978" },
        { offset: 1, color: "#FF2A2A" }
      ]
    }, borderRadius: [200, 0, 0, 0], position: "absolute"}
  ]
})

//多行文本
painter.draw({
  type: "container",
  top: 670,
  left: 40,
  children: [
    {
      type: "text-block",
      top: 0,
      left: 0,
      width: 346,
      lineClamp: 2,
      fontSize: 28,
      color: '#1D2023',
      content: '多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本',
    }
  ]
})
```

## 参考

<https://github.com/xlfsummer/mp-painter>

## 相关

<https://github.com/quanweiwang/uniapp-canvas-drawer>