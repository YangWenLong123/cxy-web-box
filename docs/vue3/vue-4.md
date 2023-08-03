## LifeCycle Hooks

在新版的生命周期函数，可以按需导入到组件中，且只能在setup()函数中使用.

```js
import { onMounted, onUnmounted } from 'vue';
export default {
    setup () {
        onMounted(()=>{
           //
        });

        onUnmounted(()=> {
            //
        });
    }
};
```

## 生命周期2.x与Composition之间的映射关系

-   beforeCreate -> use setup()
-   created -> use setup()
-   beforeMount -> onBeforeMount
-   mounted -> onMounted
-   beforeUpdate -> onBeforeUpdate
-   updated -> onUpdated
-   beforeDestroy -> onBeforeUnmount
-   destroyed -> onUnmounted
-   errorCaptured -> onErrorCaptured

## setup

## 理解

setup()函数是vue3中专门新增的方法，可以理解为Composition Api的入口.

## 执行时机

在beforecreate之后，create之前执行.

## 接收props数据

```js
export default {
  props: {
    msg: {
      type: String,
      default: () => {}
    }
  },
  setup(props) {
  	console.log(props);
  }
}
```

## context:

setup()的第二个参数是一个上下文对象，这个上下文对象大致包含了这些属性,注意：在setup()函数中无法访问this

```js
const MyComponent = {
  setup(props, context) {
    context.attrs
    context.slots
    context.parent
    context.root
    context.emit
    context.refs
  }
}
```

## reactive

reactive是用来创建一个响应式对象，等价于2.x的[Vue.observable](https://cn.vuejs.org/v2/api/#Vue-observable)，具体可以参考下面demo。

```js
<template>
    <div>
        <p @click="incment()">
            click Me!
        </p>
        <p>
            一:{{ state.count }} 二: {{ state.addCount }}
        </p>
    </div>
</template>

<script>
import { reactive } from 'vue';
export default {
    setup () {
        const state = reactive({//创建响应式数据
            count: 0,
            addCount: 0
        });

        function incment () {
            state.count++;
            state.addCount = state.count * 2;
        }

        return {
            state,
            incment
        };
    }
};
</script>
```

## ref

## 基本语法

ref()函数用来给定的值创建一个响应式的数据对象,ref()的返回值是一个对象,这个对象上只包含一个.value属性.下面是基本数据类型创建步骤.

```js
import { ref, defineComponent } from 'vue';
export default defineComponent ({
    setup () {
        const valueNumber = ref(0);
        const valueString = ref('hello world!');
        const valueBoolean = ref(true);
        const valueNull = ref(null);
        const valueUndefined = ref(undefined);

        return {
            valueNumber,
            valueString,
            valueBoolean,
            valueNull,
            valueUndefined
        };
    }
});
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0767d46e29c48d883e3d10c928619ed~tplv-k3u1fbpfcp-zoom-1.image)

## 在template中访问ref创建的响应式数据

```js
import { ref } from 'vue';
export default {
    setup () {
        const value = ref(1);

        return {
           value,
           msg: 'hello world!'
        };
    }
};
```

```js
<template>
    <p>
        {{ value }} {{ msg }}
    </p>
</template>
```

## 将ref响应式数据挂载到reactive中

当把ref()创建出来值直接挂载到reactive()中时,会自动把响应式数据对象的展开为原始的值,不需要通过.value就可以直接访问到.

```js
import { ref, reactive } from 'vue';
export default {
    setup () {
        const count = ref(1);
        const state = reactive({
            count
        });

        console.log(state.count);//1 可以直接访问到，不需要通过.value就可以直接访问到
        state.count++;
        console.log(count.value);//2 我们发现，最初count值也发生了改变

        return {
           count
        };
    }
};
```

新的ref会覆盖旧的ref，实例如下：

```js
import { ref, reactive } from 'vue';
export default {
    setup () {
        const count = ref(1);
        const state = reactive({
            count
        });
        const newCount = ref(9);

        state.count = newCount;
        state.count++;

        console.log(state.count, newCount, count);// 10  10  1

        return {
           count
        };
    }
};
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60a5497e36ec4487b56f6af7101b137c~tplv-k3u1fbpfcp-zoom-1.image)

我们发现，这次的count值却没有发生改变，还是原始值1，是因为新创建的newCount替换并覆盖了之前的count值，取代了它的位置.

## isRef

用来判断某个值是否为ref创建出来的对象，场景：当需要展开某个值可能是ref()创建出来的对象时.

```js
import { ref, isRef } from 'vue';
export default {
    setup () {
        const count = ref(1);
        const unwrappend = isRef(count) ? count.value : count;

        return {
           count,
           unwrappend
        };
    }
};
```

## unref

如果参数是一个ref,则返回他的value,否则返回参数本身

```js
unref()：是 val = isRef(val) ? val.value : val 的语法糖。
```

## toRefs

torefs()函数可以将reactive()创建出来的响应式对象转换为普通的对象，只不过这个对象上的每个属性节点都是ref()类型的响应式数据

```js
<template>
    <p>
  			<!-- 可以不通过state.value去获取每个属性 -->
        {{ count }} {{ value }}
    </p>
</template>

<script>
import { ref, reactive, toRefs } from 'vue';
export default {
    setup () {
        const state = reactive({
            count: 0,
            value: 'hello',
        })

        return {
           ...toRefs(state)
        };
    }
};
</script>
```

## toRef

概念：为源响应式对象上的某个属性创建一个ref对象，二者内部操作的是同一个数据值,更新时二者是同步的。相当于浅拷贝一个属性.

区别ref: 拷贝的是一份新的数据单独操作，更新时相互不影响，相当于深拷贝。

场景：当要将某个prop的ref传递给某个复合函数时，toRef很有用.

```js
import { reactive, ref, toRef } from 'vue'

export default {
    setup () {
        const m1 = reactive({
            a: 1,
            b: 2
        })

        const m2 = toRef(m1, 'a');
        const m3 = ref(m1.a);

        const update = () => {
          	// m1.a++;//m1改变时，m2也会改变
            // m2.value++; //m2改变时m1同时改变
            m3.value++; //m3改变的同时，m1不会改变
        }

        return {
            m1,
            m2,
            m3,
            update
        }
    }
}
```

## computed

computed()用来创建计算属性,返回值是一个ref的实例。

## 创建只读的计算属性

```js
import { ref, computed } from 'vue';
export default {
    setup () {
        const count = ref(0);
        const double = computed(()=> count.value + 1);//1

        double++;//Error: "double" is read-only

        return {
           count,
           double
        };
    }
};
```

## 创建可读可写的计算属性

在使用computed函数期间，传入一个包含get和set函数的对象，可以额得到一个可读可写的计算属性

```js
// 创建一个 ref 响应式数据
const count = ref(1)

// 创建一个 computed 计算属性
const plusOne = computed({
  // 取值函数
  get: () => count.value + 1,
  // 赋值函数
  set: val => {
    count.value = val - 1
  }
})

// 为计算属性赋值的操作，会触发 set 函数
plusOne.value = 9
// 触发 set 函数后，count 的值会被更新
console.log(count.value) // 输出 8
```

## watch

watch()函数用来监视某些数据项的变化，从而触发某些特定的操作，看下面这个案例，会实时监听count值的变化. [查看官方文档API](https://www.vue3js.cn/docs/zh/api/instance-methods.html#watch)

```js
import { ref, watch } from 'vue';
export default {
    setup () {
        const count = ref(1);

        watch(()=>{
            console.log(count.value, 'value');
        })

        setInterval(()=>{
            count.value++;
        },1000);
        return {
           count,
        };
    }
};
```

## 监听指定的数据源

监听reactive的数据变化

```js
import { watch, reactive } from 'vue';
export default {
    setup () {
        const state = reactive({
            count: 0
        })

        watch(()=>state.count,(count, prevCount)=>{
            console.log(count, prevCount);//变化后的值 变化前的值
        })

        setInterval(()=>{
            state.count++;
        },1000);

        return {
           state
        };
    }
};
```

监听ref类型的数据变化

```js
import { ref, watch } from 'vue';
export default {
    setup () {
       const count = ref(0);

        watch(count,(count, prevCount)=>{
            console.log(count, prevCount);//变化后的值 变化前的值
        })

        setInterval(()=>{
            count.value++;
        },1000);

        return {
           count
        };
    }
};
```

## 监听多个指定数据变化

监听reactive类型数据变化

```js
import { watch, reactive } from 'vue';
export default {
    setup () {
        const state = reactive({
            count: 0,
            msg: 'hello'
        })

        watch([()=> state.count, ()=> state.msg],([count, msg], [prevCount, prevMsg])=>{
            console.log(count, msg);
            console.log('---------------------');
            console.log(prevCount, prevMsg);
        })

        setTimeout(()=>{
            state.count++;
            state.msg = 'hello world';
        },1000);

        return {
           state
        };
    }
};
```

监听ref类型数据变化

```js
import { ref, watch } from 'vue';
export default {
    setup () {
       const count = ref(0);
       const msg = ref('hello');

        watch([count, msg],([count, name], [prevCount, prevname])=>{
            console.log(count, name);
            console.log('---------------------');
            console.log(prevCount, prevname);
        })

        setTimeout(()=>{
            count.value++;
            msg.value = 'hello world';
        },1000);

        return {
           count,
           msg
        };
    }
};
```

## 清除监视

在setup()函数内创建的watch监视，会在当前组件被销毁的时候自动停止。如果想要明确的停止某个监视，可以调用watch()函数的返回值即可

```js
// 创建监视，并得到 停止函数
const stop = watch(() => {
  /* ... */
})

// 调用停止函数，清除对应的监视
stop()
```

## 清除无效的异步任务

有时候watch()监视的值发生了变化，我们期望清除无效的异步任务，此时watch回调函数中提供了cleanup registrator function来执行清除工作

 -   场景

<!---->

-   watch被重复执行了
 -  watch被强制stop()

```js
<template>
    <p>
        <input type="text" v-model="keyword">
    </p>
</template>

<script>
import { watch, ref } from 'vue';
export default {
    setup () {
        const keyword = ref('');

        const asyncPrint = val => {
            return setTimeout(()=>{
                console.log(val);
            },1000);
        }

        watch(keyword, (keyword, prevKeyword, onCleanup) => {
            const timeId = asyncPrint(keyword);

            onCleanup(()=> clearTimeout(timeId));
        }, {lazy: true})

        return {
           keyword
        };
    }
};
</script>
```

## watchEffect

vue3中新增的api，用于属性监听.

与watch有什么不同？

-   watchEffect不需要指定监听属性，可以自动收集依赖，只要我们回调中引用了响应式的属性，那么这些属性变更的时候，这个回调都会执行，而watch只能监听指定的属性而做出变更（v3中可以同时监听多个）
 -  watch可以获取到新值和旧值，而watchEffect获取不到
 -  watchEffect会在组件初始化的时候就会执行一次与computed同理，而收集到的依赖变化后，这个回调才会执行，而watch不需要，除非设置了指定参数。

## 基础用法

```js
import { watchEffect, ref } from 'vue'
setup () {
    const userID = ref(0)
    watchEffect(() => console.log(userID))
    setTimeout(() => {
      userID.value = 1
    }, 1000)

    /*
      * LOG
      * 0
      * 1
    */

    return {
      userID
    }
 }
```

## 停止监听

如果watchEffect是在setup或者生命周期里面注册的话，在取消挂在的时候会自动停止。

```js
//停止监听

const stop = watchEffect(() => {
  /* ... */
})

// later
stop()
```

## 使 side effect 无效

什么是 side effect ,不可预知的接口请求就是一个 side effect，假设我们现在用一个用户ID去查询用户的详情信息，然后我们监听了这个用户ID， 当用户ID 改变的时候我们就会去发起一次请求，这很简单，用watch 就可以做到。 但是如果在请求数据的过程中，我们的用户ID发生了多次变化，那么我们就会发起多次请求，而最后一次返回的数据将会覆盖掉我们之前返回的所有用户详情。这不仅会导致资源浪费，还无法保证 watch 回调执行的顺序。而使用watchEffect我们就可以做到.

onInvalidate(fn)传入的回调会在watchEffect重新运行或者watchEffect停止的时候执行。

```js
watchEffect(() => {
      // 异步api调用，返回一个操作对象
      const apiCall = someAsyncMethod(props.userID)

      onInvalidate(() => {
        // 取消异步api的调用。
        apiCall.cancel()
      })
})
```

## shallowReactive

概念：只处理对象最外层属性的响应式(也就是浅响应式)，所以最外层属性发生改变，更新视图，其他层属性改变，视图不会更新.

场景：如果一个对象的数据结构比较深,但变化只是最外层属性.

```js
import { shallowReactive } from 'vue'

export default {
    setup() {
        const obj = {
            a: 1,
            first: {
                b: 2,
                second: {
                    c: 3
                }
            }
        }

        const state = shallowReactive(obj)

        function change1() {
            state.a = 7
        }

        function change2() {
            state.first.b = 8
            state.first.second.c = 9
            console.log(state);
        }

        return { state }
    }
}
```

## shallowRef

概念：只处理了value的响应式,不进行对象的reactive处理.

场景：如果有一个对象数据，后面会产生新的对象替换.

```js
import { shallowRef } from 'vue'

export default {
    setup () {
        const m1 = shallowRef({a: 1, b: {c: 2}})

        const update = () => {
            m1.value.a += 1
        }

        return {
            m1,
            update
        }
    }
}
```

## customRef

创建一个自定义的ref,并对其依赖跟踪和更新触发进行显式控制.

场景：使用customRef实现输入框防抖

```js
<template>
    <div>
        <input v-model="keyword" placeholder="搜索关键字"/>
        <p>{{keyword}}</p>
    </div>
</template>

<script>
import { customRef } from 'vue'

export default {
    setup () {
        const keyword = useDebouncedRef('', 500)
        console.log(keyword)

        return {
            keyword
        }
    }

}
function useDebouncedRef(value, delay = 200) {
    let timeout;
    return customRef((track, trigger) => {
        return {
            get() {
                // 告诉Vue追踪数据
                track()
                return value
            },
            set(newValue) {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    value = newValue
                    // 告诉Vue去触发界面更新
                    trigger()
                }, delay)
            }
        }
    })
}
</script>
```

## 自定义Hook函数

自定义hook的作用类型于vue2中的mixin技术。

优势：清楚知道代码来源,方便复用

案例：收集用户点击的页面坐标

hook/useMousePosition.js

```js
import { ref, onMounted, onUnmounted } from "vue";

export default function useMousePosition() {
    // 初始化坐标数据
    const x = ref(-1);
    const y = ref(-1);

    // 用于收集点击事件坐标的函数
    const updatePosition = e => {
        x.value = e.pageX;
        y.value = e.pageY;
    };

    // 挂载后绑定点击监听
    onMounted(() => {
        document.addEventListener("click", updatePosition);
    });

    // 卸载前解绑点击监听
    onUnmounted(() => {
        document.removeEventListener("click", updatePosition);
    });

    return { x, y };
}
```

模版中使用hook函数

```js
<template>
    <div>
        <p>{{ x }}</p>
        <p>{{ y }}</p>
    </div>
</template>

<script>
import useMousePosition from '@/hook/useMousePosition'
export default {
    setup () {
        const {x, y} = useMousePosition();
        return {
            x,
            y
        }
    }
}
</script>
```

## readonly与shallowReadonly

-   readonly:

<!---->

 -   深度只读数据
    -   获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
    -   只读代理是深层的：访问的任何嵌套 property 也是只读的。

<!---->

-   shallowReadonly

<!---->

 -   浅只读数据
    -   创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换

<!---->

-   应用场景:

<!---->

 -   在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除

```js
<template>
    <div @click="update()">
        <p>{{ a }}</p>
        <p>{{ b }}</p>
    </div>
</template>

<script>
import { reactive, readonly, shallowReadonly } from 'vue'
export default {
    setup () {
        const state = reactive({
            a: 1,
            b: {
                c: 2
            }
        })

        const m = readonly(state);
        const m2 = shallowReadonly(state);

        const update = () => {
            m.a++ //无法修改 只读
          	m2.a++ //无法修改
            m2.b.c++ //可以修改 视图层数据改变
        }

        return {
            ...toRefs(state),
            update
        }
    }

}
</script>
```

## Template refs

通过ref()还可以引用页面上的元素或者组件.

## 元素引用

使用ref()函数创建DOM引用,需在onMounted中获取.

```js
<template>
    <div>
        <p ref="dom">hello</p>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
    setup () {
        const dom = ref(null);

        onMounted(()=> {
            console.log(dom.value)//当前dom元素
        });

        return {
            dom
        }
    }
};
</script>
```

## 组件引用

```js
<template>
    <div>
        <Test ref="comRef"/>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Test from "./test2";
export default {
    components: { Test },
    setup () {
        const comRef = ref(null);

        onMounted(()=> {
            comRef.value.coun;//获取子组件值
            comRef.value.Handle();//调用子组件函数
        })

        return {
            comRef
        }
    }
};
</script>
```

-   test2

```js
<template>
    <p>
        {{ count }}
    </p>
</template>

<script>
import { ref } from 'vue';
export default {
    setup () {
        const count = ref('count');

        const Handle = (()=> {
            console.log('hello');
        })

        return {
            count,
            Handle
        }
    }
};
</script>
```

## createComponent

这个函数不是必须的，除非你想完美结合TypeScript提供的类型推断来进行项目开发

场景：这个函数仅仅提供了类型推断，能为setup()函数中的props提供完整的类型推断.

```js
import { createComponent } from 'vue'

export default createComponent({
  props: {
    foo: String
  },
  setup(props) {
    props.foo // <- type: string
  }
})
```

## getCurrentInstance

描述：可以获取当前组件的实例,然后通过ctx属性获取当前上下文，这样我们就可以在steup中使用router和vuex了.

```js
<script>
import { getCurrentInstance } from 'vue'
export default {
  setup () {
    //getCurrentInstance代表全局上下文，ctx相当于Vue2的this,
    //但是特别注意ctx代替this只适用于开发阶段，等你放到服务器上运行就会出错，
    //后来查阅资料说的得用proxy替代ctx，才能在你项目正式上线版本正常运行
    const { props, proxy, emit } = getCurrentInstance()
    console.log(proxy.$router.currentRoute.value)  //当前路径    //与以前this获取原型上东西一样
    // proxy.$parent  父组件    // proxy.$nextTick  组件更新完毕      // proxy.$store  VueX
    // ts (proxy as any)
  }
}
</script>
```

## Teleport

描述：传送门组件提供一种简洁的方式可以指定它里面内容的父元素，允许我们控制`Teleport`的嵌套的内容在DOM中哪个父节点下呈现HTML,而不必求助于全局状态或者拆分为两个组件.

 -   to String 必传属性

<!---->

-   to="#last"
 -  to=".last"
 -  to="[data-teleport]"

<!---->

 -   disabled Boolean 可选属性

<!---->

-   用于禁用teleport的功能，意味着插槽的内容将不会移动到任何位置,而在父组件指定的位置渲染.

```js
<template>
  <div>
    <button @click="modelOpen = true">点击打开弹窗	</button>
    <teleport to="body">
      <div v-if="modelOpen" class="model">
        <div class="model-body">
          这是一个模态框
          <button @click="modelOpen = false">关闭弹窗</button>
        </div>
      </div>
    </teleport>
  </div>
</template>


<script>
  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: 'ModelButton',
    setup() {
      const modelOpen = ref(false);
      return {
        modelOpen
      }
    }
  })
</script>

<style scoped>
  .model {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .model-body {
    width: 300px;
    height: 250px;
    background: #fff;
  }
</style>
```

使用`Teleport`组件，通过props `to`属性指定该组件的渲染位置在body下，但该组件的状态`modelOpen`则是由vue内部组件控制.

## Fragments

描述：Fragments作为vue3的新特性之一，允许一个组件可以有多个根节点。

```js
<template>
  <header>...</header>
	<main v-bind="$attrs">...</main>
	<footer>...</footer>
</template>
```

## useStore

```js
import { useStore } from "vuex";

export default {
	setup() {
  	const store = useStore();

    //const { commit, dispatch } = useStore();
    const userInfo = store.state.userinfo;

    store.commit("funName", '');

    return {
    		userInfo
    }
  }
}
```

## useRouter

```js
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

const router = useRouter();

router.push("/");
```

-   一个简单的路由配置

```js
import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ("../views/Dashboard.vue")
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ("../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;
```

## defineProps

获取组件传值

```js
<template>
  <h1>{{ msg }}</h1>
<div @click="clickThis">1111</div>
</template>

<script setup lang="ts">
  defineProps<{ // 采用ts专有声明，无默认值
  msg: string,
  num?: number
}>()
// 采用ts专有声明，有默认值
interface Props {
  msg?: string
  labels?: string[]
}
const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})

defineProps({ // 非ts专有声明
  msg: String,
  num: {
    type:Number,
    default: ''
  }
})
</script>

<style scoped lang="less">
</style>
```

## defineEmits

子组件向父组件事件传递

```js
<template>
  <div @click="clickThis">点我</div>
</template>

<script setup lang="ts">
    /*ts专有*/
  const emit= defineEmits<{
    (e: 'click', num: number): void
  }>()
    /*非ts专有*/
  const emit= defineEmits(['click'])

  const clickThis = () => {
    emit('click',2)
  }
</script>

<style scoped lang="less">
</style>
```

## defineExpose

子组件暴露自己的属性，父组件直接获取

```js
<template>
  <div>子组件helloword.vue</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(123456)
defineExpose({
  count
})
</script>

<style scoped lang="less">
</style>
```

```js
<template>
  <div @click="helloClick">父组件</div>
  <helloword ref="hello"></helloword>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import helloword from './components/HelloWorld.vue'
const hello = ref(null)
const helloClick = () => {
  console.log(hello.value.count) // 123456
}
</script>


<style lang="less" scoped>
</style>
```