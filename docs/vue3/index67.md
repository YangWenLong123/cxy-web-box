## 按键修饰符

在监听键盘事件时，我们经常需要检查特定的按键。Vue 允许为 v-on 或者 @ 在监听键盘事件时添加按键修饰符：，例如：

```vue
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input @keyup.enter="submit" />
```

在这个挑战中，我们将尝试它，让我们开始吧：

```vue
<template>
  <!-- 添加按键修饰符让即使 Alt 或 Shift 被一同按下时也会触发 -->
  <button @click="onClick1">A</button>

  <!-- 添加按键修饰符让有且只有 Shift 被按下的时候才触发 -->
  <button @click="onCtrlClick">A</button>

  <!-- 添加按键修饰符让没有任何系统修饰符被按下的时候才触发 -->
  <button @click="onClick2">A</button>
</template>
```

## 解答

```vue
<template>
  <!-- Add key modifiers made this will fire even if Alt or Shift is also pressed -->
  <button @click.alt.shift="onClick1">A</button>

  <!-- Add key modifiers made this will only fire when Shift and no other keys are pressed -->
  <button @click.shift="onCtrlClick">A</button>

  <!-- Add key modifiers made this will only fire when no system modifiers are pressed -->
  <button @click.exact="onClick2">A</button>
</template>

<script setup>
function onClick1() {
  console.log("onClick1");
}
function onCtrlClick() {
  console.log("onCtrlClick");
}
function onClick2() {
  console.log("onClick2");
}
</script>
```

```vue
<template>
  <button @click="onClick1">A</button>

  <button @click="onCtrlClick">A</button>

  <button @click="onClick2">A</button>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

const handleKeyDown = (event) => {
  if (event.altKey && event.shiftKey) {
    onClick1();
  } else if (event.shiftKey) {
    onCtrlClick();
  } else {
    onClick2();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

function onClick1() {
  console.log("onClick1");
}

function onCtrlClick() {
  console.log("onCtrlClick");
}

function onClick2() {
  console.log("onClick2");
}
</script>
```
