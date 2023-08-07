##  Linux 中的 cp 命令

cp 命令可以用来`复制文件`

```bash
mkdir a && cd a
touch a.js
cp a.js b.js
```

首先创建a文件夹并进入到a文件夹，创建`a.js`文件, 然后复制`a.js`文件命名为`d.js`；


要复制整个文件夹，可以添加 -r 参数来递归复制那个文件夹的内容：

```bash
cp -r b bb
```