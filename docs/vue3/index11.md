## isRef()
检查某个值是否为 ref。

```ts
function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
```

`示例`

```js
import { reactive, isRef, ref } from "vue";
const count = ref(1);
const testObj = reactive({
  a: 1,
});
console.log(isRef(count)); //true
console.log(isRef(testObj)); //false
```
