## 路由参数变化组件不更新

问题描述 ：路由参数变化，但是组件没有对应的更新，主要是因为一般获取参数写在了created路由钩子函数中，路由参数变化的时候，这个生命周期不会重新执行。

解决方案1：watch监听router

```js
watch: {
 // 方法1
  '$route' (to, from) { //监听路由是否变化
    if(this.$route.params.articleId){// 判断条件1  判断传递值的变化
      //获取文章数据
    }
  }
  //方法2  判断页面路径
  '$route'(to, from) {
    if (to.path == "/page") {    /// 判断条件2  监听路由名 监听你从什么路由跳转过来的
       this.message = this.$route.query.msg
    }
  }
//方法 3  设置路径变化时的处理函数
'$route': {
    handler: 'resetData',
    immediate: true
  }
}
```

## 如何刷新组件?

解决方案1 ：为了实现这样的效果可以给组件添加一个不同的key,key值变化，组件就会重新渲染.

```js
//模版上绑定key
// <SomeComponent :key="theKey"/>
// 选项里绑定data
// data(){
//   return{
//       theKey:0
//   }
// }
//刷新key达到刷新组件的目的
// theKey++;
```

解决方案2: 调用this.$forceUpdate()强制重新渲染组件

解决方案3: 使用v-if特性

## 定时器在组件销毁后还在执行

问题描述 ：一些耗费性能的计时器或者动画在组件销毁之后还是执行的，导致性能变低。

解决方案 ：在销毁组件的生命周期中销毁定时器或者一些动画的js

```js
//组件销毁前执行的钩子函数，跟其他生命周期钩子函数的用法相同。
beforeDestroy(){
     //我通常是把setInterval()定时器赋值给this实例，然后就可以像下面这么停止。
    clearInterval(this.intervalId);
},
```

这里也给出第二种方案，通过$once这个事件侦听器器在定义完定时器之后的位置来清除定时器。以下是完整代码：

```js
const timer = setInterval(() =>{
    // 某些定时器操作
}, 500);
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {
    clearInterval(timer);
})
```

## watch使用特性：更好的支持异步，可以支持深度监测

问题场景：对数据结构比较深的对象进行监听数据的变化

```js
watch:{
	obj: {
  	handler: function (val, oldVal) { /* ... */ },
    deep: true,
    immediate:true  //第一次data的时候就监听
  }
}
```

## 页面刷新每次都要执行一个方法或者代码

```js
this.$nextTick(function(){
//codes here
})
```

## 表单限制最多输入小数点后面两位数组

```js

<el-input
  v-model="text"
  clearable
  size="small"
  type="number"
  // @input="text = /^\d+.?\d{0,1}$/.test(text)|| text == '' ? text : (text = text.split('.')[0] + '.' + text.split('.')[1].slice(0,1)) "
/>

```

## filters无法获取this

1.  在data()函数中定义变量存储this

<!---->

1.  1.  SELF: this

<!---->

2.  在过滤器中传入变量

<!---->
```js
1.  1.  {{ date | dateFilter(SELF) }}
```
<!---->

3.  在dateFilter函数中接收this

```js
filters: {
	dateFilters(val,SELF){

  }
}
```

## 在同个元素上使用v-for和v-if指令的优化方案

下方是一个不好的做法

```js
<div v-for='product in products' v-if='product.price < 500'>
```

好的解决方案，在计算属性中处理条件判断

```js
<div v-for='product in cheapProducts'>

computed: {
  cheapProducts: () => {
    return this.products.filter(function (product) {
      return product.price < 100
    })
  }
}
```

这么做有几个好处：

-   -   渲染效率更高，因为我们不会遍历所有元素
    -   仅当依赖项更改时，才会重使用过滤后的列表
    -   这写法有助于将组件逻辑从模板中分离出来，使组件更具可读性

## 在vue任意文件内定义全局方法

```js
// 创建全局方法
this.$root.$on('test', function(){
    console.log('test');
})

// 销毁全局方法
this.$root.$off('test');

// 调用全局方法
this.$root.$emit('test');
```

## Vue父组件监听子组件mounted

1.在子组件mounted时通过emit向父组件发送事件

2.在父组件中通过@hook来监听

```js
//  Parent.vue
// <Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},

//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},

// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...
```