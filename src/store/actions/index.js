
//公共数据模块
import common_data from './common'
const common_module = {
	...common_data,
};

//会员信息
import user from './user'
const user_module = {
    ...user,
}

export default {
    user_module,
    common_module
}
