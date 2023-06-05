工厂模式是一种常用的创建对象的设计模式，用于代替直接使用 new 关键字实例化对象，从而解决对象实例化时的耦合问题。工厂模式可以分为三类：简单工厂模式、工厂方法模式、抽象工厂模式。

-   简单工厂模式：由一个工厂对象来创建某一类产品的实例，根据传入的参数不同来创建不同的对象实例。这种模式实现简单，但是当需要增加新的产品时需要修改工厂类的代码，不符合开闭原则。

```js
class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

class BookFactory {
  static createBook(type) {
    switch (type) {
      case 'JavaScript':
        return new Book('JavaScript高级程序设计', 'Nicholas C. Zakas');
      case 'Java':
        return new Book('Java核心技术', 'Cay S. Horstmann');
      case 'Python':
        return new Book('Python基础教程', 'Magnus Lie Hetland');
      default:
        throw new Error('Unsupported book type.');
    }
  }
}

const jsBook = BookFactory.createBook('JavaScript');
console.log(jsBook); // Book { name: 'JavaScript高级程序设计', author: 'Nicholas C. Zakas' }


```

-   工厂方法模式：工厂方法模式是对产品类的抽象，使其创建多类产品的实例，每个产品类对应一个工厂类，工厂类只负责创建对应的产品实例。这种模式可以满足开闭原则，但是需要为每个产品类创建一个工厂类，增加了代码量。

```js
class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

class JavaScriptBook extends Book {
  constructor() {
    super('JavaScript高级程序设计', 'Nicholas C. Zakas');
  }
}

class JavaBook extends Book {
  constructor() {
    super('Java核心技术', 'Cay S. Horstmann');
  }
}

class PythonBook extends Book {
  constructor() {
    super('Python基础教程', 'Magnus Lie Hetland');
  }
}

class BookFactory {
  createBook() {
    throw new Error('Method createBook must be implemented.');
  }
}

class JavaScriptBookFactory extends BookFactory {
  createBook() {
    return new JavaScriptBook();
  }
}

class JavaBookFactory extends BookFactory {
  createBook() {
    return new JavaBook();
  }
}

class PythonBookFactory extends BookFactory {
  createBook() {
    return new PythonBook();
  }
}

const jsBookFactory = new JavaScriptBookFactory();
const jsBook = jsBookFactory.createBook();
console.log(jsBook); // JavaScriptBook { name: 'JavaScript高级程序设计', author: 'Nicholas C. Zakas' }


```

-   抽象工厂模式：抽象工厂模式是对类的工厂的抽象，用于创建产品类，而不是创建产品类的实例。每个工厂类可以创建多个产品类的实例，每个产品类对应一个工厂类。这种模式可以满足开闭原则，但是增加了代码量和复杂度。

````js
class Book {
  constructor(name, author) {
    this.name = name;
    this.author = author;
  }
}

class JavaScriptBook extends Book {
  constructor() {
    super('JavaScript高级程序设计', 'Nicholas C. Zakas');
  }
}

class JavaBook extends Book {
  constructor() {
    super('Java核心技术', 'Cay S. Horstmann');
  }
}

class PythonBook extends Book {
  constructor() {
    super('Python基础教程', 'Magnus Lie Hetland');
  }
}

class ElectronicDevice {
  constructor(name, brand, price) {
    this.name = name;
    this.brand = brand;
    this.price = price;
  }
}

class Phone extends ElectronicDevice {
  constructor(brand, price) {
    super('手机', brand, price);
  }
}

class TV extends ElectronicDevice {
  constructor(brand, price) {
    super('电视', brand, price);
  }
}

class Computer extends ElectronicDevice {
  constructor(brand```


````