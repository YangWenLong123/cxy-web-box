# JavaScript设计模式之装饰模式

装饰模式是一种结构型设计模式，它允许在不改变对象自身的基础上动态地添加功能。该模式通过将对象包装在一个装饰器类的对象中来实现此目的。装饰器类具有与被包装的对象相同的接口，因此它看起来像是被包装的对象的扩展。在JavaScript中，装饰模式实现得非常简单，因为JavaScript是一种动态语言，允许在运行时添加和删除属性和方法。

## 应用场景

-   动态地为一个对象添加功能，而且这些功能可以在运行时被移除。
-   需要透明且动态地扩展对象的功能，而不影响其他对象。
-   当不能使用子类进行扩展时，可以使用装饰模式。

## 实现步骤

-   定义一个接口，它规定了可以被装饰的对象的方法。
-   创建一个原始对象，并将其传递给装饰器类的构造函数。
-   创建一个装饰器类，它实现了与接口相同的方法。该类应该包含一个指向被装饰对象的引用。
-   在装饰器类中，实现了一个或多个新的方法或重写现有方法。这些方法会在原始对象的方法之前或之后执行，从而实现了额外的功能。
-   创建一个或多个装饰器对象，并将原始对象传递给它们。每个装饰器对象都会将其引用传递给下一个装饰器对象，最终传递给客户端代码。

## 代码示例

```js
// 定义接口
class Component {
  operation() {}
}

// 创建原始对象
class ConcreteComponent extends Component {
  operation() {
    return 'ConcreteComponent';
  }
}

// 创建装饰器类
class Decorator extends Component {
  constructor(component) {
    super();
    this._component = component;
  }

  operation() {
    return this._component.operation();
  }
}

// 创建具体的装饰器类
class ConcreteDecoratorA extends Decorator {
  constructor(component) {
    super(component);
    this._addedState = 'A';
  }

  operation() {
    return `${super.operation()} ${this._addedState}`;
  }
}

class ConcreteDecoratorB extends Decorator {
  constructor(component) {
    super(component);
    this._addedState = 'B';
  }

  operation() {
    return `${super.operation()} ${this._addedState}`;
  }
}

// 使用装饰器
const component = new ConcreteComponent();
const decoratorA = new ConcreteDecoratorA(component);
const decoratorB = new ConcreteDecoratorB(decoratorA);

console.log(decoratorB.operation()); // 输出 "ConcreteComponent A B"


```

## 参考文献

-   [装饰者模式（Decorator Pattern）](https://juejin.cn/post/6999826902642851854)
-   [js设计模式之 装饰器模式与应用场景](https://zhuanlan.zhihu.com/p/87043331)
-   [JS设计模式系列之 ——装饰（Decorator）模式](https://zhuanlan.zhihu.com/p/293134665)
-   [什么是装饰者模式](https://zhuanlan.zhihu.com/p/96056898)
-   [JS设计模式-装饰器模式](https://www.jianshu.com/p/398f0e8f2699)