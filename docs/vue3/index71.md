## Effect 作用域 API

使用 响应式 API: effectScope 来完成它

```vue
<script setup lang="ts">
import { ref, computed, watch, watchEffect } from "vue";

const counter = ref(1);
const doubled = computed(() => counter.value * 2);

// 使用 `effectScope` API 使这些Effect效果在触发一次后停止

watch(doubled, () => console.log(doubled.value));
watchEffect(() => console.log("Count: ", doubled.value));

counter.value = 2;

setTimeout(() => {
  counter.value = 4;
});
</script>

<template>
  <div>
    <p>
      {{ doubled }}
    </p>
  </div>
</template>
```

## 解答

```vue
<script setup lang="ts">
import { ref, computed, watch, watchEffect, effectScope } from "vue";

const counter = ref(1);
const doubled = computed(() => counter.value * 2);

// use the `effectScope` API to make these effects stop together after being triggered once
// use the `effectScope` API to make these effects stop together after being triggered once
const scope = effectScope();
scope.run(() => {
  const stop1 = watch(doubled, () => console.log(doubled.value));
  const stop2 = watchEffect(() => console.log(`Count: ${doubled.value}`));
  stop1();
  stop2();
});

counter.value = 2;

setTimeout(() => {
  counter.value = 4;
});
</script>

<template>
  <div>
    <p>
      {{ doubled }}
    </p>
  </div>
</template>
```
