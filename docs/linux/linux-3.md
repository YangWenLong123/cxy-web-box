## Linux 中的 ls 命令

在文件夹内，你可以使用 ls 命令列出其中包含的全部文件：

```bash
ls
```

例：
```bash
yangwenlongdeMacBook-Pro:Desktop yangwenlong$ ls
FS-backend		images			o.png
FS-frontend-client	j.png			test
FS-frontend-platform	k.png			umi
along			l.png			微临
gitee			m.png
github			newTest
```


如果你在后面加上别的文件夹名字或者路径，它就会列出那个文件夹的内容：


```bash
ls Desktop/
```
例:

```bash
yangwenlongdeMacBook-Pro:~ yangwenlong$ ls Desktop/
FS-backend		images			o.png
FS-frontend-client	j.png			test
FS-frontend-platform	k.png			umi
along			l.png			微临
gitee			m.png
github			newTest
```


<br/>

`ls` 支持很多参数。我喜欢的其中一个是 `-al` 。试试看

```bash
yangwenlongdeMacBook-Pro:~ yangwenlong$ ls -al
total 10240
drwxr-xr-x+  87 yangwenlong  staff     2784  8  3 09:07 .
drwxr-xr-x    5 root         admin      160  6 18 20:42 ..
-rw-r--r--    1 yangwenlong  staff    40048  5 12 09:50 .7d9b55297a162003a6d46e85fb151995daed6138
-r--------    1 yangwenlong  staff        9  2 29  2020 .CFUserTextEncoding
-rw-r--r--@   1 yangwenlong  staff    12292  7 13 10:15 .DS_Store
drwx------+ 169 yangwenlong  staff     5408  8  4 15:06 .Trash
drwxr-xr-x    5 yangwenlong  staff      160  4 20 15:52 .TrojanX
drwxr-x---    4 yangwenlong  staff      128  3  2  2020 .android
drwxr-xr-x    3 yangwenlong  staff       96 12 28  2020 .aspnet
-rw-r--r--    1 yangwenlong  staff   317449 11 13  2020 .babel.json
-rw-------@   1 yangwenlong  staff     6119  8  4 15:40 .bash_history
-rw-r--r--@   1 yangwenlong  staff      642  6 26 16:43 .bash_profile
-rw-r--r--    1 yangwenlong  staff      393 12  8  2022 .bash_profile.pysave
-rw-r--r--    1 yangwenlong  staff    12288  6 26 16:39 .bash_profile.swl
```

与常规的 ls 命令相比，这会返回更多的信息。

你可以看到（从左至右）：

- 文件权限（如果你的系统支持 ACL，这里也会有一个 ACL 标识）
- 链接到该文件的数量
- 该文件的所有者
- 该文件的用户组
- 文件大小（单位为字节）
- 文件最后的修改日期
- 文件名

这串数据是由 l 参数产生的，而 a 参数则用来包含被隐藏的文件。

隐藏文件的文件名通常以英文句号（ . ）开头。