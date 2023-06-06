## #Vue.set(target,propertName/index,value)

```js
//参数
{Object | Array} target
{string | number} propertyName/index
{any} value
```

-   场景：修改对象的属性，数据不能同步

```js
<template>
  {{ name[0] }}
  {{ JSON.stringify(user) }}
</template>

<script>
	export default {
		data () {
    	return {
        name: ['a','b','c'],
        user: {
        	name: 'along'
        }
      }
    },
    created () {
    	this.init();
      this.change();
    },
    updated () {
    	console.log(this.name);
    },
    methods:{
      //检测不到数组值更新
    	init () {
      	this.name[0] = '帅锅';
        //this.$set(this.name, 0, '帅锅');
      },
      //检测不到对象属性的添加和删除
      change () {
      	this.user.age = '18';
        this.$set(this.user, 'age', 18);
      }
    }
	}
</script>
```

## #Vue.delete(target，propertyName/index)

```js
//参数
{Object | Array} target
{string | number} propertyName/index
```

```js
//使用方式
<script>
	export default {
		data () {
    	return {
        name: ['a','b','c'],
        user: {
        	name: 'along'
        }
      }
    },
    methods:{
    	init () {
        this.$delete(this.name, 2);
        this.$delete(this.user, 'name');
      },
    }
	}
</script>
```

## #Vue.nextTick()

-   在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

2.1.0 起新增：如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。请注意 Vue 不自带 Promise 的 polyfill，所以如果你的目标浏览器不原生支持 Promise (IE：你们都看我干嘛)，你得自己提供 polyfill。

```js
//实现一个简易的nextTick
let callbacks = []
let pending = false

function nextTick (cb) {
    callbacks.push(cb)

    if (!pending) {
        pending = true
        setTimeout(flushCallback, 0)
    }
}

function flushCallback () {
    pending = false
    let copies = callbacks.slice()
    callbacks.length = 0
    copies.forEach(copy => {
        copy()
    })
}
```

## #Vue.extend()

```js
<template>
	<div id="mount"></div>
	//我是一个简单的构造器
</template>

const Profiy = Vue.extend({
	template: `<p>{{ msg }}</p>`,
  data () {
  	return {
    	msg: '我是一个简单的构造器'
    }
  }
})

new profiy().$mount('#mount');
```

## Vue.use(plugin,{ someOption: true })

```js
//使用方法
import ElementUI from 'element-ui'
Vue.use(ElementUI);
```

-   开发插件：Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```