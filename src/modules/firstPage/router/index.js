const Home = () => import(/* webpackChunkName: 'firstPage' */ '../pages/home')
const Main = () => import(/* webpackChunkName: 'firstPage' */ '../pages/main')
export default [
  {
    path: 'home',
    component: Home,
    redirect: 'home/main',
    children: [{
      path: 'main',
      component: Main
    }]
  }
]
