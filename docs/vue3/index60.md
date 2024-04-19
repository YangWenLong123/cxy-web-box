## 可写的计算属性

你需要创建一个可写的计算属性 :

```vue
<script setup lang="ts">
import { ref, computed } from "vue";

const count = ref(1);
const plusOne = computed(() => count.value + 1);

/**
 * 确保 `plusOne` 可以被写入。
 * 最终我们得到的结果应该是 `plusOne` 等于 3 和 `count` 等于 2。
 */

plusOne.value++;
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ plusOne }}</p>
  </div>
</template>
```

## 解答

```vue
// 你的答案
<script setup>
import { ref, computed } from "vue";

// 创建一个响应式变量 count，初始值为 1
const count = ref(1);

// 创建一个计算属性 plusOne，返回 count 的值加 1
const plusOne = computed({
  // get 方法返回 count 的值加 1
  get: () => {
    return count.value + 1;
  },
  // set 方法将 count 的值加 1
  set: () => {
    count.value++;
  },
});

// 确保 plusOne 可以被写入。
// 最终我们得到的结果应该是 plusOne 等于 3 和 count 等于 2。
plusOne.value++;
</script>

<template>
  <div>
    <p>plusOne: {{ plusOne }}</p>
    <p>count: {{ count }}</p>
  </div>
</template>
```
