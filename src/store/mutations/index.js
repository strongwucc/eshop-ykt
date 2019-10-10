
//公共数据模块
import common_data from './common'
const common_module = {
	...common_data,
}

//会员信息
import user_auth from './user/auth'
import user_info from './user/info'
import user_cart from './user/cart'
const user_module = {
	...user_auth,
	...user_info,
	...user_cart,
}

//购物车信息
import cart from './cart/cart'
const cart_module = {
  ...cart
}

export default {
	user_module,
	common_module,
  cart_module
}
