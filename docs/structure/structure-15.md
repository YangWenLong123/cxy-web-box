## Functional components

优化前的组件代码

```js
<template>
  <div class="cell">
    <div v-if="value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>

<script>
  export default {
    props: ['value'],
  }
</script>
```

优化后的组件代码

```js
<template functional>
  <div class="cell">
    <div v-if="props.value" class="on"></div>
    <section v-else class="off"></section>
  </div>
</template>
```

然后我们在父组件各渲染优化前后的组件 800 个，并在每一帧内部通过修改数据来触发组件的更新，开启 Chrome 的 Performance 面板记录它们的性能，得到如下结果。

优化前：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/755a23c7dc8f4ae69633050b51092a78~tplv-k3u1fbpfcp-zoom-1.image)

优化后：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6af1e8f26f24aa59efdda7d9363f0ce~tplv-k3u1fbpfcp-zoom-1.image)

函数式组件和普通的对象类型的组件不同，它不会被看作成一个真正的组件，我们知道在 patch 过程中，如果遇到一个节点是组件 vnode，会递归执行子组件的初始化过程；而函数式组件的 render 生成的是普通的 vnode，不会有递归子组件的过程，因此渲染开销会低很多。

因此，函数式组件也不会有状态，不会有响应式数据，生命周期钩子函数这些东西。你可以把它当成把普通组件模板中的一部分 DOM 剥离出来，通过函数的方式渲染出来，是一种在 DOM 层面的复用

## Child component splitting

子组件拆分

优化前组件代码：

```js
<template>
  <div :style="{ opacity: number / 300 }">
    <div>{{ heavy() }}</div>
  </div>
</template>

<script>
export default {
  props: ['number'],
  methods: {
    heavy () {
      const n = 100000
      let result = 0
      for (let i = 0; i < n; i++) {
        result += Math.sqrt(Math.cos(Math.sin(42)))
      }
      return result
    }
  }
}
</script>
```

优化后组件代码：

```js
<template>
  <div :style="{ opacity: number / 300 }">
    <ChildComp/>
  </div>
</template>

<script>
export default {
  components: {
    ChildComp: {
      methods: {
        heavy () {
          const n = 100000
          let result = 0
          for (let i = 0; i < n; i++) {
            result += Math.sqrt(Math.cos(Math.sin(42)))
          }
          return result
        },
      },
      render (h) {
        return h('div', this.heavy())
      }
    }
  },
  props: ['number']
}
</script>
```

然后我们在父组件各渲染优化前后的组件 300 个，并在每一帧内部通过修改数据来触发组件的更新，开启 Chrome 的 Performance 面板记录它们的性能，得到如下结果。

优化前：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5b7a6fb28864703971b55f48b648ce9~tplv-k3u1fbpfcp-zoom-1.image)

优化后：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce11744a7e2240cf8005bb43abff7deb~tplv-k3u1fbpfcp-zoom-1.image)

## Local variables

局部变量

优化前代码：

```js
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ['start'],
  computed: {
    base () {
      return 42
    },
    result () {
      let result = this.start
      for (let i = 0; i < 1000; i++) {
        result += Math.sqrt(Math.cos(Math.sin(this.base))) + this.base * this.base + this.base + this.base * 2 + this.base * 3
      }
      return result
    },
  },
}
</script>
```

优化后代码：

```js
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ['start'],
  computed: {
    base () {
      return 42
    },
    result ({ base, start }) {
      let result = start
      for (let i = 0; i < 1000; i++) {
        result += Math.sqrt(Math.cos(Math.sin(base))) + base * base + base + base * 2 + base * 3
      }
      return result
    },
  },
}
</script>
```

然后我们在父组件各渲染优化前后的组件 300 个，并在每一帧内部通过修改数据来触发组件的更新，开启 Chrome 的 Performance 面板记录它们的性能，得到如下结果。
优化前：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecc9c8a6c65741c7943129eb0aea4224~tplv-k3u1fbpfcp-zoom-1.image)

优化后：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ffb9d3ae652438788b36aa878d77fc9~tplv-k3u1fbpfcp-zoom-1.image)

访问this.base，他是一个响应式对象，会触发getter，用base缓存this.base就不会出发this.base.

## Reuse DOM with v-show

巧用v-show，切换比较频繁，tab切换

优化前组件代码

```js
<template functional>
  <div class="cell">
    <div v-if="props.value" class="on">
      <Heavy :n="10000"/>
    </div>
    <section v-else class="off">
      <Heavy :n="10000"/>
    </section>
  </div>
</template>
```

优化后组件代码

```js
<template functional>
  <div class="cell">
    <div v-show="props.value" class="on">
      <Heavy :n="10000"/>
    </div>
    <section v-show="!props.value" class="off">
      <Heavy :n="10000"/>
    </section>
  </div>
</template>
```

v-if会重新渲染组件,v-if不会

## KeepAlive

使用KeepAlive缓存Dom

优化前代码

```js
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
```

优化后代码

```js
<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
```

keepAlive包裹的的组件经过第一次渲染后的vnode和DOm，会被缓存起来，下次渲染的时候，直接从缓存里拿，不需要重新执行渲染过程。主要思想：空间换时间

## Web Worker

在vue中使用worker做复杂计算

```js
npm install vue-worker --save
```

```js
import Vue from 'vue'
import VueWorker from 'vue-worker'
Vue.use(VueWorker)
```

```js
run方法 执行一次就会断开

this.$worker.run((n, b) => n + 10 + b, [2, 10]).then(res => {
  console.log(res)
})
```

```js
create 持久化

data () {
  return {
    worker: null,
    action: [{
      message: 'abc',
      func (data) {
        return data
      }
    }, {
      message: 'msg',
      func (data) {
        return data
      }
    }]
  }
}

this.worker = this.$worker.create(this.action)

this.worker.postMessage('msg', [{ name: '哈哈哈' }]).then(res => {
  console.log(res)
})
```

js是单线程，worker可以开启多线程，不会阻塞代码。

## vue-lazyload

图片懒加载

```js
npm i vue-lazyload -D
```

```js
import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件

Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/img/error.jpg'),
  loading: require('./assets/img/homePage_top.jpg'),
  attempt: 2,
})
```

```js
<img v-lazy="item" alt="" style="width: 768px;">

data () {
  return {
    item: require('../assets/img/1.jpg')
  }
}
```

原理：

1.  1.  1.  加载loading图片
        1.  判断哪些图片需要加载（如何判断图片进入可视区）
        1.  隐藏加载图片
        1.  替换真实图片

## beforeDestroy

在组件销毁之前，移除事件监听、定时器等，内存不被回收，可能造成内存溢出。

## Key

看下面一个图，使用index作为key值，插入一个元素，会发生什么变化？

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36136ba3d7f74ece98b31dba5f3d4d80~tplv-k3u1fbpfcp-zoom-1.image)

li1,li2没有重新渲染，li3,li4重新渲染，但这不是最好的结果

使用id，唯一值作为key值，看下图

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef1aebaaa7854ba98dbfc3693205eb12~tplv-k3u1fbpfcp-zoom-1.image)

插入元素后，另外4个key值没有发生变化，不会重新渲染。

## 构建配置

-   [√ 压缩图片](https://github.com/staven630/vue-cli4-config#compressimage)
-   [√ 自动生成雪碧图](https://github.com/staven630/vue-cli4-config#spritesmith)
-   [√ 去除多余无效的 css](https://github.com/staven630/vue-cli4-config#removecss)
-   [√ 添加打包分析](https://github.com/staven630/vue-cli4-config#analyze)
-   [√ 配置 externals 引入 cdn 资源](https://github.com/staven630/vue-cli4-config#externals)
-   [√ 多页面打包 multi-page](https://github.com/staven630/vue-cli4-config#multiple-pages)
-   [√ 删除 moment 语言包](https://github.com/staven630/vue-cli4-config#moment)
-   [√ 去掉 console.log](https://github.com/staven630/vue-cli4-config#log)
-   [√ 利用 splitChunks 单独打包第三方模块](https://github.com/staven630/vue-cli4-config#splitchunks)
-   [√ 开启 gzip 压缩](https://github.com/staven630/vue-cli4-config#gzip)
-   [√ 预渲染 prerender-spa-plugin](https://github.com/staven630/vue-cli4-config#prerender)
-   [√ 完整依赖](https://github.com/staven630/vue-cli4-config#allconfig)