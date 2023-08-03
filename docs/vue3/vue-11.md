在Vue 3中调用子组件的方法可以通过以下步骤实现：

1.  在子组件中定义需要调用的方法，并使用`defineExpose`语法糖将其暴露出来。这是因为在Vue 3中，使用`<script setup>`标签的变量或方法需要手动暴露才能在组件外部直接访问到。

```js
   <!-- 子组件 Child.vue -->
   <script setup>
   const childMethod = () => {
     console.log('child method.')
   }
   // 主动暴露childMethod方法
   defineExpose({ childMethod })
   </script>


```

2.  在父组件中引用子组件，并使用`ref`给子组件添加一个引用。

```js
   <!-- 父组件 Parent.vue -->
   <template>
     <div>
       <Child ref="childRef" />
     </div>
   </template>
   <script>
   import { ref } from 'vue'
   import Child from './Child.vue'

   export default {
     components: {
       Child
     },
     setup() {
       const childRef = ref(null)
       return {
         childRef
       }
     }
   }
   </script>


```

3.  在父组件的代码中，通过访问`childRef.value`来调用子组件的方法。

```js
   <!-- 父组件 Parent.vue -->
   <script>
   export default {
     // ...
     methods: {
       callChildMethod() {
         this.$refs.childRef.value.childMethod()
       }
     }
   }
   </script>


```