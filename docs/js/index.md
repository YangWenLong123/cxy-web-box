#### 介绍

-   基本数据类型：在内存中占据固定大小，直接存储在栈内存中的数据。基本数据类型是按值访问的，可以直接操作保存在变量中的实际值。当我们对基本数据类型进行复制时，会在内存中创建一个新的值，然后把这个新值复制到新的变量中[[0]](https://juejin.cn/post/7196059552122273848)[[1]](https://blog.csdn.net/weixin_41646716/article/details/81700761)[[2]](http://c.biancheng.net/view/9340.html).
-   引用数据类型：指的是那些保存在内存中的对象。JavaScript中的引用类型是按引用访问的，为了操作对象，实际上是在操作对象的引用而非实际的对象。在复制引用类型时，复制的是指向存储在堆中的对象的指针。因此，两个变量实际上是引用了同一个对象，而不是像复制基本类型一样复制了一个新值[[0]](https://juejin.cn/post/7196059552122273848)[[1]](https://blog.csdn.net/weixin_41646716/article/details/81700761)[[2]](http://c.biancheng.net/view/9340.html).

| 类型                                      | 说明                                                                      | 数据类型   |
| --------------------------------------- | ----------------------------------------------------------------------- | ------ |
| null                                    | 表示一个空对象指针，typeof null返回"object"，这是一个历史遗留问题。                             | 基本数据类型 |
| undefined                               | 表示未定义或不存在的值，当变量未初始化或者对象没有这个属性时返回undefined，typeof undefined返回"undefined" | 基本数据类型 |
| boolean                                 | 表示布尔值，true和false                                                        | 基本数据类型 |
| number                                  | 表示数字，包括整数和浮点数，使用IEEE-754标准来表示浮点数，因此在进行浮点数运算时可能会出现精度误差                   | 基本数据类型 |
| string                                  | 表示字符串，使用UTF-16编码，可以使用单引号、双引号或反引号来表示                                     | 基本数据类型 |
| symbol                                  | 表示唯一的标识符，使用Symbol函数创建                                                   | 基本数据类型 |
| BigInt                                  | 解决整数溢出                                                                  | 基本数据类型 |
| object(Function、Array、Date(),RegExp()等) | 指的是那些保存在内存中的对象                                                          | 引用数据类型 |

#### BigInt

BigInt数据类型的目的是比Number数据类型支持的范围更大的整数值.在对大整数执行数学运算时，以任意精度表示整数的能力尤为重要,使用BigInt，整数溢出将不再是问题.

最大整数: Number.MAX_SAFE_INTEGER -> 9007199254740991

最小整数: Number.MIN_SAFE_INTEGER -> -9007199254740991

创建：BigInt("9007199254740995"); // → 9007199254740995n

``` js
//不使用BigInt返回结果是异常的
9007199254740992 === 9007199254740993   true

//使用BigInt返回结果是正常的
9007199254740992n === 9007199254740993n  false
```

#### 类型判断

typeof：可以对基本类型作出准确的判断，但是对于引用类型，就不是很友好了。在对于引用类型返回的都是object.

``` js
typeof 1												'number'
typeof '1'											'string'
typeof true											'boolean'
typeof {}												'object'
typeof undefined								'undefined'
typeof function () {}						'function'
typeof Symbol('id')							'symbol'
typeof null											'object'
typeof BigInt										'function'
```

Object.prototype.toString.call()，这个方法是万能的，不会有太多限制，在IE6下，undefined和null均为Object.

``` js
function typeOf(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

// 测试
console.log(typeOf(1)); // Number
console.log(typeOf("1")); // String
console.log(typeOf(true)); // Boolean
console.log(typeOf(null)); // Null
console.log(typeOf(undefined)); // Undefined
console.log(typeOf(Symbol(1))); // Symbol
console.log(typeOf({})); // Object
console.log(typeOf([])); // Array
console.log(typeOf(function () {})); // Function
console.log(typeOf(new Date())); // Date
console.log(typeOf(new RegExp())); // RegExp
```

#### 特殊类型数据判断

-   语法：obj instanceof Type
-   功能：判断 obj 是不是 Type 类的实例，只可用来判断引用数据
-   实现思路： Type 的原型对象是否是 obj 的原型链上的某个对象
-   注意：右操作数必须是函数或者 class

``` js
if(data instanceof ArrayBuffer){
  // 判断 ArrayBuffer 对象
}

if(data instanceof Blob){
  // 判断 Blob 对象
}
```

-   实现instanceof方法

``` js
function myInstanceof(Fn, obj) {
  // 获取该函数显示原型
  const prototype = Fn.prototype;
  // 获取obj的隐式原型
  let proto = obj.__proto__;
  // 遍历原型链
  while (proto) {
    // 检测原型是否相等
    if (proto === prototype) {
      return true;
    }
    // 如果不等于则继续往深处查找
    proto = proto.__proto__;
  }
  return false;
}
```

#### 总结

基本类型一般用typeof(), 引用类型用Object.prototype.toString.call().