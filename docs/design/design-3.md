#### 前言

在面向对象编程中，构造器是一个当新建对象的内存被分配后，用来初始化该对象的一个特殊函数。在JavaScript中几乎所有的东西都是对象，我们经常会对对象的构造器十分感兴趣。

对象构造器是被用来创建特殊类型的对象的，首先它要准备使用的对象，其次在对象初次被创建时，通过接收参数，构造器要用来对成员的属性和方法进行赋值。

#### 创建对象的几种方式

```js
var newObject = {};

// or
var newObject = Object.create( null );

// or
var newObject = new Object();
```

```ks
//设置属性
newObject.someKey = "Hello World";

newObject['someKey'] = 'Hello World';

Object.defineProperty(obj, 'a', {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
})

//获取属性
newObject.someKey
newObject['someKey']
```

####

#### 基础构造器

正如我们先前所看到的，Javascript不支持类的概念，但它有一种与对象一起工作的构造器函数。使用new关键字来调用该函数，我们可以告诉Javascript把这个函数当做一个构造器来用,它可以用自己所定义的成员来初始化一个对象。

在这个构造器内部，关键字this引用到刚被创建的对象。回到对象创建，一个基本的构造函数看起来像这样:

```js
function Car( model, year, miles ) {

  this.model = model;
  this.year = year;
  this.miles = miles;

  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}

// 使用:

// 我们可以示例化一个Car
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

// 打开浏览器控制台查看这些对象toString()方法的输出值
// output of the toString() method being called on
// these objects
console.log( civic.toString() );
console.log( mondeo.toString() );
```

上面这是个简单版本的构造器模式，但它还是有些问题。一个是难以继承，另一个是每个Car构造函数创建的对象中，toString()之类的函数都被重新定义。这不是非常好，理想的情况是所有Car类型的对象都应该引用同一个函数。 这要谢谢 ECMAScript3和ECMAScript5-兼容版，对于构造对象他们提供了另外一些选择，解决限制小菜一碟。

#### 原型构造器

通过下面代码，单个toString()实例被所有的Car对象所共享了。

```js
function Car( model, year, miles ) {

  this.model = model;
  this.year = year;
  this.miles = miles;

}

// 注意这里我们使用Note here that we are using Object.prototype.newMethod 而不是
// Object.prototype ，以避免我们重新定义原型对象
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};

// 使用:

var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

console.log( civic.toString() );
console.log( mondeo.toString() );
```