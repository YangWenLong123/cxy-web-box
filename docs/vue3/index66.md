## 防抖点击指令

实现一个防抖点击指令

```vue
<script setup lang="ts">
/**
 * 实现以下自定义指令
 * 确保在一定时间内当快速点击按钮多次时只触发一次点击事件
 * 你需要支持防抖延迟时间选项, 用法如 `v-debounce-click:ms`
 *
 */

const VDebounceClick = {};

function onClick() {
  console.log("Only triggered once when clicked many times quicky");
}
</script>

<template>
  <button v-debounce-click:200="onClick">Click on it many times quickly</button>
</template>
```

## 解答

```vue
<script setup lang="ts">
function debounce(fn: Function, delay: number) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
}
/**
 * Implement the custom directive
 * Make sure the `onClick` method only gets triggered once when clicked many times quickly
 * And you also need to support the debounce delay time option. e.g `v-debounce-click:ms`
 *
 */
let debounced;
const VDebounceClick = {
  created(el, binding) {
    const { value: cb, arg: delay } = binding;
    debounced = debounce(cb, delay);
    el.addEventListener("click", debounced);
  },
  unmounted(el) {
    if (el._debounced) {
      el.removeEventListener("click", debounced);
    }
  },
};

function onClick() {
  console.log("Only triggered once when clicked many times quickly");
}
</script>

<template>
  <button v-debounce-click:200="onClick">Click on it many times quickly</button>
</template>
```
