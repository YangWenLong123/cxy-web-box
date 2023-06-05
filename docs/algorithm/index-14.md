#### 动态规划

概念：动态规划是一种将复杂问题分解成更小的子问题来解决的优化技术。

遵循三大步骤

1.  1.  定义子问题
    1.  实现要反复执行来解决子问题的部分
    1.  识别并求解出边界条件

对斐波那契数列进行动态规划方案解决：

```js
//递归解决方案

function Fn (n) {
    if(n<=2) {
        return 1;
    } else {
        return Fn(n-1) + Fn(n-2)
    }
}
```

```js
//动态规划算法

function iterFib(n) {
    let last = 1; //第一个数据
    let nextLast = 1; //下一个数据
    let result = 1;	//结果
    for (let i = 2; i < n; ++i) {
        result = last + nextLast;
        nextLast = last;
        last = result;
    }
    return result;
}
```

结论：对性能进行比较，在数据大的时候，递归的性能显的就尤其差

```js
console.time('timer');
console.log(iterFib(40),'2')
console.timeEnd('timer');

console.time('timer');
console.log(Fn(40),'1')
console.timeEnd('timer');

//执行结果
102334155 2
timer: 2.631ms
102334155 1
timer: 742.463ms
```