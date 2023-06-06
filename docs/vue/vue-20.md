直接上代码

```js
//global.js
function num (callback) {
    callback(1);
}

/**
 * 添加到vue原型上
 */
function install(Vue) {
    Object.defineProperties(Vue.prototype, {
        $num: {
            get () {
                return num.bind(this);
            }
        }
    });
}

export default install;
```

main.js引入

```js
import global from '@/assets/js/global';

Vue.use(global);
```

使用

```js
this.$num(resp=>{
  	console.log(resp, 'resp');//1
});
```