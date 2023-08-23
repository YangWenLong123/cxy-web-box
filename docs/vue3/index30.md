## Effect Scope API实战

一些 composables 会设置全局副作用，例如如下的 useMouse() function:

```js
function useMouse() {
	const x = ref(0)
  const y = ref(0)
  
  window.addEventListener('mousemove', handler)
  
  function handler(e) {
  	x.value = e.x
    y.value = e.y
  }
  
  onUnmounted(() => {
  	window.removeEventListener('mousemove', handler)
  })
  
  return {x,y}
  
}

```

如果在多个组件中调用 useMouse () ，则每个组件将附加一个 mouseemove 监听器，并创建自己的 x 和 y refs 副本。我们应该能够通过在多个组件之间共享相同的侦听器集和 refs 来提高效率，但是我们做不到，因为每个 onUnmounted 调用都耦合到一个组件实例。

我们可以使用分离作用域和 onScopeDispose 来实现这一点, 首先，我们需要用 onScopeDispose 替换 onUnmounted

```js
- onUnmounted(() => {
+ onScopeDispose(() => {
  window.removeEventListener('mousemove', handler)
})
```

这仍然有效，因为 Vue 组件现在也在作用域内运行其 setup () ，该作用域将在组件卸载时释放。

然后，我们可以创建一个工具函数来管理父范围订阅:

```js
function createSharedComposable(composable) {
  let subscribers = 0
  let state, scope

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      state = scope = null
    }
  }
	
 	// 这里只有在第一次运行的时候创建一个state, 后面所有的组件就不会再创建新的state，而是共用一个state
  return (...args) => {
    subscribers++
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    onScopeDispose(dispose)
    return state
  }
}
```
现在我们就可以使用这个 shared 版本的 useMouse
```js
const useSharedMouse = createSharedComposable(useMouse)
```