## 切换器

实现一个切换状态的可组合函数

```vue
<script setup lang="ts">
/**
 * 实现一个切换状态的可组合函数
 * 确保该功能正常工作
 */
function useToggle() {}

const [state, toggle] = useToggle(false);
</script>

<template>
  <p>State: {{ state ? "ON" : "OFF" }}</p>
  <p @click="toggle">Toggle state</p>
</template>
```

## 解答

```vue
<script setup lang="ts">
import { Ref, ref } from "vue";
/**
 * Implement a composable function that toggles the state
 * Make the function work correctly
 */
function useToggle(i: boolean): [state: Ref, toggle: () => void] {
  const state = ref(i);
  const toggle = () => {
    state.value = !state.value;
  };
  return [state, toggle];
}

const [state, toggle] = useToggle(false);
</script>

<template>
  <p>State: {{ state ? "ON" : "OFF" }}</p>
  <p @click="toggle">Toggle state</p>
</template>
```
