#### 介绍

集合是由一组无序且唯一(即不能重复)的项组成的。比如由一个大于等于0的整数组成的集合：N={0,1,2,3,4,5,6,...}。

还有一个概念叫空集。用'{}'表示。

#### 创建集合

我们使用对象来表示集合。

```js
function Set() {
	let items = {};
}
```

#### 常见方法

```js
add(value)：向集合添加一个新的项。
delete(value)：从集合移除一个值。
has(value)：如果值在集合中，返回true，否则返回false。  clear()：移除集合中的所有项。
size()：返回集合所包含元素的数量。与数组的length属性类似。
values()：返回一个包含集合中所有值的数组。
```

#### has方法

```js
this.has = function(value){
	return value in items;
};

----------------或者-----------------

this.has = function(value){
 return items.hasOwnProperty(value);
};
```

#### add方法

```js
this.add = function (value) {
    if (!this.has(value)) {
        items[value] = value;
        return true;
    }
    return false;
};
```

#### remove方法

```js
this.remove = function (value) {
    if (this.has(value)) {
        delete items[value];
        return true;
    }
    return false;
};
```

#### clear方法

```js
this.clear = function(){
	items = {};
};
```

#### size方法

```js
this.size = function(){
	return Object.keys(items).length;
};
```

#### values方法

values方法也应用了相同的逻辑，提取items对象的所有属性，以数组的形式返回

```js
this.values = function () {
    let values = [];
    for (let i = 0, keys = Object.keys(items); i < keys.length; i++) {
        values.push(items[keys[i]]);
    }
    return values;
};
```

#### 使用set类

```js
let set = new Set();
set.add(1);
console.log(set.values()); //输出["1"]
console.log(set.has(1)); //输出true
console.log(set.size()); //输出1
set.add(2);
console.log(set.values()); //输出["1", "2"]
console.log(set.has(2)); //true
console.log(set.size()); //2
set.remove(1);
console.log(set.values()); //输出["2"]
set.remove(2);
console.log(set.values()); //输出[]
```

#### 集合的一些操作

高中数学课本里也有。

```js
并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
子集：验证一个给定集合是否是另一集合的子集。
```

#### 并集

并集的数学概念是集合A和集合B的并集，表示为：*A*∪*B，* 集合定义如下：

*A*∪*B* = { *x* | *x* ∈ *A*∨*x* ∈ *B* }

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4fde547dc8545ecbe826b11aabfa7de~tplv-k3u1fbpfcp-zoom-1.image)

代码实现Set类的union方法

```js
this.union = function (otherSet) {
    let unionSet = new Set(); //定义两个集合的并集
    let values = this.values();
    for (let i = 0; i < values.length; i++) { //获取第一个集合的集都添加到并集中
        unionSet.add(values[i]);
    }
    values = otherSet.values();
    for (let i = 0; i < values.length; i++) { //获取第二个集合的集都添加到并集中
        unionSet.add(values[i]);
    }
    return unionSet;
};
```

测试代码

```js
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);
let unionAB = setA.union(setB);
console.log(unionAB.values());

//结果
["1", "2", "3", "4", "5", "6"]
```

#### 交集

交集的数学概念是集合A和集合B的交集，表示为：*A*∩*B，集合的定义如下：*

*A*∩*B* = { *x* | *x* ∈ *A*∧*x* ∈ *B* }

            ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24cfadc115d0413bbd4f4a1c8e93e023~tplv-k3u1fbpfcp-zoom-1.image)

代码实现Set类的intersection方法

```js
this.intersection = function (otherSet) {
    let intersectionSet = new Set(); //创建交集返回共有的元素
    let values = this.values();
    for (let i = 0; i < values.length; i++) { //便利当前Set类所有制
        if (otherSet.has(values[i])) { //验证是否存在otherSet中
            intersectionSet.add(values[i]); //存在则添加
        }
    }
    return intersectionSet;
}
```

测试代码

```js
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
let intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values());

//结果
["2", "3"]
```

#### 差集

差集的数学概念是集合A和集合B的差集，表示为：*A-* *B，集合的定义如下：*

*A-* *B* = { *x* | *x* ∈ *A* ∧ *x* *B* }

            ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c09990ec6ab242ef94af69591146857b~tplv-k3u1fbpfcp-zoom-1.image)

代码实现Set类的difference方法

```js
this.difference = function (otherSet) {
    let differenceSet = new Set(); //创建差集的集合
    let values = this.values();
    for (let i = 0; i < values.length; i++) { //遍历当前Set类所有值
        if (!otherSet.has(values[i])) { //存在A但不存在与B的值
            differenceSet.add(values[i]); //添加到集合中
        }
    }
    return differenceSet;
};
```

测试代码

```js
let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);
let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
let differenceAB = setA.difference(setB);
console.log(differenceAB.values());

//结果
["1"]
```

#### 子集

子集的数学概念是集合A是集合B的子集，表示为：*A*⊆*B* *，集合的定义如下：*

∀*x* { *x* ∈ *A* → *x* ∈ *B* }

            ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e92bafd1c3974989be336a1b5dbae1de~tplv-k3u1fbpfcp-zoom-1.image)

代码实现Set类的subset方法

```js
this.subset = function (otherSet) {
    if (this.size() > otherSet.size()) { //当前set类的大小必须要大于otherSet实例大小
        return false;
    } else {
        let values = this.values();
        for (let i = 0; i < values.length; i++) { //遍历Set类所有元素
            if (!otherSet.has(values[i])) { //验证元素是否页都存在与otherSet中
                return false; //有不存在的，为false
            }
        }
        return true; //都存在则为true
    }
};
```

测试代码

```js
let setA = new Set();
setA.add(1);
setA.add(2);
let setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
let setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.subset(setB));
console.log(setA.subset(setC));

//结果
setA是setB的子集（因此输出为true），然而setA不是setC的子集（setC只包含了setA中的2，而不包含1），因此输出为false。
```