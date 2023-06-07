## 方案一

思路：备份代码，删除当前仓库，重新创建一个新的仓库，把代码push过去.(傻瓜式做法)

## 方案二

思路：创建一个新分支，把master分支的文件全部添加到新分支中，然后删除其余所有的分支，再把新分支命名为master，从而清楚之前的所有记录.

新建并切换分支到new_master

```js
git checkout --orphan new_master
```

添加并提交文件到new_master分支

```js
git add -A

git commit -a '清楚历史版本'
```

删除master和其他仓库

```js
git branch -a 查看远程所有分支

git branch -D master
...
```

new_master重新命名

```js
git branch -m master
```

强制推送代码

```js
git push -f origin master
```

方案三

可以尝试把里面的大文件删掉。下面是具体的操作方法：

1. 运行 `gc` ，生成 `pack` 文件（后面的 `--prune=now` 表示对之前的所有提交做修剪，有的时候仅仅 `gc` 一下`.git` 文件就会小很多）

```js
$ git gc --prune=now
```

2. 找出最大的三个文件（看自己需要）

```js
$ git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -3
# 示例输出：
#1debc758cf31a649c2fc5b0c59ea1b7f01416636 blob   4925660 3655422 14351
#c43a8da9476f97e84b52e0b34034f8c2d93b4d90 blob   154188651 152549294 12546842
#2272096493d061489349e0a312df00dcd0ec19a2 blob   155414465 153754005 165096136
```

3. 查看那些大文件究竟是谁（`c43a8da` 是上面大文件的`hash`码）

```js
$ git rev-list --objects --all | grep c43a8da
# c43a8da9476f97e84b52e0b34034f8c2d93b4d90 data/bigfile
```

4.移除对该文件的引用（也就是 `data/bigfile`）

```js
$ git filter-branch --force --index-filter "git rm --cached --ignore-unmatch 'data/bigfile'"  --prune-empty --tag-name-filter cat -- --all
```

5.进行 `repack`

```js
$ git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin
$ git reflog expire --expire=now --all
$ git gc --prune=now
```

6.查看 `pack` 的空间使用情况

```js
$ git count-objects -v
```

-   <https://zhuanlan.zhihu.com/p/100896546>