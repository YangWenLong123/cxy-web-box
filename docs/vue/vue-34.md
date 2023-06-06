## 介绍

Composition API的主要思想是，我们将它们定义为从新的 setup 函数返回的JavaScript变量，而不是将组件的功能（例如state、method、computed等）定义为对象属性。

## 案例对比

-   下面是一个经典的vue2的计数器案例.

```js
//Counter.vue
export default {
  data: () => ({
    count: 0
  }),
  methods: {
    increment() {
      this.count++;
    }
  },
  computed: {
    double () {
      return this.count * 2;
    }
  }
}
```

-   下面是使用Composition API定义的完全相同的组件

```js
// Counter.vue
import { ref, computed } from "vue";

export default {
  setup() {
    const count = ref(0);
    const double = computed(() => count * 2)
    function increment() {
      count.value++;
    }
    return {
      count,
      double,
      increment
    }
  }
}
```

ref:导入了ref函数,表示该函数允许我们定义一个响应式变量,其作用与data变量几乎相同。

count.value：increment方法是一个普通的javascript函数，需要更改子属性count的value才能更改响应式变量，这是因为使用red创建的响应式变量必须是对象，以便在传递的时候保持一致。

## 代码提取

Composition API的第一个明显优点是提取逻辑很容易。使用Composition提取上面Counter.vue组件代码。

```js
//useCounter.js
import { ref, computed } from "vue";

export default function () {
  const count = ref(0);
  const double = computed(() => count * 2)
  function increment() {
    count.value++;
  }
  return {
    count,
    double,
    increment
  }
}
```

## 代码重用

要在组件中使用该函数，我们只需将模块导入组件文件并调用它（注意导入是一个函数）。这将返回我们定义的变量，随后我们可以从 setup 函数中返回它们。

```js
// MyComponent.js
import useCounter from "./useCounter.js";

export default {
  setup() {
    const { count, double, increment } = useCounter();
    return {
      count,
      double,
      increment
    }
  }
}
```

## 解决mixins命名冲突

在vue2中，可能会有相同命名的变量或者函数，会导致冲突，使用composition代替后，就可以解决了。

```js
export default {
  setup () {
    const { someVar1, someMethod1 } = useCompFunction1();
    const { someVar2, someMethod2 } = useCompFunction2();
    return {
      someVar1,
      someMethod1,
      someVar2,
      someMethod2
    }
  }
}
```