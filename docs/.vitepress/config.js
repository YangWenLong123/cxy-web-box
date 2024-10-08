import { defineConfig } from "vitepress";

export default defineConfig({
  // lang: 'en-US',
  title: "Web Box",
  description:
    "程序员盒子,Web Box, 程序员盒子, 一个网站、提供一揽子的服务, along, 前端笔记",
  lastUpdated: true,
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "程序员盒子, 程序员, 盒子, Web Box, 程序员盒子, 一个网站、提供一揽子的服务, along, 前端笔记, 前端知识库,Along,Vue,TypeScript,Css,Html5, 盒子, Box, Web",
      },
    ],
    ["meta", { name: "baidu-site-verification", content: "codeva-KbKFpvJZ4Z" }],
    [
      "meta",
      { name: "msvalidate.01", content: "CB413BF073235306E3024223EFEAC71E" },
    ],
    ["meta", { name: "theme-color", content: "#3c8772" }],
    // ["link", { rel: "stylesheet", href: "/styles/global.css" }],
    ["link", { rel: "icon", href: "/image/logo.svg", type: "image/svg+xml" }],
    [
      "script",
      {
        src: "https://hm.baidu.com/hm.js?986e18ee826c11d1506f9129d240b80a",
      },
    ],
  ],
  themeConfig: {
    logo: "/image/logo.svg",
    lastUpdatedText: "Updated Date",
    search: {
      // provider: "local",
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                },
              },
            },
          },
        },
      },
    },
    // localeLinks: {
    //   items: [
    //     { text: "简体中文", link: "/" },
    //     { text: "English", link: "/en" },
    //   ],
    // },
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
    nav: [
      {
        text: "工具",
        link: "http://xyz.alongweb.top",
        target: "_self",
        rel: "sponsored",
      },
      {
        text: "语法速查表",
        link: "http://xyz.alongweb.top/syntax",
        target: "_self",
        rel: "sponsored",
      },
      {
        text: "Linux速查",
        link: "http://xyz.alongweb.top/linux",
        target: "_self",
        rel: "sponsored",
      },
      {
        text: "HTTP小册",
        link: "/http/",
      },
      {
        text: "图片上传",
        link: "http://xyz.alongweb.top/upload",
        target: "_self",
        rel: "sponsored",
      },
      // {
      //   text: "开放API",
      //   link: "http://xyz.alongweb.top/swagger",
      //   target: "_self",
      //   rel: "sponsored",
      // },
      {
        text: "食谱",
        link: "http://food.alongweb.top/preview",
        target: "_self",
        rel: "sponsored",
      },
      // {
      //   text: "截图",
      //   link: "http://xyz.alongweb.top/shot",
      //   target: "_self",
      //   rel: "sponsored",
      // },
      {
        text: "面试",
        items: [
          { text: "HTML5", link: "/ms/interview/" },
          { text: "CSS3", link: "/ms/interview/index1.md" },
          { text: "JavaScript", link: "/ms/javascript/" },
          { text: "Vue", link: "/ms/vue/" },
          { text: "React", link: "/ms/react/" },
          { text: "性能优化", link: "/ms/performance/" },
          { text: "部署", link: "/ms/deploy/" },
        ],
      },
      // {
      //   text: "小册",
      //   items: [
      //     { text: "linux小册", link: "/linux/" },
      //     { text: "http小册", link: "/http/" },
      //   ],
      // },
      {
        text: "博客文章",
        items: [
          { text: "每周一文", link: "/book/" },
          { text: "JavaScript 30 Seconds", link: "/javascript/" },
        ],
      },
      // {
      //   text: "Meet You",
      //   link: "/meet/",
      // },
      // {
      //   text: "后台管理模版",
      //   link: "http://admin.alongweb.top",
      //   target: "_self",
      //   rel: "sponsored",
      // },
      // {
      //   text: "随笔",
      //   link: "/notes/",
      // },
      // {
      //   text: "摸鱼",
      //   link: "/lazy/",
      // },
      // {
      //   text: "指南",
      //   link: "/guide/",
      // },
      // {
      //   text: "关于我",
      //   link: "/introduce/",
      // },
      {
        text: "赞助",
        link: "/sponsor/",
      },
      // {
      //   text: "插件",
      //   link: "https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN",
      // },
      // {
      //   text: '友链',
      //   items: [
      //     { text: '祥祥的前端之旅', link: 'http://www.alongweb.top' }
      //   ]
      // }
    ],
    sidebar: {
      xiaoce: [
        {
          text: "Vue3 + Nest.js 点餐系统",
          items: [{ text: "前言", link: "/html/" }],
        },
      ],

      "/html/": [
        {
          text: "HTML5",
          items: [
            { text: "走进HTML的世界", link: "/html/" },
            { text: "如何使用Referrer", link: "/html/html-1.md" },
            { text: "HTM的编码初步了解", link: "/html/html-2.md" },
            { text: "HTML5中的语义化标签", link: "/html/html-3.md" },
            { text: "如何使用HTML5的新表单元素", link: "/html/html-4.md" },
            { text: "HTML5中的Canvas和SVG", link: "/html/html-5.md" },
            { text: "如何使用HTML的音频和视频标签", link: "/html/html-6.md" },
            { text: "HTML5中的地理定位API", link: "/html/html-7.md" },
            { text: "如何使用HTML5的拖放API", link: "/html/html-8.md" },
            { text: "HTML元素", link: "/html/html-9.md" },
            { text: "HTML全局属性", link: "/html/html-10.md" },
          ],
        },
      ],
      "/css/": [
        {
          text: "CSS3",
          items: [
            { text: "CSS命名规范", link: "/css/" },
            { text: "常用CSS属性", link: "/css/css-1.md" },
            { text: "移动端适配方案", link: "/css/css-2.md" },
            { text: "如何使用多媒体查询", link: "/css/css-3.md" },
            { text: "一行代码修复 100vh bug", link: "/css/css-4.md" },
            { text: "大型、小型和动态视口单元", link: "/css/css-5.md" },
          ],
        },
      ],
      "/js/": [
        {
          text: "基础",
          items: [
            { text: "数据类型及类型判断", link: "/js/" },
            { text: "真值与假值", link: "/js/js-1.md" },
            { text: "数据类型转换", link: "/js/js-2.md" },
            { text: "变量", link: "/js/js-3.md" },
            { text: "特殊符号", link: "/js/js-4.md" },
            { text: "转移字符", link: "/js/js-5.md" },
            { text: "控制流与异常处理", link: "/js/js-6.md" },
            { text: "循环", link: "/js/js-7.md" },
            { text: "函数", link: "/js/js-8.md" },
            { text: "闭包", link: "/js/js-9.md" },
            { text: "call、apply、bind", link: "/js/js-10.md" },
            { text: "数字与日期", link: "/js/js-11.md" },
            { text: "对象", link: "/js/js-12.md" },
            { text: "数组", link: "/js/js-13.md" },
            { text: "继承和原型链", link: "/js/js-14.md" },
            { text: "正则", link: "/js/js-15.md" },
            { text: "正则表达式", link: "/js/js-16.md" },
            { text: "Map and Set", link: "/js/js-17.md" },
            { text: "WeakMap", link: "/js/js-18.md" },
            { text: "WeakSet", link: "/js/js-19.md" },
            { text: "Promise", link: "/js/js-20.md" },
            { text: "Async", link: "/js/js-21.md" },
            { text: "Ajax", link: "/js/js-22.md" },
            { text: "Proxy", link: "/js/js-23.md" },
            { text: "generator", link: "/js/js-24.md" },
            { text: "Reflect", link: "/js/js-25.md" },
            { text: "类", link: "/js/js-26.md" },
            { text: "Window", link: "/js/js-27.md" },
            { text: "requestAnimationFrame", link: "/js/js-32.md" },
            { text: "URL", link: "/js/js-61.md" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "跨域", link: "/js/js-30.md" },
            { text: "常用编码转化", link: "/js/js-33.md" },
            { text: "模块", link: "/js/js-28.md" },
            { text: "事物", link: "/js/js-29.md" },
            { text: "回流重绘", link: "/js/js-31.md" },
            { text: "异步并行与串行", link: "/js/js-37.md" },
            { text: "代码并发控制", link: "/js/js-38.md" },
            { text: "函数式编程", link: "/js/js-51.md" },
            { text: "数据埋点", link: "/js/js-53.md" },
            { text: "数据的深拷贝", link: "/js/js-36.md" },
            { text: "前端常见兼容", link: "/js/js-46.md" },
            { text: "浏览器存储", link: "/js/js-48.md" },
            { text: "前端缓存", link: "/js/js-50.md" },
            { text: "Event loop", link: "/js/js-54.md" },
            { text: "reduce的20种用法", link: "/js/js-59.md" },
            { text: "终结异步函数调用", link: "/js/js-60.md" },
            { text: "前端加密", link: "/js/js-62.md" },
          ],
        },
        {
          text: "实战",
          items: [
            { text: "笛卡尔积", link: "/js/js-34.md" },
            { text: "APi封装", link: "/js/js-35.md" },
            { text: "图片压缩", link: "/js/js-39.md" },
            { text: "虚拟滚动", link: "/js/js-40.md" },
            { text: "文件切片", link: "/js/js-41.md" },
            { text: "文件下载", link: "/js/js-42.md" },
            { text: "获取视频某一帧", link: "/js/js-43.md" },
            { text: "json数据导出csv", link: "/js/js-44.md" },
            { text: "碰撞检测", link: "/js/js-45.md" },
            { text: "地图接入指南", link: "/js/js-52.md" },
            { text: "中文转拼音", link: "/js/js-55.md" },
            { text: "浏览器滚动监听", link: "/js/js-47.md" },
          ],
        },
        {
          text: "资源库",
          items: [
            { text: "js开发工具函数", link: "/js/js-56.md" },
            { text: "不同类型转base64的后缀", link: "/js/js-57.md" },
            { text: "城市编码表", link: "/js/js-58.md" },
          ],
        },
        {
          text: "原理",
          items: [],
        },
      ],
      "/design/": [
        {
          text: "设计模式",
          items: [
            { text: "灵活的语言-Javascript", link: "/design/" },
            { text: "设计模式分类概览表", link: "/design/design-1.md" },
            { text: "面向对象编程", link: "/design/design-2.md" },
            { text: "构造器模式", link: "/design/design-3.md" },
            { text: "模块化模式", link: "/design/design-4.md" },
            { text: "暴露模块模式", link: "/design/design-5.md" },
            { text: "单例模式", link: "/design/design-6.md" },
            { text: "观察者模式", link: "/design/design-7.md" },
            { text: "中介者模式", link: "/design/design-8.md" },
            { text: "原型模式", link: "/design/design-9.md" },
            { text: "命令模式", link: "/design/design-10.md" },
            { text: "外观模式", link: "/design/design-11.md" },
            { text: "工厂模式", link: "/design/design-12.md" },
            { text: "Mixin模式", link: "/design/design-13.md" },
            { text: "装饰模式", link: "/design/design-14.md" },
            { text: "享元模式", link: "/design/design-15.md" },
          ],
        },
      ],
      "/web/": [
        {
          text: "Web Apis",
          items: [
            { text: "Canvas Api", link: "/web/" },
            { text: "Html2Canvas", link: "/web/web-2.md" },
            { text: "FontFace APi", link: "/web/web-3.md" },
            { text: "Geolocation Api", link: "/web/web-4.md" },
            { text: "IntersectionObserver", link: "/web/web-5.md" },
            { text: "Server-Sent Events", link: "/web/web-6.md" },
            { text: "SVG", link: "/web/web-7.md" },
            { text: "WebSocket", link: "/web/web-8.md" },
            { text: "WebSocket实践", link: "/web/web-9.md" },
            { text: "WebSocket模拟", link: "/web/web-10.md" },
            { text: "Web Share API", link: "/web/web-11.md" },
            { text: "Fetch Api", link: "/web/web-12.md" },
            { text: "Service Worker", link: "/web/web-13.md" },
            { text: "Web Components", link: "/web/web-14.md" },
            { text: "Web Audio API", link: "/web/web-15.md" },
            { text: "WebRTC", link: "/web/web-16.md" },
          ],
        },
      ],
      "/algorithm/": [
        {
          text: "前言",
          items: [{ text: "介绍", link: "/algorithm/" }],
        },
        {
          text: "数据结构",
          items: [
            { text: "数组", link: "/algorithm/index-0.md" },
            { text: "堆栈", link: "/algorithm/index-1.md" },
            { text: "队列", link: "/algorithm/index-2.md" },
            { text: "链表", link: "/algorithm/index-3.md" },
            { text: "集合", link: "/algorithm/index-4.md" },
            { text: "字典", link: "/algorithm/index-5.md" },
            { text: "散列表", link: "/algorithm/index-6.md" },
            { text: "二叉树", link: "/algorithm/index-7.md" },
            { text: "图", link: "/algorithm/index-8.md" },
          ],
        },
        {
          text: "算法",
          items: [
            { text: "排序算法", link: "/algorithm/index-9.md" },
            { text: "数组去重", link: "/algorithm/index-10.md" },
            { text: "数据分页", link: "/algorithm/index-11.md" },
            { text: "递归", link: "/algorithm/index-12.md" },
            { text: "检索算法", link: "/algorithm/index-13.md" },
            { text: "高级算法", link: "/algorithm/index-14.md" },
            { text: "原地算法", link: "/algorithm/index-141.md" },
            { text: "AST", link: "/algorithm/index-15.md" },
            { text: "双指针", link: "/algorithm/index-16.md" },
            { text: "二分法", link: "/algorithm/index-17.md" },
            { text: "常用树操作", link: "/algorithm/index-18.md" },
            { text: "其他", link: "/algorithm/index-25.md" },
          ],
        },
        {
          text: "常用算法",
          items: [
            { text: "数组集合操作", link: "/algorithm/index-19.md" },
            { text: "数组包含", link: "/algorithm/index-20.md" },
            { text: "过滤重复", link: "/algorithm/index-21.md" },
            { text: "寻找中位数", link: "/algorithm/index-22.md" },
            { text: "合并两个有序链表", link: "/algorithm/index-23.md" },
            { text: "diff算法", link: "/algorithm/index-24.md" },
          ],
        },
      ],
      "/ts/": [
        {
          text: "前言",
          items: [
            { text: "为什么学习？", link: "/ts/" },
            { text: "如何学习", link: "/ts/ts-1.md" },
            { text: "优质文章", link: "/ts/ts-2.md" },
          ],
        },
        {
          text: "基础",
          items: [
            { text: "原始数据类型", link: "/ts/ts-3.md" },
            { text: "任意值类型", link: "/ts/ts-4.md" },
            { text: "unknown", link: "/ts/ts-5.md" },
            { text: "void", link: "/ts/ts-6.md" },
            { text: "Never", link: "/ts/ts-7.md" },
            { text: "Symbol", link: "/ts/ts-8.md" },
            { text: "BigInt", link: "/ts/ts-9.md" },
            { text: "数组的类型", link: "/ts/ts-10.md" },
            { text: "元组", link: "/ts/ts-11.md" },
            { text: "函数的类型", link: "/ts/ts-12.md" },
            { text: "枚举", link: "/ts/ts-13.md" },
            { text: "类型推论", link: "/ts/ts-14.md" },
            { text: "字面量类型", link: "/ts/ts-15.md" },
            { text: "模版字面量类型", link: "/ts/ts-16.md" },
            { text: "联合类型", link: "/ts/ts-17.md" },
            { text: "内置对象", link: "/ts/ts-18.md" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "Interface", link: "/ts/ts-19.md" },
            { text: "泛型", link: "/ts/ts-20.md" },
            { text: "类型断言", link: "/ts/ts-21.md" },
            { text: "类型别名", link: "/ts/ts-22.md" },
            { text: "类", link: "/ts/ts-23.md" },
            { text: "类与接口", link: "/ts/ts-24.md" },
            { text: "声明合并", link: "/ts/ts-25.md" },
            { text: "声明文件", link: "/ts/ts-26.md" },
            { text: "扩展阅读", link: "/ts/ts-27.md" },
          ],
        },
        {
          text: "工程",
          items: [
            { text: "编译选项", link: "/ts/ts-28.md" },
            { text: "代码检查", link: "/ts/ts-29.md" },
          ],
        },
        {
          text: "实战",
          items: [
            { text: "PropType", link: "/ts/ts-30.md" },
            { text: "Vue-property-decoraeor", link: "/ts/ts-31.md" },
            { text: "reflect-metadata", link: "/ts/ts-32.md" },
            { text: "vuex-class", link: "/ts/ts-33.md" },
            { text: "PWA", link: "/ts/ts-34.md" },
            { text: "Axios", link: "/ts/ts-35.md" },
          ],
        },
      ],
      "/nest/": [
        {
          text: "Nest.js",
          items: [
            { text: "项目创建", link: "/nest/" },
            { text: "项目结构", link: "/nest/nest-1.md" },
            { text: "路由前缀", link: "/nest/nest-2.md" },
            { text: "连接数据库", link: "/nest/nest-3.md" },
            { text: "CRUD", link: "/nest/nest-4.md" },
            { text: "接口格式配置", link: "/nest/nest-5.md" },
            { text: "拦截错误请求", link: "/nest/nest-6.md" },
            { text: "拦截成功请求", link: "/nest/nest-7.md" },
            { text: "配置Swagger", link: "/nest/nest-8.md" },
            { text: "搭建WebSocket服务", link: "/nest/nest-9.md" },
          ],
        },
      ],
      "/vue/": [
        {
          text: "基础",
          items: [
            { text: "项目创建", link: "/vue/" },
            { text: "文章", link: "/vue/vue-1.md" },
            { text: "生命周期", link: "/vue/vue-2.md" },
            { text: "指令", link: "/vue/vue-3.md" },
            { text: "自定义指令", link: "/vue/vue-4.md" },
            { text: "路由守卫", link: "/vue/vue-5.md" },
            { text: "路由跳转", link: "/vue/vue-6.md" },
            { text: "路由模式", link: "/vue/vue-7.md" },
            { text: "过滤器", link: "/vue/vue-8.md" },
            { text: "实例属性和方法", link: "/vue/vue-9.md" },
            { text: "组件通讯", link: "/vue/vue-10.md" },
            { text: "组件注册", link: "/vue/vue-11.md" },
            { text: "动态组件", link: "/vue/vue-12.md" },
            { text: "数据双向绑定", link: "/vue/vue-13.md" },
            { text: "KeepAlive", link: "/vue/vue-14.md" },
            { text: "Mixins", link: "/vue/vue-15.md" },
            { text: "构造器", link: "/vue/vue-16.md" },
            { text: "Vuex", link: "/vue/vue-17.md" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "构建性能优化", link: "/vue/vue-22.md" },
            { text: "vuex持久化存储", link: "/vue/vue-24.md" },
            { text: "装饰模式应用", link: "/vue/vue-25.md" },
            { text: "常见问题汇总", link: "/vue/vue-26.md" },
            { text: "源码学习", link: "/vue/vue-29.md" },
            { text: "Vue Class Component", link: "/vue/vue-30.md" },
          ],
        },
        {
          text: "实战",
          items: [
            { text: "反向代理", link: "/vue/vue-18.md" },
            { text: "原型挂载", link: "/vue/vue-20.md" },
            { text: "项目构建配置", link: "/vue/vue-21.md" },
            { text: "Docker部署", link: "/vue/vue-19.md" },
            { text: "右键实现菜单", link: "/vue/vue-23.md" },
            { text: "手摸手开发一个插件", link: "/vue/vue-28.md" },
          ],
        },
        {
          text: "插件",
          items: [{ text: "插件汇总", link: "/vue/vue-27.md" }],
        },
      ],
      "/vue3/": [
        {
          text: "修仙界",
          items: [
            { text: "进入仙界", link: "/vue3/" },
            { text: "仙界秘闻", link: "/vue3/index39.md" },
            { text: "功法秘籍", link: "/vue3/index1.md" },
          ],
        },
        {
          text: "练气期",
          items: [
            // { text: 'composition Api', link: '/vue3/index2.md' },
            { text: "lifecycle hooks", link: "/vue3/index3.md" },
            { text: "setup()", link: "/vue3/index4.md" },
            { text: "ref()", link: "/vue3/index5.md" },
            { text: "reactive()", link: "/vue3/index6.md" },
            { text: "computed()", link: "/vue3/index7.md" },
            { text: "readonly()", link: "/vue3/index8.md" },
            { text: "watchEffect()", link: "/vue3/index9.md" },
            { text: "watch()", link: "/vue3/index10.md" },
            { text: "isRef()", link: "/vue3/index11.md" },
            { text: "unRef()", link: "/vue3/index23.md" },
            { text: "toRef()", link: "/vue3/index24.md" },
            { text: "toRefs()", link: "/vue3/index25.md" },
            { text: "toValue()", link: "/vue3/index26.md" },
            { text: "isProxy()", link: "/vue3/index27.md" },
            { text: "isReactive()", link: "/vue3/index28.md" },
            { text: "isReadonly()", link: "/vue3/index29.md" },
          ],
        },
        {
          text: "金丹期",
          items: [
            { text: "shallowRef", link: "/vue3/index12.md" },
            { text: "triggerRef", link: "/vue3/index13.md" },
            { text: "customRef", link: "/vue3/index14.md" },
            { text: "shallowReactive", link: "/vue3/index15.md" },
            { text: "shallowReadonly", link: "/vue3/index16.md" },
            { text: "toRaw", link: "/vue3/index17.md" },
            { text: "markRaw", link: "/vue3/index18.md" },
            { text: "effectScope", link: "/vue3/index19.md" },
            { text: "getCurrentScope", link: "/vue3/index20.md" },
            { text: "onScopeDispose", link: "/vue3/index21.md" },
            { text: "utils source code", link: "/vue3/index22.md" },
          ],
        },
        {
          text: "元婴期",
          items: [
            { text: "provide inject", link: "/vue3/index31.md" },
            { text: "version", link: "/vue3/index32.md" },
            { text: "nextTick()", link: "/vue3/index33.md" },
            { text: "defineComponent()", link: "/vue3/index34.md" },
            { text: "defineAsyncComponent()", link: "/vue3/index35.md" },
            { text: "defineCustomElement()", link: "/vue3/index36.md" },
            { text: "script setup", link: "/vue3/index37.md" },
            { text: "typescript 工具类型", link: "/vue3/index38.md" },
          ],
        },
        {
          text: "大乘期",
          items: [
            { text: "Teleport", link: "/vue3/index41.md" },
            { text: "Suspense", link: "/vue3/index42.md" },
            { text: "3.3主要特性", link: "/vue3/index43.md" },
            { text: "3.4主要特性", link: "/vue3/index47.md" },
            // { text: 'vue-property-decorator', link: '/vue3/index44.md' },
            { text: "composition", link: "/vue3/index45.md" },
            { text: "Fragments", link: "/vue3/index46.md" },
            { text: "Vue3组合式APi使用指南", link: "/vue3/index48.md" },
          ],
        },
        {
          text: "渡劫期",
          items: [
            { text: "pinia", link: "/vue3/index50.md" },
            { text: "pinia-plugin-persistedstate", link: "/vue3/index51.md" },
            { text: "router", link: "/vue3/index52.md" },
            { text: "env", link: "/vue3/index53.md" },
            { text: "unplugin-auto-import/vite", link: "/vue3/index54.md" },
            { text: "vite-plugin-inspect", link: "/vue3/index55.md" },
            { text: "vueuse", link: "/vue3/index56.md" },
            { text: "vite.config", link: "/vue3/index57.md" },
          ],
        },
        {
          text: "至尊无敌",
          items: [
            { text: "Shared Composable", link: "/vue3/index30.md" },
            { text: "v3 source code", link: "/vue3/index40.md" },
            { text: "从vue2迁移", link: "/vue3/index70.md" },
          ],
        },
        {
          text: "试炼塔",
          items: [
            { text: "自定义修饰符", link: "/vue3/index58.md" },
            { text: "验证Props", link: "/vue3/index59.md" },
            { text: "可写的计算属性", link: "/vue3/index60.md" },
            { text: "watch 全家桶", link: "/vue3/index61.md" },
            { text: "浅层 ref", link: "/vue3/index62.md" },
            { text: "切换器", link: "/vue3/index63.md" },
            { text: "计数器", link: "/vue3/index64.md" },
            { text: "切换焦点指令", link: "/vue3/index65.md" },
            { text: "防抖点击指令", link: "/vue3/index66.md" },
            { text: "按键修饰符", link: "/vue3/index67.md" },
            { text: "鼠标坐标", link: "/vue3/index68.md" },
            { text: "全局CSS", link: "/vue3/index69.md" },
            { text: "Effect作用域 API", link: "/vue3/index71.md" },
            { text: "树组件", link: "/vue3/index72.md" },
            { text: "实现简易版v-model指令", link: "/vue3/index73.md" },
          ],
        },
      ],

      "/structure/": [
        { text: "概览", link: "/structure/" },
        { text: "什么是开发规范", link: "/structure/structure-1.md" },
        { text: "开发流程", link: "/structure/structure-2.md" },
        {
          text: "规范",
          items: [
            { text: "HTML规范", link: "/structure/structure-3.md" },
            { text: "CSS规范", link: "/structure/structure-4.md" },
            { text: "JavaScript规范", link: "/structure/structure-5.md" },
            { text: "代码注释规范", link: "/structure/structure-6.md" },
            { text: "Git安装", link: "/structure/structure-7.md" },
            { text: "Git常用命令", link: "/structure/structure-8.md" },
            { text: "Git提交规范", link: "/structure/structure-9.md" },
            { text: "changelog生成", link: "/structure/structure-10.md" },
            { text: "仓库臃肿怎么办", link: "/structure/structure-11.md" },
            { text: "Eslint规范", link: "/structure/structure-12.md" },
            { text: "安全规范", link: "/structure/structure-35.md" },
            { text: "业务组件编写规范", link: "/structure/structure-13.md" },
            { text: "雅虎军规", link: "/structure/structure-14.md" },
            { text: "vue性能优化规范", link: "/structure/structure-15.md" },
          ],
        },
        {
          text: "基础配置",
          items: [
            { text: "数据请求库", link: "/structure/structure-16.md" },
            { text: "数据管理", link: "/structure/structure-17.md" },
            { text: "动态路由", link: "/structure/structure-18.md" },
            { text: "socket配置", link: "/structure/structure-19.md" },
            { text: "socket的应用", link: "/structure/structure-31.md" },
          ],
        },
        {
          text: "构建配置",
          items: [
            { text: "环境变量配置", link: "/structure/structure-20.md" },
            { text: "vue.config.js", link: "/structure/structure-21.md" },
            { text: "vite.config.js", link: "/structure/structure-36.md" },
            { text: "babel.config.js", link: "/structure/structure-22.md" },
            { text: ".browserslistrc", link: "/structure/structure-23.md" },
            { text: ".editorconfig", link: "/structure/structure-24.md" },
            { text: ".gitignore", link: "/structure/structure-25.md" },
            { text: ".eslintrc", link: "/structure/structure-26.md" },
            { text: ".eslintignore", link: "/structure/structure-27.md" },
            { text: ".postcss.config.js", link: "/structure/structure-28.md" },
            { text: ".prettierrc", link: "/structure/structure-29.md" },
            { text: "commitlint.config", link: "/structure/structure-30.md" },
            {
              text: "husky7 + commitlint + lint-staged 配置",
              link: "/structure/structure-37.md",
            },
          ],
        },
        {
          text: "打包部署",
          items: [
            { text: "ftp上传", link: "/structure/structure-31.md" },
            { text: "自动化部署", link: "/structure/structure-32.md" },
          ],
        },
        {
          text: "其它",
          items: [
            { text: "如何减少开发中的BUG", link: "/structure/structure-33.md" },
            { text: "NPM插件安装", link: "/structure/structure-34.md" },
          ],
        },
      ],
      "/uniapp/": [
        {
          text: "前言",
          items: [
            { text: "介绍", link: "/uniapp/" },
            { text: "文章", link: "/uniapp/uniapp-1.md" },
            { text: "常见问题", link: "/uniapp/uniapp-2.md" },
          ],
        },
        {
          text: "基础",
          items: [
            { text: "基础知识点", link: "/uniapp/uniapp-3.md" },
            { text: "返回上一页如何刷新", link: "/uniapp/uniapp-4.md" },
            { text: "页面的样式与布局", link: "/uniapp/uniapp-5.md" },
            { text: "全局变量", link: "/uniapp/uniapp-6.md" },
            { text: "组件如何通讯", link: "/uniapp/uniapp-7.md" },
            { text: "原生视频控件", link: "/uniapp/uniapp-8.md" },
            { text: "运行环境判断", link: "/uniapp/uniapp-9.md" },
            { text: "常用APi", link: "/uniapp/uniapp-10.md" },
            { text: "nvue与vue的区别", link: "/uniapp/uniapp-11.md" },
            { text: "swiper组件高度如何自适应", link: "/uniapp/uniapp-12.md" },
            { text: "h5唤起app进入指定页面", link: "/uniapp/uniapp-13.md" },
            { text: "判断手机是否安装微信与QQ", link: "/uniapp/uniapp-14.md" },
            { text: "如何跳转第三方应用", link: "/uniapp/uniapp-15.md" },
            { text: "微信支付流程", link: "/uniapp/uniapp-25.md" },
            { text: "支付宝支付流程", link: "/uniapp/uniapp-26.md" },
            { text: "登录", link: "/uniapp/uniapp-27.md" },
            { text: "打包流程", link: "/uniapp/uniapp-28.md" },
            { text: "苹果内购", link: "/uniapp/uniapp-29.md" },
            { text: "扫码", link: "/uniapp/uniapp-30.md" },
            { text: "推送", link: "/uniapp/uniapp-31.md" },
            { text: "axios请求", link: "/uniapp/uniapp-32.md" },
            { text: "分享", link: "/uniapp/uniapp-33.md" },
            { text: "权限检测", link: "/uniapp/uniapp-37.md" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "项目性能优化", link: "/uniapp/uniapp-21.md" },
            { text: "多线程通讯", link: "/uniapp/uniapp-22.md" },
            { text: "mp-painter绘图", link: "/uniapp/uniapp-23.md" },
            { text: "BindingX的使用", link: "/uniapp/uniapp-40.md" },
            { text: "uniapp上传至AppStore", link: "/uniapp/uniapp-41.md" },
            { text: "IOS应用正式包构建流程", link: "/uniapp/uniapp-42.md" },
            { text: "app各大应用市场", link: "/uniapp/uniapp-43.md" },
            { text: "APP加固教程", link: "/uniapp/uniapp-44.md" },
            { text: "IOS设备UDID查询", link: "/uniapp/uniapp-45.md" },
            { text: "APP跳转微信小程序", link: "/uniapp/uniapp-46.md" },
            { text: "微信开放标签打开APP", link: "/uniapp/uniapp-47.md" },
            { text: "uniapp接入淘宝联盟指南", link: "/uniapp/uniapp-48.md" },
            { text: "uniapp接入京东联盟指南", link: "/uniapp/uniapp-49.md" },
            {
              text: "uniapp接入拼多多推广联盟指南",
              link: "/uniapp/uniapp-50.md",
            },
          ],
        },
        {
          text: "实战",
          items: [
            { text: "地图接入", link: "/uniapp/uniapp-34.md" },
            { text: "复制粘贴", link: "/uniapp/uniapp-35.md" },
            { text: "低版本状态栏兼容处理", link: "/uniapp/uniapp-16.md" },
            { text: "页面滑动监听", link: "/uniapp/uniapp-17.md" },
            { text: "如何写一个app启动页", link: "/uniapp/uniapp-18.md" },
            { text: "骨架屏", link: "/uniapp/uniapp-19.md" },
            { text: "自定义代码片段", link: "/uniapp/uniapp-20.md" },
            { text: "写一个天气查询小程序", link: "/uniapp/uniapp-24.md" },
            { text: "访IM答题", link: "/uniapp/uniapp-36.md" },
            { text: "模拟双击事件", link: "/uniapp/uniapp-39.md" },
            { text: "如何写一个全局弹窗", link: "/uniapp/uniapp-38.md" },
          ],
        },
      ],
      "/react/": [
        {
          text: "武功秘籍",
          items: [
            { text: "社区", link: "/react/index.md" },
            { text: "UI组件库", link: "/react/index2.md" },
            { text: "学习资源", link: "/react/index3.md" },
          ],
        },
        {
          text: "筑基期",
          items: [
            { text: "react介绍及快速入门", link: "/react/index5.md" },
            { text: "一网打尽Hook", link: "/react/index6.md" },
            {
              text: "Hook 的闭包陷阱的成因和解决方案",
              link: "/react/index7.md",
            },
            {
              text: "常用的API",
              link: "/react/index8.md",
            },
            {
              text: "内置组件",
              link: "/react/index9.md",
            },
            {
              text: "受控模式 VS 非受控模式",
              link: "/react/index10.md",
            },
          ],
        },
        {
          text: "结丹期",
          items: [],
        },
        {
          text: "元婴期",
          items: [],
        },
        {
          text: "化神期",
          items: [],
        },
        {
          text: "婴变期",
          items: [],
        },
        {
          text: "古神",
          items: [],
        },
      ],
      "/umi/": [
        {
          text: "基础",
          items: [],
        },
        {
          text: "进阶",
          items: [],
        },
        {
          text: "实战",
          items: [],
        },
      ],
      "/wx/": [
        {
          text: "前言",
          items: [
            { text: "小程序简介", link: "/wx/index.md" },
            { text: "小程序框架选择", link: "/wx/index1.md" },
            { text: "社区资源", link: "/wx/index2.md" },
          ],
        },
        {
          text: "基础",
          items: [
            { text: "uniapp-页面", link: "/wx/index3.md" },
            { text: "uniapp-教程", link: "/wx/index4.md" },
          ],
        },
        {
          text: "进阶",
          items: [],
        },
        {
          text: "实战",
          items: [],
        },
      ],
      "/electron/": [
        {
          text: "基础",
          items: [],
        },
        {
          text: "进阶",
          items: [],
        },
        {
          text: "实战",
          items: [],
        },
      ],
      "/linux/": [
        {
          text: "Linux手册",
          items: [
            { text: "Linux和Shell简介", link: "/linux/" },
            { text: "Linux中的man命令", link: "/linux/linux-1.md" },
            { text: "Linux中的ls命令", link: "/linux/linux-3.md" },
            { text: "Linux中的cd命令", link: "/linux/linux-4.md" },
            { text: "Linux中的pwd命令", link: "/linux/linux-5.md" },
            { text: "Linux中的mkdir命令", link: "/linux/linux-6.md" },
            { text: "Linux中的rmdir命令", link: "/linux/linux-7.md" },
            { text: "Linux中的mv命令", link: "/linux/linux-8.md" },
            { text: "Linux中的cp命令", link: "/linux/linux-9.md" },
            { text: "Linux中的open命令", link: "/linux/linux-10.md" },
            { text: "Linux中的touch命令", link: "/linux/linux-11.md" },
            { text: "Linux中的find命令", link: "/linux/linux-12.md" },
            { text: "Linux中的ln命令", link: "/linux/linux-13.md" },
            { text: "Linux中的gzip命令", link: "/linux/linux-14.md" },
            { text: "Linux中的gunzip命令", link: "/linux/linux-15.md" },
            { text: "Linux中的tar命令", link: "/linux/linux-16.md" },
            { text: "Linux中的alias命令", link: "/linux/linux-17.md" },
            { text: "Linux中的cat命令", link: "/linux/linux-18.md" },
            { text: "Linux中的less命令", link: "/linux/linux-19.md" },
            { text: "Linux中的tail命令", link: "/linux/linux-20.md" },
            { text: "Linux中的wc命令", link: "/linux/linux-21.md" },
            { text: "Linux中的grep命令", link: "/linux/linux-22.md" },
            { text: "Linux中的sort命令", link: "/linux/linux-23.md" },
            { text: "Linux中的uniq命令", link: "/linux/linux-24.md" },
            { text: "Linux中的diff命令", link: "/linux/linux-25.md" },
            { text: "Linux中的echo命令", link: "/linux/linux-26.md" },
            { text: "Linux中的chown命令", link: "/linux/linux-27.md" },
            { text: "Linux中的chmod命令", link: "/linux/linux-28.md" },
            { text: "Linux中的umask命令", link: "/linux/linux-29.md" },
            { text: "Linux中的du命令", link: "/linux/linux-30.md" },
            { text: "Linux中的df命令", link: "/linux/linux-31.md" },
            { text: "Linux中的basename命令", link: "/linux/linux-32.md" },
            { text: "Linux中的dirname命令", link: "/linux/linux-33.md" },
            { text: "inux中的ps命令", link: "/linux/linux-34.md" },
            { text: "Linux中的top命令", link: "/linux/linux-35.md" },
            { text: "Linux中的kill命令", link: "/linux/linux-36.md" },
            { text: "Linux中的killall命令", link: "/linux/linux-37.md" },
            { text: "Linux中的jobs命令", link: "/linux/linux-38.md" },
            { text: "Linux中的bg命令", link: "/linux/linux-39.md" },
            { text: "Linux中的fg命令", link: "/linux/linux-40.md" },
            { text: "Linux中的type命令", link: "/linux/linux-41.md" },
            { text: "Linux中的which命令", link: "/linux/linux-42.md" },
            { text: "Linux中的nohup命令", link: "/linux/linux-43.md" },
            { text: "Linux中的xargs命令", link: "/linux/linux-44.md" },
            { text: "Linux中的vim编辑器命令", link: "/linux/linux-45.md" },
            { text: "Linux中的emacs编辑器命令", link: "/linux/linux-46.md" },
            { text: "Linux中的nano编辑器命令", link: "/linux/linux-47.md" },
            { text: "Linux中的whoami命令", link: "/linux/linux-48.md" },
            { text: "Linux中的who命令", link: "/linux/linux-49.md" },
            { text: "Linux中的su命令", link: "/linux/linux-50.md" },
            { text: "Linux中的sudo命令", link: "/linux/linux-51.md" },
            { text: "Linux中的passwd命令", link: "/linux/linux-52.md" },
            { text: "Linux中的ping命令", link: "/linux/linux-53.md" },
            { text: "Linux中的traceroute命令", link: "/linux/linux-54.md" },
            { text: "Linux中的clear命令", link: "/linux/linux-55.md" },
            { text: "Linux中的history命令", link: "/linux/linux-56.md" },
            { text: "Linux中的export命令", link: "/linux/linux-57.md" },
            { text: "Linux中的crontab命令", link: "/linux/linux-58.md" },
            { text: "Linux中的uname命令", link: "/linux/linux-59.md" },
            { text: "Linux中的env命令", link: "/linux/linux-60.md" },
            { text: "Linux中的printenv命令", link: "/linux/linux-61.md" },
          ],
        },
      ],
      http: [
        {
          text: "HTTP基础",
          items: [
            { text: "HTTP的概述", link: "/http/http1.md" },
            { text: "HTTP的发展", link: "/http/http2.md" },
            { text: "HTTP的消息", link: "/http/http3.md" },
            { text: "HTTP的会话", link: "/http/http4.md" },
          ],
        },
        {
          text: "HTTP安全",
          items: [
            { text: "内容安全策略（CSP）", link: "/http/http5.md" },
            { text: "Strict-Transport-Security", link: "/http/http6.md" },
            { text: "HTTP Cookie", link: "/http/http7.md" },
            { text: "X-Content-Type-Options", link: "/http/http8.md" },
            { text: "X-Frame-Options", link: "/http/http9.md" },
            { text: "X-XSS-Protection", link: "/http/http10.md" },
          ],
        },
        {
          text: "HTTP进阶",
          items: [
            { text: "跨源资源共享（CORS）", link: "/http/http11.md" },
            { text: "HTTP 缓存", link: "/http/http12.md" },
            { text: "HTTP 协议中的数据压缩", link: "/http/http13.md" },
            { text: "HTTP 的重定向", link: "/http/http14.md" },
            { text: "HTTP 资源与规范", link: "/http/http15.md" },
            { text: "HTTP标头", link: "/http/http16.md" },
            { text: "HTTP请求方法", link: "/http/http17.md" },
            { text: "HTTP响应状态码", link: "/http/http18.md" },
          ],
        },
        {
          text: "实战",
          items: [
            { text: "强缓存配置", link: "/http/http19.md" },
            { text: "协商缓存", link: "/http/http22.md" },
            { text: "gzip压缩配置", link: "/http/http20.md" },
            { text: "路由刷新404配置", link: "/http/http21.md" },
            { text: "二级目录配置", link: "/http/http23.md" },
            { text: "Nginx", link: "/http/http24.md" },
          ],
        },
      ],

      "/project/": [
        {
          text: "点餐系统",
          items: [
            { text: "介绍", link: "/project/.md" },
            // { text: "接口文档", link: "/project/project-1.md" },
            // { text: "项目创建", link: "/project/project-2.md" },
            // { text: "基础配置", link: "/project/project-3.md" },
            // { text: "规范配置", link: "/project/project-4.md" },
            // { text: "登录页开发", link: "/project/project-5.md" },
            // { text: "表单增删改查", link: "/project/project-6.md" },
            // { text: "打包配置", link: "/project/project-7.md" },
            // { text: "发布上线", link: "/project/project-8.md" },
          ],
        },
        // {
        //   text: "点餐后台管理系统接口开发",
        //   items: [{ text: "前言", link: "/project/project-18.md" }],
        // },
        // {
        //   text: "点餐小程序",
        //   items: [
        //     { text: "介绍", link: "/project/project-9.md" },
        //     { text: "接口文档", link: "/project/project-10.md" },
        //     { text: "项目创建", link: "/project/project-11.md" },
        //     { text: "项目配置", link: "/project/project-12.md" },
        //     { text: "点餐页面", link: "/project/project-13.md" },
        //     { text: "点餐历史记", link: "/project/project-14.md" },
        //     { text: "个人中心页面", link: "/project/project-15.md" },
        //     { text: "导出数据", link: "/project/project-16.md" },
        //     { text: "发布上线", link: "/project/project-17.md" },
        //   ],
        // },
        // {
        //   text: "Chrome插件开发",
        //   items: [{ text: "前言", link: "/project/project-19.md" }],
        // },
        // {
        //   text: "Meet You H5",
        //   items: [{ text: "前言", link: "/project/project-20.md" }],
        // },
        // {
        //   text: "APP开发",
        //   items: [{ text: "前言", link: "/project/project-21.md" }],
        // },
      ],

      "/book/": [
        {
          text: "每周一文",
          items: [
            { text: "前言", link: "/book/.md" },
            { text: "浏览器截图", link: "/book/book1.md" },
            { text: "Electron开发跨平台应用", link: "/book/book2.md" },
            { text: "扫码枪接入流程", link: "/book/book3.md" },
            { text: "Web版Excel制作过程", link: "/book/book4.md" },
            { text: "浏览器关闭发送异步请求", link: "/book/book5.md" },
            { text: "实现一个在线图片库", link: "/book/book6.md" },
            {
              text: "JavaScript 中创建自定义事件",
              link: "/book/book7.md",
            },
            {
              text: "JavaScript 装饰器",
              link: "/book/book8.md",
            },
            {
              text: "WebSocket 的请求头(header)中如何携带 authorization",
              link: "/book/book9.md",
            },
          ],
        },
      ],
      "/javascript/": [
        {
          text: " JavaScript 30 Seconds",
          items: [
            { text: "前言", link: "/javascript/.md" },
            {
              text: "JavaScript 中的大小写转换",
              link: "/javascript/index1.md",
            },
          ],
        },
      ],

      "/plug/": [
        {
          text: "vue插件收藏",
          items: [
            { text: "拖拽插件", link: "/index/.md" },
            { text: "图片预览", link: "/index1/.md" },
          ],
        },
      ],
      "/ms/javascript/": [
        {
          text: "JavaScript面试题库",
          items: [
            { text: "基础篇", link: "/ms/javascript/index.md" },
            { text: "进阶篇", link: "/ms/javascript/index1.md" },
            { text: "原理篇", link: "/ms/javascript/index2.md" },
          ],
        },
      ],
      "/ms/vue/": [
        {
          text: "Vue面试题库",
          items: [
            { text: "基础篇", link: "/ms/vue/index.md" },
            { text: "进阶篇", link: "/ms/vue/index1.md" },
            { text: "原理篇", link: "/ms/vue/index2.md" },
          ],
        },
      ],
      "/ms/react/": [
        {
          text: "React面试题库",
          items: [
            { text: "基础篇", link: "/ms/react/index.md" },
            { text: "进阶篇", link: "/ms/react/index1.md" },
            { text: "原理篇", link: "/ms/react/index2.md" },
            { text: "实战篇", link: "/ms/react/index3.md" },
          ],
        },
      ],
      "/ms/performance/": [
        {
          text: "性能优化",
          items: [
            { text: "基础篇", link: "/ms/performance/index.md" },
            { text: "进阶篇", link: "/ms/performance/index1.md" },
          ],
        },
      ],
      "/ms/deploy/": [
        {
          text: "部署",
          items: [
            { text: "基础篇", link: "/ms/deploy/index.md" },
            { text: "进阶篇", link: "/ms/deploy/index1.md" },
          ],
        },
      ],
      // "/interview/": [
      //   {
      //     text: "面试宝典",
      //     items: [
      //       { text: "html", link: "/interview/.md" },
      //       { text: "css", link: "/interview/index1.md" },
      //     ],
      //   },
      // ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/YangWenLong123" },
    ],
    footer: {
      message: "",
      copyright:
        'Copyright © 2023 Web Box  <a href="https://beian.miit.gov.cn/" target="__blank">皖ICP备2023007113号</a>',
      // copyright: 'Copyright ©2023 Zxx Web Box  <a href="https://beian.miit.gov.cn/" target="__blank">皖ICP备2023007113号-1</a>'
    },
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // }
  },
});
