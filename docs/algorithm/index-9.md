####

#### 冒泡排序

-   步骤

<!---->

-   -   比较相邻的两个元素，如果前一个比后一个大，则交换位置。
    -   比较完第一轮的时候，最后一个元素是最大的元素。
    -   这时候最后一个元素是最大的，所以最后一个元素就不需要参与比较大小。

<!---->

-   优点

<!---->

-   -   相对简单，容易理解

<!---->

-   缺点

<!---->

-   -   时间复杂度O(n^2)

```js
let arr = [1, 5, 8, 22, 66, 55, 0, 1, 22, 4, 88, 999];
  let sortArr = (arr) => {
    let temp = null;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37e39851cdca42a6910be111c3572512~tplv-k3u1fbpfcp-zoom-1.image)

#### sort排序

-   -   arrayObject(sortby) 默认是按照字符串UniCode编码排序

字符串排序

```js
let next = ['a', 'c', 'g', 'h', 'b', 'e'];

next.sort();

// ['a', 'b', 'c', 'e', 'g', 'h' ]
```

升序，sort方法接受一个函数作为参数，参数传递两个参数，即返回一个a-b小于0的值，为升序

```js
let arr2 = [1, 5, 8, 22, 66, 55, 0, 1, 22, 4, 88, 999];
  let sortArr2 = (arr) => {
    return arr.sort((a, b) => {
      return a - b
    })
  }
```

降序，sort方法接受一个函数作为参数，参数传递两个参数，即返回一个a-b大于0的值，为降序

```js
let arr3 = [1, 5, 8, 22, 66, 55, 0, 1, 22, 4, 88, 999];
  let sortArr3 = (arr) => {
    return arr.sort((a, b) => {
      return b - a
    })
  }
```

数组值为对象排序方法同上

```js
	let arr6 = [
    { 'id': '1' },
    { 'id': '2' },
    { 'id': '5' },
    { 'id': '100' },
    { 'id': '101' },
    { 'id': '31' },
    { 'id': '11' }
  ]
  let sortArr6 = (arr) => {
    return arr.sort((a, b) => {
      return a.id - b.id
    })
  }
```

#### 取最小值

Math中的min方法实现

```js
let arr4 = [1, 5, 8, 22, 66, 55, 1, 22, 4, 88, 999];
  let sortArr4 = (arr) => {
    return Math.min(...arr);
  }
```

排序法:对数组进行升序或者降序排列，然后取出数组的第一个值或者最后一个值，即可取出最小值。

假设法：假设数组的第一个值是最小值，然后数组的每个元素和第一个值做比较，如果小于第一个值，则把值传递给第一个。

```js
et a = [10,2,3,4,5,6,7,8];
var min = a[0];

for(let i=0; i<a.length; i++) {
    a[i] < min ? min = a[i] : null;
}
```

#### 取最大值

Math中的max方法实现

```js
let arr4 = [1, 5, 8, 22, 66, 55, 1, 22, 4, 88, 999];
  let sortArr4 = (arr) => {
    return Math.max(...arr);
}
```

排序法:对数组进行升序或者降序排列，然后取出数组的第一个值或者最后一个值，即可取出最大值。

比较法：取第一个值与所有值作比较，大于所有值则返回第一个值，否者返回大于它的那个值。

```js
let a = [2,10,2,3,4,5,6,7,8];
const getMax = function (array){
  	var max = undefined;
    for (var i = 0; i < array.length; ++i) {
      max = max === undefined ? array[i] : (max >= array[i] ? max : array[i]);
    }
    return max;
}
```

#### 乱序

使用sort方法

```js
let a = [1,2,3,4,5,6,7,8];

a.sort(() => {
    return Math.random() - 0.5
})
```

弊端：允许多次的时候就会发现末尾大值的概率高，开头小值概率高。

原来，在Chrome v8引擎源码中，处理sort方法时，使用了插入排序和快速排序两种方案。当目标数组长度小于10时，使用插入排序；反之，使用快速排序和插入排序的混合排序。

```js
const arr = [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10]
function shuffle(arr) {
  return arr.sort(() => (Math.random() - 0.5))
}

let resultArr = Array(10).fill(0)
for (let i = 0; i < 10000; i++) {
  // sort 会改变原数组，必须用新数组来进行乱序
  let newArr = [].concat(arr)
  const tmp = shuffle(newArr)
  resultArr.forEach((item, index) => {
    // 不能直接改变 item 的值, item += tmp[index], 因为 forEach 不会改变原数组
    resultArr[index] += tmp[index]
  })
}
console.log(resultArr)
const average = resultArr.map(i => i/ 10000)
console.log(average)

// => [48544, 48860, 55333, 56927, 56797, 53396, 53790, 56762, 58967, 60624]
// => [4.8544, 4.886, 5.5333, 5.6927, 5.6797, 5.3396, 5.379, 5.6762, 5.8967, 6.0624]
```

#### 洗牌算法

先从数组末尾开始，选取最后一个元素，与数组中随机一个位置的元素交换位置；然后在已经排好的最后一个元素以外的位置中，随机产生一个位置，让该位置元素与倒数第二个元素进行交换

```js
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}
```

测试下看效果

```js
const arr = [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10]
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}

let resultArr = Array(10).fill(0)
for (let i = 0; i < 10000; i++) {
  // sort 会改变原数组，必须用新数组来进行乱序
  let newArr = [].concat(arr)
  const tmp = shuffle(newArr)
  resultArr.forEach((item, index) => {
    // 不能直接改变 item 的值, item += tmp[index], 因为 forEach 不会改变原数组
    resultArr[index] += tmp[index]
  })
}
console.log(resultArr)
const average = resultArr.map(i => i/ 10000)
console.log(average)

// => [55070, 54854, 54588, 55169, 55458, 54670, 55311, 54944, 55030, 54906]
// =>  [5.507, 5.4854, 5.4588, 5.5169, 5.5458, 5.467, 5.5311, 5.4944, 5.503, 5.4906]
```

#### 插入排序

-   -   从第二位（当前元素）开始从后向前查找
    -   若新元素（当前元素的前面）大于当前元素，将新元素移到下一位置
    -   重复2，直到在有序区找到大于或等于新元素的位置
    -   将当前元素插到上面找到的位置
    -   重复2~4

```js
function insertionSort(arr){
    var
        len = arr.length,
        i = 1,
        j,
        buffer;

    for (; i < len; i++) {
        buffer = arr[i];

        //在当前元素从后向前遍历,
        //一旦找到比当前元素大的就进行“元素加位”
        for (j = i - 1; j >= 0 && arr[j] > buffer; j--) {
                arr[j+1] = arr[j];
        }
        //找到的位置替换为当前元素，比它大的在上面已经“加位”了
        arr[j+1] = buffer;
    }

    return arr;
}
```

#### 选择排序

进行原地址比较，找到数据结构中最小值并放在第一位，接着在剩下的中找到第二个最小值放在第二位，依次类推

```js
function selectionSort(arr) {
    var length= arr.length;
    var minIndex;
    for (var i = 0; i < length - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < length; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        if(i != minIndex){
            var temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

    }
    return arr;
}
```

#### 归并排序

归并是一种分治算法，即将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，每次归并时进行排序，直到最后只有一个排序完毕的大数组。

```js
function mergeSort(arr) {  // 采用自上而下的递归方法，数组拆分
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
//合并数组，并进行排序
function merge(left, right)
{
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ed26009419d4221b3326db9cdde7f37~tplv-k3u1fbpfcp-zoom-1.image)

#### 快速排序

快速排序使用分治法（Divide and conquer）策略来把一个串行（list）分为两个子串行（sub-lists）。  

-   步骤

<!---->

-   -   首先，从数组中选择中间一项作基数
    -   然后，创建两个指针，左边一个指向数组的第一项，右边一个指向数组的最后一项
    -   移动左指针直到找到一个比基数大的元素，移动右指针，直到找到一个比基数小的元素；然后交换它们
    -   重复以上步骤，直到左指针超过了右指针
    -   最后，对划分后的小数组（比基数小的值组成的子数组，以及比基数大的值组成是子数组）重复之前的两个步骤，直到数组已经完全排序

```js
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}

function partition(arr, left ,right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    return index-1;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function partition2(arr, low, high) {
  let pivot = arr[low];
  while (low < high) {
    while (low < high && arr[high] > pivot) {
      --high;
    }
    arr[low] = arr[high];
    while (low < high && arr[low] <= pivot) {
      ++low;
    }
    arr[high] = arr[low];
  }
  arr[low] = pivot;
  return low;
}

function quickSort2(arr, low, high) {
  if (low < high) {
    let pivot = partition2(arr, low, high);
    quickSort2(arr, low, pivot - 1);
    quickSort2(arr, pivot + 1, high);
  }
  return arr;
}
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/021ec89858fd44ffbadfe8e3bcbc2121~tplv-k3u1fbpfcp-zoom-1.image)

```js
const quickSort = arr => {
  const a = [...arr];//解构数组
  if (a.length < 2) return a; //只有一个值 不用排序
  const pivotIndex = Math.floor(arr.length / 2); //获取中间索引
  const pivot = a[pivotIndex]; //获取中间值

  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []] //初始数据 二维数组
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

console.log(quickSort([1, 6, 1, 5, 3, 2, 1, 4]));
```