#### 概念

闭包就是**能够读取其他函数内部变量的函数**。在本质上，闭包就是将函数内部和函数外部连接起来的一座**桥梁**

#### 怎么实现闭包

闭包的实现原理，其实是利用了作用域链的特性，我们都知道作用域链就是在当前执行环境下访问某个变量时，如果不存在就一直向外层寻找，最终寻找到最外层也就是全局作用域，这样就形成了一个链条。

```js
function person() {
  var age = 18;
  function cat() {
    age++;
    console.log(age);
  }
  return cat;
}

var per = person();//per相当于函数cat
per();// 19 即cat() 这样每次调用不在经过age的初始值，这样就可以一直增加了
per();// 20
per();// 21
```

####

#### 用途

-   封装私有变量

闭包可以用于封装私有变量，以防止其被外部访问和修改。封装私有变量可以一定程度上防止全局变量污染，使用闭包封装私有变量可以将这些变量限制在函数内部或模块内部，从而减少了全局变量的数量，降低了全局变量被误用或意外修改的风险。

在下面这个例子中，调用函数，输出的结果都是1，但是显然我们的代码效果是想让count每次加一的。

```js
function add() {
  let count = 0;
  count++;
  console.log(count);
}
add()   //输出1
add()   //输出1
add()   //输出1
```

-   做缓存

函数一旦被执行完毕，其内存就会被销毁，而闭包的存在，就可以保有内部环境的作用域。

```js
function foo(){
    var myName ='张三'
    let test1 = 1
    const test2 = 2
    var innerBar={
        getName: function(){
            console.log(test1);
            return myName
        },
        setName:function(newName){
            myName = newName
        }
    }
    return innerBar
}
var bar = foo()
console.log(bar.getName()); //输出：1 张三
bar.setName('李四')
console.log(bar.getName()); //输出：2 李四
```

-   模块化编程（实现共有变量）

闭包还可以用于实现模块化编程。模块化编程是一种将程序拆分成小的、独立的、可重用的模块的编程风格。闭包可以用于封装模块的私有变量和方法，以便防止其被外部访问和修改。例如：

```js
const myModule = (function() {
  let privateVariable = '我是私有的!';

  function privateMethod() {
    console.log(privateVariable);
  }

  return {
    publicMethod: function() {
      privateMethod();
    }
  };
})();

myModule.publicMethod(); // 输出: 我是私有的!
```





#### 注意点

由于闭包会使函数内部的变量都保存在内存中，内存消耗很大，因此不要滥用闭包，否者会造成网页的性能问题，ie中可能会导致内纯泄露。

闭包会在父函数的外部改变父函数内部的变量值

####

#### 案例

```js
//打印5个5
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i, 'i');
    }, 0)
  }

//打印 0 1 2 3 4  使用let块级作用域
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i, 'i');
    }, 0)
  }

//每秒打印一次 0 1 2 3 4
  for (var i = 0; i < 5; i++) {
    (function (j) {
      setTimeout(function () {
        console.log(new Date, j);
      }, 1000 * j);
    })(i);
  }
```

```js
function f1(){
  var a=100;
  return function f2(){
       return function f3(){
           console.log(a);
        }
  }
}
//f1()()(); 打印结果:100
```

```js
function fn (a,b,c) {
	return a+b+c
}
//fn(a,b,c)

function Fn (a){
	return function (b) {
  	return function (c) {
    	return a+b+c;
    }
  }
}
//fn(a)(b)(c)
```