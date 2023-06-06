## 介绍

递归是解决问题的一种方法，它是能够自己调用自己的函数或者方法，必须要有终止条件。

## 调用栈大小

每个浏览器都有一个最大调用栈大小，当递归层级过深的时候，因为在递归的过程中会一直把临时变量封装为栈压入内存栈，如果一直压入，就会导致溢出导致服务崩溃。

每个浏览器都有自己的上限，代码如下：

结论：在函数调用15709次后，超出最大调用栈，内存溢出。所以在写递归函数时，一定要有终止条件。

```js
var i = 0;
function recursiveFn() {
    i++;
    recursiveFn();
}
try {
    recursiveFn();
} catch (ex) {
    console.log('i = ' + i + ' error: ' + ex);
}

//结果
i = 15709 error: RangeError: Maximum call stack size exceeded
```

## 斐波那契数列

-   1和2的斐波那契数是 1；
-   *n*（*n*>2）的斐波那契数是(*n*1)的斐波那契数加上(*n*2)的斐波那契数。

```js
function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}
```

## 优点

代码量少，易于理解

## 简单案例

使用递归实现阶乘函数

```js
function fact(num){
    if (num<=1){
        return 1;
    }else{
        return num * arguments.callee(num-1); //arguments.callee指向正在执行的函数
    }
}
fact(4); //结果为24.
```

## 场景1

简单的递归组件

```js
<template>
    <div class="list-detail">
      <list :list="list"></list>
    </div>
</template>
<script>
import List from "./components/List";
export default {
  name: "Parent",
  components: { List },
  data() {
    return {
      list: [{
          name: "经济",
          children: [{
              name: "如家",
              children: [{
                  name: "上江路-如家"
                },
                {
                  name: "望江路-如家"
                }]
            },{
              name: "7天",
              children: [{
                  name: "长江路-7天"
                },
                {
                  name: "望江路-7天"
                }]
            }]
        }]
    }
  }
}
</script>
```

List组件

```js
<template>
    <div>
        <div class="list-item" v-for="(item, index) in list" :key="index">
            <div class="item-name">
                <span>{{item.name}}</span>
            </div>
            <div v-if="item.children" class="children-item">
                <list :list="item.children"></list>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "List",
  props: {
    list: Array
  }
};
</script>
```

## 场景2

条件：将扁平数组转换为树结构

```js
const a = [[1,2,3],['a','b','c'],['A','B','C']];

[
  {
    label: '1',
    children:
      [
        { label: 'a',
          children:[
            {
              label:'A'
            }
          ]
        }
      ]
  },
{
    label: '2',
    children:
      [
        { label: 'b',
          children:[
            {
              label:'B'
            }
          ]
        }
      ]
  },
  {
    label: '3',
    children:
      [
        { label: 'c',
          children:[
            {
              label:'C'
            }
          ]
        }
      ]
  }
]
```

代码实现

```js
function Fn (a) {
    let res = []
    for (let i = 0; i < a[0].length; i += 1) {
        const obj = {}
        let el = obj
        for (let j = 0; j < a.length; j += 1) {
            if (j === 0) {
                el.label = a[j][i]
                el.children = []
            } else {
                el.children.push({
                    label: a[j][i],
                    children: []
                })
                el = el.children[0]
            }
        }
        res.push(obj)
    }
}
```

## 场景3

后面在vue深入学习时，会编写详细的案例...