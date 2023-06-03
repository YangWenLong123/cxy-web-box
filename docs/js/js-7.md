### 前言

JavaScript中的循环机制本质上都做的是同一件事：它们把一个动作重复了很多次，各种循环机制提供了不同的方法去确定循环的开始和结束。

### for语句

for循环是Js中最常用的循环工具，经常用于数组的循环遍历。for循环包括三个部分：初始化语句、条件语句和更新语句。循环执行时，首先执行初始化语句，然后检查条件语句是否为true，如果条件为true，则执行循环体内的语句，然后执行更新语句，再次检查条件语句。如果条件为false，则跳出循环。

```js
for (i = 0; i < 5; i++) {
     text += "数字是 " + i + "<br>";
}
```

### do...while语句

[do...while](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/do...while) 语句一直重复直到指定的条件求值得到假值（false。

```js
var i = 0;
do {
  i += 1;
  console.log(i);
} while (i < 5){
  console.log('result:' +i);
}

1
2
3
4
5
result: 5
```

### while语句

一个 [while](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while) 语句只要指定的条件求值为真（true）就会一直执行它的语句块。

```js
var n = 0;
var x = 0;
while (n < 3) {
  n++;
  x += n;
}
```

### break语句

在 JavaScript 中，break 语句用于跳出循环或者 switch 语句。当 break 被执行时，程序会跳出包含它的循环或者 switch 语句，继续执行后面的代码。

```js
for (i = 0; i < a.length; i++) {
  if (a[i] == theValue) {
    break;
  }
}
```

```js
var x = 0;
var z = 0
labelCancelLoops: while (true) {
  console.log("外部循环：" + x);
  x += 1;
  z = 1;
  while (true) {
    console.log("内部循环：" + z);
    z += 1;
    if (z === 10 && x === 10) {
      break labelCancelLoops;
    } else if (z === 10) {
      break;
    }
  }
}
```

```js
switch (expression) {
   case label_1:
      statements_1
      break;
   case label_2:
      statements_2
      break;
   ...
   default:
      statements_def
      break;
}
```

### continue语句

在JavaScript中，continue语句用于跳过循环中的一个迭代，并继续执行循环中的下一个迭代。与break语句的区别在于，continue并不会终止循环的迭代，而是在while循环中，控制流跳转回条件判断，在for循环中，控制流跳转到更新语句。

```js
var i = 0;
var n = 0;
while (i < 5) {
  i++;
  if (i == 3) {
    continue;
  }
  n += i;
  console.log(n);
}
//1,3,7,12
```

### for-in

[for...in](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 语句循环一个指定的变量来循环一个对象所有可枚举的属性。

```js
var arr = [1, 2, 4, 5, 7];
for (var index in arr) {
　　console.log(myArray[index]);
}
```

使用for-in可以遍历数组，但是会存在以下问题：

1.index索引为字符串型数字（注意，非数字），不能直接进行几何运算。

2.遍历顺序有可能不是按照实际数组的内部顺序（可能按照随机顺序）。

3.使用for-in会遍历数组所有的可枚举属性，包括原型。例如上例的原型方法method和name属性都会被遍历出来，通常需要配合hasOwnProperty()方法判断某个属性是否该对象的实例属性，来将原型对象从循环中剔除。

```js
for (var key in myObject) {
　　if（myObject.hasOwnProperty(key)){
　　　　console.log(key);
　　}
}
```

所以for-in更适合遍历对象，通常是建议不要使用for-in遍历数组。

### for-of

for-of可以简单、正确地遍历数组（不遍历原型method和name）。

```js
var myArray = [1, 2, 4, 5, 6, 7];
myArray.name = "数组";
myArray.getName = function() { return this.name; }
for (var value of myArray) {
    console.log(value);
}
```

1.这是最简洁、最直接的遍历数组元素的语法。

2.这个方法避开了for-in循环的所有缺陷。

3.与forEach()不同的是，它可以正确响应break、continue和return语句。

因此建议是使用for-of遍历数组，因为for-of遍历的只是数组内的元素，而不包括数组的原型属性method和索引name。

区别总结

简单总结就是，for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。

for-in总是得到对象的key或数组、字符串的下标。

for-of总是得到对象的value或数组、字符串的值，另外还可以用于遍历Map和Set。

```js
var set = new Set();
set.add("a").add("b").add("d").add("c");

// 遍历Set
for (let s of set) {
    console.log(s);
}

var map = new Map();
map.set("a", 1).set("b", 2).set(999, 3);

// 遍历Map
for(let [k, v] of map) {
    console.log(k, v);
}
```