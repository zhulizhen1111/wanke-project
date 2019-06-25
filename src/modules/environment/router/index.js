const Home = () => import(/* webpackChunkName: 'environment' */ '../pages/home')
const Main = () => import(/* webpackChunkName: 'environment' */ '../pages/main')
const Analys = () => import(/* webpackChunkName: 'environment' */ '../pages/analys')
const Heal = () => import(/* webpackChunkName: 'environment' */ '../pages/heal')
const Plane = () => import(/* webpackChunkName: 'environment' */ '../pages/plane')
const Mass = () => import(/* webpackChunkName: 'environment' */ '../pages/mass')
export default [
  {
    path: 'environment',
    component: Home,
    redirect: 'environment/main',
    children: [
      {
        path: 'main',
        component: Main,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'analys',
        component: Analys
      },
      {
        path: 'heal',
        component: Heal
      },
      {
        path: 'plane',
        component: Plane
      },
      {
        path: 'mass',
        component: Mass
      }
    ]
  }
]
