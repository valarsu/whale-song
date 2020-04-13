import App from './../page/App';
import About from './../page/about/About'
import ArticlesList from './../page/articles/List'
export default [
    {
        path: '/',
        name: 'home',
        component: App
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/articles',
        name: 'articles',
        children: [{
            path: '/list',
            name: 'articlesList',
            component: ArticlesList
        }]
    }
]