## Linux 中的 find 命令

find 命令可以用来按特定的模式搜索文件和文件夹。它以递归的方式进行搜索。

你可以用下面的命令，查找当前目录树下所有扩展名为 .js 的文件，并输出每个匹配文件的相对路径：

```bash
find . -name '*.js'
```

例：
```bash
yangwenlongdeMacBook-Pro:a yangwenlong$ touch a.js b.txt c.css
yangwenlongdeMacBook-Pro:a yangwenlong$ open .
yangwenlongdeMacBook-Pro:a yangwenlong$ find . -name '*.js'
./a.js
```