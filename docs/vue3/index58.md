## 首字母大写

请创建一个自定义的修饰符 capitalize，它会自动将 v-model 绑定输入的字符串值首字母转为大写：

```vue
<script setup></script>

<template>
  <input type="text" v-model.capitalize="" />
</template>
```

## 解答

```ts
 <script setup>
 // 导入 ref 和 vModelText 函数
 import { ref, vModelText } from 'vue';

 // 定义一个响应式变量 value
 const value = ref('');
 // 使用 vModelText.beforeUpdate 指令，在更新 value 之前对输入值进行操作
 vModelText.beforeUpdate = (el, binding) => {
   // 如果输入值不为空且包含 capitalize 修饰符，则将输入值的首字母转换为大写
   if (el.value && binding.modifiers.capitalize) {
     el.value = el.value.charAt(0).toUpperCase() + el.value.slice(1);
   }
 };
</script>
<template>
 <!-- 创建一个文本输入框，使用 v-model.capitalize 指令将 value 变量的值绑定到输入框的值，并在更新 value 之前对输入值进行操作 -->
 <input type="text" v-model.capitalize="value" />
</template>
```
