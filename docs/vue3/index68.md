## 鼠标坐标

在使用 Vue.js 时，我们应该关注可复用性，可组合函数是一个很好的方式，让我们开始吧 👇:

```vue
<script setup lang="ts">
// Implement ...
function useEventListener(target, event, callback) {}

// Implement ...
function useMouse() {
  useEventListener(window, "mousemove", () => {});
}
const { x, y } = useMouse();
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```

## 解答

```vue
<script setup lang="ts">
import { ref } from "vue";
// Implement ...
function useEventListener(target, event, callback) {
  target.addEventListener(event, callback);
}

// Implement ...
function useMouse() {
  const x = ref(0);
  const y = ref();
  useEventListener(window, "mousemove", (event) => {
    x.value = event.clientX;
    y.value = event.clientY;
  });
  return { x, y };
}
const { x, y } = useMouse();
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```
