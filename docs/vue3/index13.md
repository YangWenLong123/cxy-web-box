## triggerRef

强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

所有可以配合shallowref()一起使用，在修改值时视图未更新，使用`triggerRef()`强制更新

```js
<template>
  //ref基础用法
  <input type="text" v-model="msg.name" />
  <div @click="cahngeMsg">{{ msg.name }}</div>
</template>

<script setup lang="ts">
import { shallowRef, triggerRef } from 'vue';
// shallowRef对比ref是比较浅层次的响应（使用方法如下）
const msg: {} = shallowRef({ name: 'name' });
const cahngeMsg = () => {
  // 错误的使用方法 value对象的name值会改变但是视图上不会
  msg.value.name = '点击后的信息';
  // 正确的使用方法 注意：不能在shallowRef更新变量的时候，用ref更新变量
  // msg.value = { name: '点击后的信息' };
  // triggerRef强制跟新ref绑定数据（包括shallowRef） 注意：使用ref会自动调用triggerRef
  triggerRef(msg);
};
</script>
```

1、点击前
![a7.png](http://cdn.alongweb.top/images/webbox/a7.png)


2、点击后
![a8.png](http://cdn.alongweb.top/images/webbox/a8.png)

我们可以看到视图被更新了