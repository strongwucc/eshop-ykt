//公共数据
import common_data from './common'
import user_auth from './user/auth'
import user_info from './user/info'
import user_cart from './user/cart'
import location from './location'
import cart from './cart/cart'
//公共数据
const common_module = {
	common_data,
	location,
}
const user_module = {
	user_auth,
	user_info,
	user_cart
}
const cart_module = {
  cart
}
export default {
	common_module,
	user_module,
  cart_module
};
