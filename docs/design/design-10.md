命令模式是一种行为型设计模式，它将请求封装成一个对象，从而允许我们将不同请求排队，记录请求日志，以及支持可撤销的操作。在JavaScript中，命令模式常常使用回调函数实现。

下面是一个通过命令模式实现撤销重做功能的案例，其中包括了发布者、接收者和命令对象三个要素：

```js
// 定义接收者对象
const receiver = {
  execute: function () {
    console.log('执行操作');
  },
  undo: function () {
    console.log('撤销操作');
  }
};

// 定义命令对象
function Command(receiver) {
  this.receiver = receiver;
}
Command.prototype.execute = function () {
  this.receiver.execute();
};
Command.prototype.undo = function () {
  this.receiver.undo();
};

// 定义发布者对象
function Invoker() {
  this.commands = [];
}
Invoker.prototype.execute = function (command) {
  this.commands.push(command);
  command.execute();
};
Invoker.prototype.undo = function () {
  const command = this.commands.pop();
  command.undo();
};

// 创建接收者对象
const myReceiver = Object.create(receiver);

// 创建命令对象
const myCommand = new Command(myReceiver);

// 创建发布者对象
const myInvoker = new Invoker();

// 执行操作
myInvoker.execute(myCommand);

// 撤销操作
myInvoker.undo();


```

上述代码中，接收者对象包含了需要执行的操作和需要撤销的操作；命令对象将接收者对象封装成一个可执行的命令；发布者对象用来执行命令和撤销命令。

除了撤销重做功能，命令模式还有以下两个适用场景：

-   封装运算块：将一组操作封装成一个命令对象，可以将其作为参数传递给函数，从而实现对函数的扩展；
-   命令队列：将多个命令对象存储在一个队列中，按照队列顺序依次执行，可以实现对请求的排队和延迟处理。