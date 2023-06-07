前端性能的一个重要指标是页面加载时间，不仅事关用户体验，也是搜索引擎排名考虑的一个因素。

# 雅虎军规35条

## 1 减少http请求次数

80%的终端用户响应时间都花在了前端上，其中大部分时间都在下载页面上的各种组件：图片，样式表，脚本，Flash等等。减少组件数必然能够减少页面提交的HTTP请求数。这是让页面更快的关键。

合并文件：是通过把所有脚本放在一个文件中的方式来减少请求数的，当然，也可以合并所有的CSS。如果各个页面的脚本和样式不一样的话，合并文件就是一项比较麻烦的工作了，但把这个作为站点发布过程的一部分确实可以提高响应时间。

CSS Sprites：是减少图片请求数量的首选方式。把背景图片都整合到一张图片中，然后用CSS的background-image和background-position属性来定位要显示的部分。

图像映射：可以把多张图片合并成单张图片，总大小是一样的，但减少了请求数并加速了页面加载。图片映射只有在图像在页面中连续的时候才有用，比如导航条。给image map设置坐标的过程既无聊又容易出错，用image map来做导航也不容易，所以不推荐用这种方式。

行内图片（Base64编码）：用data: URL模式来把图片嵌入页面。这样会增加HTML文件的大小，把行内图片放在（缓存的）样式表中是个好办法，而且成功避免了页面变“重”。但目前主流浏览器并不能很好地支持行内图片。

减少页面的HTTP请求数是个起点，这是提升站点首次访问速度的重要指导原则。

## 2 减少DNS查询次数

域名系统建立了主机名和IP地址间的映射，就像电话簿上人名和号码的映射一样。当你在浏览器输入\www.yahoo.com的时候，浏览器就会联系DNS解析器返回服务器的IP地址。DNS是有成本的，它需要20到120毫秒去查找给定主机名的IP地址。在DNS查找完成之前，浏览器无法从主机名下载任何东西。

DNS查找被缓存起来更高效，由用户的ISP（网络服务提供商）或者本地网络存在一个特殊的缓存服务器上，但还可以缓存在个人用户的计算机上。DNS信息被保存在操作系统的DNS cache(微软Windows上的”DNS客户端服务”)里。大多数浏览器有独立于操作系统的自己的cache。只要浏览器在自己的cache里还保留着这条记录，它就不会向操作系统查询DNS。

IE默认缓存DNS查找30分钟，写在DnsCacheTimeout注册表设置中。Firefox缓存1分钟，可以用network.dnsCacheExpiration配置项设置。(Fasterfox把缓存时间改成了1小时 P.S. Fasterfox是FF的一个提速插件)

如果客户端的DNS cache是空的（包括浏览器的和操作系统的），DNS查找数等于页面上不同的主机名数，包括页面URL，图片，脚本文件，样式表，Flash对象等等组件中的主机名，减少不同的主机名就可以减少DNS查找。

减少不同主机名的数量同时也减少了页面能够并行下载的组件数量，避免DNS查找削减了响应时间，而减少并行下载数量却增加了响应时间。我的原则是把组件分散在2到4个主机名下，这是同时减少DNS查找和允许高并发下载的折中方案。

## 3 避免重定向

重定向用301和302状态码，下面是一个有301状态码的HTTP头：

```js
HTTP/1.1 301 Moved Permanently

  Location: http://example.com/newuri

  Content-Type: text/html
```

浏览器会自动跳转到Location域指明的URL。重定向需要的所有信息都在HTTP头部，而响应体一般是空的。其实额外的HTTP头，比如Expires和Cache-Control也表示重定向。除此之外还有别的跳转方式：refresh元标签和JavaScript，但如果你必须得做重定向，最好用标准的3xxHTTP状态码，主要是为了让返回按钮能正常使用。

牢记重定向会拖慢用户体验，在用户和HTML文档之间插入重定向会延迟页面上的所有东西，页面无法渲染，组件也无法开始下载，直到HTML文档被送达浏览器。

有一种常见的极其浪费资源的重定向，而且web开发人员一般都意识不到这一点，就是URL尾部缺少一个斜线的时候。例如，跳转到

```js
http://astrology.yahoo.com/astrology会返回一个重定向到http://astrology.yahoo.com/astrology/的301响应（注意添在尾部的斜线）。

在Apache中可以用Alias，mod_rewrite或者DirectorySlash指令来取消不必要的重定向。
```

重定向最常见的用途是把旧站点连接到新的站点，还可以连接同一站点的不同部分，针对用户的不同情况（浏览器类型，用户帐号类型等等）做一些处理。用重定向来连接两个网站是最简单的，只需要少量的额外代码。虽然在这些时候使用重定向减少了开发人员的开发复杂度，但降低了用户体验。一种替代方案是用Alias和mod_rewrite，前提是两个代码路径都在相同的服务器上。如果是因为域名变化而使用了重定向，就可以创建一条CNAME（创建一个指向另一个域名的DNS记录作为别名）结合Alias或者mod_rewrite指令。

## 4 让Ajax可缓存

Ajax可以帮助我们异步的下载网页内容，但是有些网页内容即使是异步的，用户还是在等待它的返回结果，例如ajax的返回是用户联系人的下拉列表。所以我们还是要注意尽量应用以下规则提高ajax的响应速度。

```js
● Gzip组件   (压缩回复内容)

● 添加Expires或Cache-Control报文头使回复可以被客户端缓存

● 减少DNS查找

● 压缩JavaScript

● 避免重定向

● 配置ETags
```

## 5 延迟加载

这里讨论延迟加载需要我们知道我们的网页最初加载需要的最小内容集是什么。剩下的内容就可以推到延迟加载的集合中。

Javascript是典型的可以延迟加载内容。一个比较激进的做法是开发网页时先确保网页在没有Javascript的时候也可以基本工作，然后通过延迟加载脚本来完成一些高级的功能。

```js
YUI Get utility

YUI Image Loader
```

## 6 预加载

预加载可能看起来和延迟加载是相反的，但它其实有不同的目标。通过预加载组件可以充分利用浏览器空闲的时间来请求将来会用到的组件（图片，样式和脚本）。用户访问下一页的时候，大部分组件都已经在缓存里了，所以在用户看来页面会加载得更快。

实际应用中有以下几种预加载的类型：

● 无条件预加载——尽快开始加载，获取一些额外的组件。google.com就是一个sprite图片预加载的好例子，这个sprite图片并不是google.com主页需要的，而是搜索结果页面上的内容。

● 条件性预加载——根据用户操作猜测用户将要跳转到哪里并据此预加载。在search.yahoo.com的输入框里键入内容后，可以看到那些额外组件是怎样请求加载的。

● 提前预加载——在推出新设计之前预加载。经常在重新设计之后会听到：“这个新网站不错，但比以前更慢了”，一部分原因是用户访问先前的页面都是有旧缓存的，但新的却是一种空缓存状态下的体验。可以通过在将要推出新设计之前预加载一些组件来减轻这种负面影响，老站可以利用浏览器空闲的时间来请求那些新站需要的图片和脚本。

## 7 减少DOM元素的数量

一个复杂的页面意味着要下载更多的字节，而且用JavaScript访问DOM也会更慢。举个例子，想要添加一个事件处理器的时候，循环遍历页面上的500个DOM元素和5000个DOM元素是有区别的。

大量的DOM元素是一种征兆——页面上有些内容无关的标记需要清理。正在用嵌套表格来布局吗？还是为了修复布局问题而添了一堆的

YUI CSS utilities对布局有很大帮助：grids.css针对整体布局，fonts.css和reset.css可以用来去除浏览器的默认格式。这是个开始清理和思考标记的好机会，例如只在语义上有意义的时候使用

```js
document.getElementsByTagName('*').length

YUI CSS utilities     https://yuilibrary.com/
```

## 8 跨域分离组件

分离组件可以最大化并行下载，但要确保只用不超过2-4个域，因为存在DNS查找的代价。例如，可以把HTML和动态内容部署在www.example.org，而把静态组件分离到static1.example.org和static2.example.org。

## 9 尽量少用iframe

用iframe可以把一个HTML文档插入到父文档里，重要的是明白iframe是如何工作的并高效地使用它。

```js
<iframe>的优点：

 ● 引入缓慢的第三方内容，比如标志和广告

 ● 安全沙箱

 ● 并行下载脚本

<iframe>的缺点：

● 代价高昂，即使是空白的iframe

● 阻塞页面加载

● 非语义
```

## 10  杜绝404

HTTP请求代价高昂，完全没有必要用一个HTTP请求去获取一个无用的响应（比如404 Not Found），只会拖慢用户体验而没有任何好处。

有些站点用的是有帮助的404——“你的意思是xxx？”，这样做有利于用户体验，，但也浪费了服务器资源（比如数据库等等）。最糟糕的是链接到的外部JavaScript有错误而且结果是404。首先，这种下载将阻塞并行下载。其次，浏览器会试图解析404响应体，因为它是JavaScript代码，需要找出其中可用的部分。

# CSS部分

## 11 避免使用css表达式

用CSS表达式动态设置CSS属性，是一种强大又危险的方式。从IE5开始支持，但从IE8起就不推荐使用了。CSS表达式的问题在于它被重新计算的次数远比我们想象的要多，不仅在网页绘制或大小改变时计算，即使我们滚动屏幕或者移动鼠标的时候也在计算，因此我们还是尽量避免使用它来防止使用不当而造成的性能损耗。

## 12 选择舍弃[@import](</import >)

前面提到了一个最佳实践：为了实现逐步渲染，CSS应该放在顶部。

```js
在IE中用@import与在底部用<link>效果一样，所以最好不要用它。
```

## 13  避免使用滤镜

IE专有的AlphaImageLoader滤镜可以用来修复IE7之前的版本中半透明PNG图片的问题。在图片加载过程中，这个滤镜会阻塞渲染，卡住浏览器，还会增加内存消耗而且是被应用到每个元素的，而不是每个图片，所以会存在一大堆问题。

最好的方法是干脆不要用AlphaImageLoader，而优雅地降级到用在IE中支持性很好的PNG8图片来代替。如果非要用AlphaImageLoader，应该用下划线hack：_filter来避免影响IE7及更高版本的用户。

## 14 把样式表放在顶部

在Yahoo!研究性能的时候，我们发现把样式表放到文档的HEAD部分能让页面看起来加载地更快。这是因为把样式表放在head里能让页面逐步渲染。

# js部分

## 15 去除重复脚本

重复的脚本不仅浪费浏览器的下载时间，而且浪费解析和执行时间。一般用来避免引入重复脚本的做法是使用统一的脚本管理模块，这样不仅可以避免重复脚本引入，还可以兼顾脚本依赖管理和版本管理。

## 16  尽量减少DOM访问

用JavaScript访问DOM元素是很慢的，所以，为了让页面反应更迅速，应该：

```
 ● 缓存已访问过的元素的索引

 ● 先“离线”更新节点，再把它们添到DOM树上

 ● 避免用JavaScript修复布局问题
```

## 17 用智能的事件处理器

有时候感觉页面反映不够灵敏，是因为有太多频繁执行的事件处理器被添加到了DOM树的不同元素上，这就是推荐使用事件委托的原因。如果一个div里面有10个按钮，应该只给div容器添加一个事件处理器，而不是给每个按钮都添加一个。事件能够冒泡，所以可以捕获事件并得知哪个按钮是事件源。

## 18 把脚本放在底部

HTTP/1.1 specification建议浏览器对同一个hostname不要超过两个并行下载连接， 所以当你从多个domain下载图片的时候可以提高并行下载连接数量。但是当脚本在下载的时候，即使是来自不同的hostname浏览器也不会下载其他资源，因为浏览器要在脚本下载之后依次解析和执行。

因此对于脚本提速，我们可以考虑以下方式，

```js
  ● 把脚本置底，这样可以让网页渲染所需要的内容尽快加载显示给用户。

  ● 现在主流浏览器都支持defer关键字，可以指定脚本在文档加载后执行。

  ● HTML5中新加了async关键字，可以让脚本异步执行。
```

# javascript,css

## 19 引用外部javascript和css

使用外部Javascript和CSS文件可以使这些文件被浏览器缓存，从而在不同的请求内容之间重用。

同时将Javascript和CSS从inline变为external也减小了网页内容的大小。

使用外部Javascript和CSS文件的决定因素在于这些外部文件的重用率，如果用户在浏览我们的页面时会访问多次相同页面或者可以重用脚本的不同页面，那么外部文件形式可以为你带来很大的好处。但对于用户通常只会访问一次的页面，例如microsoft.com首页，那inline的javascript和css相对来说可以提供更高的效率。

## 20 压缩javascript和css

压缩具体来说就是从代码中去除不必要的字符以减少大小，从而提升加载速度。代码最小化就是去掉所有注释和不必要的空白字符（空格，换行和tab）。在JavaScript中这样做能够提高响应性能，因为要下载的文件变小了。两个最常用的JavaScript代码压缩工具是JSMin和YUI Compressor，YUI compressor还可以压缩CSS。

混淆是一种可选的源码优化措施，要比压缩更复杂，所以混淆过程也更容易产生bug。在对美国前十的网站调查中，压缩可以缩小21%，而混淆能缩小25%。虽然混淆的缩小程度更高，但比压缩风险更大。

除了压缩外部脚本和样式，行内的<script>和<style>块也可以压缩。即使启用了gzip模块，先进行压缩也能够缩小5%或者更多的大小。JavaScript和CSS的用处越来越多，所以压缩代码会有不错的效果。

用来帮助我们做精简的工具很多，主要可以参考如下，

   

   JS compressors:

     ● Packer

     

     ● JSMin

     

     ● Closure compiler

     

     ● YUICompressor (also does CSS)

     

     ● AjaxMin (also does CSS)

     

    CSS compressors:

     

     ● CSSTidy

     

     ● Minify

 

     ● YUICompressor (also does JS)

   

     ● AjaxMin (also does JS)

   

     ● CSSCompressor

## 21 优化图片

尝试把GIF格式转换成PNG格式，看看是否节省空间。在所有的PNG图片上运行pngcrush（或者其它PNG优化工具）

## 22 优化CSS Sprite

● 在Sprite图片中横向排列一般都比纵向排列的最终文件小

● 组合Sprite图片中的相似颜色可以保持低色数，最理想的是256色以下PNG8格式

● “对移动端友好”，不要在Sprite图片中留下太大的空隙。虽然不会在很大程度上影响图片文件的大小，但这样做可以节省用户代理把图片解压成像素映射时消耗的内存。100×100的图片是1万个像素，而1000×1000的图片就是100万个像素了。

## 23 不要用HTML缩放图片

不要因为在HTML中可以设置宽高而使用本不需要的大图。如果需要

```js
<img width="100" height="100" src="mycat.jpg" alt="My Cat" />
```

那么图片本身（mycat.jpg）应该是100x100px的，而不是去缩小500x500px的图片。

## 24  用小的可缓存的favicon.ico(收藏夹图标)

favicon.ico是放在服务器根目录的图片，它会带来一堆麻烦，因为即便你不管它，浏览器也会自动请求它，所以最好不要给一个404 Not Found响应。而且只要在同一个服务器上，每次请求它时都会发送cookie，此外这个图片还会干扰下载顺序，例如在IE中，当你在onload中请求额外组件时，将会先下载favicon。

所以为了缓解favicon.ico的缺点，应该确保：

```js
● 足够小，最好在1K以下

● 设置合适的有效期HTTP头（以后如果想换的话就不能重命名了），把有效期设置为几个月后一般比较安全，

  可以通过检查当前favicon.ico的最后修改日期来确保变更能让浏览器知道。
```

# cookie

## 25 给cookie减肥

使用cookie的原因有很多，比如授权和个性化。HTTP头中cookie信息在web服务器和浏览器之间交换。重要的是保证cookie尽可能的小，以最小化对用户响应时间的影响。

```js
● 清除不必要的cookie

● 保证cookie尽可能小，以最小化对用户响应时间的影响

● 注意给cookie设置合适的域级别，以免影响其它子域

● 设置合适的有效期，更早的有效期或者none可以更快的删除cookie，提高用户响应时间
```

## 26 把组件放在不含cookie的域下

当浏览器发送对静态图像的请求时，cookie也会一起发送，而服务器根本不需要这些cookie。所以它们只会造成没有意义的网络通信量，应该确保对静态组件的请求不含cookie。可以创建一个子域，把所有的静态组件都部署在那儿。

如果域名是www.example.org，可以把静态组件部署到static.example.org。然而，如果已经在顶级域example.org或者www.example.org设置了cookie，那么所有对static.example.org的请求都会含有这些cookie。这时候可以再买一个新域名，把所有的静态组件部署上去，并保持这个新域名不含cookie。Yahoo!用的是yimg.com，YouTube是ytimg.com，Amazon是images-amazon.com等等。

把静态组件部署在不含cookie的域下还有一个好处是有些代理可能会拒绝缓存带cookie的组件。有一点需要注意：如果不知道应该用example.org还是www.example.org作为主页，可以考虑一下cookie的影响。省略www的话，就只能把cookie写到*.example.org，所以因为性能原因最好用www子域，并且把cookie写到这个子域下。

# 移动端

## 27 保证所有组件都小于25k

这个限制是因为iPhone不能缓存大于25K的组件，注意这里指的是未压缩的大小。这就是为什么缩减内容本身也很重要，因为单纯的gzip可能不够。

## 28 把组件打包到一个复合文档里

把页面内容打包成复合文本就如同带有多附件的Email，它能够使你在一个HTTP请求中取得多个组建。当你使用这条规则时，首先要确定用户代理是否支持（iPhone不支持）。

# 服务器

## 29 Gzip压缩传输文件

Gzip通常可以减少70%网页内容的大小，包括脚本、样式表、图片等文件。Gzip比deflate更高效，主流服务器都有相应的压缩支持模块。

IIS中内建了静态压缩和动态压缩模块，如何配制可以参考Enable HTTP Compression of Static Content (IIS 7)和Enable HTTP Compression of Dynamic Content (IIS 7)。

值得注意的是pdf文件可以从需要被压缩的类型中剔除，因为pdf文件本身已经压缩，gzip对其效果不大，而且会浪费CPU。

## 30 避免图片src属性为空

空的图片src仍然会使浏览器发送请求到服务器，这样完全是浪费时间，而且浪费服务器的资源。尤其是你的网站每天被很多人访问的时候，这种空请求造成的伤害不容忽略。

浏览器如此实现也是根据RFC 3986 - Uniform Resource Identifiers标准，空的src被定义为当前页面。

所以注意我们的网页中是否存在这样的代码

```js
 <img src="">

 JavaScript

 var img = new Image();

 img.src = "";
```

## 31 配置ETags

虽然标题叫配制ETags，但是这里你要根据具体情况进行一些判断。首先Etag简单来说是通过一个文件版本标识使得服务器可以轻松判断该请求的内容是否有所更新，如果没有就回复304 (not modified)，从而避免下载整个文件。

但是Etags的版本信息即使主流服务器未能很好地支持跨服务器的判断，比如你从一个服务器集群中一台得到Etags，然后发送到了另一台那么校验很有可能会失败。

## 32 对Ajax用GET请求

get 用来检索信息，所以他的语义只是用get请求来请求数据

post 用来发送需要存储到服务器的数据

## 33 尽早清空缓冲区

网页后台程序中我们知道有个方法叫Response.Flush()，一般我们调用它都是在程序末尾，但注意这个方法可以被调用多次。目的是可以将现有的缓存中的回复内容先发给客户端，让客户端“有活干”。

那在什么时候调用这个方法比较好呢？一般情况下我们可以在对于需要加载比较多外部脚本或者样式表时可以提前调用一次，客户端收到了关于脚本或其他外部资源的链接可以并行的先发请求去下载，服务器接下来把后续的处理结果发给客户端。

当用户请求一个页面时，服务器需要用大约200到500毫秒来组装HTML页面，在这期间，浏览器闲等着数据到达。PHP中有一个flush()函数，允许给浏览器发送一部分已经准备完毕的HTML响应，以便浏览器可以在后台准备剩余部分的同时开始获取组件，好处主要体现在很忙的后台或者很“轻”的前端页面上（P.S. 也就是说，响应时耗主要在后台方面时最能体现优势）。

较理想的清空缓冲区的位置是HEAD后面，因为HTML的HEAD部分通常更容易生成，并且允许引入任何CSS和JavaScript文件，这样就可以让浏览器在后台还在处理的时候就开始并行获取组件。

```js
例如：

  ... <!-- css, js -->

   </head>

   <?php flush(); ?>

   <body>
  ... <!-- content -->
```

## 34 使用CDN（内容分发网络）

记住终端用户80%到90%的响应时间都花在下载页面组件上了：图片，样式，脚本，Flash等等，这是业绩黄金法则。最好先分散静态内容，而不是一开始就重新设计应用程序结构。这不仅能够大大减少响应时间，还更容易表现出CDN的功劳。

## 35 添上Expires或者Cache-Control HTTP头

这条规则有两个方面：

```js
  ● 对于静态组件：通过设置一个遥远的将来时间作为Expires来实现永不失效

  ● 多余动态组件：用合适的Cache-ControlHTTP头来让浏览器进行条件性的请求
```

网页设计越来越丰富，这意味着页面里有更多的脚本，图片和Flash。站点的新访客可能还是不得不提交几个HTTP请求，但通过使用有效期能让组件变得可缓存，这避免了在接下来的浏览过程中不必要的HTTP请求。有效期HTTP头通常被用在图片上，但它们应该用在所有组件上，包括脚本、样式和Flash组件。

浏览器（和代理）用缓存来减少HTTP请求的数目和大小，让页面能够更快加载。web服务器通过有效期HTTP响应头来告诉客户端，页面的各个组件应该被缓存多久。用一个遥远的将来时间做有效期，告诉浏览器这个响应在2010年4月15日前不会改变。