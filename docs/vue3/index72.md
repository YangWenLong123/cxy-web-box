## 树组件

```vue
<script setup lang="ts">
interface TreeData {
  key: string;
  title: string;
  children: TreeData[];
}
defineProps<{ data: TreeData[] }>();
</script>

<template>
  <!-- do something.... -->
</template>
```

## 解答

```vue
<script setup lang="ts">
import { h } from "vue";
interface TreeData {
  key: string;
  title: string;
  children: TreeData[];
}
const props = defineProps<{ data: TreeData[] }>();

const render = () => {
  function makeTree(data?: TreeData, depth: number) {
    if (!data) return;
    const nodes = [];

    for (let i = 0; i < data.length; i++) {
      const node = h("ul", [
        h("li", { key: data[i].key }, `${data[i].title} - depth (${depth})`),
        makeTree(data[i].children, depth + 1), // recursion for depth traversion
      ]);
      nodes.push(node);
    }

    return nodes;
  }

  return makeTree(props.data, 0);
};
</script>

<template>
  <render />
</template>
```

### 方案二

```vue
<script setup lang="ts">
import { ref } from "vue";
import TreeComponent from "./TreeComponent.vue";
const treeData = ref([
  {
    key: "1",
    title: "Parent 1",
    children: [
      {
        key: "1-1",
        title: "child 1",
      },
      {
        key: "1-2",
        title: "child 2",
        children: [
          {
            key: "1-2-1",
            title: "grandchild 1",
          },
          {
            key: "1-2-2",
            title: "grandchild 2",
          },
        ],
      },
    ],
  },
  {
    key: "2",
    title: "Parent 2",
    children: [
      {
        key: "2-1",
        title: "child 1",
        children: [
          {
            key: "2-1-1",
            title: "grandchild 1",
          },
          {
            key: "2-1-2",
            title: "grandchild 2",
          },
        ],
      },
      {
        key: "2-2",
        title: "child 2",
      },
    ],
  },
]);
</script>

<template>
  <TreeComponent :data="treeData" />
</template>
```

```vue
<script setup lang="ts">
interface TreeData {
  key: string;
  title: string;
  children: TreeData[];
}
defineProps<{ data: TreeData[] }>();
</script>

<template>
  <ol>
    <li v-for="{ children, ...item } in data" :key="item.key">
      <p>{{ item.title }}</p>
      <TreeComponent v-if="children && children.length" :data="children" />
    </li>
  </ol>
</template>
```
