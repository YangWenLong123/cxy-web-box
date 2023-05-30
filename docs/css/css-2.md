## 像素

像素就是构成图像的最小单位,指显示屏上的最小单位, 图像由像素组成,单位面积内的像素越多 效果就越好 像素的大小不是绝对的,是根据设备的分辨率决定的

## 分辨率

屏幕分辨率 : 屏幕横向和纵向的像素点数,单位为px

相同大小的屏幕 分辨率越低,单位像素尺寸越大,分辨率越高,单位像素尺寸越小

图像分辨率 : 指图片含有的像素数 , 表示图片分别在垂直和水平上所具有的像素点数

同一尺寸的图片，分辨率越高，图片越清晰。

## PPI

每英寸包括的像素数

## 设备物理像素 (物理分辨率)

设备的真实分辨率 屏幕有多少个像素点 就是多少分辨率

以iphone6 为例 物理分辨率为750*1334,也就是显示屏内部led灯的个数

## 安装本地运行服务器 Live Server

概念：一个具有实时加载功能的小型服务器，可以使用它来加载html/css/javascript，但是不能用于部署最终站点。也就是说我们可以在项目中实时用live-server作为一个实时服务器实时查看开发的网页或项目效果。

在设置settings.json中配置如下文件

``` json
"liveServer.settings.port": 8080, //设置本地服务的端口号
  "liveServer.settings.root": "/", //设置根目录，也就是打开的文件会在该目录下找
  "liveServer.settings.CustomBrowser": "chrome", //设置默认打开的浏览器
  "liveServer.settings.AdvanceCustomBrowserCmdLine": "chrome --incognito --remote-debugging-port=9222",
  "liveServer.settings.NoBrowser": false,
  "liveServer.settings.ignoredFiles": [//设置忽略的文件
      ".vscode/**",
      "**/*.scss",
      "**/*.sass"
  ]
```

## 常见的系统分辨率

PC端

``` json
常用
1280 x 800
1366 x 1024 (IPad Pro)
1440 x 900
1680 x 1050
1600 x 900
1920 x 1200
2560 x 1440
...

更高忽略
2880 x 1620
3200 x 1800
5120 x 2880
...
```

移动端

``` json
360 x 480
412 x 732
375 x 667
414 x 736
375 x 812
...
```

## rem布局

一、方案一

淘宝FLexible方案：<https://github.com/amfe/article/issues/17>

原理：在html标签设置font-size， rem相对于根元素size大小,1rem = 75px;

直接在html文件引入脚本

``` javascript
<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
```

示例：设计稿banner：750px * 210px

``` css
{
  width: 10rem;
  height: 2.8rem
}
```

二、方案二

利用meta

``` html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="viewport" content="width=750, user-scalable=no" />
```

``` css
html {
  font-size: calc(100vw / 7.5);
  -webkit-text-size-adjust: 100%;
}
```

示例：设计稿banner：750px * 210px

``` css
{
  width: 7.5rem;
  height: 2.1rem
}
```

## 百分比布局

通过百分比单位，可以使得浏览器中组件的宽和高随着浏览器的高度的变化而变化，从而实现响应式的效果。整体布局不变.

设计方法：使用%百分比定义宽度，高度大都是用px来固定住，可以根据可视区域 (viewport) 和父元素的实时尺寸进行调整，尽可能的适应各种分辨率。往往配合 max-width/min-width 等属性控制尺寸流动范围以免过大或者过小影响阅读

关于百分比的具体分析

-   子元素height和width/ top和bottom 、left和right的百分比是相对于父元素width，height
-   子元素的padding/margin 不论是垂直方向或者是水平方向，都相对于**直接父亲元素的width**，而与父元素的height无关。


示例：

设计稿宽度：750

图片尺寸：375px * 200px

``` css
{
  width: 50%;  // 375 / 750 高度自适应
}
```

图片距离左侧：20px;

``` css
{
  margin-left: 2.7%; // 20 / 750
}
```

**缺点**:

-   适配计算麻烦
-   各个属性中如果使用百分比，其相对的元素的属性并不是唯一的，使布局问题变得复杂.
-   如果屏幕尺度跨度太大，那么在相对其原始设计而言过小或过大的屏幕上不能正常显示。因为宽度使用%百分比定义，但是高度和文字大小等大都是用px来固定，所以在大屏幕的手机下显示效果会变成有些页面元素宽度被拉的很长，但是高度、文字大小还是和原来一样，显示非常不协调。