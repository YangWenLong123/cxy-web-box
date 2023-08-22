## watch 
侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

```ts
// 侦听单个来源
function watch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): StopHandle

// 侦听多个来源
function watch<T>(
  sources: WatchSource<T>[],
  callback: WatchCallback<T[]>,
  options?: WatchOptions
): StopHandle

type WatchCallback<T> = (
  value: T,
  oldValue: T,
  onCleanup: (cleanupFn: () => void) => void
) => void

type WatchSource<T> =
  | Ref<T> // ref
  | (() => T) // getter
  | T extends object
  ? T
  : never // 响应式对象

interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // 默认：false
  deep?: boolean // 默认：false
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}
```

`详细信息`

watch() 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。

第一个参数是侦听器的源。这个来源可以是以下几种：

- 一个函数，返回一个值
- 一个 ref
- 一个响应式对象
- ...或是由以上类型的值组成的数组

第二个参数是在发生变化时要调用的回调函数。这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求。

当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。

第三个可选的参数是一个对象，支持以下这些选项：

- immediate：在侦听器创建时立即触发回调。第一次调用时旧值是 undefined。
- deep：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考深层侦听器。
- flush：调整回调函数的刷新时机。参考[回调的刷新时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)及 `watchEffect()`。
- onTrack / onTrigger：调试侦听器的依赖。参考[调试侦听器](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#watcher-debugging)。


## watch与watchEffect的区别
- watchEffect会在组件初始化的时候就会执行一次与computed同理，而收集到的依赖变化后，这个回调才会执行，而watch不需要，除非设置了指定参数。
- watchEffect不需要指定监听属性，可以自动收集依赖，只要我们回调中引用了响应式的属性，那么这些属性变更的时候，这个回调都会执行，而watch只能监听指定的属性而做出变更
- watch可以获取到新值和旧值，而watchEffect获取不到


## 监听一个ref
```js
 <template>
   <div id="app">
     <h2>{{ name }}</h2>
     <button @click="changeName">改变用户数据</button>
   </div>
 </template>
 ​
 <script>
 import { watch, defineComponent, reactive, ref } from "vue";
 ​
 export default defineComponent({
   setup() {
      //  传入ref对象，newValue和oldValue是对应的value值
      const name = ref('张三')
      watch(name, (newVlaue,oldValue) => {
        console.log('name:',newVlaue,oldValue);
      })
     const changeName = ()=>{
       name.value += "1"
     }
     return {
       name,
       changeName
     }
   },
 });
 </script>
 ​
 <style scoped></style>

```

## 监听多个来源

```js
 <template>
   <div id="app">
     <h2>{{ name }}</h2>
     <h2>{{ age }}</h2>
     </h2>
     <button @click="changeInfo">改变用户数据</button>
   </div>
 </template>
 ​
 <script>
 import { watch, defineComponent, reactive, ref } from "vue";
 ​
 export default defineComponent({
   setup() {
      //  传入多个对象，newValue和oldValue是对应的value值
      const name = ref('张三')
      const age = ref(18)
      watch([name,age], ([newName,newAge],[oldName,oldAge]) => {
        console.log('new:',newName,newAge,'old',oldName,oldAge);
      })
     const changeInfo = ()=>{
       name.value += "1"
       age.value += 1
     }
     return {
       name,
       age,
       changeInfo
     }
   },
 });
 </script>
 ​
 <style scoped></style>

```

## 监听reactive对象

传入reactive对象，callback对应的value和oldValue都将是reactive对象，下面userInfo是一个reactive对象，所以newValue和oldValue都会是reactive对象

```js
 <template>
   <div id="app">
     <h2>{{ userInfo.name }}</h2>
     <h2>{{ userInfo.age }}</h2>
     <button @click="changeInfo">改变用户数据</button>
   </div>
 </template>
 ​
 <script>
 import { watch, defineComponent, reactive, ref } from "vue";
 ​
 export default defineComponent({
   setup() {
     const userInfo = reactive({ name: '张三', age: 18 })
     // 传入reactive对象
      watch(userInfo, (newValue, oldValue) => {
          console.log('userInfo',newValue,oldValue);
      })
     const changeInfo = ()=>{
       userInfo.name += "1"
       userInfo.age += 1
     }
     return {
       userInfo,
       changeInfo
     }
   },
 });
 </script>
 ​
 <style scoped></style>

```

如果我们不希望得到响应式的newValue和oldValue，那么我们可以使用getter函数传参方式对reactive进行解构

```js
 <template>
   <div id="app">
     <h2>{{ userInfo.name }}</h2>
     <h2>{{ userInfo.age }}</h2>
     <button @click="changeInfo">改变用户数据</button>
   </div>
 </template>
 ​
 <script>
 import { watch, defineComponent, reactive, ref } from "vue";
 ​
 export default defineComponent({
   setup() {
     const userInfo = reactive({ name: '张三', age: 18 })
     // 如果不希望newValue和oldValue是reactive对象可以在传入时对它进行解构
     watch(() => { return {...userInfo} }, (newValue, oldValue) => {
       console.log('userInfo:',newValue,oldValue);
     })
     const changeInfo = ()=>{
       userInfo.name += "1"
       userInfo.age += 1
     }
     return {
       userInfo,
       changeInfo
     }
   },
 });
 </script>
 ​
 <style scoped></style>

```

## 监听一个getter函数
传入getter函数，下面摘自官网的描述："当使用 getter 函数作为源时，回调只在此函数的返回值变化时才会触发。如果你想让回调在深层级变更时也能触发，你需要使用 { deep: true } 强制侦听器进入深层级模式。在深层级模式时，如果回调函数由于深层级的变更而被触发，那么新值和旧值将是同一个对象。"
```js
 <template>
   <div id="app">
     <h2>{{ userInfo.name }}</h2>
     <h2>{{ userInfo.age }}</h2>
     <button @click="changeInfo">改变用户数据</button>
   </div>
 </template>
 ​
 <script>
 import { watch, defineComponent, reactive, ref } from "vue";
 ​
 export default defineComponent({
   setup() {
     const userInfo = reactive({ name: '张三', age: 18 })
 ​
     // 二、传入getter函数形式
     watch(() => userInfo.name, (newVlaue,oldValue) => {
       console.log('newValue',newVlaue,'oldValue',oldValue)
     }, { deep: true })
 ​
     const changeInfo = ()=>{
       userInfo.name += "1"
       userInfo.age += 1
     }
     return {
       userInfo,
       changeInfo
     }
   },
 });
 </script>
 ​
 <style scoped></style>
```

## watch() 和 watchEffect() 享有相同的刷新时机和调试选项

```js
watch(source, callback, {
  flush: 'post',
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

## 停止侦听器
```js
const stop = watch(source, callback)

// 当已不再需要该侦听器时：
stop()
```

## 副作用清理
有时候watch()监视的值发生了变化，我们期望清除无效的异步任务，此时watch回调函数中提供了cleanup registrator function来执行清除工作
```js
<template>
    <p>
        <input type="text" v-model="keyword">
    </p>
</template>

<script>
import { watch, ref } from 'vue';
export default {
    setup () {
        const keyword = ref('');

        const asyncPrint = val => {
            return setTimeout(()=>{
                console.log(val);
            },1000);
        }

        watch(keyword, (keyword, prevKeyword, onCleanup) => {
            const timeId = asyncPrint(keyword);

            onCleanup(()=> clearTimeout(timeId));
        }, {lazy: true})

        return {
           keyword
        };
    }
};
</script>
```