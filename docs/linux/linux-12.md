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

你可以在不同的根目录树下搜索文件：

```bash
find folder1 folder2 -name filename.txt
```

要在当前目录树下搜索名称为 "node_modules" 或是 'public' 的目录，请输入：

```bash
find . -type d -name node_modules -or -name public
```

你可以用  `-not -path`  参数排除某个路径：

```bash
find . -type d -name '*.md' -not -path 'node_modules/*'
```

你还可以搜索当前目录树中内容超过 100 个字符（字节）的文件：

```bash
find . -type f -size +100c
```

搜索大于 100KB，但小于 1MB 的文件：

```bash
find . -type f -size +100k -size -1M
```

搜索至少 3 天前编辑的文件：

```bash
find . -type f -mtime +3
```

搜索最近 24 小时编辑的文件：

```bash
find . -type f -mtime -1
```

你可以使用  `-delete`  参数同步删除搜索到的文件。比如，下面的命令会删除最近 24 小时编辑的文件：

```bash
find . -type f -mtime -1 -delete
```

你还可以在每个搜索结果上同时运行某个命令。在这里，我们运行  `cat`  来输出搜索到的文件的内容：

```bash
find . -type f -exec cat {} ;
```

请注意结尾的  `;` 。 命令执行时，搜索结果中的文件名会被自动填入花括号  `{}` 。
