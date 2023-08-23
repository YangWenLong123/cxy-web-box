## getCurrentScope
如果有的话，返回当前活跃的 effect 作用域。

```js
import { getCurrentScope } from 'vue'
getCurrentScope() // EffectScope | undefined

```

这个函数会返回当前的 `EffectScope`，如果当前没有 `EffectScope`，则会返回 `undefined`