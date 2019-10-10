/**
 * 会员信息
 */
export default {
    set_user_info: (state, info) =>{
        state.user_info = info;
        localStorage.setItem('user_data', JSON.stringify(info));
    }
}