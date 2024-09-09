## Linux 中的  `uname`  命令

不带任何参数执行  `uname`  将会返回当前操作系统的代号：

![Screen-Shot-2020-09-07-at-07.37.41](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/61c72e14ba3d474a89bb229a834cc9c0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725953404&x-orig-sign=YoKlqUhbb6T2iDVwV9psGd0uHEA%3D)

参数  `m`  可以显示硬件名称（本例中为  `x86_64`），而参数  `p`  会输出处理器架构名称（本例中为  `i386`）：

![Screen-Shot-2020-09-07-at-07.37.51](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b60b74ccf17f465d92316d60ece5f3a0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725953403&x-orig-sign=onQH3FWcZbuWAHEEtsolrYrNk5A%3D)

参数  `s`  输出操作系统名称，参数  `r`  输出当前发布版本的名称，而参数  `v`  输出版本号：

![Screen-Shot-2020-09-07-at-07.37.56](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6eb482767cec411fab63a58556bd2642~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725953403&x-orig-sign=3JWV%2F%2BQWeg51068DgaVxtSO6U%2F4%3D)

参数  `n`  输出网络节点，也就是当前主机的名称：

![Screen-Shot-2020-09-07-at-07.38.01](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bd9216be718646c7b87629c2944eea76~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725953403&x-orig-sign=9awEwJMpdy%2FVUYeIzYXxnKYF8gQ%3D)

参数  `a`  则会输出所有可用的信息：

![Screen-Shot-2020-09-07-at-07.38.06](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/67b9185a2e3a48968e485b0805a4c59f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725953404&x-orig-sign=bo5YV7njTT8MRdkJTg93%2FEeK3Hs%3D)

在 macOS 上，你还可以使用  `sw_vers`  命令，输出更多关于操作系统的信息。注意这和上方 Darwin （内核）的版本  `19.6.0`  不同。

> Darwin 是 macOS 内核的名称。内核是操作系统的“核心”，而操作系统作为一个整体称为 macOS。在 Linux 中，Linux 是内核名称，而 GNU/Linux 才是操作系统名称（尽管我们会习惯性称其为 "Linux"）。
