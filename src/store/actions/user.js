/**
 * 获取会员信息
 */

import Http from '../../utils/http'
import API from '../../utils/api'

let http = new Http();

export default {
    get_user_data({commit, state}, router){
        // var http = new Http();
        var user_data = localStorage.getItem('user_data');
        var is_login = localStorage.getItem('user_is_login');
        var is_bind = localStorage.getItem('user_is_bind');

        //从本地缓存中先获取
        if(typeof user_data !== 'undefined'){
            commit('set_user_info', JSON.parse(user_data));
            commit('set_user_bind_status', is_bind);
            commit('set_user_login_status', is_login);
        }

        var session = {}
        var reg = new RegExp('sess_id=([^&]*)(&|$)', 'i')
        var r = window.location.href.match(reg)
        if (r != null) {
          session.session_id = encodeURI(r[1])
        }

        //从接口获取
        http.post(API.user.member_center,session).then( result => {
            if(result.return_code == '0000'){
                commit('set_user_login_status', 1);
                commit('set_user_info', result.data.userinfo);
                commit('set_user_bind_status', 1);
            }else{
                commit('set_user_bind_status', 0);
                commit('set_user_login_status', 0);
                commit('set_user_info', {});
            }
        });

        //路由守卫
        router.beforeEach((to, from, next) => {
            if (to.meta.title) {
              document.title = to.meta.title
            }
            if(state.user_auth.is_login == 0 && to.meta.auth == 1 && !to.query.auth){
                var redirect = to.fullPath
                if (to.name == 'shop_cart' || to.name == 'confirm_order') {
                  redirect = '/center'
                }
                next({
                  path: '/login',
                  query: {redirect: redirect}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }else{
              next();
            }
        });
    }
}
