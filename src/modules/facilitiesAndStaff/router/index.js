
// 此方式会将所以文件打包到一个js里，没能实现按需加载
// import Home from '../pages/home'
// import EquipmentView from '../pages/equipmentView'
// import PeopleView from '../pages/peopleView'
// import OrderInfoView from '../pages/orderInfoView'

// 按需加载，这里将facilitiesAndStaff目录里的内容打包到一个js里。
const Home = () => import(/* webpackChunkName: 'facilitiesAndStaff' */ '../pages/home')
const EquipmentView = () => import(/* webpackChunkName: 'facilitiesAndStaff' */ '../pages/equipmentView')
const PeopleView = () => import(/* webpackChunkName: 'facilitiesAndStaff' */ '../pages/peopleView')
const OrderInfoView = () => import(/* webpackChunkName: 'facilitiesAndStaff' */ '../pages/orderInfoView')
const EqLists = () => import(/* webpackChunkName: 'facilitiesAndStaff' */ '../pages/eqLists')

export default [
  {
    path: 'staff',
    component: Home,
    redirect: 'staff/equipmentView',
    children: [
      {
        path: 'equipmentView',
        component: EquipmentView
      },
      {
        path: 'peopleView',
        component: PeopleView
      },
      {
        path: 'orderInfoView',
        component: OrderInfoView
      },
      {
        path: 'eqLists',
        component: EqLists
      },
    ]
  }
]
