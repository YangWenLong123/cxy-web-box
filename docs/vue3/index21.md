### onScopeDispose

全局钩子函数 onScopeDispose 提供了类似于 onUnmounted 的功能，不同的是它工作在scope中而不是当前instance。

这使得 composable functions 可以通过他们的scope清除他们的副作用。

由于 setup() 默认会为当前 instance 创建一个 scope，所以当没有明确声明一个scope的时候，onScopeDispose等同于onUnmounted。


```js
import { onScopeDispose } from 'vue'

const scope = effectScope()

scope.run(() => {
  onScopeDispose(() => {
    console.log('cleaned!')
  })
})

scope.stop() // logs 'cleaned!'

```