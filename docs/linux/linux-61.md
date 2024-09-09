## Linux 中的  `printenv`  命令

以下是  `printenv`  命令的快速指南，他可以用来输出环境变量对应的值。

任何 Shell 中都有大量的环境变量，有的是系统设置的，有的是你自己的 Shell 脚本或配置所产生的。

你可以使用  `printenv`  命令，将它们全部打印到终端中。输出大概就像下面这样：

```
HOME=/Users/flavio
LOGNAME=flavio
PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin
PWD=/Users/flavio
SHELL=/usr/local/bin/fish
```

通常还会多几行。

你可以传递一个变量名作为参数，只显示指定变量的值：

```
printenv PATH
```

![Screen-Shot-2020-09-10-at-16.31.20](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/07c6cdb9038c44109d590ddfc3422761~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725953436&x-orig-sign=GwKCbq8tgvL9jGMsJqixd615CLw%3D)
