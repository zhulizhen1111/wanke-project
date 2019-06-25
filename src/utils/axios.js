import axios from 'axios'
import store from '../store'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
        let token = store.getters['token']
        if (token) {
            config.headers = {
                'sso-token': token
            }
        }
    return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios