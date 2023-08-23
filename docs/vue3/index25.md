## toRefs()
torefs()函数可以将reactive()创建出来的响应式对象转换为普通的对象，只不过这个对象上的每个属性节点都是ref()类型的响应式数据

1. 当从组合式函数中返回响应式对象时，toRefs 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性
```js
<template>
    <p>
      <!-- 可以不通过state.value去获取每个属性 -->
      {{ count }} {{ value }}
    </p>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
export default {
  setup () {
    const state = reactive({
      count: 0,
      value: 'hello',
    })

    return {
      ...toRefs(state)
    };
  }
};
</script>
```

2. 链接reactive

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型：{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// 这个 ref 和源属性已经“链接上了”
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```