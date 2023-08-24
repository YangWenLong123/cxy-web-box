
## defineProps

获取组件传值

```js
<template>
  <h1>{{ msg }}</h1>
<div @click="clickThis">1111</div>
</template>

<script setup lang="ts">
  defineProps<{ // 采用ts专有声明，无默认值
  msg: string,
  num?: number
}>()
// 采用ts专有声明，有默认值
interface Props {
  msg?: string
  labels?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})

defineProps({ // 非ts专有声明
  msg: String,
  num: {
    type:Number,
    default: ''
  }
})
</script>

<style scoped lang="less">
</style>
```

## defineEmits

子组件向父组件事件传递

```js
<template>
  <div @click="clickThis">点我</div>
</template>

<script setup lang="ts">
    /*ts专有*/
  const emit= defineEmits<{
    (e: 'click', num: number): void
  }>()
    /*非ts专有*/
  const emit= defineEmits(['click'])

  const clickThis = () => {
    emit('click',2)
  }
</script>

<style scoped lang="less">
</style>
```

## defineExpose

子组件暴露自己的属性，父组件直接获取

```js
<template>
  <div>子组件helloword.vue</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(123456)
defineExpose({
  count
})
</script>

<style scoped lang="less">
</style>
```

```js
<template>
  <div @click="helloClick">父组件</div>
  <helloword ref="hello"></helloword>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import helloword from './components/HelloWorld.vue'
const hello = ref(null)
const helloClick = () => {
  console.log(hello.value.count) // 123456
}
</script>


<style lang="less" scoped>
</style>
```

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