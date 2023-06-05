#### 前言

见名思义，就是根据已知条件，去查找指定的值。

#### 顺序查找

顺序查找也称为线形查找，属于无序查找算法，也是一种相对比较简单也最常用到的查找算法，时间复杂度：O(n)。

下面可以测试一下，测试数据一千万条。分别用for循环,while,map,forEach测试性能。可以看到对应的大概时间分别是：14.472ms,11.912ms,138.241ms,203.09ms.

```js
//for循环

console.time("timer");
let i = 10000000;
let result = 0;

for(let j=0; j<= i; j++) {
    if(j == 5000000) {
       result = j;
    }
}
console.log('result:' + result);
console.timeEnd("timer");

//执行结果
result:5000000
timer: 14.472ms
```

```js
//while

console.time("timer");
let i = 10000000;
let result = 0;

while (i) {
    i--;
    if(i == 5000000) {
        result = i;
    }
}
console.log('result:' + result);
console.timeEnd("timer");

//执行结果
result:5000000
timer: 11.912ms
```

```js
//forEach

let i = 10000000;
let result = 0;
let list = [];

for(let j=0; j< i; j++) {
    list.push(j);
}
console.log('length:' + list.length);
console.time("timer");

list.forEach(item=>{
    if(item == 5000000) {
        result = i;
    }
})

console.log('result:' + result);
console.timeEnd("timer");

//执行结果
length:10000000
result:10000000
timer: 138.241ms
```

```js
//map

let i = 10000000;
let result = 0;
let list = [];

for(let j=0; j< i; j++) {
    list.push(j);
}
console.log('length:' + list.length);
console.time("timer");

list.map(item=>{
    if(item == 5000000) {
        result = i;
    }
})

console.log('result:' + result);
console.timeEnd("timer");

//执行结果
length:10000000
result:10000000
timer: 203.090ms
```

#### 二分法

算法描述如下：

1.  1.  将数组的第一个位置设置为边界(0)
    1.  将数组最后的一个元素所在的位置设置为上边界(数组长度-1)
    1.  若下边界小于等于上边界，则做如下操作

<!---->

1.  1.  1.  将终点设置为(上边界+下边界) / 2
        1.  如果查询值小于中点，将下边界设为中点下标 - 1
        1.  如果查询值大于中点，将上边界设为中点下标 + 1
        1.  否则中点元素即为要查找的数据，return

```js
function binarySearch(arr, value) {
    let min = 0;
    let max = arr.length - 1;

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);

        if (arr[mid] === value) {
            return mid;
        } else if (arr[mid] > value) {
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }
    return 'Not Found';
}
```

继续上面一千万条数据查找，查找时间大概为2.6ms

```js
let i = 10000000;
let list = [];

for (let j = 0; j < i; j++) {
    list.push(j);
}

console.time("timer");

console.log('result:' + binarySearch(list, 1000000));

console.timeEnd("timer");

//执行结果
result:1000000
timer: 2.600ms
```

#### 实践

取一组随机数，进行二分法查找。

```js
//取100000个随机数

let i = 100000;
let list = [];

for (let j = 0; j < i; j++) {
    list.push(j);
}

list = list.sort(()=>{
    return Math.random() - 0.5
})
```

将数据进行有序排序，使用快速排序

```js
//封装快速排序方法
function qSortArr(list) {
    if (list.length == 0) {
        return []
    }
    let lesser = []
    let greater = []
    let pivot = list[0]
    for (let i = 1; i < list.length; i++) {
        if (list[i] < pivot) {
            lesser.push(list[i])
        } else {
            greater.push(list[i])
        }
    }
    return qSortArr(lesser).concat(pivot, qSortArr(greater))
}


let i = 100000;
let list = [];

for (let j = 0; j < i; j++) {
    list.push(j);
}

list = list.sort(()=>{
    return Math.random() - 0.5
})

qSortArr(list)
```

使用二分法查找，完成代码

```js
function binarySearch(arr, value) {
    let min = 0;
    let max = arr.length - 1;

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);

        if (arr[mid] === value) {
            return mid;
        } else if (arr[mid] > value) {
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }

    return 'Not Found';
}

function qSortArr(list) {
    if (list.length == 0) {
        return []
    }
    let lesser = []
    let greater = []
    let pivot = list[0]
    for (let i = 1; i < list.length; i++) {
        if (list[i] < pivot) {
            lesser.push(list[i])
        } else {
            greater.push(list[i])
        }
    }
    return qSortArr(lesser).concat(pivot, qSortArr(greater))
}

let i = 100000;
let list = [];

for (let j = 0; j < i; j++) {
    list.push(j);
}

list = list.sort(() => {
    return Math.random() - 0.5
})

list = qSortArr(list);


binarySearch(list, 10)	//10
```

#### 实践二

场景：在一百万条数据搜索出某一条数据，需要有下拉联想，然后可以在联想中选择要搜索的数据

1.首先生成一条长度为一百万的数组

```js
var list = [];

for(let i=0; i<1000000; i++) {
    list.push({
        name: 'along' + i,
        index: i
    })
}
```

2.在生成数据中查找所需要的数据，测试查找数据为49401条时，所耗用时间，查找方法使用indexOf()，搜索的时候需做一下节流处理

```js
//当搜索内容为19时，查找数据长度49401， 搜索内容为1时，查找数据长度为468559

var len = list.length;
var arr = [];
for (var i = 0; i < len; i++) {
    if (list[i].name.indexOf("19") >= 0) {
        arr.push(list[i]);
    }
}

console.time('timer');
console.log(JSON.stringify(arr));
console.timeEnd('timer');

//timer: 242.013ms
```

3.之后对检索数据进行长度裁剪，规定最多100条，使用级联选择器进行筛选.