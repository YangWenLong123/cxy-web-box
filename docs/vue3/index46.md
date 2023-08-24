## Fragments
描述：Fragments作为vue3的新特性之一，允许一个组件可以有多个根节点。

```js
<template>
  <header>...</header>
	<main v-bind="$attrs">...</main>
	<footer>...</footer>
</template>
```