## 介绍

.gitignore 文件是一个文本文件，它告诉 Git 要忽略项目中的哪些文件或文件夹。这个文件通常被放置在项目的根目录中。你还可以创建一个全局 .gitignore 文件，该文件中的所有条目都会在你所有的 Git 仓库中被忽略。

.gitignore文件的作用就是帮助我们在git add时将我们指定的一些文件自动排除在外，不提交到git当中

一个基本的 .gitignore 文件配置如下

```js
# 排除所有.开头的隐藏文件
.*

# 排除所有.class文件:
*.class

# 不排除.gitignore和App.class:
!.gitignore
!App.class

# 忽略指定文件夹下文件
node_modules/
dist/

*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

tests/**/coverage/
tests/e2e/reports
selenium-debug.log

# Editor directories and files

.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.local

```

在 GitHub 中有一个仓库已经为我们总结了各种情况下 .gitignore 文件的配置方式，我们只需要按需组合，并加以修改就可以使用了。所有配置文件可以直接在线浏览： https://github.com/github/gitignore/tree/main。


## 忽略文件

忽略文件的原则是：

忽略操作系统自动生成的文件，比如缩略图等；
忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；

忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。


有些时候，你想添加一个文件到Git，但发现添加不了，原因是这个文件被.gitignore忽略了：

```json
$ git add App.class
The following paths are ignored by one of your .gitignore files:
App.class
Use -f if you really want to add them.
```
如果你确实想添加该文件，可以用`-f`强制添加到Git：

```json
$ git add -f App.class
```


## 在线生成gitignore

https://gitignore.itranswarp.com/