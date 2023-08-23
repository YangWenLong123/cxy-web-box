## shallowRef

`shallowRef`定义的是基本数据，数据是响应式数据,`shallowRef()`在修改对象值时，无法实现视图更新。修改时要将整个 `.value` 重新赋值，视图会更新

```js
<template>
  <div>
     <button @click="obj.age++; check()">浅层数据按钮</button>
     <div>浅层数据:{{ obj.age }}</div>
     <button @click="obj.data.data1.data2.abc++; check()">深层数据按钮</button>
     <div>深层数据:{{ obj.data.data1.data2.abc }}</div>
     <button @click="change">修改.value</button>
  </div>
</template>
<script setup lang="ts">
import { shallowRef } from 'vue'
const obj = shallowRef({
  name: '张三',
  age: 0,
  data: {
    data1: {
      data2: {
        abc:0
      }
    }
  }
})
// 查看数据
const check = () => {
  console.log('====================', obj)
}
// 点击改变数据
const change = () => {
  obj.value = { name: '李四', age:1, data: { data1: { data2: { abc: 2} } } }
  check();
}
</script>

```

1、点击浅层数据按钮

![a4.png](http://cdn.alongweb.top/images/webbox/a4.png)

2、点击深层数据按钮

![a5.png](http://cdn.alongweb.top/images/webbox/a5.png)

3、修改`.value`数据

![a6.png](http://cdn.alongweb.top/images/webbox/a6.png)


