import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Auth.vue'
import Manager from '@/components/Manager.vue'

import moduleRoutes from './moduleRoutes'


import store from '../store'
import {query} from '../utils/query'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: moduleRoutes
    },
    {
      path: '/manager',
      component: Manager
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = query().token || sessionStorage.getItem('token')
  if (store.state.token && Object.keys(store.state.userInfo).length > 0) {
    next()
  } else if (token){
    store.commit('setSsoToken', token)
    await store.dispatch('loadUserInfo', {token})
    // 去除浏览器地址栏token
    if (query().token) {
     router.replace(location.pathname + location.search.replace(/(&?token=\w+&?)/, ''))
    }
    next()
  } else {
    let ssoServer = 'http://sso.sagacloud.cn'
    let redirectUrl = window.location.protocol + '//' + window.location.host +'/home/main'
    window.location.href = `${ssoServer}/login?redirectUrl=${redirectUrl}`
  }
})

export default router