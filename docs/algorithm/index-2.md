#### 介绍

队列是遵循FIFO（First In First Out，先进先出，也称为先来先服务）原则的一组有序的项。 队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

在现实中，最常见的队列就是排队，当然不允许插队的存在哦

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ebf52e8cdb540d39202567276c180c3~tplv-k3u1fbpfcp-zoom-1.image)

####

#### 分析

实现一个队列,首先需要一个存储队列的数据结构，我们可以使用数组。

```js
function Queue() {
	var items = [];
}
```

#### 基本方法

-   -   向队列添加方法，新项只能添加在末尾
    -   从队列移除元素，遵循先进先出原则,所以最先添加项也是被最先移除的。
    -   查看队列长度
    -   检查队列是否为空,为空会返回true,否则返回false
    -   查看队列头元素
    -   查看队列尾元素
    -   清空队列
    -   打印队列元素

#### 代码实现

```js
function Queue() {
  var items = [];
  this.enqueue = function(data) {
    items.push(data);
  };
  this.dequeue = function() {
    return items.shift();
  };
  this.size = function() {
    return items.length;
  };
  this.isEmpty = function() {
    return items.length === 0;
  };

  this.head = function() {
    return items[0] || null;
  };
  this.tail = function() {
    let len = items.length;
    if (len > 0) {
      return items[len - 1];
    }
    return null;
  };
  this.clear = function() {
    items = [];
    return true;
  };
  this.show = function() {
    console.log(items.toString());
  };
}
```

参考：JavaScript数据结构与算法