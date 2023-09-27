# 一、前端截图方案(html2canvas)

## 运行原理

该脚本遍历其加载页面的 DOM。它收集所有元素的信息，然后使用这些信息构建页面的表示。换句话说，它实际上并不截取页面的屏幕截图，而是根据从 DOM 读取的属性构建页面的表示。

1. 获取 DOM 元素和样式信息：首先获取需要转换的 HTML 元素及其子元素，同时收集元素的样式信息。这些信息包括元素的大小、位置、颜色、边距等。
2. 创建 canvas 元素: 接下来，html2canvas 会创建一个新的 canvas 元素，并将其大小设置为与要转换的 HTML 元素相同
3. 绘制元素: 对于每个 HTML 元素，html2canvas 会根据其样式信息绘制相应的图形。
4. 处理图片和背景图片: html2canvas 会处理元素中的图像和背景图像，将它们绘制到 canvas 元素上。这需要加载图像，然后将其绘制到 canvas 上，同时处理图像的大小和位置。
5. 处理边距和阴影：对于有边距和阴影的元素，html2canvas 会处理这些样式，将它们绘制到 canvas 元素上。
6. 处理滚动条：如果元素包含滚动条，html2canvas 会处理滚动条的样式和位置，确保转换后元素位置的正确显示。
7. 处理兼容性: 处理不同浏览器之间的兼容性，例如透明度，渐变等。
8. 返回转换后的的 canvas 元素

## 存在问题

1. 部分 css 功能不支持，点击[查看](https://html2canvas.hertzen.com/features/)
2. 图片有同源限制,点击[查看](https://zh.wikipedia.org/wiki/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5)
3. 在不同操作系统生成的图片像素不一致
4. 图片加载失败
5. 元素位置不同意

## 跨域解决方案

将跨域的图片的 crossOrigin 设置为 \*，并且转为 base64 图片

```js
funvtion getBase64Image(img) {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  let dataURL = canvas.toDataURL('image/png')
  return dataURL
}

function getPoster() {
  let htmlContainer = this.$refs.creatPoster // 需要截图的包裹的（原生的）DOM 对象
  let width = htmlContainer.offsetWidth // 获取dom 宽度
  let height = htmlContainer.offsetHeight // 获取dom 高度
  let canvas = document.createElement('canvas') // 创建一个canvas节点
  let scale = 2 // 定义任意放大倍数 支持小数

  canvas.width = width * scale // 定义canvas 宽度 * 缩放
  canvas.height = height * scale // 定义canvas高度 *缩放
  canvas.getContext('2d').scale(scale, scale) // 获取context,设置scale

  let imgs = htmlContainer.querySelectorAll('img')
  let count = 0 // 计数用

  // 排除base64图片，因为base64图片不会有跨域问题
  imgs = Array.from(imgs).filter(elem => {
    return !/^data:image\/png;base64/.test(elem.src)
  })

  // 将会跨域的图片转为支持跨域base64图片，最后再执行html2canvas
  imgs.forEach((elem, index, arr) => {
    let image = new Image()

    image.crossOrigin = '*' // 支持跨域图片
    image.src = elem.src
    image.onload = () => {
      elem.src = this.getBase64Image(image)
      count++

      // 全部图片加载完毕
      if (count === arr.length) {
        // http://html2canvas.hertzen.com/configuration/   配置设置地址
        let opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas, // 自定义 canvas
            // logging: true, // 日志开关，便于查看html2canvas的内部执行流程
            width: width, // dom原始宽度
            height: height,
            useCORS: true, // 【重要】开启跨域配置
            allowTaint: true, // 【重要】开启画布污染
            backgroundColor: '#fff'
        }

        html2canvas(htmlContainer, opts).then(canvas => {
            let context = canvas.getContext('2d')

            // 关闭抗锯齿
            context.mozImageSmoothingEnabled = false
            context.webkitImageSmoothingEnabled = false
            context.msImageSmoothingEnabled = false
            context.imageSmoothingEnabled = false
            // 默认转化的格式为png，也可设置为其他格式
            this.posterUrl = canvas.toDataURL('image/jpeg')
        })
      }
    }
  })
}
```

## 使用步骤

1、安装

```bash
pnpm install html2canvas --save-dev
```

2、使用

```js
import html2canvas from "html2canvas";

const dom = document.getElementById("");

html2canvas(dom, {
  width: '',
  height: '',
  backgroundColor: "#fff",
  allowTaint: false,
  useCORS: true,
  scale: 2,
  dpi: window.devicePixelRatio * 2,
} as any).then((canvas) => {
  let base64 = canvas.toDataURL("image/png");

  console.log("====base64===", base64);
});
```

3、避免头部闪烁

因为头部是固定不变的，事先把头部生成 base64，然后等待下面部分也生成 base64 时进行合并成一张图片.

4、截图效果如下

![Alt text](image.png)

## 浏览器兼容性

- Firefox 3.5+
- Google Chrome
- Opera 12+
- IE9+
- Edge
- Safari 6+

# 二、Puppeteer

## 介绍

Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。Puppeteer 默认以 headless 模式运行，但是可以通过修改配置文件运行“有头”模式。

## 中文文档

[Puppeteer](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=puppeteer-v21.3.5&show=api-class-puppeteer)

## 简单案例

```js
const puppeteer = require("puppeteer");

puppeteer.launch().then(async (browser) => {
  const page = await browser.newPage(); //打开tab页
  await page.goto("https://example.com"); //打开页面
  await page.screenshot({ path: "example.png" }); //截图
  await browser.close(); //关闭浏览器
});
```

## 部署问题

1. 跨域问题，使用 cors 解决
2. linux 服务器部署需要安装浏览器，相关依赖及字体。
3. 使用 pm2 守护进程

## demo 实现结果

![Alt text](image-1.png)

截图如下

![Alt text](image-2.png)
