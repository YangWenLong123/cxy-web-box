/*
 * @Author: along
 * @Description:
 * @Date: 2023-05-26 14:47:28
 * @LastEditors: along
 * @LastEditTime: 2023-05-31 16:37:47
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
      provider: 'local',
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
            { text: '走进HTML', link: '/html/' },
            { text: 'Referrer', link: '/html/html-1.md' },
            { text: '编码', link: '/html/html-2.md' }
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
          ]
        }
      ],
      '/design/': [
        {
          text: '设计模式',
          items: [
            { text: '灵活的语言-Javascript', link: '/design/' },
          ]
        }
      ],
      '/web/': [
        {
          text: 'Web Apis',
          items: [
            { text: 'Canvas Api', link: '/web/' },
          ]
        }
      ],
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
