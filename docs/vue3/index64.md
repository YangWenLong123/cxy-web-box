## 计数器

我们将实现一个计数器

```vue
<script setup lang="ts">
interface UseCounterOptions {
  min?: number;
  max?: number;
}

/**
 * 实现计数器函数,确保功能正常工作
 * 1. 加 (+)
 * 2. 减 (-)
 * 3. 重置
 * 4. 最小值 & 最大值 选项支持
 */
function useCounter(initialValue = 0, options: UseCounterOptions = {}) {}

const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 10 });
</script>
```

## 解答

```vue
<script setup lang="ts">
import { Ref, ref } from "vue";

interface UseCounterOptions {
  min?: number;
  max?: number;
}

/**
 * Implement the composable function
 * Make sure the function works correctly
 */
function useCounter(initialValue: number = 0, options: UseCounterOptions = {}) {
  const count: Ref<number> = ref(initialValue);
  const inc = (): void => {
    if (count.value < options.max) {
      count.value++;
    }
  };
  const dec = (): void => {
    if (count.value > options.min) {
      count.value--;
    }
  };
  const reset = (): void => {
    count.value = initialValue;
  };

  return { count, inc, dec, reset };
}

const { count, inc, dec, reset } = useCounter(0, { min: 0, max: 10 });
</script>

<template>
  <p>Count: {{ count }}</p>
  <button @click="inc">inc</button>
  <button @click="dec">dec</button>
  <button @click="reset">reset</button>
</template>
```
