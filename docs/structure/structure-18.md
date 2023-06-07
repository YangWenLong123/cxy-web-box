## 前言

在后台管理系统的设计上，权限设计往往是很重要的一个环节，大致包括：页面的权限，按钮的权限，数据的权限，那么如何去更好的设计呢？

页面权限：

方案一.根据用于的权限去判断是否有权限访问该页面，没有者跳转到无权限页面

方案二：根据用户权限生成指定的菜单，所谓眼不见为净(下面讲解)

功能权限：

方案：在路由meta属性配置当前页面按钮的权限，在进入页面时根据用户权限去处理，生成对应的布尔值

## 页面权限设计

1.配置页面路由和路由访问所需要的权限，只需在子路由配置即可

```js
module.exports = [
    {
        title: '首页',
        path: '/',
        icon: 'shouye',
    },
    {
        title: '组件',
        icon: 'zujian',
        children: [
            {
                title: '轮播图',
                path: '/components/al-swiper',
                auth:['swiper']
            },
            {
                title: '复制',
                path: '/components/al-copy',
                auth:['copy']
            },
            {
                title: '组件2',
                icon: 'zujian',
                children: [
                    {
                        title: '图标',
                        path: '/components/al-icon',
                        auth:['icon']
                    }
                ]
            }
        ]
    }
];
```

2.权限列表，页面的权限统一配置到一个文件中

```js
module.exports = [
    {
        name: 'swiper'
    },
    {
        name: 'icon'
    }
];
```

3.根据路由和路由权限生成对应数据，递归生成左侧菜单

```js
<template>
    <div class="container">
        <!-- menu -->
        <div class="menu">
            <el-menu
                class="el-menu-vertical-demo"
                background-color="rgb(0, 21, 41)"
                text-color="#fff"
                active-text-color="#1890ff"
                router
                unique-opened
                :default-active="navActive"
                style="width:210px"
            >
                <handMenu
                    :list="constantRoutes"
                />
            </el-menu>
        </div>

        <!-- content -->
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script>
import constantRoutes from '@/mock/router/router.js';
import constantRoutesAuth from '@/mock/router/router-auth.js';
import handMenu from '@/components/common/menu';
export default {
    components: {
        handMenu
    },
    data () {
        return {
            navActive: '',
            constantRoutes: []
        };
    },
    watch: {
        $route(val) {
            this.navActive = val.path;
        }
    },
    created () {
        this.navActive = this.$route.path;
    },
    mounted () {
        let menu = this.getMenu(constantRoutes);
        let menuList = this.getMenuAuth(menu);
        this.constantRoutes = menuList;
        console.log(menuList, 'menuList');
    },
    methods: {
        /**
         * 根据权限生成菜单
         */
        getMenu (menuList) {
            let result = [];
            for (var i in menuList) {
                if (menuList[i].auth) {
                    if (this.hasAuth(menuList[i].auth, constantRoutesAuth)) {
                        let tmp = Object.assign({}, menuList[i]);
                        if (tmp.children && tmp.children.length > 0) {
                            tmp.children = this.getMenu(tmp.children);
                        }
                        tmp.authed = true;
                        result.push(tmp);
                    }
                } else {
                    let tmp = Object.assign({}, menuList[i]);
                    if (tmp.children && tmp.children.length > 0) {
                        tmp.children = this.getMenu(tmp.children);
                    }
                    tmp.authed = true;
                    result.push(tmp);
                }
            }
            return result;
        },
        /**
         * 查询权限
         */
        hasAuth (auth,list) {
            let authResult = false;
            if (Array.isArray(auth)) {
                for (var k in auth) {
                    if (!this.checkAuthInList(auth[k], list)) {
                        return false;
                    }
                }
                return true;
            } else {
                return this.checkAuthInList(auth, list);
            }
        },
        checkAuthInList(str, list) {
            for (var i in list) {
                if (escape(str) == escape(list[i].name)) {
                    return true;
                }
            }
            return false;
        },
        getMenuAuth(tmpMenu){
            let menuRes = [];
            for(var i in tmpMenu){
                let hasChild = false;
                if(!tmpMenu[i].children){
                    if(tmpMenu[i].authed){
                        hasChild = true;
                    }
                }else{
                    tmpMenu[i].children = this.getMenuAuth(tmpMenu[i].children);
                    if(tmpMenu[i].children.length > 0){
                        hasChild = true;
                    }
                }
                if(hasChild){
                    menuRes.push(tmpMenu[i]);
                }
            }
            return menuRes;
        },
    }
};
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    .menu {
        width: 210px;
        height: 100%;
        background: rgb(0, 21, 41);
    }
    .content {
        flex: 1;
    }
}
</style>
```

4.递归组件代码

```js
<template>
    <div class="menu-wrapper">
        <template v-for="(item, index) in list">
            <el-menu-item
                v-if="item.path"
                :index="item.path"
                :key="index"
            >
                <i
                    v-if="item.icon"
                    :class="`iconfont icon-${item.icon}`"
                />
                <span
                    slot="title"
                    class="title"
                >{{ item.title }}</span>
            </el-menu-item>
            <el-submenu
                v-else
                :key="index"
                :index="item.title"
            >
                <template slot="title">
                    <i
                        v-if="item.icon"
                        :class="`iconfont icon-${item.icon}`"
                    />
                    <span class="title">{{ item.title }}</span>
                </template>
                <hand-menu :list="item.children" />
            </el-submenu>
        </template>
    </div>
</template>

<script>
export default {
    name: 'HandMenu',
    props: {
        list: {
            type: Array,
            default: () => {
                return [];
            }
        }
    }
};
</script>
<style lang="less" scoped>
    .el-menu-item {
        height: 40px;
        line-height: 40px;
        &:hover {
            color: #fff!important;
            background-color: transparent!important;
            .iconfont {
                color: #fff;
            }
        }
    }
    .iconfont {
        display: inline-block;
        margin-right: 10px;
        font-size: 14px;
        line-height: 40px;
    }
</style>
<style lang="less">
.el-submenu__title:hover{
    background: rgb(0,17,33) !important;
}
.is-active {
    background: #001529 !important;
}
.el-submenu__title {
    height: 50px !important;
}
.el-menu-item:hover {
    background: #06090c !important;
}
.el-menu-item:hover .iconfont {
    color: #1890ff !important;
}
.el-menu-item:hover .title {
    color: #1890ff !important;
}
</style>
```

## 功能权限设计

按钮权限的配置我们需要配置在router.js中，这样我们就可以路由钩子获取到当前页面路由配置的参数，然后去和路由权限的数据进行比对。

路由配置

```js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: resolve => require(['@/views/index/index'], resolve),
        children: [{
            path: '',
            component: resolve => require(['@/views/index/main'], resolve),
        },{
            path: 'components',
            component: resolve => require(['@/views/components/index'], resolve),
            children: [{
                path: 'al-copy',
                name: 'alCopy',
                component: resolve => require(['@/views/components/al-copy'], resolve),
                meta: {
                    authList: {
                        auth_page: ['al-copy'],
                        auth_delete: ['al-copy-delete'],
                        auth_add: ['al-copy-add']
                    },
                    authResult: {}
                }
            },{
                path: 'al-icon',
                name: 'alIcon',
                component: resolve => require(['@/views/components/al-icon'], resolve),
                meta: {
                    authList: {
                        auth_page: []
                    },
                    authResult: {}
                }
            },{
                path: 'al-swiper',
                name: 'alSwiper',
                component: resolve => require(['@/views/components/al-swiper'], resolve),
                meta: {
                    authList: {
                        auth_page: []
                    },
                    authResult: {}
                }
            }]
        }]
    }]
});
```

在main中对权限进行处理

```js
router.beforeEach((to, from, next) => {
    if (to.meta.authList) {
        store.dispatch('CHECK_AUTH', to.meta.authList).then(res => {
            to.meta.authResult = res;
            if (!to.meta.authList.auth_page || res.auth_page) {
                next();
            }else {
                console.log('无权限页面');
                return;
            }
        }).catch(error => {
            console.warn('无授权列表,重新拉取');
            router.push({
                path: '/',
                query: {
                    TO: escape(JSON.stringify({name: to.name, path: to.path, query: to.query, params: to.params}))
                }
            });
        });
    } else {
        next();
    }
});
```

在store中对权限处理过滤返回

```js
const state = {
    authList: ''
};

function checkAuthInList(str, list){
    for(var i in list){
        if(escape(str) == escape(list[i].name)){
            return true;
        }
    }
    return false;
}

function hasAuth(auth, list){
    let authResult = {};

    for(var i in auth){
        // 某个权限为组合权限[auth_1, auth_2], 需要同时满足
        if(Array.isArray(auth[i])){
            authResult[i] = true;
            for(var k in auth[i]){
                if(!checkAuthInList(auth[i][k], list)){
                    authResult[i] = false;
                    break;
                }
            }
        }else{
            authResult[i] = checkAuthInList(auth[i], list);
        }
    }
    return authResult;
}

const mutations = {
    ['SET_AUTH_LIST'](state, authList) {
        state.authList = authList;
    }
};
const actions = {
    ['CHECK_AUTH']({
        commit,
        state
    }, item) {
        if (state.authList) {
            return Promise.resolve(hasAuth(item, state.authList));
        } else {
            return Promise.reject('需要获取权限列表');
        }
    }
};

export default {
    state,
    mutations,
    actions
};
```

这样就完成的页面中理由权限的处理。那么在每个页面中就可以获取到所需要的权限

```js
this.$route.meta.authResult
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9819a13ea5f14b709a385dab46a374ce~tplv-k3u1fbpfcp-zoom-1.image)