### 1、内元素和块级元素的区别？

行内元素：不会独立出现在一行，单独使用的时候后面不会有换行符的元素。eg：span, strong, img, a 等。这些元素，默认的高宽，总是其内容的高宽。并且，margin 和 padding 值，只有左右有效。

块级元素：独立在一行的元素，他们后面会自动带有换行符。eg：div , p ,form , ul , li , ol , dl 等。它们的出现，往往独自占领一行。在没有设置宽度的情况下，默认宽度总是其父元素的宽度。

行内元素转换成块元素，只要设置其 display 属性为 block 即可，display:block; 。块元素转换成行内元素，只要将其 display 属性设置为 inline 即可，display:inline;。

- 行内元素有：a b span img input select
- 块级元素有：div p ul ol li dl dt dd h1-h6
- 常见的空元素：br-换行，hr-水平分割线

### 2.Doctype 作用？标准模式与混杂模式如何区分？

`DOCTYPE`告诉浏览器使用哪个版本的 html 规范来渲染文档。DOCTYPE 不存在或形式不正确会导致 html 文档以混杂模式呈现。

标准模式（Standards mode）以浏览器支持的最高标准运行；混杂模式（Quirks mode）中页面是一种比较宽松的向后兼容的方式显示。

### 3、引入样式时，link 和@import 的区别？

链接样式时，link 只能在 HTML 页面中引入外部样式

导入样式表时，@import 既可以在 HTML 页面中导入外部样式，也可以在 css 样式文件中导入外部 css 样式。

### 4、常见的浏览器内核有哪些？

- Trident( MSHTML )：IE MaxThon TT The World 360 搜狗浏览器

- Geckos：Netscape6 及以上版本 FireFox Mozilla Suite/SeaMonkey

- Presto：Opera7 及以上(Opera 内核原为：Presto，现为：Blink)

- Webkit：Safari Chrome

### 5、简述一下你对 HTML 语义化的理解？

去掉或丢失样式的时候能够让页面呈现出清晰的结构。

有利于 seo 和搜索引擎建立良好沟通，有助于爬虫抓取更多的信息，爬虫依赖于标签来确定上下文和各个关键字的权重。

方便其它设备解析。

便于团队开发和维护，语义化根据可读性。

### 6、浏览器页面有哪三层构成，分别是什么，作用是什么?

浏览器页面构成：结构层、表示层、行为层

分别是：HTML、CSS、JavaScript

作用：HTML 实现页面结构，CSS 完成页面的表现与风格，JavaScript 实现一些客户端的功能与业务。

### 7、简述一下 src 与 href 的区别

src 用于替换当前元素，href 用于在当前文档和引用资源之间确立联系

### 8、从浏览器地址栏输入 url 到显示页面的步骤

浏览器根据请求的 URL 交给 DNS 域名解析，找到真实 IP，向服务器发起请求；

服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；

浏览器对加载到的资源（HTML、JS、CSS 等）进行语法解析，建立相应的内部数据结构（如 HTML 的 DOM）；

载入解析到的资源文件，渲染页面，完成。

### 9、viewport 所有属性 ？

(1)width :设置 layout viewport 的宽度，为一个正整数，或字符串'device-width';

(2)initial-scale:设置页面的初始缩放值，为一个数字，可以带小数。

(3)minimum-scale:允许用户的最小缩放值，为一个数字，可以带小数。

(4)maximum-scale:允许用户的最大缩放值，为一个数字，可以带小数。

(5)height:设置 layout viewport 的高度，这个属性对我们并不重要，很少使用

(6)user-scalable:是否允许用户进行缩放，值为‘no’或者‘yes’。
安卓中还支持：target-densitydpi，表示目标设备的密度等级，作用是决定 css 中的 1px 代表多少物理像素

(7)target-densitydpi:值可以为一个数值或者 high-dpi 、 medium-dpi、 low-dpi、 device-dpi 这几个字符串中的一个

### 10、meta 标签的 name 属性值？

name 属性主要用于描述网页，与之对应的属性值为 content，content 中的内容主要是便于搜索引擎机器人查找信息和分类信息用的。

meta 标签的 name 属性语法格式是：＜ meta name="参数" content="具体的参数值"＞。

其中 name 属性主要有以下几种参数：

A 、Keywords(关键字)说明：keywords 用来告诉搜索引擎你网页的关键字是什么。

B 、description(网站内容描述) 说明：description 用来告诉搜索引擎你的网站主要内容。

C 、robots(机器人向导)说明：robots 用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。

content 的参数有 all,none,index,noindex,follow,nofollow,默认是 all。
举例：＜ meta name="robots" content="none"＞ D 、author(作者)

### 11、px/em/rem 有什么区别？ 为什么通常给 font-size 设置的字体为 62.5%

相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

1、em 的值并不是固定的；

2、em 会继承父级元素的字体大小。使用 rem 为元素设定字体大小时，仍然是相对大小，但相对的只是 HTML 根元素。

这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。

rem 是相对于浏览器进行缩放的。1rem 默认是 16px，在响应式布局中，一个个除来转换成 rem，太麻烦，所以重置 rem
body{font-size=62.5% } 此时 1rem = 10px;若是 12px 则是 1.2rem.

### 12、a 标签中 active hover link visited 正确的设置顺序是什么?

a 标签的 link、visited、hover、active 是有一定顺序的

```
a:link
a:visited
a:hover
a:active
```

### 13、a 标签中 如何禁用 href 跳转页面 或 定位链接

```js
e.preventDefault();
href="javascript:void(0);
```
