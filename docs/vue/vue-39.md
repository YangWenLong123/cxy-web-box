## provide & inject

provide和inject可以实现嵌套组件共享数据.这两个函数只能在setup()函数中使用。父级组件中使用provide()函数向下传递数据；子级组件使用inject()获取上层传递的数据.这个是可以无限向下层组件传递.

-   父组件

```js
<template>
    <p>
        <Test />
    </p>
</template>

<script>
import { provide } from 'vue';
import Test from "./test2";
export default {
    components: { Test },
    setup () {
        provide('info', {
            name: 'along',
            age: 18,
            sex: '男'
        })
    }
};
</script>
```

-   子组件

```js
<script>
import { inject } from 'vue';
export default {
    setup () {
        const info = inject('info');//{name: "along", age: 18, sex: "男"}
    }
};
</script>
```

...