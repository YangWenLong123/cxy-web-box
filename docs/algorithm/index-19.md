#### 描述

现有两个数组，a和b，那么如何去查询a和b数组的并集，交集，差集呢？

#### 分析

```js
let arr1 = [1,2,3]
let arr2 = [1, 2, 3, 4]
// 并集 数组去重
let RemoveSame = [...new Set([...arr1, ...arr2])]
console.log(RemoveSame) //[1, 2, 3, 4]

// 数组交集，或得两个数组重复的元素
let SamePart = arr1.filter(item => arr2.includes(item))
console.log(SamePart) //[1, 2, 3]

// 差集 = 并集 - 交集  去除两个数组相同的元素
let Difference = RemoveSame.filter(item => !SamePart.includes(item))
console.log(Difference) //[4]
```