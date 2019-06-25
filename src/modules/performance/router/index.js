
// 此方式会将所以文件打包到一个js里，没能实现按需加载
// import Home from '../pages/home'
// import EquipmentView from '../pages/equipmentView'
// import PeopleView from '../pages/peopleView'
// import OrderInfoView from '../pages/orderInfoView'

// 按需加载，这里将facilitiesAndStaff目录里的内容打包到一个js里。
const Home = () => import(/* webpackChunkName: 'performance' */ '../pages/home')
const Kpi = () => import(/* webpackChunkName: 'performance' */ '../pages/kpi')
const Mark = () => import(/* webpackChunkName: 'performance' */ '../pages/mark')
const Technician = () => import(/* webpackChunkName: 'performance' */ '../pages/kpi/technician.vue')
const Competent = () => import(/* webpackChunkName: 'performance' */ '../pages/kpi/competent.vue')

export default [
  {
    path: 'performance',
    component: Home,
    redirect: 'performance/kpi',
    children: [
      {
        path: 'kpi',
        component: Kpi
      },
      {
        path: 'mark',
        component: Mark
      },
      {
        path: 'technician',
        component: Technician
      },
      {
        path: 'competent',
        component: Competent
      }
    ]
  }
]
