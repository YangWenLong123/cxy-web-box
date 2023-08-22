## watchEffect

watchEffect会自动收集函数里面变量的响应式依赖。在初始化的时候watchEffect会自动执行一次（这是无法阻止的），之后watchEffect会根据收集到的响应式依赖，在变量发生改变时就会被触发。

```ts
function watchEffect(
  effect: (onCleanup: OnCleanup) => void,
  options?: WatchEffectOptions
): StopHandle

type OnCleanup = (cleanupFn: () => void) => void

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

type StopHandle = () => void
```

`详细信息`

第一个参数就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。

第二个参数是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。

默认情况下，侦听器将在组件渲染之前执行。设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行。详见回调的触发时机。在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。这可以通过设置 flush: 'sync' 来实现。然而，该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题。

返回值是一个用来停止该副作用的函数。

`示例`

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 输出 0

count.value++
// -> 输出 1
```

## 基本使用
下面例子中`watchEffect`中只有`name`是响应式对像，它会在页面初始化的时候就执行一次用于收集`name`的响应式依赖，`changeName`事件被触发时，`name`被改变了，对应的就会触发`watchEffect`；当`changeAge`触发时，因为并没有在`watchEffect`中使用`age`，所以`watchEffect`没有收集到对应的响应式依赖，`watchEffect`就不会被触发。

```js
 <template>
   <div id="app">
     <h2>{{ name }}</h2>
     <h2>{{ age }}</h2>
     <button @click="changeName">修改name</button>
     <button @click="changeAge">修改Age</button>
   </div>
 </template>
 ​
 <script>
 import { watchEffect, defineComponent, ref } from "vue";
 ​
 export default defineComponent({
   setup() {
     //watchEffect：自动收集响应式依赖，默认初始化就会执行一次
     const name = ref("李四")
     const age = ref(18)
 ​
     
     watchEffect(() => {
       console.log("name:", name.value);
     })
       
     const changeName = () => name.value += "1"
     const changeAge = () => age.value += 1
 ​
     return {
       name,
       age,
       changeName,
       changeAge
     }
   },
 });
 </script>
 ​
 <style scoped></style>
```

## 停止监听
`watchEffect`会返回一个函数，这个函数可以用于停止对响应式对象的监听，下面例子中当age > 25是就会停止监听：

```js
 <template>
   <div id="app">
     <h2>{{ name }}</h2>
     <h2>{{ age }}</h2>
     <button @click="changeName">修改name</button>
     <button @click="changeAge">修改Age</button>
   </div>
 </template>
 ​
 <script>
 import { watchEffect, defineComponent, ref } from "vue";
 ​
 export default defineComponent({
   setup() {
     //watchEffect：自动收集响应式依赖，默认初始化就会执行一次
     const name = ref("李四")
     const age = ref(18)
 ​
     // wacthEffect会返回一个函数，这个函数可用于停止所有的wacthEffect的侦听
     const stop = watchEffect(() => {
       console.log("userInfo:", name.value,age.value);
     })
 ​
     const changeName = () => name.value += "1"
     const changeAge = () => {
       age.value += 1
       // 当 age > 25 时停止侦听
       if(age.value > 25) stop()
     }
 ​
     return {
       name,
       age,
       changeName,
       changeAge
     }
   },
 });
 </script>
 ​
 <style scoped></style>
```

## 副作用清除

在使用监听的时候我们可能会向服务器发送请求，当监听的数据频繁变化时，这种请求就会频繁触发，这无疑极大的浪费了服务器性能。`watchEffect`第一个参数就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调，下面是官方给的例子：

```js
watchEffect(async (onCleanup) => {
  const { response, cancel } = doAsyncWork(id.value)
  // `cancel` 会在 `id` 更改时调用
  // 以便取消之前
  // 未完成的请求
  onCleanup(cancel)
  data.value = await response
})
```

## 执行时机

有时候我们需要去监听`dome`的变化，通过`ref`拿到的`dome`在`watchEffect`第一次执行时是`null`，这是因为此时`dome`还未渲染完成。`watchEffec`的第二个参数是一个可选项，其中`flush`可以用来调整`watchEffect`执行时机。

`例子`

默认’pre‘：侦听器会在组件渲染前执行，控制台会输出两次，第一次为null,第二次是页面渲染完成成功获取到组件的时候，会输出组件的引用：

```js
 template>
   <div id="app">
     <h2 ref="name">张三</h2>
   </div>
 </template>
 ​
 <script>
 import { watchEffect, defineComponent, ref } from "vue";
 ​
 export default defineComponent({
   setup() {
       // 执行时机（flush）：'pre' | 'post' | 'sync' // 默认'pre'
       const name = ref(null)
       watchEffect(() => {
           console.log("nameDome:", name.value);
       })
     return {
       name
     }
   },
 });
 </script>
 ​
 <style scoped></style>

```

执行结果截图如下： 我们可以在控制台上看到`wathcEffect`在渲染完成之前执行了一次，此时的`name`为`null`，当渲染完成之后`name`的值发生了改变，`watchEffect`再次执行，输出这个节点：

![a1.png](http://cdn.alongweb.top/images/webbox/a2.webp)

修改为flush: 'post'：它将会使侦听器延迟到组件渲染之后再执行。在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。所以控制台只会输出一次，输出的是组件的引用：

```js
 <template>
   <div id="app">
     <h2 ref="name">张三</h2>
   </div>
 </template>
 ​
 <script>
 import { watchEffect, defineComponent, ref } from "vue";
 ​
 export default defineComponent({
   setup() {
       // 执行时机（flush）：'pre' | 'post' | 'sync' // 默认'pre'
       const name = ref(null)
       watchEffect(() => {
           console.log("nameDome:", name.value);
       }, {
         flush: 'post'
       })
 ​
     return {
       name
     }
   },
 });
 </script>
 ​
 <style scoped></style>

```
执行结果截图如下： ，延后执行之后就不会触发一次无意义的监听了

![a1.png](http://cdn.alongweb.top/images/webbox/a1.webp)


## watchPostEffect()

`watchEffect()` 使用 `flush: 'post'` 选项时的别名。

## watchSyncEffect()

`watchEffect()` 使用 `flush: 'sync'` 选项时的别名。