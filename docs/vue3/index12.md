## 手写功能函数

1. [isRef()](#isref)
2. [unRef](#unref)
3. [toRef](#toref)
4. [toRefs](#torefs)
5. [toValue](#tovalue)
6. [isProxy](#isproxy)
7. [isReactive](#isreactive)
8. [isReadonly](#isreadonly)

## isRef

```js
function isRef(obj) {
  return obj && obj.__v_isRef
}
```

## unRef

```js
function unRef(ref) {
  return isRef(ref) ? ref.value : ref
}

```

## toRef
## toRefs
## toValue
## isProxy
## isReactive
## isReadonly

