## 概念

```js
vuex是一个专门为vue.js设计的集中式状态管理架构。
  State:单一状态树，也被人做为是唯一数据源。(存储数据)
  Getter:可以认为是store的计算属性，getter的返回值会根据它的依赖被缓存起来，只有它的依赖发生了改变才会被重新计算。
  Mutation:更改store的状态的方法就是提交mutatin，这个api类似于一个事件，每个mutation都会有一个字符串的事件类型和一个回调函数，在回调函数中处理状态更改。
  Action：类似于Mutation，不同的是在Action提交的是mutation，而不是直接变更状态。Action可以包含任意异步的操作
  module:使用单一状态树，应用所有的状态都会集中到一个比较大对象。当应用比较庞大的时候，store就会变得很臃肿。这时候就可以将store分割成模块module。每个模块都拥有自己的state,getter,mutation,action
```

## 例子

```js
//store.js
export default {
  //调用是按模块调用,防止重名
	namespaced: true,
  //数据源
	state: {
		userInfo: {},
    isLogin: null
	},
  //计算属性
  getters () {
  	userInfo: state => state.userInfo,
    isLogin: state => state.isLogin
  },
	mutations: {
		//更新用户数据
    setUserInfo (state, userInfo) {
    	state.userInfo = userInfo;
    }
	},
  //提交mutaions 异步
  actions () {
  	setUser ({commit}, userInfo) {
    	commit('setUserInfo',userInfo )
    }
  }
};
```

## 获取state

-   在Vue组件中获取Vuex属性

```js
computed:{
	userInfo: () => {
  	return this.$store.state.userInfo
  },
  isLogin: () => {
  	return this.$store.getters.isLogin
  }
}
```

## 辅助函数

-   mapState辅助函数，当一个组件需要获取多个状态时候，我们可以使用 mapState 辅助函数帮助我们生成计算属性

```js
import { mapState } from 'vuex';
computed: {
  ...mapState({
    userInfo: state => state.userinfo,
    isLogin: state => state.isLogin
  })
}
```

mapgetters辅助函数,mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性

```js
import { mapGetters } from 'vuex'
export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'userInfo',
      'isLogin'
    ])
  }
}
```

mapMutations

-  你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 store）。

```js
import { mapMutations } from 'vuex'
export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

mapActions

-  你在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 store）：

```js
import { mapActions } from 'vuex'
export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

## 数据派发

```js
//mution
this.$store.commit('eventBus', '提交数据');

//action
this.$store.dispatch('eventBus', {
	type: '',
  date: '提交数据'
});
```

## 持久化存储

我们知道vuex数据不是持久化存储，一定刷新页面，存储的数据也将会情况，那么我们可以采取本地存储结合vuex去做持久化存储。

<https://segmentfault.com/a/1190000022393039>

<https://www.npmjs.com/package/vuex-persistedstate>

## 文章

<https://www.bookstack.cn/read/vuex-3.x-zh/a4496ec79a3a2d2c.md>

<https://www.yuque.com/fe9/basic/aivfqs>