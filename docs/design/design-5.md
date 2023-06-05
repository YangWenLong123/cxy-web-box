#### 前言

暴露模块模式来自于，Heilmann 对这样一个现状的不满，即当我们想要在一个公有方法中调用另外一个公有方法，或者访问公有变量的时候，我们不得不重复主对象的名称。他也不喜欢在模块模式中，当想要将某个成员变成公共成员时，必须使用对象字面量表示法。

他的努力的结果是一个更新的模式，在这个模式中，我们只需在私有范围内定义所有的函数和变量，然后返回一个匿名对象，该对象带有指向我们希望公开为公共的私有功能的指针。

#### 例子

```js
var myRevealingModule = function () {

    var privateCounter = 0;

    function privateFunction() {
        privateCounter++;
    }

    function publicFunction() {
        publicIncrement();
    }

    function publicIncrement() {
        privateFunction();
    }

    function publicGetCount(){
        return privateCounter;
    }

    // 将暴露的公有指针指向到私有函数和属性上

    return {
        start: publicFunction,
        increment: publicIncrement,
        count: publicGetCount
    };

}();

myRevealingModule.start();
```

#### 优点

该模式可以使脚本语法更加一致。在模块的最后，它也会很容易指出哪些函数和变量可以被公开访问，从而改善可读性。

#### 缺点

该模式的一个缺点是：如果一个私有函数引用一个公有函数，在需要打补丁时，公有函数是不能被重载的。因为私有函数仍然使用的是私有的实现，并且这个模式不能用于公有成员，只用于函数。

引用私有变量的公有对象成员也遵守无补丁规则。

因为上面的原因，使用暴露式模块模式创建的模块相对于原始的模块模式更容易出问题，因此在使用的时候需要小心。