import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'


const common = {
	state: state.common_module,
	mutations: mutations.common_module,
	actions: actions.common_module,
	getters: getters.common_module,
};

const user = {
	state: state.user_module,
	mutations: mutations.user_module,
	actions: actions.user_module,
	getters: getters.user_module
}

const cart = {
  state: state.cart_module,
  mutations: mutations.cart_module,
  actions: actions.cart_module,
  getters: getters.cart_module
}
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    user,
		common,
    cart
	}
})
