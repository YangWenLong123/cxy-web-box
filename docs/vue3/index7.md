## computed()
接受一个 getter 函数，返回一个只读的响应式 ref 对象。该 ref 通过 .value 暴露 getter 函数的返回值。它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。

```ts
// 只读
function computed<T>(
  getter: () => T,
  // 查看下方的 "计算属性调试" 链接
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>
```

`示例`

创建一个只读的计算属性 ref：

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误
```

创建一个可写的计算属性 ref：
```js
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

调试

- onTrack 将在响应属性或引用作为依赖项被跟踪时被调用。
- onTrigger 将在侦听器回调被依赖项的变更触发时被调用。


```js
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    // 当 count.value 被追踪为依赖时触发
    debugger
  },
  onTrigger(e) {
    // 当 count.value 被更改时触发
    debugger
  }
})

// 访问 plusOne，会触发 onTrack
console.log(plusOne.value)

// 更改 count.value，应该会触发 onTrigger
count.value++
```

## 为 computed() 标注类型
computed() 会自动从其计算函数的返回值上推导出类型：

```ts
import { ref, computed } from 'vue'

const count = ref(0)

// 推导得到的类型：ComputedRef<number>
const double = computed(() => count.value * 2)

// => TS Error: Property 'split' does not exist on type 'number'
const result = double.value.split('')
```

你还可以通过泛型参数显式指定类型：

```ts
const double = computed<number>(() => {
  // 若返回值不是 number 类型则会报错
})
```