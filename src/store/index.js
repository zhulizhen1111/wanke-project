import Vue from 'vue'
import Vuex from 'vuex'
import { store as firstPage } from '../modules/firstPage'
import { store as sacilitiedAndStaff } from '../modules/facilitiesAndStaff'
import { store as environment } from '../modules/environment'
import { store as safety } from '../modules/safety'
import { store as energyConsumption } from '../modules/energyConsumption'
import { store as performance } from '../modules/performance'
import storage from '../utils/storage'
import axios from 'axios'

Vue.use(Vuex)
const KEY_LAST_ROUTE = 'last_route'

const store = new Vuex.Store({
  state: {
    name: '这里是全局的',
    projects: [
    ],
    projectId: 'Pj4419000005',
    comeUrl: '',
    flag: 'wanke',
    token: null,
    lastRoute: null,
    userInfo: {
     
    }
  },
  getters: {
    flag: state => state.flag,
    token: state => state.token,
    lastRoute: state => {
        if (!state.lastRoute) {
            let lastRoute = storage.get(KEY_LAST_ROUTE)
            if (lastRoute) {
                state.lastRoute = lastRoute
            }
        }
        return state.lastRoute
    }
  },
  mutations: {
    setProjects(state,projects){
      state.projects = projects
    },
    setProId (state, projectId) {
      console.log('yyyyyyyyyyyyyyyyy', projectId)
      state.projectId = projectId
    },
    setComeUrl (state, comeUrl) {
      state.comeUrl = comeUrl
    },
    setSsoToken: (state, val) => (state.token = val),
    setLastRoute: (state, val) => {
          state.lastRoute = val
          storage.set(KEY_LAST_ROUTE, val)
    },
    setUserInfo(state, {userInfo}) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async loadUserInfo(context,{token}){
      let res = await axios.get('/info-mng-backend/user/login', {params: {token: token}})
      console.log(res)
        if(res.data.result == 'success') {
          // commit 到vuex， 供全局使用
          context.commit('setUserInfo', {userInfo: res.data.data.user})
          context.commit('setProjects', {projects: res.data.data.projects})
          sessionStorage.setItem('token', token)
        } else {
          let ssoServer = 'http://sso.sagacloud.cn'
          // let redirectUrl = 'http://47.94.89.44:8011/home/main'
          let redirectUrl = window.location.protocol + '//' + window.location.host +'/home/main'
          window.location.href = `${ssoServer}/login?redirectUrl=${redirectUrl}`
        }
    }
  },
  modules: {
    firstPage,
    sacilitiedAndStaff,
    environment,
    safety,
    energyConsumption,
    performance
  }
})

export default store
