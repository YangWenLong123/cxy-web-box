## 实现简易版 v-model 指令

```vue
<script setup lang="ts">
import { ref } from "vue";

/**
 * 实现以下自定义指令
 * 在表单输入元素和数据间创建双向绑定
 *
 */
const VOhModel = {};

const value = ref("Hello Vue.js");
</script>

<template>
  <input v-oh-model="value" type="text" />
</template>
```

## 解答

```vue
<template>
  <input v-oh-model="value" type="text" />
  <p>{{ value }}</p>
</template>

<script setup>
import { ref, watchEffect } from "vue";
// 定义 VOhModel 指令
const VOhModel = {
  mounted: (el, binding) => {
    // 当组件挂载到 DOM 时，使用 watchEffect 方法监听 binding.value 的变化
    watchEffect(() => {
      // 将 input 元素的值设置为 binding.value 的值
      el.value = binding.value;
      // 监听 input 元素的 input 事件，在事件处理函数中更新 value 的值
      el.addEventListener("input", (e) => {
        console.log(value);
        value.value = e.target.value;
      });
    });
  },
};
// 创建一个名为 value 的响应式引用，并将其初始值设置为 "Hello Vue.js"
const value = ref("Hello Vue.js");
</script>
```
