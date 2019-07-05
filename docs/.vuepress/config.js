module.exports = {
  base: '/doctor-jones/',
  title: 'Doctor Jones',
  head: [
    [
      'link',
      { rel: 'shortcut icon', type: 'image/x-icon', href: './favicon.ico' }
    ]
  ],
  description: '中文排版格式化工具',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: '首页', link: '/' },
      { text: 'Doctor Jones', link: '/doctor-jones/intro/' },
      { text: 'CLI', link: '/cli/' },
      { text: 'Webpack Loader', link: '/doctor-jones-loader/' },
      { text: 'Chrome 扩展', link: '/doctor-jones-extension/' },
      {
        text: 'GitHub',
        link:
          'https://github.com/Leopoldthecoder?utf8=%E2%9C%93&tab=repositories&q=doctor-jones'
      }
    ],
    sidebar: {
      '/doctor-jones/': [
        ['intro', '介绍'],
        ['installation', '安装'],
        ['usage', '使用']
      ],
      '/cli/': [['', 'CLI']],
      '/doctor-jones-loader/': [['', 'webpack loader']],
      '/doctor-jones-extension/': [['', 'Chrome 扩展']]
    }
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-142298882-1'
      }
    ]
  ]
}
