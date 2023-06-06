## #props传递数据

-   父->子

```js
//父组件传递数据
<template>
  <Children :data="msg"></Children>
</template>

<script>
import Children from "./Children";
export default {
 components: {
  Children
 },
 data() {
  return { msg: 100 };
 }
};
</script>

//子组件接收数据
<script>
export default {
	props: {
  	name: {
    	type: Number,				//传递数据类型,不符合会发出警告
      default: ()=>{}			//指定默认值
    }
  }
};
</script>
```

## #$emit

-   子-父  $emit使用

```js
//子组件	使用$emit自定义事件
<template>
  <div @click="handler()">向父组件传递数据</div>
</template>

<script>
export default {
	methods: {
  	handler () {
    	this.$emit('change', '我是向父组件传递的数据');
    }
  }
};
</script>

//父组件
<template>
  <Children @change="receive()"></Children>
</template>

<script>
import Children from "./Children";
export default {
 components: {
  Children
 },
 methods: {
 	receive (res) {
  	console.log('res:' + res);
  }
 }
};
</script>
```

## #.sync

-   .sync

```js
用法: 改变子组件或者父组件传递的值。

//父-子  子组件接收参考上面
<template>
  <Children :data.sync="msg"></Children>
</template>

//子->父
<template>
  <div @click="$emit('update:name','向父组件传递的数据')"></div>
</template>

<template>
    {{ name }}
  <Children :name.sync="name"></Children>
</template>
<script>
import Children from "./Children";
export default {
 components: {
  Children
 },
 data () {
 	name: '默认数据'
 }
};
</script>
```

## #$parent与$children

-   爷孙组件，this.$parent, this.$children

```js
//向上派发事件
Vue.prototype.$dispatch = function $dispatch(eventName, data) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(eventName, data);
    parent = parent.$parent;
  }
};

this.$parent.$emit('change', '调用父组件的emit事件向上派发');


//向下派发事件
Vue.prototype.$broadcast = function $broadcast(eventName, data) {
  const broadcast = function () {
    this.$children.forEach((child) => {
      child.$emit(eventName, data);
      if (child.$children) {
        $broadcast.call(child, eventName, data);
      }
    });
  };
  broadcast.call(this, eventName, data);
};

this.$children 访问子组件
```

## #兄弟组件通信(EventBus)

```js
Vue.prototype.$bus = new Vue();

//兄弟一
<div @click="handler()"></div>
<script>
export default {
 methods: {
 	handler () {
  	this.$bus.$emit('send', '我是传递的数据');
  }
 }
};
</script>

//兄弟二
<script>
export default {
 methods: {
 	handler () {
    let _self = this;
  	_self.$bus.$on('send', (res) => {
    	cosole.log('msg:' + msg);
    });
  }
 }
};
</script>
```

## #Provide与inject

```js
//在父组件中注入数据
provide() {
  return { parentMsg: "父亲" };
}

//在任意子组件中可以注入父级数据
inject: ["parentMsg"] // 会将数据挂载在当前实例上
```

## #$attrs

```js
//父组件
<template>
  <Children name="along"></Children>
</template>

//子组件
<template>
    {{ $attrs }}
    //{ "msg": "along" }
</template>
```