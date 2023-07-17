import { getThemeConfig, defineConfig } from '@sugarat/theme/node'

// 主题独有配置
// 详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 文章默认作者
  author: 'Luminous',
  // 友链
  friend: [
    {
      nickname: '粥里有勺糖',
      des: '你的指尖用于改变世界的力量',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://sugarat.top'
    },
    {
      nickname: 'Vitepress',
      des: 'Vite & Vue Powered Static Site Generator',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTI2NzY1Ng==674995267656',
      url: 'https://vitepress.vuejs.org/'
    },
    {
      nickname: '个人简介',
      des: '简单了解一下我吧～',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://sugarat.top'
    },
  ],
  recommend: {
    showSelf: true
  },
  // 开启离线的全文搜索支持（如构建报错可注释下面的配置再次尝试）
  search: 'pagefind',
  // popover: {
  //   title: '公告',
  //   body: [
  //     { type: 'text', content: '👇公众号👇---👇 微信 👇' },
  //     {
  //       type: 'image',
  //       src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210'
  //     },
  //   ],
  //   duration: 0
  // }
})

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: blogTheme,
  lang: 'zh-cn',
  title: '@luminous/docs',
  description: '基于 vitepress 实现',
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
      exclude: ['@sugarat/theme']
    }
  },
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '上次更新于',
    footer: {
      message: '自定义底部内容',
      copyright:
        'MIT Licensed | <a target="_blank" href=""> @luminous/docs </a>'
    },
    logo: '/logo.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: '首页', link: '/' },
      { text: '计网', link: '/Network/01.%E8%AE%A1%E7%BD%91%E8%B5%B7%E6%AD%A5.html' },
      { text: '关于我', link: '/sop/introduce.html' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/jiacheng-coder'
      }
    ]
  }
})