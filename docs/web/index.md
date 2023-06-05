#### 前言

canvas元素用于生成图像。它本身就像一个画布，JavaScript 通过操作它的 API，在上面生成图像。它的底层是一个个像素，基本上canvas是一个可以用 JavaScript 操作的位图（bitmap）。

它与 SVG 图像的区别在于，canvas是脚本调用各种方法生成图像，SVG 则是一个 XML 文件，通过各种子元素生成图像。

使用 Canvas API 之前，需要在网页里面新建一个canvas元素。

```js
<canvas id="myCanvas" width="400" height="250">
  您的浏览器不支持 Canvas
</canvas>
```

如果浏览器不支持这个 API，就会显示canvas标签中间的文字：“您的浏览器不支持 Canvas”。

每个canvas元素都有一个对应的CanvasRenderingContext2D对象（上下文对象）。Canvas API 就定义在这个对象上面。

```js
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
```

上面代码中，canvas元素节点对象的getContext()方法，返回的就是CanvasRenderingContext2D对象。

注意，Canvas API 需要getContext方法指定参数2d，表示该canvas节点生成 2D 的平面图像。如果参数是webgl，就表示用于生成 3D 的立体图案，这部分属于 WebGL API。

按照用途，Canvas API 分成两大部分：绘制图形和图像处理。