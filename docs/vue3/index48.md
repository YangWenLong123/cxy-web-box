## setup

使用组合式`API`时，需要在`script`上添加`setup`,里面的代码会被编译成组件 `setup()` 函数的内容.

```vue
<script setup>
console.log("hello script setup");
</script>
```

## 顶层的绑定会被暴露给模板

当使用 `script setup` 的时候，任何在 `script setup` 声明的顶层的绑定 (包括变量，函数声明，以及 import 导入的内容) 都能在模板中直接使用：

```vue
<script setup>
// 变量
const msg = "Hello!";

// 函数
function log() {
  console.log(msg);
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
</template>
```

## ref

用于创建一个包装基本数据类型的响应式对象，也就是将普通的 JavaScript 值转换为响应式对象。通常用于定义组件内部的响应式数据。

基本数据类型创建

```vue
<script lang="ts" setup>
import { ref } from "vue";

const age = ref<number>(18);
const sex = ref<string>("男");
const show = ref<boolean>(true);
const nl = ref<null>(null);
const array = ref<string[]>([]);
const any = ref<any>();
const e = ref<string | null | undefined>("");
</script>
```

```vue
<script lang="ts" setup>
import { ref } from "vue";

type Mode = "a" | "b";
const mode = ref<Mode>("a");
</script>
```

获取组件实例

```vue
<script lang="ts" setup>
import { ref } from "vue";
import ImportFileModal from "";

const importFileModalRef = ref<InstanceType<typeof ImportFileModal> | null>(
  null
) as any;
</script>
```

有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 Ref 这个类型

```vue
<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";

const year: Ref<string | number> = ref("2020");

year.value = 2020; // 成功！
</script>
```

## reactive

它用于将一个普通的 JavaScript 对象转换为响应式对象。

```vue
<script lang="ts" setup>
import { reactive } from "vue";

const state = reactive<{ id: string | undefined; nodeId: number }>({
  id: "",
  nodeId: 1,
});

const state1 = reactive<{ [key: string]: Array<any> }>({
  list: [],
  customList: [],
});

const state2 = reactive<any>({});
</script>
```

使用接口为`reactive`标注类型

```vue
<script lang="ts" setup>
import { reactive } from "vue";

interface Book {
  title: string;
  year?: number;
}

const book: Book = reactive({ title: "Vue 3 指引" });
</script>
```

## computed

接受一个 getter 函数，返回一个只读的响应式 ref 对象。该 ref 通过 .value 暴露 getter 函数的返回值。它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。

```vue
<script lang="ts" setup>
import { ref, reactive } from "vue";

const columns = ref<number[]>([1, 2, 3]);

const double = computed<number>(() => {
  return columns.value.reduce((total, item, index) => {
    return total + item;
  }, 0);
});
</script>
```

## defineProps

```vue
<script lang="ts" setup>
import { ref, reactive } from "vue";

type Props = {
  age?: number;
  sex: string;
  list: any;
};

const props = withDefaults(defineProps<Props>(), {});
</script>
```

```vue
<script lang="ts" setup>
import { ref, reactive } from "vue";

interface Book {
  title: string;
  author: string;
  year: number;
}

const props = defineProps<{
  book: Book;
}>();
</script>
```

## defineEmits

```vue
<script setup lang="ts">
// 运行时
const emit = defineEmits(["change", "update"]);

// 基于选项
const emit = defineEmits({
  change: (id: number) => {
    // 返回 `true` 或 `false`
    // 表明验证通过或失败
  },
  update: (value: string) => {
    // 返回 `true` 或 `false`
    // 表明验证通过或失败
  },
});

// 基于类型
const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();

// 3.3+: 可选的、更简洁的语法
const emit = defineEmits<{
  change: [id: number];
  update: [value: string];
}>();
</script>
```

demo

```vue
<template>
  <div @click="clickThis">点我</div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "click", num: number): void;
}>();

const clickThis = () => {
  emit("click", 2);
};
</script>

<style scoped lang="less"></style>
```

## provide / inject

provide 和 inject 通常会在不同的组件中运行。要正确地为注入的值标记类型，Vue 提供了一个 `InjectionKey` 接口，它是一个继承自 `Symbol` 的泛型类型，可以用来在提供者和消费者之间同步注入值的类型：

向子组件注入

```vue
<script lang="ts" setup>
import { ref, provide } from "vue";

const row = ref<any>({ a: 1, b: 2 });

provide("customProvide", row);
</script>
```

子组件接收

```vue
<script lang="ts" setup>
import { ref, inject, Ref } from "vue";

type Provide = {
  a?: number;
  b?: number;
};

const customProvide = inject<Ref<Provide>>("customProvide");
</script>
```

## 为模板引用标注类型

模板引用需要通过一个显式指定的泛型参数和一个初始值 null 来创建：

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";

const el = ref<HTMLInputElement | null>(null);

onMounted(() => {
  el.value?.focus();
});
</script>

<template>
  <input ref="el" />
</template>
```

## 为组件模板引用标注类型

```vue
<script setup lang="ts">
import MyModal from "./MyModal.vue";

const modal = ref<InstanceType<typeof MyModal> | null>(null);

const openModal = () => {
  modal.value?.open();
};
</script>
```

如果组件的具体类型无法获得，或者你并不关心组件的具体类型，那么可以使用 ComponentPublicInstance。这只会包含所有组件都共享的属性，比如 $el。

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { ComponentPublicInstance } from "vue";

const child = ref<ComponentPublicInstance | null>(null);
</script>
```

## watch

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

```vue
<script setup lang="ts">
import { ref, watch } from "vue";

watch(
  [fooRef, barRef],
  ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  },
  { deep: true }
);
</script>
```

## defineExpose

子组件暴露自己的属性，父组件直接获取

子组件

```vue
<template>
  <div>子组件helloword.vue</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const count = ref(123456);
defineExpose({ count });
</script>
```

父组件

```vue
<template>
  <div @click="helloClick">父组件</div>
  <helloword ref="hello"></helloword>
</template>

<script setup lang="ts">
import { ref } from "vue";
import helloword from "./components/HelloWorld.vue";

const hello = ref(null);
const helloClick = () => {
  console.log(hello.value.count); // 123456
};
</script>
```

## defineOptions

可以通过 defineOptions 宏在 script setup 中使用选项式 API，也就是说可以在一个宏函数中设置 name, props, emits, render。

```vue
<script setup lang="ts">
import { useSlots } from 'vue'
defineOptions({
  name: 'Foo',
  inheritAttrs: false,
  mounted() {
    console.log('mounted')
  },
  ...
})
const slots = useSlots()
</script>
```

## defineSlots

使用 defineSlots 可以在 script setup 中声明 SFC 中插槽的类型,比如我们有一个分页器组件，我们可以通过插槽来控制具体的 item 要如何渲染。

```vue
<script setup lang="ts" generic="T">
// 子组件 Paginator
defineProps<{
  data: T[];
}>();

defineSlots<{
  default(props: { item: T }): any;
}>();
</script>
```

```vue
<template>
  <!-- 父组件 -->
  <Paginator :data="[1, 2, 3]">
    <template #default="{ item }">{{ item }}</template>
  </Paginator>
</template>
```

## defineModel

defineModel 是一个新的 `script setup` 宏，旨在简化支持 v-model 的组件的实现, 这个宏用来声明一个双向绑定 prop，通过父组件的 v-model 来使用。

例举一个最简单的使用场景: 自定义组件中使用 v-model 来进行数据的双向绑定:

```vue
<!-- 父组件 -->
<template>
  <div>
    <!-- 自定义子组件 CustomComponent 使用 v-model 指令绑定 userName -->
    <CustomComponent v-model="userName" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomComponent from "./CustomComponent.vue";

const userName = ref("前端开发爱好者");
</script>
```

在 Vue3.3 版本之前，我们通常通过 props 接收 modelValue，然后在更新时，我们会将更新后的值传递给 emit 的 update:modelValue 并执行:

```vue
<!-- 子组件 CustomComponent  -->
<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);
</script>
```

Vue3.4 版本之后，我们将使用 defineModel 替代子组件中的 props 和 emit。

```vue
<!-- 子组件 CustomComponent  -->
<template>
  <input type="text" v-model="modelValue" />
</template>

<script setup>
const modelValue = defineModel();
</script>
```
