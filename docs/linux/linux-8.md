## Linux 中的 mv 命令
当你有一个文件时，你可以用 mv 命令移动它。只需要指定文件的当前路径和新路径：

```bash
mkdir a b

mv b a
```

新创建两个文件夹`a`和`b`，把`b`文件夹移动到`a`文件夹.


移动一组文件夹。将多个文件夹移动到一个文件夹中，这些文件会被移动到最后一个路径中

```bash
mkdir a b c

mv b c a
```

b和c两个文件夹会被移动到a文件夹下。