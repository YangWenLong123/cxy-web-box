#### 前言

模块是任何健壮的应用程序体系结构不可或缺的一部分，特点是有助于保持应用项目的代码单元既能清晰地分离又有组织。

在JavaScript中，实现模块有几个选项，他们包括：

-   -   模块化模式
    -   对象表示法
    -   AMD模块
    -   CommonJS 模块
    -   ECMAScript Harmony 模块

#### 简单案例实现模块模式

```js
var module = (function () {
    var count = 0;

    return {
        incrementCounter: function () {
            return count = count + 1;
        },
        resetCounter: function () {
            return count = 0;
        }
    }
})();

module.incrementCounter();
module.resetCounter();
```

#### 模块导出

这个变体允许我们声明全局对象而不用使用它们，同样也支持在下一个例子中我们将会看到的全局导入的概念。

工具箱和框架特定的模块模式实现。

```js
var myModule = (function () {
    var module = {};

    module.name = 'along';
    module.method = function () {
        console.log(methods, 'methods');
    }

    return module;
})();

myModule//{ name: 'along', method: [Function] }
```