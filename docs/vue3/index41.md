## Teleport

描述：传送门组件提供一种简洁的方式可以指定它里面内容的父元素，允许我们控制`Teleport`的嵌套的内容在DOM中哪个父节点下呈现HTML,而不必求助于全局状态或者拆分为两个组件.

 -   to String 必传属性

<!---->

-   to="#last"
 -  to=".last"
 -  to="[data-teleport]"

<!---->

 -   disabled Boolean 可选属性

<!---->

-   用于禁用teleport的功能，意味着插槽的内容将不会移动到任何位置,而在父组件指定的位置渲染.

```js
<template>
  <div>
    <button @click="modelOpen = true">点击打开弹窗	</button>
    <teleport to="body">
      <div v-if="modelOpen" class="model">
        <div class="model-body">
          这是一个模态框
          <button @click="modelOpen = false">关闭弹窗</button>
        </div>
      </div>
    </teleport>
  </div>
</template>


<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: 'ModelButton',
    setup() {
      const modelOpen = ref(false);
      return {
        modelOpen
      }
    }
  })
</script>

<style scoped>
  .model {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .model-body {
    width: 300px;
    height: 250px;
    background: #fff;
  }
</style>
```

使用`Teleport`组件，通过props `to`属性指定该组件的渲染位置在body下，但该组件的状态`modelOpen`则是由vue内部组件控制.