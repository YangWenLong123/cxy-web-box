## 介绍

JavaScript是一种动态类型语言，这意味着你在声明变量时可以不必指定数据类型，而数据类型会在代码执行时会根据需要自动转换。因此，你可以按照如下方式来定义变量：var answer = 42;，然后，你还可以给同一个变量赋予一个字符串值，例如：answer = "Thanks for all the fish..."。因为JavaScript是动态类型的，这种赋值方式并不会提示出错。 [[3]](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_Types)

JavaScript的类型转换只有三种类型的转换，即原始数据类型（string、number、boolean、undefined、null）和引用数据类型（object）转换为string、boolean、number的类型转换。在这三种类型转换中，分为两大块：显式类型转换和隐式类型转换。其中，显式类型转换是隐式类型转换的基础，隐式类型转换就是在某些场景下隐式地按照显式类型转换的规则类型转换，所以着重掌握显式类型转换的机制，然后再记住哪些场景会触发隐式类型转换即可。 [[2]](https://juejin.cn/post/7047524999774601224)

## 显示类型强制转换

| Number()  | 转为number类型 | Number('1') === 1Number(true) === 1      |
| --------- | ---------- | ---------------------------------------- |
| String()  | 转为number类型 | String(1) === '1'String(true) === 'true' |
| Boolean() | 转为布尔类型     | Boolean(1) === trueBoolean(0) === false  |

## 转换函数

| parseInt   | 转为整数     | parseInt('2.2') === 2         |
| ---------- | -------- | ----------------------------- |
| parseFloat | 转为浮点数，如下 | parseFloat(" 3.14 ") === 3.14 |

``` js
parseFloat("3.14"); // returns 3.14
parseFloat("  3.14  "); // returns 3.14
parseFloat("314e-2"); // returns 3.14
parseFloat("0.0314E+2"); // returns 3.14
parseFloat("3.14some non-digit characters"); // returns 3.14
parseFloat({ toString: function() { return "3.14" } }); // returns 3.14
```

## 隐式类型转换

在JavaScript中，隐式类型转换主要涉及三种转换，即将值转为原始值（ToPrimitive()）、将值转为数字（ToNumber()）和将值转为字符串（ToString()）[[1]](https://juejin.cn/post/7003341595751743524)。其中，ToPrimitive()函数是将值转换为原始值的一个抽象操作，其签名为ToPrimitive(input, PreferredType)，其中input是要转换的值，PreferredType是可选参数，仅可以是Number或String类型。ToPrimitive()函数只是一个转换标志，转换后的结果并不一定是这个参数值的类型，但是转换结果一定是一个原始值（或者报错）[[1]](https://juejin.cn/post/7003341595751743524)。示例：

``` js
var obj = {
  valueOf: function() {
    return 10;
  }
};
console.log(obj + 20); // 30
```

``` js
4 - '1' === 3
```

``` js
1 + '3' === 13
```

有几种方法可以在JavaScript中执行隐式转换

``` js
//+运算符可用于将字符串转换为数字
+'42' === 42  //true

//比较运算中会把一个值的类型转换成另外一个值的类型
1 == '1'  //true

1 === '1' //false 不会发生类型转换

//条件语句  'hello'会被转换为布尔值true  null被当作false
if('hello') {}
if(null) {}

//null在数值类型会被当作0
null * 32 === 0 // true
```