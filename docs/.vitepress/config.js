/*
 * @Author: along
 * @Description:
 * @Date: 2023-05-26 14:47:28
 * @LastEditors: along
 * @LastEditTime: 2023-05-30 14:18:30
 * @FilePath: /cxy-web-box/docs/.vitepress/config.js
 */
export default {
  lang: 'en-US',
  title: 'Web Box',
  description: 'Just playing around.',
  themeConfig: {
    logo: '/image/logo.svg',
    lastUpdatedText: 'Updated Date',
    nav: [
      {
        text: '工具盒',
        link: "/tool/"
      },
      {
        text: '小册',
        link: "/course/"
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
      }
    ],
    sidebar: {
      '/html/': [
        {
          text: 'HTML5',
          items: [
            { text: '走进HTML', link: '/html/' },
            { text: 'Referrer', link: '/html/index-1.md' }
          ]
        }
      ],
      '/css/': [
        {
          text: 'CSS3',
          items: [
            { text: 'CSS命名规范', link: '/css/' },
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
}
