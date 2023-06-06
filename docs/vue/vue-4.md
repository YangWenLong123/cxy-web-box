## 局部指令

-   api详解

```js
使用方法：想要使用自定义指令，组件内部接受一个directives的选项。

directives: {
  //指令名称
	name: {
  	bind （el, binding, vnode, oldVnode）{
    	console.log('只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置');
    },
    inserted (el, binding, vnode, oldVnode) {
    	console.log('被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)');
    },
    update (el, binding, vnode, oldVnode) {
    	console.log('所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前');
    },
    componentUpdated (el, binding, vnode, oldVnode) {
    	console.log('指令所在组件的 VNode 及其子 VNode 全部更新后调用');
    },
    unbind (el, binding, vnode, oldVnode) {
    	cosole.log('只调用一次，指令与元素解绑时调用');
    }
  }
}

el:指令所绑定的元素，可以用来直接操作 DOM.
binding: 一个对象，包含以下属性：
    name: 指令名，不包括 v- 前缀。
    value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
    oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
    arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
    modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
vnode: Vue 编译生成的虚拟节点，查阅 VNode API 了解更多详情。
oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
```

-   场景:设置元素的样式

```js
directives: {
  theme: {
    inserted: function (el,binding) {
      //指令绑定值
    	if (binding) {
      	el.style.paddingLeft = binding.value.left;
      }
      //指令参数
      if (binding.arg == 'red') {
      	el.style.color = 'rgba(16, 199, 190, 0.5)';
      }
    }
  }
}

//binding打印详解
{
  name: "theme"
  rawName: "v-theme:red",
	value: {
  	left: "20px"
  },
  expression: "{left:'20px'}",
  arg: "red",
  modifiers: {}
}

<div v-theme:red='{left:'20px'}'></div>
```

-   场景:输入框自动或焦

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}

<input v-focus/>
```

-   场景：输入框只可以输入正整数，不可以输入小数点

```js
inserted (el, binding, vnode, oldVnode) {
  el.addEventListener("keypress",e => {
    let event = e || window.event;
    let charcode = typeof event.charCode === 'number' ? event.charCode : event.keyCode;
    let re = /\d/;

    if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !event.ctrlKey){
      if(event.preventDefault){
        event.preventDefault();
      }else{
        event.returnValue = false;
      }
    }
  });
}
```

-   oninput方法

```js
oninput="value = value.replace(/[^\d]/g,'')" //只可以输入正整数，不可以输入小数点

oninput="value=value.replace(/[^0-9.]/g,'')" //只可以输入正整数，可以输入小数点
```

## 全局指令

```js
Vue.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})

//参数和使用方法与局部指令一样
```

-   动态指令:设置元素定位

```js
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed';
    el.style.top = binding.value + 'px';
  }
})

<p v-pin="200">Stick me 200px from the top of the page</p>
```

-   对象子面量

```js
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})

<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

## 常用指令

<https://mp.weixin.qq.com/s/_S7YaGNvMcti6SqUT_ONwg>