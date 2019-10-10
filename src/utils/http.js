import axios from 'axios'
import router from '../router'
import { baseUrl } from '../config/env'
axios.defaults.withCredentials=true;

export default class http {
    constructor(store, api) {
        var base_api = baseUrl;
        this.baseApi = base_api;
        this.api = api; //全部接口
        if(store){
            this.store = store;
            this.userAuth();
        }
    }
    get(url, data, isNeedBaseUrl) {
        var options = {
            url: !isNeedBaseUrl ? this.baseApi + url : url,
            data: data || {},
            method: 'get',
        };
        this.request(options);
    }
    post(method, data, query) {
        var options = {
            url: query ? this.baseApi + query : this.baseApi,
            data: {method: method, params: data},
            method: 'post',
        };
        return this.request(options);
    }
    all(array) {
      var promiseAll = Promise.all(array)
      return promiseAll
    }
    request(options) {
        var promise = new Promise((resolve, reject) => {
            axios(options)
                // .then(function (result) {
                //     return result.data;
                // })
                .then((result) => {
                    if (typeof result.data.return_code === 'undefined') {
                      resolve({return_code:'5000',return_msg:'系统出错啦'});
                    } else {
                      resolve(result.data);
                    }
                })
        })
        return promise;
    }
    userAuth() { //会员登录认证
        axios.interceptors.response.use(response => {
          if(response.status == 200 && response.data.return_code == '1001' && router.currentRoute.meta.auth == 1 && !router.currentRoute.query.auth){
            console.log(111111111111111111111)
            //清除登录信息
            this.store.commit('set_user_bind_status', 0);
            this.store.commit('set_user_login_status', 0);
            this.store.commit('set_user_info', {});
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
            })
            return response;
          }

            return response;
        });
    }
}



