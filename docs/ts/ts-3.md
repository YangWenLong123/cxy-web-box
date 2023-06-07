-   JavaScript 的类型分为两种：原始数据类型（[Primitive data types](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)）和对象类型（Object types）
-   原始数据类型包括：[Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)、[Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)、[String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[null](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)、[undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)和ES6新增的[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)与[BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

## 布尔值

```js
const bool: boolean = true;
```

注意,使用构造函数创建的对象不是布尔值，事实上，new Boolean()返回的是一个Boolean对象

```js
var isObjDone: boolean = new Boolean(1);

// Type 'Boolean' is not assignable to type 'boolean'.
//   'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
```

直接调用Boolean也可以返回一个布尔类型

```js
var isObjDone: boolean = Boolean(1);//true
```

结论：在ts中，boolean是Javascript中的基本类型，而Boolean是Javascript中的构造函数.其它类型一致。

## 数值

使用number类型定义

```js
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

编译结果，其中0b1010和0o744分别是二进制和八进制，会被编译成十进制。

```js
var decLiteral = 6;
var hexLiteral = 0xf00d;
// ES6 中的二进制表示法
var binaryLiteral = 10;
// ES6 中的八进制表示法
var octalLiteral = 484;
var notANumber = NaN;
var infinityNumber = Infinity;
```

## 字符串

和javascript中字符串基本一致，只是在定义上有所区别。

```js
const str: string = '字符串';
```

## 空值

-   JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数：

```js
function fn(): void{
	console.log('我是一个没有返回值的函数');
}
```

-   声明一个void类型的变量，只能将它赋值为undefined和null

js```
```
const vo: void = undefined;
const nu: void = null;
```

## Null和undefined

-   在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型：

```js
const u: undefined = undefined;
const n: null = null;
```

-   与void的区别是null和undefined是所有类型的子类型


```js
const num: number = undefined;	//这样写不会报错——测试还有有报错提示
```

-   也可以这样去写

```js
const n: undefined
const m: number = n;

n //undefined
m //undefined
n === m //true
```

## 测试用例

```js
let debug:boolean = true;
let flag:boolean = true;
let number:number = 1;
let str:string = '1';
let vd:void = undefined;//void空值只可以赋值给undefined和null
let u:undefined = undefined;
let n:null = null;

debug && console.log({
  flag: flag,
  number: number,
  str: str,
  void: vd,
  u: u,
  n: u
});

-----------------------------------------------------------------------------------

{
  flag: true,
  number: 1,
  str: '1',
  void: undefined,
  u: undefined,
  n: undefined
}
```

## 参考

<https://www.bookstack.cn/read/TypeScript/24.md>

<https://ts.xcatliu.com/basics/primitive-data-types.html>