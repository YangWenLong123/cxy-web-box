## 常规跳转

```js
this.$router.replace({
	name: '',
  query: {}
})
```

```
this.$router.replace({
  path: '',
  query: {}
});
```

##

## 编程式导航新开页打开

```js
let routeData = this.$router.resolve({
  name: '',
  query: {},
  param: {}
});

window.open(routeData.href, '_blank');
```

## 当前页面路由添加参数

```js
const order_type = 'order_type';

this.$router.replace('?ORDER_TYPE=' + order_type);
```

## 实现简易版router

```js
let Vue
class VueRouter {
  constructor(options) {
    this.$options = options
    this.routeMap = {}
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
    Vue.util.defineReactive(this, 'current', '/')
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange() {
    this.current = window.location.hash.slice(1)
  }
}

VueRouter.install = function (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      let router = this.$options.router
      if (!router) return
      Vue.prototype.$router = router
    }
  })
  Vue.component('router-view', {
    render(h) {
      const { routeMap, current } = this.$router
      return h(routeMap[current] ? routeMap[current].component : null)
    }
  })

  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: ''
      }
    },
    render(h) {
      return h('a', {
        attrs: {
          href: `#${this.to}`
        }
      }, this.$slots.default)
    }
  })
}

export default VueRouter
```