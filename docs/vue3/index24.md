## toRef()
为源响应式对象上的某个属性创建一个ref对象，二者内部操作的是同一个数据值,更新时二者是同步的。相当于浅拷贝一个属性.

区别ref: 拷贝的是一份新的数据单独操作，更新时相互不影响，相当于深拷贝。

场景：当要将某个prop的ref传递给某个复合函数时，toRef很有用.

```js
import { reactive, ref, toRef } from 'vue'

export default {
  setup () {
    const m1 = reactive({
      a: 1,
      b: 2
    })

    const m2 = toRef(m1, 'a');
    const m3 = ref(m1.a);

    const update = () => {
      // m1.a++;//m1改变时，m2也会改变
      // m2.value++; //m2改变时m1同时改变
      m3.value++; //m3改变的同时，m1不会改变
    }

    return {
      m1,
      m2,
      m3,
      update
    }
  }
}
```

可以将值、refs 或 getters 规范化为 refs (3.3+)。

```js
// 按原样返回现有的 ref
toRef(existingRef)

// 创建一个只读的 ref，当访问 .value 时会调用此 getter 函数
toRef(() => props.foo)

// 从非函数的值中创建普通的 ref
// 等同于 ref(1)
toRef(1)
```