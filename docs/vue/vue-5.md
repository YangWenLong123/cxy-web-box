## 全局钩子函数

```js
to:进入到哪个路由
from:从哪个路由离开
next:管道函数,决定是否通过

router.beforeEach((to, from, next) => {
 console.log(to);
 console.log(from);
 next()
})

router.beforeResolve((to, from, next) => {
  console.log("before resolve invoked")
  next();
});

router.afterEach((to, from) => {
  console.log(to);
  console.log(from);
})
```

-   场景:检测页面登录状态,页面权限。

## 组件内钩子函数

```js
beforeRouteEnter 是组件内的路由导航守卫，在确认渲染该组件的对应路由前调用。该守卫不能访问 this，但我们通过传一个回调给 next，就可以使用上面的 vm 来访问组件实例。守卫的参数说明如下：
	to：即将要进入的目标路由
	from：当前导航正要离开的路由，from.name 是路由的名称，对应路由配置中的 name
	next：一个用来 resolve 当前钩子的方法，需要调用该方法来确认或者中断导航

//进入组件执行
beforeRouteEnter(to, from, next) {
  next(vm => {
  	// 通过 vm 参数访问组件实例
    if () {
    	console.log('通过');
    }else{
    	console.log('不通过');
   	}
  })
}

//离开组件执行
beforeRouteLeave(to, from, next) {
  if(confirm("确定离开吗？") == true){
    next();
  }else{
    next(false);
  }
}
```

## 路由钩子函数

```js
//进入页面前执行,符合条件next();
{
  path: '/text',
  component: Test,
  beforeEnter: (to, from, next) => {
    // ...
    next();
  }
}
```

## 文章

<https://www.yuque.com/fe9/basic/awu7dv>