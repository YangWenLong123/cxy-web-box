## #全局组件注册

1.  创建组件构造器，Vue.extend()
1.  注册组件, Vue.component()

```js
const al = Vue.extend({
  template: `
              <div @click="handle()">{{msg}}</div>
            `,
  data () {
    return {
      msg: '我是自定义全局组件'
    }
  },
  methods: {
    handle () {
      console.log('我被点击了')
    }
  }
})
Vue.component('cpn', al)；
```

## #全局异步组件

```js
Vue.component('asyncTemp', function (resolve, reject) {
  setTimeout(function () {
    resolve({
      template: '<div @click="handle()">我会在两秒后加载</div>',
      methods: {
        handle () {
          console.log('我被点击了');
        }
      }
    })
  }, 2000)
})
```

## #全局低级静态组件

```js
//只会加载一次
Vue.component('terms-of-service', {
   template: `<div v-once>我只渲染一次</div>`
})
```

## #局部组件

```js
<script>
const test = {
  template: `<div @click="handle()">{{msg}}</div>`,
  data () {
    return {
      msg: '我是局部组件'
    }
  },
  methods: {
    handle () {
      console.log('我被点击了')
    }
  }
}

export default {
	components: { test }
}
</script>
```