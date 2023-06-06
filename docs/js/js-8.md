## 前言

JavaScript 函数是一个基本组件，是一组执行任务或计算值的语句。在 JavaScript 中，每个函数都是一个 Function 对象。函数通过 function 关键字定义，后面跟着函数名和圆括号。圆括号中可以包括由逗号分隔的参数。由函数执行的代码被放置在花括号中。

```js
function name(参数 1, 参数 2, 参数 3) {
    要执行的代码
}
```

## 函数声明

-   function声明函数

```js
function functionName (parameters) {
    // 执行的代码
}
```

-   函数表达式(匿名函数)

```js
var functionName = function (parameters) {
    // 执行的代码
};
```

-   Function() 构造函数

```js
var functionName = new Function('parameters', '...','functionBody');
```

-   箭头函数

```js
(parameters) => {
    // 执行的代码
};
```

-   方法(定义在对象的函数上)

```js
var objectName = {
    functionName: function (parameters) {
        // 执行的代码
    }
};
```

## 函数参数的数量

JavaScript 函数的行参数量是指在函数定义时声明的参数个数。在 JavaScript 中，函数可以有零个或多个参数，这些参数用逗号分隔，放在函数名后的一对圆括号内

```js
function Fn (a,b,c) {
  Fn.length	//3   形参
  arguments.length  //3 实参
};

function Fn (a = 1,b,c) {
  Fn.length	//0
};


function Fn (a,b=1,c) {
  Fn.length	//1
};

function Fn (a,b,c=2) {
  Fn.length	//2
};
```

## Function.name

返回函数声明的名称

```js
function Fn(){};
Fn.name	//Fn

  (new Function).name	//使用new Function(...)创建的函数都返回‘anonymous’

const Fn = function () {};
Fn.name	//Fn
```

## Function.arguments

arguments 是一个对应于传递给函数的参数的类数组对象。

arguments对象是所有（非箭头）函数中都可用的局部变量（箭头函数是没有arguments）

```js
//在函数内部转化为数组
function fn (a,b,c) {
    var args = Array.prototype.slice.call(arguments);
    var arg = [].slice.call(arguments);
    var arr = Array.from(arguments);
    var arrs = [...arguments];
    console.log(args,arg,arr,arrs,arguments);
    //args [1,2,3]
    //arg [1,2,3]
    //arr [1,2,3]
    //arrs [1,2,3]
    //arguments { '0': 1, '1': 2, '2': 3 }
}
fn(1,2,3);
```

## Function.caller()

-   指向当前对象

```js
let num = [1,2,3,4,5].map(function (n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});

//[1,2,6,24,120]
```

##

##

##

##

##

##