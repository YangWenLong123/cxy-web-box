## #v-text

```js
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```

## #v-for

-   Array

```js
<div v-for="item in items">
  {{ item.text }}
</div>
```

-   Object

```js
<div v-for="(val, key, index) in object"></div>
// val:value  key: key   index: 索引
```

-   当和 `v-if` 一起使用时，`v-for` 的优先级比 `v-if` 更高

## #v-once

```js
<div v-once>{{ msg }}</div>
//msg内容只会执行一次，当数据改变时,插值处内容不会更新
```

## #v-if v-else-if  v-else

```js
<div v-if="1">{{ msg }}</div>
<div v-else-if="2">{{ msg }}</div>
<div v-else="3">{{ msg }}</div>
```

## #v-show

```js
<div v-show="true">{{ msg }}</div>
//相当于display:block

<div v-show="false">{{ msg }}</div>
//相当于display:none
```

## #v-on

```js
缩写：@
修饰符：
  .stop - 调用 event.stopPropagation()。
  .prevent - 调用 event.preventDefault()。
  .capture - 添加事件侦听器时使用 capture 模式。
  .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
  .native - 监听组件根元素的原生事件。
  .once - 只触发一次回调。
  .left - (2.2.0) 只当点击鼠标左键时触发。
  .right - (2.2.0) 只当点击鼠标右键时触发。
  .middle - (2.2.0) 只当点击鼠标中键时触发。
  .passive - (2.3.0) 以 { passive: true } 模式添加侦听器
```

-   示例

```js
<!-- 方法处理器 -->
<button v-on:click="doThis"></button>

<!-- 动态事件 (2.6.0+) -->
<button v-on:[event]="doThis"></button>

<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 动态事件缩写 (2.6.0+) -->
<button @[event]="doThis"></button>

<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>

<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>

<!--  串联修饰符 -->
<button @click.stop.prevent="doThis"></button>

<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter">
//enter、tab、delete (捕获 “删除” 和 “退格” 键)、esc、space、up、down、left、right（后退、空格、上下左右）
//

<!-- 按Alt + C -->
<input @keyup.alt.67="clear">

<!-- 按Alt + 任意键 -->
<input @keyup.alt="other">

<!-- 回车键 -->
<input @keyup.native.enter>

<!-- 键修饰符，键代码 -->
<input @keyup.13="onEnter">

<!-- 点击回调只会触发一次 -->
<button v-on:click.once="doThis"></button>

<!-- 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

## #v-bind

```js
用法：动态地绑定一个或多个特性，或一个组件 prop 到表达式
缩写： ':'

<a v-bind:href="url"></a>
<a :href="url"></a>
<img :src="imgages"/>
<div :class="{'classA': true, 'classB': false}"></div>
<div :style="{'fontSize': '20px', 'color': '#333333'}"></div>
```

## #v-model

```js
用法：用于表单输入框数据的双向绑定

<input v-model="msg"/>
```

## #v-pre

```js
用法：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

<div v-pre>{{ msg }}</div>
// {{ msg }}不会进行编辑
```

## #v-cloak

```js
[v-cloak] {
  display: none;
}

<div v-cloak>
  {{ message }}
</div>
```

## #v-slot

-   带有slot的具名插槽

```js
<div>
	<template slot="header">
    <h1>Here might be a page title</h1>
  </template>
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  <template slot="footer">
    <p>Here's some contact info</p>
  </template>
</div>

<div>
  <h1 slot="header">Here might be a page title</h1>
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  <p slot="footer">Here's some contact info</p>
</div>
```

-   带有slot-scope

```js
<template slot-scope="scope"></template>
```