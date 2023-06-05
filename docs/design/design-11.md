外观模式是一种结构型设计模式，为一组复杂的子系统接口提供一个更高级的统一接口，以使对子系统接口的访问更容易。在JavaScript中，有时也会用于对底层结构兼容性做统一封装来简化用户使用。以下是外观模式的介绍和具体案例的代码。

-   外观模式的优点：

    -   简化类的接口，对接口与调用者进行解耦。
    -   易于使用，本身也比较轻量级。
    -   良好的封装，访问者无需了解创建过程，代码结构清晰。
    -   扩展性良好，通过工厂方法隔离了用户和创建流程，符合开闭原则。
    -   解耦了高层逻辑和底层产品类，符合最少知识原则，不需要的就不要去交流。
    -   给系统增加了抽象性，带来了额外的系统复杂度，不能滥用。

<!---->

-   外观模式的缺点：

    -   被开发者连续使用时会产生一定的性能问题，因为在每次调用时都要检测功能的可用性。
    -   外观模式会新增一个中介者对象，导致中介者对象经常是巨大的，难以维护。

以下是一个简单的外观模式示例代码。

```js
// 子系统1
class Subsystem1 {
  operation1() {
    return 'Subsystem1: Ready!\n';
  }
  // ...
}

// 子系统2
class Subsystem2 {
  operation1() {
    return 'Subsystem2: Get ready!\n';
  }
  // ...
}

// 外观类
class Facade {
  constructor(subsystem1, subsystem2) {
    this.subsystem1 = subsystem1 || new Subsystem1();
    this.subsystem2 = subsystem2 || new Subsystem2();
  }

  operation() {
    let result = 'Facade initializes subsystems:\n';
    result += this.subsystem1.operation1();
    result += this.subsystem2.operation1();
    result += 'Facade orders subsystems to perform the action:\n';
    // ...
    return result;
  }
}

// 客户端代码
function clientCode(facade) {
  console.log(facade.operation());
}

const facade = new Facade();
clientCode(facade);


```

在上面的代码中，`Subsystem1`和`Subsystem2`是两个子系统，`Facade`是外观类。客户端代码通过创建一个外观类的实例，并向其传递子系统实例来使用外观模式。外观类可以在内部使用子系统实例来完成操作，从而简化了客户端代码。