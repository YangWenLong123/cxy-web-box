## 三角形

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bb62c451a034ddd91fac58b6d268efd~tplv-k3u1fbpfcp-zoom-1.image)

```css
width: 0px;
height: 0px;
border-width: 50px;
border-style: solid;
border-color: aqua red saddlebrown dodgerblue;
```

## 多行省略

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```

## 多媒体查询

```css
@media all and (min-width: 750px) and (max-width: 1000px) {
}
```

## @keyframes 动画

```css
animation: al 5s infinite;
@keyframes al {
  from {
  }
  to {
  }
}
```

## 左右宽度固定，中间内容自适应

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf28e4f9bfdc4a22becfa218af142c23~tplv-k3u1fbpfcp-zoom-1.image)

```css
.al_box {
  width: 100%;
  height: 200px;
  overflow: hidden;
  margin: o auto;
  display: flex;
}
.al_left,
.al_right {
  width: 200px;
  height: 200px;
  background: darkcyan;
}
.al_auto {
  flex: 1;
  height: 200px;
  background: darkgray;
}
```

## calc 动态计算元素宽度

```css
width: calc(100% - 200px);
```

## 数字字母换行

```css
word-break: break-all;
```

## css 滤镜

[css3 filter(滤镜)](https://www.runoob.com/cssref/css3-pr-filter.html)

```css
//在body上添加
filter: grayscale(100%);
-webkit-filter: grayscale(100%);
-moz-filter: grayscale(100%);
-ms-filter: grayscale(100%);
-o-filter: grayscale(100%);
filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
-webkit-filter: grayscale(1);
```

## css 禁止点击元素

```css
pointer-events: none;
```

## css 画圆弧

```css
<div
  class="container"
  > <div
  class="container-bg"
  > </div
  > </div
  > .container {
  width: 750rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f8f8;
}
.container-bg {
  width: 750rpx;
  height: 346rpx;
  position: relative;
  background-color: #20a0ff;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 0 0 640rpx 640rpx/0 0 80rpx 80rpx;
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c4378bacaa04f44a6dc5841f3821413~tplv-k3u1fbpfcp-zoom-1.image)

## 文字禁止选择

```css
user-select: none;
```

## 多重边框

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95c60b2a7bc848389ad39cc3883fc437~tplv-k3u1fbpfcp-zoom-1.image)

```css
<div class="shadow" > </div > .shadow {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fafafa;
  margin: 200px;
  box-shadow: 0 0 0 10px #e8e2d6, 0 0 0 20px #e1d9c9, 0 0 0 30px #d9cfbb, 0 0 0
      40px #d2c6ae, 0 0 0 50px #cabca0, 0 0 0 60px #c3b393, 0 0 0 70px #bba985, 0
      0 0 80px #b4a078;
}
```

## 边框内圆角

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23643e0b31084dacb9255d7b610edfd9~tplv-k3u1fbpfcp-zoom-1.image)

```css
<div > </div > div {
  width: 209px;
  margin: 29px auto;
  padding: 38px 16px;
  border-radius: 8px;
  background: #f4f0ea;
  outline: 6px solid #b4a078;
  box-shadow: 0 0 0 6px #b4a078;
}
```

## 进度条，条纹背景

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e80c916510614e0bbd2a38e6a1d53951~tplv-k3u1fbpfcp-zoom-1.image)

```css
<div
  class="progress-outer"
  > <div
  class="progress-enter"
  > <div
  class="progress-bg"
  > </div
  > </div
  > </div
  > .progress-outer {
  width: 60%;
  height: 12px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.progress-enter {
  height: inherit;
  background: rgba(180, 160, 120, 0.2);
}

.progress-bg {
  width: 60%;
  height: inherit;
  border-radius: 6px;
  background: repeating-linear-gradient(
    -45deg,
    #d9cfbb 25%,
    #c3b393 0,
    #c3b393 50%,
    #d9cfbb 0,
    #d9cfbb 75%,
    #c3b393 0
  );
  background-size: 16px 16px;
  animation: panoramic 20s linear infinite;
}

@keyframes panoramic {
  to {
    background-position: 200% 0;
  }
}
```

## 不规则卡片

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08730f206c3946c9ad3b556d58d96ba0~tplv-k3u1fbpfcp-zoom-1.image)

```css
<div class="coupon-card" > </div > .coupon-card {
  width: 200px;
  height: 120px;
  background-image: radial-gradient(
    circle at 100px -8px,
    transparent 20px,
    #b4a078 20px
  );
}
```

## 圆与椭圆

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c50219683a64825bfddf8756e3c0a03~tplv-k3u1fbpfcp-zoom-1.image)

```css
<div
  class="ellipse"
  > </div
  > <div
  class="ellipse"
  > </div
  > <div
  class="ellipse"
  > </div
  > <div
  class="ellipse"
  > </div
  > <div
  class="ellipse"
  > </div
  > <div
  class="ellipse"
  > </div
  > div {
  width: 200px;
  height: 150px;
  background: #b4a078;
  margin-bottom: 30px;
}
.ellipse:nth-of-type(1) {
  width: 300px;
  height: 150px;
  border-radius: 50% / 100% 100% 0 0;
}
.ellipse:nth-of-type(2) {
  width: 150px;
  height: 150px;
  border-radius: 100% 0 0 0;
}
.ellipse:nth-of-type(3) {
  border-radius: 50% / 100% 100% 0 0;
}
.ellipse:nth-of-type(4) {
  width: 100px;
  border-radius: 100% 0 0 0;
}
.ellipse:nth-of-type(5) {
  width: 300px;
  border-radius: 50% / 0 100%;
}
.ellipse:nth-of-type(6) {
  width: 300px;
  border-radius: 50% / 100% 0;
}
```

## 切角效果

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28061d788c264d298b494bc43a80294e~tplv-k3u1fbpfcp-zoom-1.image)

```css
<div
  class="bevel-corners"
  > <p
  > ①
  linear-gradient</p
  > <div
  > A
  paragraph
  of
  filler
  text.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.</div
  > </div
  > <div
  class="bevel-corners"
  > <p
  > ②
  radial-gradient</p
  > <div
  > A
  paragraph
  of
  filler
  text.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.</div
  > </div
  > <div
  class="bevel-corners"
  > <p
  > ③
  内联SVG</p
  > <div
  > A
  paragraph
  of
  filler
  text.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.</div
  > </div
  > <div
  class="bevel-corners"
  > <p
  > ④
  clip-path</p
  > <div
  > A
  paragraph
  of
  filler
  text.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.La
  la
  la
  de
  dah
  de
  dah
  de
  dah
  de
  la.</div
  > </div
  > .bevel-corners {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.bevel-corners > div {
  width: 249px;
  color: #fff;
  padding: 1.2em 1.8em;
  hyphens: auto;
  text-align: justify;
  background: #b4a078;
}

.bevel-corners > p {
  width: 116px;
}

.bevel-corners:nth-of-type(1) > div {
  background: linear-gradient(45deg, transparent 12px, #b4a078 13px) bottom left,
    linear-gradient(135deg, transparent 12px, #b4a078 13px) top left,
    linear-gradient(-135deg, transparent 12px, #b4a078 13px) top right, linear-gradient(
        -45deg,
        transparent 12px,
        #b4a078 13px
      ) bottom right;
  background-size: 51% 51%;
  background-repeat: no-repeat;
}

.bevel-corners:nth-of-type(2) > div {
  background: radial-gradient(
        circle at bottom left,
        transparent 15px,
        #b4a078 16px
      ) bottom left, radial-gradient(
        circle at top left,
        transparent 15px,
        #b4a078 16px
      ) top left,
    radial-gradient(circle at top right, transparent 15px, #b4a078 16px) top right,
    radial-gradient(circle at bottom right, transparent 15px, #b4a078 16px) bottom
      right;
  background-size: 51% 51%;
  background-repeat: no-repeat;
}

.bevel-corners:nth-of-type(3) > div {
  padding: 0 9px;
  border: 18px solid transparent;
  border-image: 1
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" fill="%23b4a078"><polygon points="0,1 1,0 2,0 3,1 3,2 2,3 1,3 0,2"/> </svg>');
  background-clip: padding-box;
}

.bevel-corners:nth-of-type(4) > div {
  clip-path: polygon(
    20px 0,
    calc(100% - 20px) 0,
    100% 20px,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    20px 100%,
    0 calc(100% - 20px),
    0 20px
  );
  transition: 1s clip-path;
}

.bevel-corners:nth-of-type(4):hover > div {
  clip-path: polygon(
    0 0,
    0 0,
    100% 0,
    100% 0,
    100% 100%,
    100% 100%,
    0 100%,
    0 100%
  );
}
```

## 毛玻璃效果

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39cb5fb3500f4424bacc2cb1b3ad1bdf~tplv-k3u1fbpfcp-zoom-1.image)

```css
<main
  class="main"
  > <div
  > "O God, I could be bounded in a nutshell and count myself a king of infinite space, were it not that I have
bad dreams."<br
  > “即使我身处果壳之中，我仍以为自己是宇宙之王”
  <footer
  > <cite
  > William
  Shakespeare</cite
  > </footer
  > </div
  > </main
  > main {
  width: 90%;
  margin: auto;
  padding: 59px 29px;
  border-radius: 0.3em;
  text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset, 0 0.3em 1em rgba(0, 0, 0, 0.12);
  font: 150%/1.6 Baskerville, Palatino, serif;
}

main,
main > div::before {
  background: url("https://lhammer.cn/You-need-to-know-css/static/city-night.jpg")
    fixed 0 / cover;
}

main > div::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  filter: blur(10px);
  margin: -30px;
}

main > div {
  font-style: italic;
  color: #000;
  padding: 30px;
  hyphens: auto;
  background: hsla(0, 0%, 100%, 0.5);
  overflow: hidden;
  position: relative;
}

main > div cite {
  font-style: normal;
}

main footer {
  text-align: right;
}
```

## 一行 CSS 为网页添加暗黑模式

````css
filter: invert(1) hue-rotate(180deg);
```a
````
