const Home = () => import(/* webpackChunkName: 'energyConsumption' */ '../pages/home')
const Main = () => import(/* webpackChunkName: 'energyConsumption' */ '../pages/main')

export default [
    {
        path: 'energyConsumption',
        component: Home,
        redirect: 'energyConsumption/main',
        children:[
            {
                path:"main",
                component: Main
            }
        ]
    }
]