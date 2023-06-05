# SVG使用教程

SVG是一种基于XML的图像格式，可以在浏览器中显示，并且图像可以进行缩放和修改。以下是一些基本的SVG使用教程以及案例代码。

## SVG基本要素

SVG文件由以下基本要素组成：

-   `<rect>`：绘制矩形，可以设置宽、高、填充色等属性。
-   `<circle>`：绘制圆形，可以设置半径、填充色等属性。
-   `<line>`：绘制直线，可以设置起点、终点、线宽等属性。
-   `<text>`：绘制文本，可以设置文字内容、字体、字号等属性。

以上元素可以通过设置属性进行样式的修改，例如`fill`属性用于设置填充色，`stroke`属性用于设置描边颜色。具体的属性可以参考MDN文档[developer.mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Getting_Started)。

## SVG渲染顺序

SVG文件中的元素渲染顺序是“后来居上”，也就是越后面的元素越可见。例如，如果在一个矩形和一个圆形重叠的情况下，后面出现的元素会遮盖前面的元素。这一点需要特别注意，可以通过设置`z-index`属性来调整元素的渲染顺序。

## SVG文件类型

SVG文件有两种形式：

-   普通SVG文件：包含SVG标记的简单文本文件，推荐使用`.svg`（全部小写）作为此类文件的扩展名。
-   压缩SVG文件：由于在某些应用中使用时，SVG文件可能会很大，SVG标准同样允许压缩的SVG文件。推荐使用`.svgz`（全部小写）作为此类文件扩展名。

## SVG嵌入到HTML文件中的方法

SVG可以直接嵌入到HTML中，有以下几种方法：

-   如果HTML是XHTML并且声明类型为`application/xhtml+xml`，可以直接把SVG嵌入到XML源码中。
-   可以使用`img`元素。
-   可以通过`object`元素引用SVG文件。
-   类似的也可以使用`iframe`元素引用SVG文件。

以上方法的具体使用可以参考MDN文档[developer.mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Getting_Started)。

## SVG案例代码

以下是一个SVG案例代码，用于绘制一个绿色圆圈和一个红色矩形，并将圆圈置于矩形中央：

```js
<svg width="400" height="400">
  <rect x="0" y="0" width="400" height="400" fill="red" />
  <circle cx="200" cy="200" r="80" fill="green" />
</svg>


```

以上代码中，`<svg>`元素用于定义SVG图像的大小，`<rect>`元素用于绘制矩形，`<circle>`元素用于绘制圆形。`cx`和`cy`属性用于设置圆心的位置，`r`属性用于设置半径。具体的属性可以参考MDN文档[developer.mozilla.org](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Getting_Started)。