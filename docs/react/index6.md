## Hook 一览

- `useState:`用于管理功能组件中的状态。
- `useEffect:`用于在功能组件中执行副作用，例如获取数据或订阅事件。
- `useLayoutEffect:`与 useEffect 类似，但效果在所有 DOM 突变后同步运行。
- `useReducer:`用于通过 reducer 函数管理状态，类似于 Redux 的工作原理。
- `useRef:`用于创建对跨渲染持续存在的元素或值的可变引用。
- `useImperativeHandle:`向父组件暴露一个自定义的 ref 句柄
- `useContext:`用于访问功能组件内的 React 上下文的值。
- `useMemo:`它在每次重新渲染的时候能够缓存计算的结果
- `useCallback:`允许你在多次渲染中缓存函数
- `useDebugValue:`自定义 Hook 添加标签
- `useDeferredValue:`可以让你延迟更新 UI 的某些部分
- `useId:`可以生成传递给无障碍属性的唯一 ID
- `useInsertionEffect:`可以在布局副作用触发之前将元素插入到 DOM 中
- `useSyncExternalStore:`订阅外部 store
- `useTransition:`不阻塞 UI 的情况下更新状态的 React Hook

## useState

useState 是一个 React Hook，它允许你向组件添加一个 状态变量。

```js
const [state, setState] = useState(initialState);
```

### useState 使用示例

```js
const [name, setName] = useState("React"); // 参数是String

const [age, setAge] = useState(9); // 参数是Number

const [features, setFeatures] = useState([{ text: "JSX" }]); // 参数是Object

const [count, setCount] = useState(() => {
  // 先执行一定的逻辑，后再返回初始值
  const initialState = computedBaseCount(props);
  return initialState;
}); // 参数是Function
```

### 根据先前的 state 更新 state

假设 `age` 为 `42`，这个处理函数三次调用 `setAge(age + 1)`：

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

然而，点击一次后，`age` 将只会变为 `43` 而不是 `45`！这是因为调用 `set` 函数 `不会更新` 已经运行代码中的 `age` 状态变量。因此，每个 `setAge(age + 1)` 调用变成了 `setAge(43)`。

为了解决这个问题，你可以向 `setAge` 传递一个 更新函数，而不是下一个状态：

```js
function handleClick() {
  setAge((a) => a + 1); // setAge(42 => 43)
  setAge((a) => a + 1); // setAge(43 => 44)
  setAge((a) => a + 1); // setAge(44 => 45)
}
```

### 更新状态中的对象和数组

你可以将对象和数组放入状态中。在 React 中，状态被认为是只读的，因此 你应该替换它而不是改变现有对象。例如，如果你在状态中保存了一个 `form` 对象，请不要改变它：

```js
// 🚩 不要像下面这样改变一个对象：
form.firstName = "Taylor";
```

相反，可以通过创建一个新对象来替换整个对象：

```js
// ✅ 使用新对象替换 state
setForm({
  ...form,
  firstName: "Taylor",
});
```

示例

```js
import { useState } from "react";

export default function Form() {
  const [form, setForm] = useState({
    firstName: "Barbara",
  });

  return (
    <>
      <label>
        First name:
        <input
          value={form.firstName}
          onChange={(e) => {
            setForm({
              ...form,
              firstName: e.target.value,
            });
          }}
        />
      </label>

      <p>{form.firstName}</p>
    </>
  );
}
```

## useEffect

`useEffect` 是 React 中用于执行副作用操作的 Hook，并且具有类似于生命周期方法的功能。

`useEffect` 接受两个参数：副作用函数和依赖数组。

1、副作用函数：第一个参数是一个函数，用于执行副作用操作。

2、依赖数组：第二个参数是一个数组，包含了副作用函数中所依赖的变量。如果省略这个参数，那么副作用函数会在每次组件重新渲染时都执行，可以充当 `componentDidUpdate` 这个生命周期；如果传入空数组 []，则副作用函数只会在组件挂载时执行，相当于 `componentDidMount`；如果依赖数组中包含了某些变量，则只有这些变量发生变化时，副作用函数才会重新执行。如果我们在其中 return 一个函数，这个函数将会在组件卸载时除非，相当于 `componentWillUnmount`。

| 依赖项         | 副作用函数执行时机                  |
| -------------- | ----------------------------------- |
| 没有依赖项     | 组件初始渲染 + 组件更新时执行       |
| 空数组依赖项   | 只在初次渲染时执行一次              |
| 添加特定依赖项 | 组件初始渲染 + 特定依赖项变化时执行 |

## useLayoutEffect

## useReducer

## useReducer+immer

## useRef

## forwardRef+useImperativeHandle

## useContext

## memo+useMemo+useCallback

## useDebugValue

## useDeferredValue

## useId

## useInsertionEffect

## useSyncExternalStore

## useTransition
