#### 介绍

几乎所有的编程语言都原生支持数组类型，因为数组是最简单的内存数据结构。简单的就不介绍了，可以查看下面链接了解

<https://www.runoob.com/js/js-obj-array.html>

#### 语法

```js
push									数组末尾添加元素
pop										数组末尾删除元素
unshift								数组开头添加元素
shift									数组开头删除元素
concat                连接2个或更多数组，并返回结果
every                 对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true
filter 								对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组
forEach 							对数组中的每一项运行给定函数。这个方法没有返回值
reduce								对数组中的每一项运行给定函数。
join 									将所有的数组元素连接成一个字符串
indexOf 							返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1
lastIndexOf 					返回在数组中搜索到的与给定参数相等的元素的索引里最大的值
map 									对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组
reverse 							颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在的第一个
slice 								传入索引值，将数组里对应索引范围内的元素作为新数组返回
splice								传入索引值，将数组里对于索引范围内的元素作为新数组返回
some 									对数组中的每一项运行给定函数，如果任一项返回true，则返回true
sort 									按照字母顺序对数组排序，支持传入指定排序方法的函数作为参数
toString 							将数组作为字符串返回
valueOf 							和toString类似，将数组作为字符串返回
...
```

*slice与splice的区别,slice第一位非0时，截取到n-1位

```js
let arr = ['a','b','c','d'];

console.log(arr.splice(0,3))		//[ 'a', 'b', 'c' ]

let arr2 = ['a','b','c','d'];

console.log(arr2.slice(0,3))		//[ 'a', 'b', 'c' ]

--------------------------------------------------------------

let arr = ['a','b','c','d'];

console.log(arr.splice(1,3))		//[ 'b', 'c', 'd' ]

let arr2 = ['a','b','c','d'];

console.log(arr2.slice(1,3))		//[ 'b', 'c' ]
```

#### 寻找二维数组中最大值

思路：创建一个新数组用于存储每个数组中的最大值,数组初始值是[0]，循环这个二维数组中的每个数组，与创建数组进行值的比较，取到最大值存放在当前数组索引对于位置。

```js
let arr = [
    [1,2,3,4],
    [11,22,33,44,55],
    [222,111,444],
    [5,66,78,88]
]

let max = [];

for(let i=0;i<arr.length;i++){
    max.push(0);
    for(let j=0; j<arr[i].length; j++) {
        console.log(arr[i][j], i);
        if(arr[i][j] > max[i]) {
            max[i] = arr[i][j]
        }
    }
}

//[ 4, 55, 444, 88 ]
```

#### 数组查询算法

查询条件：一个数组有两个元素，第一个元素作为数据源，第二个元素为要查询的数组，是否每一项都可在第一项中查询出来。

```js
let arr = [
    'yangwenlong',
    'yAgla'
]

let flag = true;

for(let i=0; i<arr[1].length; i++){
    if(arr[0].toLocaleLowerCase().indexOf(arr[1][i].toLocaleLowerCase()) < 0) {
        flag = false;
    }
}
```

#### 密码移位

思路：定义一个密码串，查询密码对应位置，与指定位置替换，生成新的密码

```js
function rot13(str) { // LBH QVQ VG!
    var cipher=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var rot = "";
    for(var i = 0; i < str.length; i++){
        var index = -1 ;
        index = cipher.indexOf(str[i]);
        if( index >= 0 ){
            rot +=  cipher[(index + 13) % 26];
        }else{
            rot += str[i];
        }
    }
    return rot;
}

rot13("SERR PBQR PNZC");	//FREE CODE CAMP
rot13("FREE CODE CAMP");	//SERR PBQR PNZC
```

...