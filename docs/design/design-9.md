# JavaScript原型模式

JavaScript中的原型模式，是一种基于原型继承的对象创建模式。通过给出一个原型对象来指明所有创建对象的类型，然后用复制这个原型对象的方法创建出更多同类型的对象。在JavaScript中，原型编程范式的体现就是基于实例来描述对象，用实例作为定义对象和继承的基础。

## 原型模式的定义

原型模式属于对象的创建模式，通过给出一个原型对象来指明所有创建对象的类型，然后用复制这个原型对象的方法创建出更多同类型的对象。这就是原型模式的用意。在JavaScript中，原型对象实质上是一个指针，它指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的方法和属性。

## 原型模式的规则

-   所有数据都是对象；
-   如果对象无法响应某个请求，它会把这个请求委托给它自己的原型；
-   对象会记住它的原型。

## 原型模式的优点

-   可以在运行时动态改变对象的状态，扩展性较好；
-   可以通过改变原型来改变所有对象的实例，使用方便。

## 原型模式的缺点

-   需要为每一个类配备一个克隆方法，这对全新的类来说不是很难，但对已有的类进行改造时，需要修改其源代码，违背了开闭原则；
-   在实现深克隆时需要编写较为复杂的代码。

## 案例

假设我们要做一个打飞机游戏，游戏设定为纵版移动，单打。我们定义一个飞机类，并为其添加一个克隆方法，用于克隆新的飞机实例。

```js
function Plane() {
  this.blood = 100;
  this.attackLevel = 1;
  this.defenseLevel = 1;
}
Plane.prototype.attack = function() {
  console.log('普通攻击');
};
Plane.prototype.defense = function() {
  console.log('普通防御');
};
Plane.prototype.clone = function() {
  var clone = new Plane();
  clone.blood = this.blood;
  clone.attackLevel = this.attackLevel;
  clone.defenseLevel = this.defenseLevel;
  return clone;
};

var plane1 = new Plane();
var plane2 = plane1.clone();
console.log(plane2.blood); // 100


```

在这个例子中，我们定义了一个飞机类，并为其添加了攻击和防御方法，以及一个克隆方法。我们可以通过原型模式，使用已有的实例来创建新的实例，而不需要重新创建一个类。通过克隆方法，我们可以省去大量的初始化工作，提高了性能。

## 结语

原型模式是一种非常实用的设计模式，在JavaScript中，原型模式是非常重要的一种编程范式。它可以帮助我们更加灵活地处理对象的创建和继承，提高代码的复用性和可维护性。