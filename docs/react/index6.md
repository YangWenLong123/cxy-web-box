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
