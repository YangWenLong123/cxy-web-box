## 介绍

栈（stack） 栈stack为自动分配的内存空间，它由系统自动释放

堆（heap） 堆heap是动态分配的内存，大小不定也不会自动释放

动态演示地址

[http://latentflip.com/loupe](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

## 数据类型

-   基本类型：String、Number、Boolean、Null、Undefined、symbol（ES6）

<!---->

-    基本类型在内存中占据空间小、大小固定 ，他们的值保存在栈(stack)空间，是按值来访问

<!---->

-   引用类型：Object、Array、Date、Function、Error、RegExp、Math、Number、String、Boolean、Globle。

<!---->

-    引用类型占据空间大、大小不固定, 栈内存中存放地址指向堆(heap)内存中的对象。是按引用访问的

## 堆栈

-   堆：用于引用数据类型（数组，对象，函数）分配空间，从栈内存指向堆内存的数据结构

<!---->

-     引用数据类型Object(Array，Date，RegExp，Function...)
    -   堆内存释放

<!---->

  -   让所有引用堆内存空间地址的变量赋值为null即可，当堆内存没有被任何的变量或者其他东西引用时，就会在浏览器执行垃圾回收的时候，被销毁掉。

```js
var obj = {'name': 'along'}
```

| 堆内存               |    |
| ----------------- | -- |
| {'name': 'along'} | 指针 |

```
obj2 = obj
```

| 堆内存               |    |
| ----------------- | -- |
| {'name': 'along'} | 指针 |
| {'name': 'along'} | 指针 |

结论：你会发现，如果是引用类型复制的话，虽然会有两个指针，但是指向都是同一个对象，这就会造成如果改变obj2值，也会造成obj值的改变。

如下图所示：栈内存中存放的只是该对象的访问地址， 在堆内存中为这个值分配空间 。 由于这种值的大小不固定，因此不能把它们保存到栈内存中。但内存地址大小的固定的，因此可以将内存地址保存在栈内存中。 这样，当查询引用类型的变量时， 先从栈中读取内存地址， 然后再通过地址找到堆中的值。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86e56367fa0b4cf3b42d7f2511f6e02a~tplv-k3u1fbpfcp-zoom-1.image)

-   栈（先进后出/后进先出的数据结构）

<!---->

-    栈基本五种数据类型： String、Number、Boolean、Null、Undefined、symbol（ES6）
    -   栈内存释放

<!---->

-   全局作用域会在页面关闭或者刷新的时候释放。
        -   私有作用域一般情况下，当函数执行完成，所形成的私有作用域（栈内存）都会自动释放掉，但是也有特殊的情况。（闭包）

<!---->

-    结构特点

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32e69f84324a41cbbf2bc959be6a6345~tplv-k3u1fbpfcp-zoom-1.image)

-    示例

```js
var a = 2;
```

| 栈内存 |   |
| --- | - |
| a   | 2 |

```
b = a
```

| 栈内存 |   |
| --- | - |
| a   | 2 |
| b   | 2 |

结论：栈内存虽然复制了a，但是创建了新的队列。修改b的值的同时也不会改变a的值。

## 代码实现

使用数组实现栈的结构

```js
function Stack(){
  let items = [];
  this.size = function(){
    return items.length
  }
  this.push = function(item){
    items.push(item)
  }
  this.pop = function(){
    let item = items.pop()
    console.log('pop',item)
    return item
  }
  this.top = function(){
    let length = items.length;
    console.log('top',items[length-1])
  }
  this.show = function(){
    console.log(items)
  }
  this.clear = function(){
    items.length = 0
  }
  this.isEmpty = function(){
    console.log(items.length === 0)
    return items.length === 0
  }
}


let newStack = new Stack();
newStack.push(12);
newStack.show()
newStack.top()
newStack.pop();
newStack.isEmpty();
newStack.show()
newStack.push(1);
newStack.push(5);
newStack.isEmpty();
newStack.top()
newStack.show()
newStack.clear();
newStack.show()
```

## 栈内存溢出

调用堆栈会一直增长，直到达到限制，浏览器硬编码堆栈大小或内存耗尽。所以在用递归函数时要给一个终止条件。

```js
var count = 1;

function fn() {
    count++;
    fn()
}
fn()

//Maximum call stack size exceeded
```

## History API与浏览器堆栈管理

pushState，它会向浏览器的历史堆栈压入一个url为设定值的记录，并改变历史堆栈的当前指针至栈顶。

```js
history.pushState(stateObject, title, url)

stateObject:state是一个由 pushState()方法创建的、与历史纪录相关的JS对象。当用户定向到一个新的状态时，会触发popstate事件。事件的state属性包含了历史纪录的state对象。
title:目前大多浏览器都忽视，传递空即可
url：新历史记录的url地址
```

replaceState：与pushState参数相同，含义也相同。唯一的区别在于replaceState是替换浏览器历史堆栈的当前历史记录为设定的url。需要注意的是，replaceState不会改动浏览器历史堆栈的当前指针。

onpopstate：该事件是window的属性。该事件会在调用浏览器的前进、后退以及执行history.forward、history.back、和history.go触发，因为这些操作有一个共性，即修改了历史堆栈的当前指针。在不改变document的前提下，一旦当前指针改变则会触发onpopstate事件。

创建一个新的浏览器记录状态

```js
const state = { 'page_id': 1, 'user_id': 5 }
const title = ''
const url = 'hello-world.html'

history.pushState(state, title, url)
```

总结：

浏览器针对每个页面维护一个History栈。执行pushState函数可压入设定的url至栈顶，同时修改当前指针

当执行back操作时，history栈大小并不会改变（history.length不变），仅仅移动当前指针的位置

详细查看：<https://www.yuque.com/along-n3gko/ezt5z9/gle5df>