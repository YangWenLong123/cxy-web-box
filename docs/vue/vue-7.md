## 介绍

-   vue路由提供三种模式

<!---->

 -   hash 默认模式，通过hash值来控制路由跳转
 -   history h5新增history api，相对hash而言，没有#号，但是服务器端需要配置，不然刷新页面会404
 -   abstract模式

## Hash

-   hash模式实现原理

<!---->

 -  示例：http://www.along.ink/#/home
 -   在正常的路径后面加一个#号，匹配#后面的路径作为前端的路由，通过window.onhashchange方法操控路由改变的时候来切换内容
 -   onhashchange触发时机

<!---->

  -  直接更改location.href或者location.hash值改变浏览器地址

```js
<body>
  <ul>
    <li>
       <a href="#/home">home</a>
    </li>
    <li>
       <a href="#/list">list</a>
    </li>
    <li>
       <a href="#/detail">detail</a>
    </li>
 </ul>
</body>
<script>
window.onhashchange = function() {
    //  做页面切换渲染等
    console.log(location.href);
    console.log(location.hash);
}
</script>
```

## History

-   示例：http://www.along.ink/home
-   原理：在window.history这个对象中，包含浏览器的历史，而在HTML5中，新增了 pushState和replaceState，通过这两个API可以改变url地址且不会发送请求，同时还有popstate事件，实现原理与hash相似，只不过因为没有了 # 号，所以刷新页面还是会向服务器发送请求，而后端没有对应的处理措施的话，会返回404，所以需要后端配合

popstate触发时机

  -      仅仅调用pushState和replaceState方法，并不会出发该事件
 -   只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript调用back、forward、go方法时才会触发。

<!---->

-   另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

```js
<body>
  <ul>
    <li>
      <a href="/home">home</a>
    </li>
    <li>
      <a href="/list">list</a>
    </li>
    <li>
      <a href="/detail">detail</a>
    </li>
  </ul>
</body>
<script>
document.querySelectorAll('a').forEach(item => {
  item.onclick = function (e) {
      e.preventDefault();
      let link = item.getAttribute('href');
      window.history.pushState({link}, link, link);
   };
});
window.addEventListener('popstate', function (e) {
   console.log(e.state);
   console.log(location.href);
})
</script>
```

## Abstract

abstract模式不依赖浏览器环境，没有使用hash和history等api去实现，而是VueRouter内部使用数组进行模拟了路由管理，在node环境，或者原生App环境下，都会默认使用abstract模式，VueRouter内部会根据所处的环境自行判断，默认使用hash模式，如果检测到没有浏览器API的时候，就会使用abstract模式。