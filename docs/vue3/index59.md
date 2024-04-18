## Prop 验证

请验证 `Button` 组件的 `Prop` 类型 ，使它只接收: `primary | ghost | dashed | link | text | default` ，且默认值为 `default`。

```vue
<script setup>
defineProps({
  type: {},
});
</script>

<template>
  <button>Button</button>
</template>
```

## 解答

```vue
<script setup>
defineProps({
  btnText: {
    type: String,
    required: true,
    default: "default",

    validator: (value) => {
      if (typeof value !== "string") return false;
      return ["primary", "ghost", "dashed", "link", "text", "default"].includes(
        value
      );
    },
  },
});
</script>

<template>
  <button>{{ btnText }}</button>
</template>
```
