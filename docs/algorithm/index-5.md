#### 前言

在字典中，存储的时[键,值]对，其中键名是用来查询元素的，字典也称之为映射。

#### 创建字典

与Set类相似，ECMAScript 6同样包含了一个Map类的实现，即我们所说的字典。你会发现它和Set类很相似（但不同于存储[值，值]对的形式，我们将要存储的是[键，值]对）。

```js
function Dictionary() {
	var items = {};
}
```

#### 方法

```js
set(key,value)：向字典中添加新元素。
delete(key)：通过使用键值来从字典中移除键值对应的数据值。
has(key)：如果某个键值存在于这个字典中，则返回true，反之则返回false。 get(key)：通过键值查找特定的数值并返回。
clear()：将这个字典中的所有元素全部删除。
size()：返回字典所包含元素的数量。与数组的length属性类似。
keys()：将字典所包含的所有键名以数组形式返回。
values()：将字典所包含的所有数值以数组形式返回。
```

#### has方法

首先实现has(key)方法，后面会被set和remove等方法调用。

```js
this.has = function(key) {
	return key in items;
};
```

#### set方法

该方法接受一个key和value作为参数

```js
this.set = function(key, value) {
	items[key] = value;
};
```

#### delete方法

该方法接受一个key值，使用has方法查询是否存在，存在则删除

```js
this.delete = function (key) {
    if (this.has(key)) {
        delete items[key];
        return true;
    }
    return false;
};
```

#### get方法

```js
this.get = function (key) {
    return this.has(key) ? items[key] : undefined;
};
```

#### values方法

```js
this.values = function () {
    var values = [];
    for (var k in items) {
        if (this.has(k)) {
            values.push(items[k]);
        }
    }
    return values;
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

#### keys方法

```js
this.keys = function() {
	return Object.keys(items);
};
```

#### getItems方法

```js
this.keys = function() {
	return Object.keys(items);
};
```

#### 使用场景

对象本身作为字典

在写业务代码的时候，我很多时候看到小伙伴写代码的时候写了过多的具有高度频率重复的一些键值对的对应，或者说if,else的判断。在这种情况下，如果其枚举属性和值比较固定，建议其作为一个枚举字典固定存储和全局使用或者按需使用，这样代码会精简很多。比如：

```js
// old codes
let text = '';
if(status === 1){
	text = '没有开课'；
} else if(status === 2) {
	text = '上课中'
} else {
	text = '没有这个课程'；
}

// better codes in status.js or enum.js
const statusDict = {
	1:'没有开课'，
  2：'上课中'，
}
const getStatusText = (status) => {
  const defaultText = '没有这个课程';
  if(!status) return defaultText;
	return statusDict[status] || defaultText;
}

// 在vue.js 中有过滤器这样的方法，
//如果你的应用中高频使用一种过滤器，且针对业务较固定，可以考虑定义为全局过滤器，字典结构维护和使用
```