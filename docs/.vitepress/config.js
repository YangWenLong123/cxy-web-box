/*
 * @Author: along
 * @Description:
 * @Date: 2023-05-26 14:47:28
 * @LastEditors: along
 * @LastEditTime: 2023-06-05 21:06:41
 * @FilePath: /cxy-web-box/docs/.vitepress/config.js
 */
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
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
          text: 'JavaScript',
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
            { text: '模块', link: '/js/js-28.md' },
            { text: '事物', link: '/js/js-29.md' },
            { text: '跨域', link: '/js/js-30.md' },
            { text: '回流重绘', link: '/js/js-31.md' },
            { text: 'requestAnimationFrame', link: '/js/js-32.md' },
            { text: '常用编码转化', link: '/js/js-33.md' },
            { text: '笛卡尔积', link: '/js/js-34.md' },
            { text: 'APi封装', link: '/js/js-35.md' },
            { text: '数据的深拷贝', link: '/js/js-36.md' },
            { text: '异步并行与串行', link: '/js/js-37.md' },
            { text: '代码并发控制', link: '/js/js-38.md' },
            { text: '图片压缩', link: '/js/js-39.md' },
            { text: '虚拟滚动', link: '/js/js-40.md' },
            { text: '文件切片', link: '/js/js-41.md' },
            { text: '单文件与多文件下载', link: '/js/js-41.md' },
            { text: '获取视频某一帧', link: '/js/js-43.md' },
            { text: 'json数据导出csv', link: '/js/js-44.md' },
            { text: '碰撞检测', link: '/js/js-45.md' },
            { text: '前端常见兼容', link: '/js/js-46.md' },
            { text: '浏览器滚动舰艇', link: '/js/js-47.md' },
            { text: '浏览器存储', link: '/js/js-48.md' },
            { text: '强缓存与协商缓存', link: '/js/js-49.md' },
            { text: '前端缓存', link: '/js/js-50.md' },
            { text: '函数式编程', link: '/js/js-51.md' },
            { text: '地图接入指南', link: '/js/js-52.md' },
            { text: '数据埋点', link: '/js/js-53.md' },
            { text: 'Event loop', link: '/js/js-54.md' },
            { text: '中文转拼音', link: '/js/js-55.md' },
            { text: 'js开发工具函数', link: '/js/js-56.md' },
            { text: '不同类型转base64的后缀', link: '/js/js-57.md' },
            { text: '城市编码表', link: '/js/js-58.md' },
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
      '/algorithm': [
        {
          text: '数据结构与算法',
          items: [
            { text: '介绍', link: '/algorithm/' },
            { text: '数据结构-数组', link: '/algorithm/index-0.md' },
            { text: '数据结构-堆栈', link: '/algorithm/index-1.md' },
            { text: '数据结构-队列', link: '/algorithm/index-2.md' },
            { text: '数据结构-链表', link: '/algorithm/index-3.md' },
            { text: '数据结构-集合', link: '/algorithm/index-4.md' },
            { text: '数据结构-字典', link: '/algorithm/index-5.md' },
            { text: '数据结构-散列表', link: '/algorithm/index-6.md' },
            { text: '数据结构-二叉树', link: '/algorithm/index-7.md' },
            { text: '数据结构-图', link: '/algorithm/index-8.md' },
            { text: '算法-排序算法', link: '/algorithm/index-9.md' },
            { text: '算法-数组去重', link: '/algorithm/index-10.md' },
            { text: '算法-数据分页', link: '/algorithm/index-11.md' },
            { text: '算法-递归', link: '/algorithm/index-12.md' },
            { text: '算法-检索算法', link: '/algorithm/index-13.md' },
            { text: '算法-高级算法', link: '/algorithm/index-14.md' },
            { text: '算法-原地算法', link: '/algorithm/index-141.md' },
            { text: '算法-AST', link: '/algorithm/index-15.md' },
            { text: '算法-双指针', link: '/algorithm/index-16.md' },
            { text: '算法-二分法', link: '/algorithm/index-17.md' },
            { text: '算法-常用树操作', link: '/algorithm/index-18.md' },
            { text: '算法-其他', link: '/algorithm/index-25.md' },
            { text: 'LeetCode-数组集合操作', link: '/algorithm/index-19.md' },
            { text: 'LeetCode-数组包含', link: '/algorithm/index-20.md' },
            { text: 'LeetCode-过滤重复', link: '/algorithm/index-21.md' },
            { text: 'LeetCode-寻找中位数', link: '/algorithm/index-22.md' },
            { text: 'LeetCode-合并两个有序链表', link: '/algorithm/index-23.md' },
            { text: 'diff算法', link: '/algorithm/index-24.md' },
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
