# Vue 项目优化

注意：该文档基于 @vue/cli 3.x 版本

## 页面加载优化

-   可视化 webpack 构建
-   启用文件缓存，删除 console.log
-   公共代码提取 splitChunks
-   CDN 引入
-   开启 gzip CompressionPlugin
-   图片压缩 image-webpack-loader
-   尺寸大的图片尽量走 cdn
-   element 等组件库按需加载
-   路由切割
-   组件懒加载

### 可视化 webpack 构建

安装 webpack-bundle-analyzer：

```js
yarn add webpack-bundle-analyzer -D
// or
npm install webpack-bundle-analyzer -D
```

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
  },
};
```

### 启用文件缓存，删除 console.log

启用文件缓存，减少打包时间，删除 console.log，减少代码体积。

安装 uglifyjs-webpack-plugin：

```js
yarn add uglifyjs-webpack-plugin -D
// or
npm install uglifyjs-webpack-plugin -D
```

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true, // 是否启用文件缓存
          parallel: true, // 使用多进程并行运行来提高构建速度
          sourceMap: true,
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log'],
            },
          },
        }),
      ],
    },
  },
};
```

### 公共代码提取

使用 splitChunks 提取代码提取，减少重复代码。

PS: maxSize 选项与骨架屏方案，注入 html 有冲突。

```js
module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        maxSize: 300000,
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2, // 模块被引用次数
            priority: -20, // 优先级
            reuseExistingChunk: true, // 重用已拆分模块
          },
          vendors: {
            test: /[\/]node_modules[\/]/,
            name: 'vendors',
            chunks: 'all',
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
};
```

### CDN 引入

使用 externals 配置，构建时忽略 npm 模块。

```js
const isProduction = process.env.NODE_ENV === 'production';
const CDN_BACE_URL = process.env.CDN_BACE_URL;

const cdn = {
  css: [`${CDN_BACE_URL}static/js/element-ui-2.13.2.css`],
  js: [
    `${CDN_BACE_URL}static/js/vue-2.6.11.js`,
    `${CDN_BACE_URL}static/js/axios-0.19.0.js`,
    `${CDN_BACE_URL}static/js/vuex-3.4.0.js`,
    `${CDN_BACE_URL}static/js/vue-router-3.3.2.js`,
    `${CDN_BACE_URL}static/js/element-ui-2.13.2.js`,
  ],
};

const externals = {
  vue: 'Vue',
  axios: 'axios',
  vuex: 'Vuex',
  'vue-router': 'VueRouter',
  'element-ui': 'ELEMENT',
};

module.exports = {
  configureWebpack: {
    externals: { ...externals },
  },
  chainWebpack: (config) => {
    // 生产环境注入 cdn
    if (isProduction) {
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },
};
```

public/index.html：

```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <% for (var i in
    htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.css) { %>
    <link
      href="<%= htmlWebpackPlugin.options.cdn.css[i] %>"
      rel="preload"
      as="style"
    />
    <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
    <% } %> <% for (var i in
    htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.js) { %>
    <link
      href="<%= htmlWebpackPlugin.options.cdn.js[i] %>"
      rel="preload"
      as="script"
    />
    <% } %>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>

  <body>
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <% for (var i in
    htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
  </body>
</html>
```

PS: **不推荐使用第三方的 cdn**，第三方 cdn 主要个人或者企业靠捐赠资助，没有义务保证稳定性的，所以在企业项目上还是要特别注意，要是 cdn 挂了导致生产事故就得不偿失了，**推荐使用自己公司的 cdn** 。

### gzip 压缩

生成类似 `chunk-vendors.f5cbf099.js.gz` 格式的文件。

安装 compression-webpack-plugin：

```js
yarn add compression-webpack-plugin -D
// or
npm install compression-webpack-plugin -D
```

```js
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: new RegExp('\.(' + productionGzipExtensions.join('|') + ')$'),
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
};
```

### 图片压缩

使用 image-webpack-loader 对图片进行压缩。

```js
module.exports = {
  chainWebpack: (config) => {
    const imagesRule = config.module.rule('images');
    imagesRule
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 6144 }));
    imagesRule
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
      })
      .end();
  },
};
```

### element-ui 按需引入

借助 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)，我们可以只引入需要的组件，以达到减小项目体积的目的。

安装 babel-plugin-component：

```js
yarn add babel-plugin-component -D
// or
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

```js
// babel.config.js
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

按需引入：

```js
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.use(Button);
Vue.use(Select);

new Vue({
  el: '#app',
  render: (h) => h(App),
});
```

### 组件异步加载

[Vue | 异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)

```js
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
);
// or
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component'),
  },
});
```

### 路由懒加载

结合 Vue 的[异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)和 Webpack 的[代码分割功能](https://doc.webpack-china.org/guides/code-splitting-async/#require-ensure-/)，轻松实现路由组件的懒加载，Vue CLI 3.0 默认配置。

[Vue Router | 路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: () => import(/* webpackChunkName: "group-foo" */ './Foo.vue'),
    },
  ],
});
```

## 项目构建优化

-   构建进度条
-   构建速度监测
-   多进程构建 thread-loader
-   编译速度 DLL

### 构建进度条

安装 [webpackbar](https://github.com/nuxt/webpackbar)：

```js
yarn add webpackbar -D
// or
npm install webpackbar -D
```

### 构建速度监测

安装 [webpackbar](https://github.com/nuxt/webpackbar)：

```js
yarn add speed-measure-webpack-plugin -D
// or
npm install speed-measure-webpack-plugin -D
```

### 多进程构建

安装 [thread-loader](https://github.com/nuxt/webpackbar)：

```js
yarn add thread-loader -D
// or
npm install thread-loader -D
```

```js
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.js$/,
          include: path.resolve('src'),
          use: ['thread-loader'],
        },
      ],
    },
  },
};
```

### 编译速度 DLL

🚧

## 代码层面优化

-   Object.freeze
-   v-if vs v-show
-   v-for key
-   keep-alive
-   computed
-   beforeDestroy
-   debounce throttle

### Object.freeze

使用 Object.freeze()，这会阻止修改现有的 property，也意味着响应系统无法再追踪变化。

```js
var obj = {
  foo: 'bar',
};

Object.freeze(obj);

new Vue({
  el: '#app',
  data: obj,
});
```

### v-if vs v-show

v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

### v-for key

key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

```js
<ul>
  <li v-for="item in items" :key="item.id">...</li>
</ul>
```

### keep-alive

[Vue | keep-alive](https://cn.vuejs.org/v2/api/#keep-alive)

包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。

```js
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

### computed

在模板中放入太多的逻辑会让模板过重且难以维护，且每次触发 render 都是调用模板内的表达式，消耗性能。

计算属性的结果会被缓存，除非依赖的响应式 property 变化才会重新计算。

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

### beforeDestroy

在组件销毁之前，移除事件监听、定时器等，内存不被回收，可能造成内存溢出。

### debounce throttle

[Lodash | debounce](https://www.lodashjs.com/docs/lodash.debounce)

使用 debounce throttle 减少重复性能消耗。

## vue.config.js

```js
const path = require('path');
const WebpackBar = require('webpackbar');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const externals = {
  vue: 'Vue',
  vuex: 'Vuex',
  'vue-router': 'VueRouter',
  axios: 'axios',
  echarts: 'echarts',
  'element-ui': 'ELEMENT',
};

const CDN_BACE_URL = process.env.VUE_APP_ALI_URL;

const cdn = {
  css: [`${CDN_BACE_URL}static/js/element-ui-2.13.2.css`],
  js: [
    `${CDN_BACE_URL}static/js/vue-2.6.11.js`,
    `${CDN_BACE_URL}static/js/vuex-3.4.0.js`,
    `${CDN_BACE_URL}static/js/vue-router-3.3.2.js`,
    `${CDN_BACE_URL}static/js/axios-0.19.0.js`,
    `${CDN_BACE_URL}static/js/echarts.min-4.7.0.js`,
    `${CDN_BACE_URL}static/js/element-ui-2.13.2.js`,
  ],
};

const commonPlugins = [new WebpackBar()];

module.exports = {
  lintOnSave: isDevelopment,
  productionSourceMap: isDevelopment,
  chainWebpack: (config) => {
    const imagesRule = config.module.rule('images');
    imagesRule
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 6144 }));
    imagesRule
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
      })
      .end();
    if (isProduction) {
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    }
  },
  configureWebpack: isProduction
    ? smp.wrap({
        module: {
          rules: [
            {
              test: /.js$/,
              include: path.resolve('src'),
              use: ['thread-loader'],
            },
          ],
        },
        plugins: [
          ...commonPlugins,
          new BundleAnalyzerPlugin(),
          new CompressionPlugin({
            test: new RegExp(
              '\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8,
          }),
        ],
        externals: { ...externals },
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              cache: true, // 是否启用文件缓存
              parallel: true, // 使用多进程并行运行来提高构建速度
              sourceMap: false,
              uglifyOptions: {
                warnings: false,
                compress: {
                  drop_debugger: true,
                  drop_console: true,
                  pure_funcs: ['console.log'],
                },
              },
            }),
          ],
          splitChunks: {
            maxSize: 300000,
            cacheGroups: {
              common: {
                name: 'common',
                chunks: 'initial',
                minChunks: 2, // 模块被引用次数
                priority: -20, // 优先级
                reuseExistingChunk: true, // 重用已拆分模块
              },
              vendors: {
                test: /[\/]node_modules[\/]/,
                name: 'vendors',
                chunks: 'all',
                minChunks: 2,
                priority: -10,
                reuseExistingChunk: true,
              },
            },
          },
        },
      })
    : { plugins: commonPlugins },
};
```