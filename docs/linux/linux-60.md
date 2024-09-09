## Linux 中的  `env`  命令

`env`  命令可以用来传递环境变量，而不需要在外部环境（例如当前 Shell 中）设置它们。

假设你想运行一个 Node.js 应用，同时要为它设置名为  `USER`  的变量。

你可以运行

```
env USER=flavio node app.js
```

此时，Node.js 应用可以通过 Node 的  `process.env`  接口访问  `USER`  这个环境变量。

你也可以通过附加  `-i`  参数，清除所有已经设置的环境变量：

```
env -i node app.js
```

这种情况下，你有可能得到一个错误提示  `env: “node”: 没有那个文件或目录`，这是由于 Shell 用来查找共用命令路径的  `PATH`  变量已被卸除，导致  `node`  命令无法找到。

因此你需要把完整的路径传递给  `node`  程序：

```
env -i /usr/local/bin/node app.js
```

我们用带有以下内容的  `app.js`  文件来试试：

```
console.log(process.env.NAME)
console.log(process.env.PATH)
```

你将会看到这样的输出：

```
undefined
```

此时你可以传递一个 env 变量：

```
env -i NAME=flavio node app.js
```

然后输出会变成：

```
flavio
undefined
```

去掉  `-i`  参数会让  `PATH`  变量在应用中再次可用：

![Screen-Shot-2020-09-10-at-16.55.17](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/b22056af0f45461c8bf58c71908c8e27~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWxvbmfkuLY=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTE4NzEyODI4OTUzMjY1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725953421&x-orig-sign=pouAgEcVfep39n%2BkfncZId4DUnA%3D)

如果不带参数运行  `env`  命令，它还可以用来列出所有环境变量：

```
env
```

它会返回已设置的环境变量的列表，例如：

```
HOME=/Users/flavio
LOGNAME=flavio
PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin
PWD=/Users/flavio
SHELL=/usr/local/bin/fish
```

你还可以使用  `-u`  参数，即可让某个变量在你运行的应用中无法访问。例如，下面的命令移除了当前环境中的  `HOME`  变量：

```
env -u HOME node app.js
```
