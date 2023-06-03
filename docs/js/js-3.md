#### 声明变量

在 JavaScript 中，变量是用于存储信息的“容器”。变量的值可以重复赋值，最后的赋值是变量的最终结果。JavaScript 允许变量被重复声明，但是重复声明会被跳过，不再执行声明的操作。变量名称必须以字母开头，也可以使用 $ 和 _ 符号开头（不过不推荐这么做），变量名称对大小写敏感。

声明变量有三种方式

| 关键字                                                                                         | 声明                           | 说明                     |
| ------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------- |
| [var](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)     | var a = 1;                   | 声明一个变量，可选初始化一个值        |
| [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)     | let x = 22;                  | 声明一个块作用域的局部变量，可选初始化一个值 |
| [const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) | const y = { sex: 'ZhangXX' } | 声明一个块作用域的只读常量          |

#### 变量赋值

用var和let语句声明的变量，如果没有初始赋值，则值为undefined;

``` js
console.log(a, b);	//undefined undefined
var a;
var b;

a = 1;
b = 2;

console.log(a, b);	//1 2
```

用const声明变量必须要赋值，不然会抛出异常

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f07c07e493e54450ae2e9cbf0648a768~tplv-k3u1fbpfcp-zoom-1.image)

如果访问一个未声明的变量会抛出一个异常

``` js
var a = 1;
console.log(b);	//b is not defined
```

#### 变量作用域

-   JavaScript中有两种作用域类型：局部作用域和全局作用域，每个函数创建一个新的作用域。
-   JavaScript采用静态作用域，即在定义时确定了变量作用域的范围，而不是在运行时确定。
-   JavaScript中可以声明块级作用域的方式有两种：let和const。
-   JavaScript的变量有三种生命期：全局变量、局部变量和闭包变量。
-   闭包是指函数可以访问其声明所在的词法

``` js
if (true) {
  var x = 5;
}
console.log(x); // 5

------------------------等同---------------------------

var x = undefined;

if(true) {
	x = 5;
}
console.log(x); // 5
```

```js
if (true) {
  let y = 5;
}
console.log(y); // ReferenceError: y is not defined
```

#### 为什么存在变量提升

JavaScript引擎在读取JavaScript代码时分为两个步骤。第一步是解析读取整个JavaScript代码，第二步是执行代码。在执行JavaScript代码之前，浏览器的解析器会将变量名和整个函数提升到当前作用域的最前面。这就是所谓的变量提升和函数提升。

在编译阶段，JS引擎会扫描整段代码并将所有变量和函数声明添加到名为“词法环境”的JavaScript数据结构中。在词法环境中，函数声明优先于变量声明，因此函数提升优先级比变量提升要高。

####

#### 变量提升

在ECMAScript5中var声明变量会存在变量提升.

```js
/**
 * 例子 1
 */
console.log(x === undefined); // true
var x = 3;


/**
 * 例子 2
 */
var myvar = "my value";

console.log(myvar);	//my value

(function () {
  var myvar;
  console.log(myvar);		//undefined 存在独立的作用域
  myvar = "local value";
  console.log(myvar);	//local value
})();
```

在ECMAScript6中let和const声明的变量不会被提升，但是存在暂时性死区，直到这个变量被声明为止.

```js
console.log(x);	//ReferenceError: Cannot access 'x' before initialization

let x = 1;
```

####

#### 函数变量提升

函数提升只针对具名函数，而对于赋值的匿名函数，并不会存在函数提升。

```js
console.log(Fn);	//	[Function: Fn]
console.log(Fb);	// undefined

function Fn() {
  console.log('a');
}

var Fb = function () {
  console.log('b');
}
```

####

#### 变量提升和函数提升的优先级

上面说到函数的提升是优于变量提升的, 所以在函数和变量命名时，尽量避免命名冲突的问题。

```js
console.log(Fn);	//	[Function: Fn]

function Fn() {
  console.log('a');
}

var Fn = 1;
```

#### 字面量

在 JavaScript 中，你可以使用各种字面量。这些字面量是脚本中按字面意思给出的固定的值，而不是变量。（译注：字面量是常量，其值是固定的，而且在程序脚本运行中不可更改，比如false，3.1415.

-   数组字面量：数组字面值是一个封闭在方括号对 ([]) 中的包含有零个或多个表达式的列表，其中每个表达式代表数组的一个元素

```js
var coffees = ["French Roast", "Colombian", "Kona"];

var a=[3];

console.log(a.length); // 1

console.log(a[0]); // 3
```

-   数组字面量中的多余逗号：这个数组中，有两个已被赋值的元素，和一个空元素（fish[0] 是"Lion"，fish[1] 是 undefined，而 fish[2] 是"Angel"；译注：此时数组的长度属性 fish.length 是 3)。

```js
var a = [1, , 2];

console.log(a);	//	[ 1, <1 empty item>, 2 ]
```

-   布尔字面量： true和false
-   数字字面量

整数可以用十进制（基数为 10）、十六进制（基数为 16）、八进制（基数为 8）以及二进制（基数为 2）表示。

十进制整数字面量由一串数字序列组成，且没有前缀 0。

八进制的整数以 0（或 0O、0o）开头，只能包括数字 0-7。

十六进制整数以 0x（或 0X）开头，可以包含数字（0-9）和字母 a~f 或 A~F。

二进制整数以 0b（或 0B）开头，只能包含数字 0 和 1。

严格模式下，八进制整数字面量必须以 0o 或 0O 开头，而不能以 0 开头。

```js
0, 117 and -345 (十进制，基数为 10)
015, 0001 and -0o77 (八进制，基数为 8)
0x1123, 0x00111 and -0xF1A7 (十六进制，基数为 16 或"hex")
0b11, 0b0011 and -0b11 (二进制，基数为 2)
```

-   浮点数字面量

浮点数字面值可以有以下的组成部分：

一个十进制整数，可以带正负号（即前缀“+”或“ - ”），

小数点（“.”），

小数部分（由一串十进制数表示），

指数部分。

```js
3.14
-.2345789 // -0.23456789
-3.12e+12  // -3.12*10^12
.1e-23    // 0.1*10^(-23)=10^(-24)=1e-24
```

-   对象字面量

```js
var car = { manyCars: {a: "Saab", "b": "Jeep"}, 7: "Mazda" };

console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda
```

对象属性名字可以是任意字符串，包括空串。如果对象属性名字不是合法的 javascript 标识符，它必须用""包裹。属性的名字不合法，那么便不能用。访问属性值，而是通过类数组标记 ("[]") 访问和赋值。

```js
var unusualPropertyNames = {
  "": "An empty string",
  "!": "Bang!"
}
console.log(unusualPropertyNames."");   // 语法错误：Unexpected string
console.log(unusualPropertyNames[""]);  // An empty string
console.log(unusualPropertyNames.!);    // 语法错误：Unexpected token !
console.log(unusualPropertyNames["!"]); // Bang!
```

-   RegExp字面量

```js
var re = /ab+c/;
```

-   字符串字面量

```js
var str = 'abc';
```