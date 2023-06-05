# JS设计模式之享元模式

享元模式（Flyweight Pattern）是一种结构型设计模式，用于解决大量相似度高、状态变化小的对象的创建和管理问题，以达到优化内存使用和提高性能的目的。在享元模式中，可以共享的相同内容称为内部状态（Intrinsic State），而那些需要外部环境来设置的不能共享的内容称为外部状态（Extrinsic State）。因此，可以通过设置不同的外部状态使得相同的对象可以具有一些不同的特征，而相同的内部状态是可以共享的。

在实际使用中，能够共享的内部状态是有限的，因此享元对象一般都设计为较小的对象，它所包含的内部状态较少，这种对象也称为细粒度对象。享元模式的目的就是使用共享技术来实现大量细粒度对象的复用。

## 享元模式的应用场景

-   系统中存在大量相似对象，需要缓存池时
-   对象的状态变化小，可以被共享时
-   对象的大多数状态都可以变为外部状态时
-   系统需要频繁创建大量细粒度对象时

## 享元模式的代码示例

```js
// Flyweight Factory
var FlyweightFactory = function() {
  var flyweights = {};

  var get = function(key) {
    if (flyweights[key]) {
      return flyweights[key];
    } else {
      return flyweights[key] = new Flyweight(key);
    }
  }
  var getCount = function() {
    var count = 0;
    for (var f in flyweights) count++;
    return count;
  }
  return {
    get: get,
    getCount: getCount
  }
}

// Flyweight
var Flyweight = function(key) {
  this.intrinsicState = key;
}
Flyweight.prototype.operation = function(extrinsicState) {
  console.log("Intrinsic State: " + this.intrinsicState);
  console.log("Extrinsic State: " + extrinsicState);
};

// Client
var FlyweightFactory = new FlyweightFactory();
var flyweight1 = FlyweightFactory.get("key1");
var flyweight2 = FlyweightFactory.get("key2");
var flyweight3 = FlyweightFactory.get("key1");
console.log(FlyweightFactory.getCount()); // Output: 2
flyweight1.operation("Extrinsic State 1");
flyweight2.operation("Extrinsic State 2");
flyweight3.operation("Extrinsic State 3");


```

在上述代码示例中，FlyweightFactory是享元工厂，用于创建和管理享元对象。Flyweight是享元对象，包含内部状态和操作方法。Client是客户端角色，负责维护对所有享元对象的引用，并存储对应的外部状态。

在实际使用中，可以将享元对象的内部状态作为参数传递给操作方法，在操作方法中根据外部状态的不同，实现不同的操作。