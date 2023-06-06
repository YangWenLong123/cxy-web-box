/*
 * @Author: along
 * @Description:
 * @Date: 2023-05-26 14:47:28
 * @LastEditors: along
 * @LastEditTime: 2023-06-06 17:13:19
 * @FilePath: /cxy-web-box/docs/.vitepress/config.js
 */
import { defineConfig } from 'vitepress'

export default defineConfig({
  // lang: 'en-US',
  title: 'Web Box',
  description: 'Just playing around.',
  lastUpdated: true,
  head: [
    // [['meta', { name: 'keywords', content: 'Web Box, 程序员盒子, 一个网站、提供一揽子的服务, along, 前端笔记' }]],
    // ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['link', { rel: 'stylesheet', href: '/styles/global.css' }],
    ['link', { rel: 'icon', href: '/image/logo.svg', type: 'image/svg+xml' }],

  ],
  themeConfig: {
    logo: '/image/logo.svg',
    lastUpdatedText: 'Updated Date',
    search: {
      // provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    // localeLinks: {
    //   items: [
    //     { text: "简体中文", link: "/" },
    //     { text: "English", link: "/en" }
    //   ]
    // },
    // carbonAds: {
    //   code: 'your-carbon-code',
    //   placement: 'your-carbon-placement'
    // },
    nav: [
      {
        text: '工具',
        link: "http://xyz.alongweb.top",
        target: '_self',
        rel: 'sponsored'
      },
      {
        text: '小册',
        link: "http://xyz.alongweb.top/book",
        target: '_self',
        rel: 'sponsored'
      },
      {
        text: '随笔',
        link: "/notes/"
      },
      {
        text: '摸鱼',
        link: "/lazy/"
      },
      {
        text: '指南',
        link: "/guide/"
      },
      {
        text: '关于我',
        link: "/introduce/"
      },
      {
        text: '赞助',
        link: "/sponsor/"
      },
      {
        text: '插件',
        link: "https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN"
      },
      {
        text: '友链',
        items: [
          { text: '祥祥的前端之旅', link: 'http://www.zxxweb.top' }
        ]
      }
    ],
    sidebar: {
      '/html/': [
        {
          text: 'HTML5',
          items: [
            { text: '走进HTML的世界', link: '/html/' },
            { text: '如何使用Referrer', link: '/html/html-1.md' },
            { text: 'HTM的编码初步了解', link: '/html/html-2.md' },
            { text: 'HTML5中的语义化标签', link: '/html/html-3.md' },
            { text: '如何使用HTML5的新表单元素', link: '/html/html-4.md' },
            { text: 'HTML5中的Canvas和SVG', link: '/html/html-5.md' },
            { text: '如何使用HTML的音频和视频标签', link: '/html/html-6.md' },
            { text: 'HTML5中的地理定位API', link: '/html/html-7.md' },
            { text: '如何使用HTML5的拖放API', link: '/html/html-8.md' }
          ]
        }
      ],
      '/css/': [
        {
          text: 'CSS3',
          items: [
            { text: 'CSS命名规范', link: '/css/' },
            { text: '常用CSS属性', link: '/css/css-1.md' },
            { text: '移动端适配', link: '/css/css-2.md' },
            { text: '多媒体查询', link: '/css/css-3.md' },
          ]
        }
      ],
      '/js/': [
        {
          text: '基础',
          items: [
            { text: '数据类型及类型判断', link: '/js/' },
            { text: '真值与假值', link: '/js/js-1.md' },
            { text: '数据类型转换', link: '/js/js-2.md' },
            { text: '变量', link: '/js/js-3.md' },
            { text: '特殊符号', link: '/js/js-4.md' },
            { text: '转移字符', link: '/js/js-5.md' },
            { text: '控制流与异常处理', link: '/js/js-6.md' },
            { text: '循环', link: '/js/js-7.md' },
            { text: '函数', link: '/js/js-8.md' },
            { text: '闭包', link: '/js/js-9.md' },
            { text: 'call、apply、bind', link: '/js/js-10.md' },
            { text: '数字与日期', link: '/js/js-11.md' },
            { text: '对象', link: '/js/js-12.md' },
            { text: '数组', link: '/js/js-13.md' },
            { text: '继承和原型链', link: '/js/js-14.md' },
            { text: '正则', link: '/js/js-15.md' },
            { text: '正则表达式', link: '/js/js-16.md' },
            { text: 'Map and Set', link: '/js/js-17.md' },
            { text: 'WeakMap', link: '/js/js-18.md' },
            { text: 'WeakSet', link: '/js/js-19.md' },
            { text: 'Promise', link: '/js/js-20.md' },
            { text: 'Async', link: '/js/js-21.md' },
            { text: 'Ajax', link: '/js/js-22.md' },
            { text: 'Proxy', link: '/js/js-23.md' },
            { text: 'generator', link: '/js/js-24.md' },
            { text: 'Reflect', link: '/js/js-25.md' },
            { text: '类', link: '/js/js-26.md' },
            { text: 'Window', link: '/js/js-27.md' },
            { text: '跨域', link: '/js/js-30.md' },
            { text: 'requestAnimationFrame', link: '/js/js-32.md' },
            { text: '常用编码转化', link: '/js/js-33.md' },
            { text: '数据的深拷贝', link: '/js/js-36.md' },
            { text: '前端常见兼容', link: '/js/js-46.md' },
            { text: '浏览器滚动监听', link: '/js/js-47.md' },
            { text: '浏览器存储', link: '/js/js-48.md' },
            { text: '前端缓存', link: '/js/js-50.md' },
            { text: 'Event loop', link: '/js/js-54.md' },
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '模块', link: '/js/js-28.md' },
            { text: '事物', link: '/js/js-29.md' },
            { text: '回流重绘', link: '/js/js-31.md' },
            { text: '异步并行与串行', link: '/js/js-37.md' },
            { text: '代码并发控制', link: '/js/js-38.md' },
            { text: '强缓存与协商缓存', link: '/js/js-49.md' },
            { text: '函数式编程', link: '/js/js-51.md' },
            { text: '数据埋点', link: '/js/js-53.md' },
          ]
        },
        {
          text: '实战',
          items: [
            { text: '笛卡尔积', link: '/js/js-34.md' },
            { text: 'APi封装', link: '/js/js-35.md' },
            { text: '图片压缩', link: '/js/js-39.md' },
            { text: '虚拟滚动', link: '/js/js-40.md' },
            { text: '文件切片', link: '/js/js-41.md' },
            { text: '单文件与多文件下载', link: '/js/js-41.md' },
            { text: '获取视频某一帧', link: '/js/js-43.md' },
            { text: 'json数据导出csv', link: '/js/js-44.md' },
            { text: '碰撞检测', link: '/js/js-45.md' },
            { text: '地图接入指南', link: '/js/js-52.md' },
            { text: '中文转拼音', link: '/js/js-55.md' },
          ]
        },
        {
          text: '资源库',
          items: [
            { text: 'js开发工具函数', link: '/js/js-56.md' },
            { text: '不同类型转base64的后缀', link: '/js/js-57.md' },
            { text: '城市编码表', link: '/js/js-58.md' },
          ]
        },
        {
          text: '原理',
          items: [

          ]
        }
      ],
      '/design/': [
        {
          text: '设计模式',
          items: [
            { text: '灵活的语言-Javascript', link: '/design/' },
            { text: '设计模式分类概览表', link: '/design/design-1.md' },
            { text: '面向对象编程', link: '/design/design-2.md' },
            { text: '构造器模式', link: '/design/design-3.md' },
            { text: '模块化模式', link: '/design/design-4.md' },
            { text: '暴露模块模式', link: '/design/design-5.md' },
            { text: '单例模式', link: '/design/design-6.md' },
            { text: '观察者模式', link: '/design/design-7.md' },
            { text: '中介者模式', link: '/design/design-8.md' },
            { text: '原型模式', link: '/design/design-9.md' },
            { text: '命令模式', link: '/design/design-10.md' },
            { text: '外观模式', link: '/design/design-11.md' },
            { text: '工厂模式', link: '/design/design-12.md' },
            { text: 'Mixin模式', link: '/design/design-13.md' },
            { text: '装饰模式', link: '/design/design-14.md' },
            { text: '享元模式', link: '/design/design-15.md' },
          ]
        }
      ],
      '/web/': [
        {
          text: 'Web Apis',
          items: [
            { text: 'Canvas Api', link: '/web/' },
            { text: 'Html2Canvas', link: '/web/web-2.md' },
            { text: 'FontFace APi', link: '/web/web-3.md' },
            { text: 'Geolocation Api', link: '/web/web-4.md' },
            { text: 'IntersectionObserver', link: '/web/web-5.md' },
            { text: 'Server-Sent Events', link: '/web/web-6.md' },
            { text: 'SVG', link: '/web/web-7.md' },
            { text: 'WebSocket', link: '/web/web-8.md' },
            { text: 'WebSocket实践', link: '/web/web-9.md' },
            { text: 'WebSocket模拟', link: '/web/web-10.md' },
            { text: 'Web Share API', link: '/web/web-11.md' },
            { text: 'Fetch Api', link: '/web/web-12.md' },
            { text: 'Service Worker', link: '/web/web-13.md' },
            { text: 'Web Components', link: '/web/web-14.md' },
            { text: 'Web Audio API', link: '/web/web-15.md' },
            { text: 'WebRTC', link: '/web/web-16.md' }
          ]
        }
      ],
      '/algorithm/': [
        {
          text: '前言',
          items: [
            { text: '介绍', link: '/algorithm/' },
          ]
        },
        {
          text: '数据结构',
          items: [
            { text: '数组', link: '/algorithm/index-0.md' },
            { text: '堆栈', link: '/algorithm/index-1.md' },
            { text: '队列', link: '/algorithm/index-2.md' },
            { text: '链表', link: '/algorithm/index-3.md' },
            { text: '集合', link: '/algorithm/index-4.md' },
            { text: '字典', link: '/algorithm/index-5.md' },
            { text: '散列表', link: '/algorithm/index-6.md' },
            { text: '二叉树', link: '/algorithm/index-7.md' },
            { text: '图', link: '/algorithm/index-8.md' },
          ]
        },
        {
          text: '算法',
          items: [
            { text: '排序算法', link: '/algorithm/index-9.md' },
            { text: '数组去重', link: '/algorithm/index-10.md' },
            { text: '数据分页', link: '/algorithm/index-11.md' },
            { text: '递归', link: '/algorithm/index-12.md' },
            { text: '检索算法', link: '/algorithm/index-13.md' },
            { text: '高级算法', link: '/algorithm/index-14.md' },
            { text: '原地算法', link: '/algorithm/index-141.md' },
            { text: 'AST', link: '/algorithm/index-15.md' },
            { text: '双指针', link: '/algorithm/index-16.md' },
            { text: '二分法', link: '/algorithm/index-17.md' },
            { text: '常用树操作', link: '/algorithm/index-18.md' },
            { text: '其他', link: '/algorithm/index-25.md' },
          ]
        },
        {
          text: '常用算法',
          items: [
            { text: '数组集合操作', link: '/algorithm/index-19.md' },
            { text: '数组包含', link: '/algorithm/index-20.md' },
            { text: '过滤重复', link: '/algorithm/index-21.md' },
            { text: '寻找中位数', link: '/algorithm/index-22.md' },
            { text: '合并两个有序链表', link: '/algorithm/index-23.md' },
            { text: 'diff算法', link: '/algorithm/index-24.md' },
          ]
        }
      ],
      '/ts/': [
        {
          text: '前言',
          items: [
            { text: '为什么学习？', link: '/ts/' },
            { text: '如何学习', link: '/ts/ts-1.md' },
            { text: '优质文章', link: '/ts/ts-2.md' },
          ]
        },
        {
          text: '基础',
          items: [
            { text: '原始数据类型', link: '/ts/ts-3.md' },
            { text: '任意值类型', link: '/ts/ts-4.md' },
            { text: 'unknown', link: '/ts/ts-5.md' },
            { text: 'void', link: '/ts/ts-6.md' },
            { text: 'Never', link: '/ts/ts-7.md' },
            { text: 'Symbol', link: '/ts/ts-8.md' },
            { text: 'BigInt', link: '/ts/ts-9.md' },
            { text: '数组的类型', link: '/ts/ts-10.md' },
            { text: '元组', link: '/ts/ts-11.md' },
            { text: '函数的类型', link: '/ts/ts-12.md' },
            { text: '枚举', link: '/ts/ts-13.md' },
            { text: '类型推论', link: '/ts/ts-14.md' },
            { text: '字面量类型', link: '/ts/ts-15.md' },
            { text: '模版字面量类型', link: '/ts/ts-16.md' },
            { text: '联合类型', link: '/ts/ts-17.md' },
            { text: '内置对象', link: '/ts/ts-18.md' },
          ]
        },
        {
          text: '进阶',
          items: [
            { text: 'Interface', link: '/ts/ts-19.md' },
            { text: '', link: '/ts/ts-20.md' },
            { text: '', link: '/ts/ts-21.md' },
            { text: '', link: '/ts/ts-22.md' },
            { text: '', link: '/ts/ts-23.md' },
            { text: '', link: '/ts/ts-24.md' },
            { text: '', link: '/ts/ts-25.md' },
            { text: '', link: '/ts/ts-26.md' },
            { text: '', link: '/ts/ts-27.md' },
          ]
        },
        {
          text: '工程',
          items: [
            { text: '编译选项', link: '/ts/ts-28.md' },
            { text: '代码检查', link: '/ts/ts-29.md' },
          ]
        },
        {
          text: '实战',
          items: [
            { text: 'PropType', link: '/ts/ts-30.md' },
            { text: 'Vue-property-decoraeor', link: '/ts/ts-31.md' },
            { text: 'reflect-metadata', link: '/ts/ts-32.md' },
            { text: 'vuex-class', link: '/ts/ts-33.md' },
            { text: 'PWA', link: '/ts/ts-34.md' },
            { text: 'Axios', link: '/ts/ts-35.md' },
          ]
        }
      ],
      '/nest/': [
        {
          text: 'Nest.js',
          items: [
            { text: '项目创建', link: '/nest/' },
            { text: '项目结构', link: '/nest/nest-1.md' },
            { text: '路由前缀', link: '/nest/nest-2.md' },
            { text: '连接数据库', link: '/nest/nest-3.md' },
            { text: 'CRUD', link: '/nest/nest-4.md' },
            { text: '接口格式配置', link: '/nest/nest-5.md' },
            { text: '拦截错误请求', link: '/nest/nest-6.md' },
            { text: '拦截成功请求', link: '/nest/nest-7.md' },
            { text: '配置Swagger', link: '/nest/nest-8.md' },
            { text: '搭建WebSocket服务', link: '/nest/nest-9.md' },
          ]
        }
      ],
      '/vue/': [
        {
          text: 'Vue2基础',
          items: [
            { text: '项目创建', link: '/vue/' },
            { text: '文章', link: '/vue/vue-1.md' },
            { text: '生命周期', link: '/vue/vue-2.md' },
            { text: '指令', link: '/vue/vue-3.md' },
            { text: '自定义指令', link: '/vue/vue-4.md' },
            { text: '路由守卫', link: '/vue/vue-5.md' },
            { text: '路由跳转', link: '/vue/vue-6.md' },
            { text: '路由模式', link: '/vue/vue-7.md' },
            { text: '过滤器', link: '/vue/vue-8.md' },
            { text: '实例属性和方法', link: '/vue/vue-9.md' },
            { text: '组件通讯', link: '/vue/vue-10.md' },
            { text: '组件注册', link: '/vue/vue-11.md' },
            { text: '动态组件', link: '/vue/vue-12.md' },
            { text: '数据双向绑定', link: '/vue/vue-13.md' },
            { text: 'KeepAlive', link: '/vue/vue-14.md' },
            { text: 'Mixins', link: '/vue/vue-15.md' },
            { text: '构造器', link: '/vue/vue-16.md' },
            { text: 'Vuex', link: '/vue/vue-17.md' },
            { text: '反向代理', link: '/vue/vue-18.md' },
            { text: '原型挂载', link: '/vue/vue-20.md' },
            { text: '项目构建配置', link: '/vue/vue-21.md' },

          ]
        },
        {
          text: 'Vue2进阶',
          items: [
            { text: 'Docker部署', link: '/vue/vue-19.md' },
            { text: '构建性能优化', link: '/vue/vue-22.md' },
            { text: '右键实现菜单', link: '/vue/vue-23.md' },
            { text: 'vuex持久化存储', link: '/vue/vue-24.md' },
            { text: '装饰模式应用', link: '/vue/vue-25.md' },
            { text: '常见问题汇总', link: '/vue/vue-26.md' },
            { text: '插件汇总', link: '/vue/vue-27.md' },
            { text: '手摸手开发一个插件', link: '/vue/vue-28.md' },
            { text: '源码学习', link: '/vue/vue-29.md' },
            { text: 'Vue Class Component', link: '/vue/vue-30.md' },
          ]
        },
        {
          text: 'Vue3',
          items: [
            { text: '2.x与3.x的变化', link: '/vue/vue-31.md' },
            { text: '开源项目', link: '/vue/vue-32.md' },
            { text: '学习资源', link: '/vue/vue-33.md' },
            { text: 'Composition APi初体验', link: '/vue/vue-34.md' },
            { text: 'Composition APi详解', link: '/vue/vue-35.md' },
            { text: '图解API', link: '/vue/vue-36.md' },
            { text: '手写组合API', link: '/vue/vue-37.md' },
            { text: 'Composition Api VS option APi', link: '/vue/vue-38.md' },
            { text: '数据传递', link: '/vue/vue-39.md' },
            { text: 'Vue3开源组件库', link: '/vue/vue-40.md' },
            { text: 'vue-property-decorator', link: '/vue/vue-41.md' },
          ]
        }
      ],
      '/structure/': [
        { text: '概览', link: '/structure/' },
        { text: '什么是开发规范', link: '/structure/structure-1.md' },
        { text: '开发流程', link: '/structure/structure-2.md' },
        {
          text: '规范',
          items: [
            { text: 'HTML规范', link: '/structure/structure-3.md' },
            { text: 'CSS规范', link: '/structure/structure-4.md' },
            { text: 'JavaScript规范', link: '/structure/structure-5.md' },
            { text: '代码注释规范', link: '/structure/structure-6.md' },
            { text: 'Git安装', link: '/structure/structure-7.md' },
            { text: 'Git常用命令', link: '/structure/structure-8.md' },
            { text: 'Git提交规范', link: '/structure/structure-9.md' },
            { text: 'changelog生成', link: '/structure/structure-10.md' },
            { text: 'Eslint规范', link: '/structure/structure-11.md' },
            { text: '安全规范', link: '/structure/structure-12.md' },
            { text: '业务组件编写规范', link: '/structure/structure-13.md' },
            { text: '雅虎军规', link: '/structure/structure-14.md' },
            { text: 'vue性能优化规范', link: '/structure/structure-15.md' },
          ]
        },
        {
          text: '基础配置',
          items: [
            { text: '数据请求库', link: '/structure/structure-16.md' },
            { text: '数据管理', link: '/structure/structure-17.md' },
            { text: '动态路由', link: '/structure/structure-18.md' },
            { text: 'socket配置', link: '/structure/structure-19.md' },
          ]
        },
        {
          text: '构建配置',
          items: [
            { text: '环境变量配置', link: '/structure/structure-20.md' },
            { text: 'vue.config.js', link: '/structure/structure-21.md' },
            { text: 'babel.config.js', link: '/structure/structure-22.md' },
            { text: '.browserslistrc', link: '/structure/structure-23.md' },
            { text: '.editorconfig', link: '/structure/structure-24.md' },
            { text: '.gitignore', link: '/structure/structure-25.md' },
            { text: '.eslintrc', link: '/structure/structure-26.md' },
            { text: '.eslintignore', link: '/structure/structure-27.md' },
            { text: '.postcss.config.js', link: '/structure/structure-28.md' },
            { text: '.prettierrc', link: '/structure/structure-29.md' },
            { text: 'commitlint.config', link: '/structure/structure-30.md' },
          ]
        },
        {
          text: '打包部署',
          items: [
            { text: 'ftp上传', link: '/structure/structure-31.md' },
            { text: '自动化部署', link: '/structure/structure-32.md' },
          ]
        },
        {
          text: '其它',
          items: [
            { text: '如何减少开发中的BUG', link: '/structure/structure-33.md' },
            { text: 'NPM插件', link: '/structure/structure-34.md' },
          ]
        },
      ],
      '/uniapp/': [
        {
          text: '前言',
          items: [
            { text: '介绍', link: '/uniapp/' },
            { text: '文章', link: '/uniapp/uniapp-1.md' },
            { text: '常见问题', link: '/uniapp/uniapp-2.md' },
          ]
        },
        {
          text: '基础',
          items: [
            { text: '基础知识点', link: '/uniapp/uniapp-3.md' },
            { text: '返回上一页如何刷新', link: '/uniapp/uniapp-4.md' },
            { text: '页面的样式与布局', link: '/uniapp/uniapp-5.md' },
            { text: '全局变量', link: '/uniapp/uniapp-6.md' },
            { text: '组件如何通讯', link: '/uniapp/uniapp-7.md' },
            { text: '原生视频控件', link: '/uniapp/uniapp-8.md' },
            { text: '运行环境判断', link: '/uniapp/uniapp-9.md' },
            { text: '常用APi', link: '/uniapp/uniapp-10.md' },
            { text: 'nvue与vue的区别', link: '/uniapp/uniapp-11.md' },
            { text: 'swiper组件高度如何自适应', link: '/uniapp/uniapp-12.md' },
            { text: 'h5唤起app进入指定页面', link: '/uniapp/uniapp-13.md' },
            { text: '判断手机是否安装微信与QQ', link: '/uniapp/uniapp-14.md' },
            { text: '如何跳转第三方应用', link: '/uniapp/uniapp-15.md' },
            { text: '微信支付流程', link: '/uniapp/uniapp-25.md' },
            { text: '支付宝支付流程', link: '/uniapp/uniapp-26.md' },
            { text: '登录', link: '/uniapp/uniapp-27.md' },
            { text: '打包流程', link: '/uniapp/uniapp-28.md' },
            { text: '苹果内购', link: '/uniapp/uniapp-29.md' },
            { text: '扫码', link: '/uniapp/uniapp-30.md' },
            { text: '推送', link: '/uniapp/uniapp-31.md' },
            { text: 'axios请求', link: '/uniapp/uniapp-32.md' },
            { text: '分享', link: '/uniapp/uniapp-33.md' },
            { text: '权限检测', link: '/uniapp/uniapp-37.md' },
          ]
        },
        {
          text: '进阶',
          items: [
            { text: '项目性能优化', link: '/uniapp/uniapp-21.md' },
            { text: '多线程通讯', link: '/uniapp/uniapp-22.md' },
            { text: 'mp-painter绘图', link: '/uniapp/uniapp-23.md' },
            { text: 'BindingX的使用', link: '/uniapp/uniapp-40.md' },
            { text: 'uniapp上传至AppStore', link: '/uniapp/uniapp-41.md' },
            { text: 'IOS应用正式包构建流程', link: '/uniapp/uniapp-42.md' },
            { text: 'app各大应用市场', link: '/uniapp/uniapp-43.md' },
            { text: 'APP加固教程', link: '/uniapp/uniapp-44.md' },
            { text: 'IOS设备UDID查询', link: '/uniapp/uniapp-45.md' },
            { text: 'APP跳转微信小程序', link: '/uniapp/uniapp-46.md' },
            { text: '微信开放标签打开APP', link: '/uniapp/uniapp-47.md' },
            { text: 'uniapp接入淘宝联盟指南', link: '/uniapp/uniapp-48.md' },
            { text: 'uniapp接入京东联盟指南', link: '/uniapp/uniapp-49.md' },
            { text: 'uniapp接入拼多多推广联盟指南', link: '/uniapp/uniapp-50.md' },
          ]
        },
        {
          text: '实战',
          items: [
            { text: '地图接入', link: '/uniapp/uniapp-34.md' },
            { text: '复制粘贴', link: '/uniapp/uniapp-35.md' },
            { text: '低版本状态栏兼容处理', link: '/uniapp/uniapp-16.md' },
            { text: '页面滑动监听', link: '/uniapp/uniapp-17.md' },
            { text: '如何写一个app启动页', link: '/uniapp/uniapp-18.md' },
            { text: '骨架屏', link: '/uniapp/uniapp-19.md' },
            { text: '自定义代码片段', link: '/uniapp/uniapp-20.md' },
            { text: '写一个天气查询小程序', link: '/uniapp/uniapp-24.md' },
            { text: '访IM答题', link: '/uniapp/uniapp-36.md' },
            { text: '模拟双击事件', link: '/uniapp/uniapp-39.md' },
            { text: '如何写一个全局弹窗', link: '/uniapp/uniapp-38.md' },
          ]
        },
      ],
      '/linux/': [
        {
          text: 'Linux',
          items: [
            { text: '前端必须要知道的Linux命令', link: '/linux/' }
          ]
        }
      ],
      '/project/': [
        {
          text: '点餐后台管理系统',
          items: [
            { text: '介绍', link: '/project/.md' },
            { text: '接口文档', link: '/project/project-1.md' },
            { text: '项目创建', link: '/project/project-2.md' },
            { text: '基础配置', link: '/project/project-3.md' },
            { text: '规范配置', link: '/project/project-4.md' },
            { text: '登录页开发', link: '/project/project-5.md' },
            { text: '表单增删改查', link: '/project/project-6.md' },
            { text: '打包配置', link: '/project/project-7.md' },
            { text: '发布上线', link: '/project/project-8.md' }
          ]
        },
        {
          text: '点餐后台管理系统接口开发',
          items: [
            { text: '前言', link: '/project/project-18.md' }
          ]
        },
        {
          text: '点餐小程序',
          items: [
            { text: '介绍', link: '/project/project-9.md' },
            { text: '接口文档', link: '/project/project-10.md' },
            { text: '项目创建', link: '/project/project-11.md' },
            { text: '项目配置', link: '/project/project-12.md' },
            { text: '点餐页面', link: '/project/project-13.md' },
            { text: '点餐历史记', link: '/project/project-14.md' },
            { text: '个人中心页面', link: '/project/project-15.md' },
            { text: '导出数据', link: '/project/project-16.md' },
            { text: '发布上线', link: '/project/project-17.md' }
          ]
        },
        {
          text: 'Chrome插件开发',
          items: [
            { text: '前言', link: '/project/project-19.md' }
          ]
        },
        {
          text: 'Meet You H5',
          items: [
            { text: '前言', link: '/project/project-20.md' }
          ]
        },
        {
          text: 'APP开发',
          items: [
            { text: '前言', link: '/project/project-21.md' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YangWenLong123' },
    ],
    footer: {
      message: '',
      copyright: 'Copyright © 2023 Web Box  <a href="https://beian.miit.gov.cn/" target="__blank">皖ICP备2023007113号</a>'
    },
    // editLink: {
    //   pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
    //   text: 'Edit this page on GitHub'
    // }
  }
})
