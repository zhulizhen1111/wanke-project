import moduleRouters from '../../../router/moduleRoutes';

// 此方式会将所以文件打包到一个js里，没能实现按需加载
// import Home from '../pages/home'
// import EquipmentView from '../pages/equipmentView'
// import PeopleView from '../pages/peopleView'
// import OrderInfoView from '../pages/orderInfoView'

// 按需加载，这里将facilitiesAndStaff目录里的内容打包到一个js里。
const Home = () => import(/* webpackChunkName: 'safety' */ '../pages/home')
const Summary = () => import(/* webpackChunkName: 'safety' */ '../pages/summary')
const Detail = () => import(/* webpackChunkName: 'safety' */ '../pages/detail')
const History = () => import(/* webpackChunkName: 'safety' */ '../pages/history')
const Statistics = () => import(/* webpackChunkName: 'safety' */ '../pages/statistics')

export default [
    {
        path: 'safety',
        component: Home,
        redirect: 'safety/summary',
        children: [
            {
                path: 'summary',
                component: Summary
            },
            {
                path: 'detail',
                component: Detail
            },
            {
                path: 'history',
                component: History
            },
            {
                path: 'statistics',
                component: Statistics
            },
        ]
    }
]

