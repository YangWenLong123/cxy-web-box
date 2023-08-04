## package.json
在项目根目录`package.json`文件中有两个配置项为：

- `dependencies`: 项目的生产环境依赖。存放项目在生产环境中需要的第三方包。
- `devDependencies`: 项目的开发环境依赖。存放项目在开发过程中需要的第三方包。

## devDependencies
开发环境下的包一般使用`npm install PackageName -D`或者`npm install PackageName --save-dev`,它们作用都是一样的.

```js
  npm install qs -D
  npm install qs --save--dev
```

安装成功后会在`devDependencies`对象下显示

```js
"devDependencies": {
    "qs": "^6.11.2"
  },
```

## dependencies
生产环境下的包一般使用`npm install PackageName -S`或者`npm install PackageName --save`,它们作用都是一样的.

```js
  npm install qs -S
  npm install qs --save
```

安装成功后会在`dependencies`对象下显示

```js
"dependencies": {
    "qs": "^6.11.2"
  },
```

## npm i
`npm i`是`npm install`的简写,它默认将包安装为生产环境依赖

```js
  npm i qs
```

会安装在生产环境`dependencies`字段下
```js
"dependencies": {
    "qs": "^6.11.2"
  },
```


## npm -g
安装到全局环境下，可以在任何地方使用，会被本地安装覆盖。


## 如何确定插件安装到生产还是开发？

- 生产环境插件：项目运行必须依赖的插件
- 开发环境插件：项目依赖的一些第三方工具库


## package.json中的^和～区别
在package.json文件中，我们经常会看到版本号前面带有`^（caret）`或`~（tilde）`符号，它们在指定依赖包的版本时有一些区别：

- 使用~（tilde）：在版本号前加上~表示只接受后续的补丁版本更新，而不接受主版本或次版本的更新。例如，如果指定依赖的版本号为~1.0.2，那么在安装或更新依赖包时，只会接受1.0.2版本的后续补丁版本，比如1.0.4。
- 使用^（caret）：在版本号前加上^表示接受后续的次版本和补丁版本更新，但不接受主版本的更新。例如，如果指定依赖的版本号为^1.0.2，那么在安装或更新依赖包时，会接受1.0.2版本的后续次版本和补丁版本，比如1.1.0。

举个例子来说明：

假设我们在项目中使用了lodash包，并且当前安装的版本是3.8.0。当lodash发布了一个新版本3.9.0时，
```
"dependencies": {
    "lodash": "~3.8.0"
}
```
如果我们使用~表示只接受补丁版本的更新，那么在更新依赖包时，lodash不会被更新。为了接受这个新版本，我们需要将~改为^：
```
"dependencies": {
    "lodash": "^3.8.0"
}
```
这样就可以接受3.8.0版本的后续次版本和补丁版本的更新。

需要注意的是，使用`*`表示接受所有版本，但这不是推荐的做法，因为它会接受主版本的更新，可能导致代码的破坏。