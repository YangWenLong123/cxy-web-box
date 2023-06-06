## Vue3 Composition API如何替换Vue Mixins

[Vue3 Composition API如何替换Vue Mixins - osc_l330x9u1的个人空间 - OSCHINA.pdf](https://www.yuque.com/attachments/yuque/0/2020/pdf/636979/1588657997085-3b4996fe-ce63-49da-8d13-7a746dac1912.pdf)

vue 提供了 mixins 这个 API，可以让我们将组件中的可复用功能抽取出来，放入 mixin 中，然后在组件中引入 mixin，可以让组件显得不再臃肿，提高了代码的可复用性。

## 命名冲突

```js
//mixin.js
export const Mixin = {
  data () {
    return {
      message: 'no'
    }
  },
  created () {
    console.log('mixin created')
  }
}

//test.vue
<template>
	{{ message }}
  //输入结果是areyou ok?
</template>

<script>
import { Mixin } from '@/mixins/mixin'
export default {
  mixins: [Mixin],
  data () {
    return {
      message: 'areyou ok?'
    }
  },
  created () {
    console.log('text created')
  }
}
</script>
//mixin created
//text created
```

-   结论：mixins 与 Vue Instance 合并时，会将 created 等钩子函数合并成数组，mixins 的钩子优先调用，当 data、methods 对象键值冲突时，以组件优先。

## 如何使用mixins

-   新建mixin.js文件，导入到main.js中，然后注册到全局或者按需引入。

```js
//mixin.js
import Vue from "vue";
export let mixin = Vue.mixin({
	data () {},
  created () {},
  methods: {}
})

//main.js
import { mixin } from './mixin'
Vue.mixin(mixin)

//按需引入
import { mixin } from './mixin'
export default {
  mixins:[mixin]
}
```

## 场景

点击浏览器返回要返回之前的页面

```js
//back.js
export const prePage = {
    data () {
        return {
            pathName: ''
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.pathName = from.name;
        });
    },
    destroyed(){
        window.removeEventListener('popstate', this.fnGoBack, false);
    },
    mounted () {
        this.fnRecord();
    },
    methods: {
        fnRecord () {
            if (window.history && window.history.pushState) {
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.fnGoBack, false);
            }
        },
        fnGoBack  () {
            this.$router.replace({ name: this.pathName });
        }
    }
};

//使用
import mixin from './back.js'
export default {
  mixins:[mixin]
}
```