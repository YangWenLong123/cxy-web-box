## css 长度单位

css 中的长度单位一共有 8 个，分别是 px，em，pt，ex，pc，in，mm，cm

- px：像素（Pixel）,相对于设备的长度单位，像素是相对于显示器屏幕分辨率而言的。譬如，WONDOWS 的用户所使用的分辨率一般是 96 像素/英寸。而 MAC 的用户所使用的分辨率一般是 72 像素/英寸。
- em：相对长度单位。相对于当前对象内文本的字体尺寸。如当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。
- ex：相对长度单位。相对于字符“x”的高度。此高度通常为字体尺寸的一半。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。
- pt：点（Point），绝对长度单位。
- pc：派卡（Pica），绝对长度单位。相当于我国新四号铅字的尺寸。
- in：英寸（Inch），绝对长度单位。
- mm：毫米（Millimeter），绝对长度单位。
- cm：厘米（Centimeter），绝对长度单位。

其中：1in = 2.54cm = 25.4 mm = 72pt = 6pc ；

## 分辨率

电脑屏幕分辨率是指电脑屏幕上可以显示的像素点的数量，通常以像素为单位（px）表示。分辨率的表示方式通常是宽度 x 高度，例如 1920x1080，这表示屏幕的宽度是 1920 像素，高度是 1080 像素。分辨率越高，屏幕上可以显示的细节越多，图像质量也越好。

在 Windows 系统中，可以通过命令提示符（CMD）或`PowerShell`使用 `wmic desktopmonitor get screenheight, screenwidth`命令来查看屏幕的分辨率。在 Mac 系统中，可以通过终端使用`system_profiler SPDisplaysDataType | grep Resolution`命令来查看

## PPI

PPI（Pixels Per Inch）是一个度量单位，用于描述屏幕或打印媒体上每英寸的像素数量。这个概念在计算机图形和显示技术中非常重要，因为它影响了图像的清晰度和分辨率。PPI 的值越高，图像的分辨率越高，因此在屏幕上看起来更清晰。

## 设备物理像素 (物理分辨率)

设备的真实分辨率 屏幕有多少个像素点 就是多少分辨率

以 iphone6 为例 物理分辨率为 750\*1334,也就是显示屏内部 led 灯的个数

## 常见的系统分辨率

PC 端

```json
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

```json
360 x 480
412 x 732
375 x 667
414 x 736
375 x 812
...
```

## rem 布局

淘宝 FLexible 方案：<https://github.com/amfe/article/issues/17>

原理：在 html 标签设置 font-size， rem 相对于根元素 size 大小,1rem = 75px;

直接在 html 文件引入脚本

```javascript
<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
```

示例：设计稿 banner：750px \* 210px

```css
 {
  width: 10rem;
  height: 2.8rem;
}
```

## vue 中如何配置响应式布局

安装插件`postcss-px-to-viewport`

```bash
pnpm i postcss-px-to-viewport -D
```

在`postcss.config.js`配置

```js
module.exports = ({ webpack }) => {
  return {
    plugins: {
      "postcss-px-to-viewport": {
        unitToConvert: "px", // 需要转换的单位，默认为"px"
        viewportWidth: 750, // 设计稿的视口宽度
        unitPrecision: 5, // 单位转换后保留的精度
        propList: ["*"], // 能转化为vw的属性列表
        viewportUnit: "vw", // 希望使用的视口单位
        fontViewportUnit: "vw", // 字体使用的视口单位
        selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
        minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        replace: true, //  是否直接更换属性值，而不添加备用属性
        exclude: [/preview/, /header/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
        landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      },
    },
  };
};
```

设计稿尺寸配置的 750px, 所以只要把设计稿尺寸调整成 750 开发即可，会自动把 px 专程 vw,vh
