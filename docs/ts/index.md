# 为什么学习TypeScript

我们来看一个简单的例子

JavaScript 的相等运算符 ( ==)强制转换其参数，导致意外行为：

```js
if('' == 0) {
	// TODO
}

if(1 < x < 3) {
  // True for *any* value of x!
}
```

JavaScript 还允许访问不存在的属性：

```js
const obj = { width: 10, height: 15 };
// Why is this NaN? Spelling is hard!
const area = obj.width * obj.heigth;
```

但是在运行的时候并不会抛出错误，只有在编译的时候才会抛出错误，所以JavaScript也被叫作动态语言。

# 静态类型检查器-TypeScript

我们之前说过，有些语言根本不允许那些有缺陷的程序运行。在不运行代码的情况下检测代码中的错误称为静态检查。根据正在操作的值的种类来确定什么是错误，什么不是错误，这被称为静态类型检查。

TypeScript 在执行前检查程序是否有错误，并根据值的种类进行检查，它是一个静态类型检查器。例如，上面的最后一个例子因为obj. 这是 TypeScript 发现的错误：

```js
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
Property 'heigth' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?
```

# Ts与Js的区别

[TypeScript](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2F) 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。 -- 官方文档

说人话就是 TS 拓展了 JS 的一些功能，解决了 JS 的一些缺点，可以总结在下面的表格里，

| TypeScript                    | JavaScript       |
| ----------------------------- | ---------------- |
| JavaScript 的超集，用于解决大型项目的代码复杂性 | 一种脚本语言，用于创建动态网页。 |
| 强类型，支持静态和动态类型                 | 动态弱类型语言          |
| 可以在编译期间发现并纠正错误                | 只能在运行时发现错误       |
| 不允许改变变量的数据类型                  | 变量可以被赋予不同类型的值    |

关于强类型、弱类型、静态类型和动态类型语言，可以看我的[这篇文章](https://juejin.cn/post/6844903933463232519)。

用一张图来描述一下 TS 和 JS 的关系，

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e7cd2fef6044e1db276db0561a24bb5~tplv-k3u1fbpfcp-zoom-1.image)

JS 有的， TS 都有， JS 没有的， TS 也有，毕竟 TS 是 JS 的超集嘛。

TS 的缺点：

-   不能被浏览器理解，需要被编译成 JS
-   有学习成本，写习惯了 JS 的我们要上手需要花时间去理解，而且 TS 中有一些概念还是有点难，比如泛型。