## 切换焦点指令

编写自定义指令，让我们从 v-focus 开始 👇:

```vue
<script setup lang="ts">
import { ref } from "vue";

const state = ref(false);

/**
 * 实现一个自定义指令,让元素获取焦点
 * 确保当切换`state`时,元素随着状态值获取/失去焦点
 *
 */
const VFocus = {};

setInterval(() => {
  state.value = !state.value;
}, 2000);
</script>

<template>
  <input v-focus="state" type="text" />
</template>
```

## 解答

```vue
<script setup lang="ts">
import { ref } from "vue";

const state = ref(true);

/**
 * Implement the custom directive
 * Make sure the input element focuses/blurs when the 'state' is toggled
 *
 */

const VFocus = {
  mounted(el, binding) {
    if (binding.value) el?.focus();
  },
  updated(el, binding) {
    binding.value ? el.focus() : el.blur();
  },
};

setInterval(() => {
  state.value = !state.value;
}, 2000);
</script>

<template>
  <input v-focus="state" type="text" />
</template>
```
