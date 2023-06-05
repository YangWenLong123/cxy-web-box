#### 前言

小杨同学刚入职一家公司，刚接到第一个需要，是几个表单校验，感觉很简单，很快写下了几个函数：

```js
function checkName () {}
function checkEmail () {}
function checkPassword () {}
```

团队其它成员看到后，摇了摇头，说到：你怎么创建这么多全局变量，小杨说到，没有呀，我只是写了几个函数

#### 函数的另外一种形式

上面的写法等同于下面，只不过是换了一种写法。

```js
var checkName = function () {}
var checkEmail = function () {}
var checkPassword = function () {}
```

#### 用对象收编变量

这种写法就会只创建一个全局变量，调用方法只要checkObject.checkName()

```js
var checkObject = {
    checkName: function () {},
    checkEmail: function () {},
    checkPassword: function () {}
}
```

#### 对象的另外一种形式

这种是声明一个对象，在原型上添加方法，调用方法只要checkObject.checkName()，但是这个对象是唯一的，不能进行复制

```js
function checkObject () {}

checkObject.prototype.checkName = function () {}
checkObject.prototype.checkEmail = function () {}
checkObject.prototype.checkPassword = function () {}
```

#### 真假对象

这种写法是当别人每次调用，都会返回新的对象。

```js
var checkObject = function () {
    return {
        checkName: function () {},
        checkEmail: function () {},
        checkPassword: function () {},
    }
}

var a = checkObject();
a.checkName()
```

#### 类

```js
var checkObject = function () {
    this.checkName = function () {}
    this.checkEmail = function () {}
    this.checkPassword = function () {}
}

var a = new checkObject();
a.checkName();
```

#### 链式调用写法

```js
var checkObject = {
    checkName: function () {
        return this;
    },
    checkEmail: function () {
        return this;
    },
    checkPassword: function () {
        return this;
    }
}
checkObject.checkName().checkEmail().checkPassword();
```

#### 类链式调用写法

```js
var checkObject = function () {};

checkObject.prototype = {
    checkName: function () {
        return this;
    },
    checkEmail: function () {
        return this;
    },
    checkPassword: function () {
        return this;
    }
}

var a = new checkObject();

a.checkName().checkEmail().checkPassword();
```

#### 函数的祖先

直接在函数的原型上添加方法，这里是抽象出一个统一的添加方法功能。

```js
Function.prototype.addMethods = function (name, fn) {
    this[name] = fn;
}

var f = new Function();

f.addMethods('checkName', function () {
    console.log('1')
})

f.checkName();
```

那么这种方法可以链式添加么，改造如下:

```js
Function.prototype.addMethods = function (name, fn) {
    this[name] = fn;
    return this;
}

var f = new Function();

f.addMethods('checkName', function () {
    return this;
}).addMethods('checkEmail', function () {
    return this;
})

f.checkName().checkEmail();
```

#### 思考

可以看到，一个简单需求的解决方案，可以演变出许多的写法，到底哪种方法对我们来说才是最好的选择，才能在设计上达到最好的效果?