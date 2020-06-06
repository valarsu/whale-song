export default [{
  path: '/welcome',
  title: '欢迎你',
  name: 'Welcome',
  children: null
}, {
  path: '/articles',
  title: '文章列表',
  name: 'Articles',
  children: [{
    path: 'list',
    title: '文章列表',
    name: 'ArticlesList',
    children: null
  }, {
    path: ':articleId',
    title: '文章详情',
    name: 'ArticlesDetail',
    children: null
  }]
}, {
  path: '/about',
  title: '关于我',
  name: 'About',
  children: null
}]