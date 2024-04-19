## 浅层 ref

你将使用 响应式 API: shallowRef 来完成它。 以下是你要实现的内容 👇:

```vue
<script setup lang="ts">
import { shallowRef, watch } from "vue";

const state = shallowRef({ count: 1 });

// 回调没被触发
watch(
  state,
  () => {
    console.log("State.count Updated");
  },
  { deep: true }
);

/**
 * 修改以下代码使watch回调被触发
 *
 */
state.value.count = 2;
</script>

<template>
  <div>
    <p>
      {{ state.count }}
    </p>
  </div>
</template>
```

## 解答

```vue
<script setup lang="ts">
import { shallowRef, watch } from "vue";

const state = shallowRef({ count: 1 });

// Does NOT trigger
watch(
  state,
  () => {
    console.log("State.count Updated");
  },
  { deep: true }
);

/**
 * Modify the code so that we can make the watch callback trigger.
 */
state.value = { count: 2 };
</script>

<template>
  <div>
    <p>
      {{ state.count }}
    </p>
  </div>
</template>
```
