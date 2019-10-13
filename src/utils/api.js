export default {
  auth: {
    weixin_login:'seller.weixin',                         // 微信授权登录
    login:'member.login',                                 // 登录
    logout:'member.logout',                               // 注销
    auto_login:'member.autologin',                        // openid自动登录
    is_login:'member.checklogin',                         // 检查登录状态
    mobile_code:'member.mobilecode',                      // 发送手机验证码
    check_mobile_code:'member.validate_code',             // 检查手机验证码
    reset_mobile_exist:'member.reset_mobile_exist',       // 检查手机号
    check_grap_code:'member.validate_grap_code',          // 检查图形验证码
    bind_tel:'member.bindwx'                              // 绑定手机号
  },
	user: {
		member_center: 'member.userinfo',                     // 个人中心
    member_code: 'member.usercode',                       // 用户码
    card_code: 'member.cardcode',                         // 会员卡付款码
    change_mobile: 'member.change_mobile',                // 跟换手机号
    change_paycode: 'member.change_paycode',              // 跟换支付密码
    reset_paycode: 'member.reset_paycode',                // 重置支付密码
    member_scores: 'member.scores',                       // 用户积分
    member_orders: 'member.orderlist',                    // 用户订单
    order_detail: 'member.orderdetail',                   // 用户订单详情
    edit_info: 'member.edit_info',                        // 修改用户信息
    recharge_face: 'member.recharge_face',                // 充值面值
    recharge: 'member.recharge',                          // 会员充值
    card_recharge: 'member.card_recharge',                // 会员卡充值
    recharge_logs: 'member.recharge_logs',                // 充值记录
    coupon_list: 'member.coupons',                        // 优惠券列表
    coupon_detail: 'member.coupon',                       // 优惠券详情
    coupon_stores: 'member.coupon_stores',                // 优惠券适用门店
    coupon_status: 'member.coupon_status',                // 优惠券适用状态
    bind_wechat: 'member.bind_wechat',                    // 绑定微信
    bind_alipay: 'member.bind_alipay',                    // 绑定支付宝
    member_cards: 'member.cards',                         // 会员卡列表
    member_card_info: 'member.card_info',                 // 会员卡信息
    member_card_records: 'member.card_records',           // 会员卡消费记录
    activate_card: 'member.activate_card',                // 会员卡激活
    bind_card: 'member.bind_card',                        // 会员卡绑定
	},

  seller: {
    store_opend: 'store.opendesk',                         // 开桌
    store_goods: 'store.dishes',                           // 商品
    seller_goods: 'seller.goods',                          // 商户商品
    store_goods_detail: 'store.dish_detail',               // 详情
    store_info: 'store.storeinfo',                         // 门店信息
    desk_status: 'store.desk_status',                      // 餐桌状态查询
    store_taste: 'store.taste',                            // 门店口味
    store_adjunct: 'store.adjunctlist',                    // 门店配菜
    store_search: 'store.search',                          // 搜索
    desk_init: 'store.desk_init',                          // 支付后重新点菜
    wx_config: 'store.wx_config',                          // weixin 接口签名
  },

  cart: {
    cart_add: 'store.dishadd',                             // 加入购物车
    cart_append: 'store.dishappend',                       // (加菜)加入购物车
    cart_delete: 'store.dishdelete',                       // 移除购物车
    cart_clear: 'store.dishclear',                         // 清空购物车
    cart_list: 'store.cartinfo',                           // 购物车列表
    cart_confirm: 'store.cartconfirm',                     // 确认
    cart_order: 'store.order',                             // 下单
  },

  order: {
    order_create: 'store.dicreate',                        // 创建订单
    quick_create: 'store.decreate',                        // 创建订单（无餐桌关联）
    confirm_status: 'order.confirmstatus',                 // 订单确认状态查询
    confirm_pay: 'order.confirm_pay',                      // 订单确认支付信息
    out_confirm_pay: 'order.out_confirm_pay',              // 订单确认支付信息（外卖）
    coupon_query: 'store.coupon_query',                    // 优惠券抵扣查询
    pay_method: 'order.pay_method',                        // 获取支付方式
    pay: 'order.pay',                                      // 支付
    card_pay: 'order.card_pay',                            // 会员卡支付
    pay_success: 'order.pay_success',                      // 支付成功
  },

  queue: {
    store_info: 'queue.store',                             // 排队门店信息
    queue_add: 'queue.add',                                // 排队取号
    queue_show: 'queue.show',                              // 查看排队详情
    queue_list: 'queue.queues',                            // 查看我的排队信息
    queue_queue: 'queue.queue',                            // 查看我的排队信息详情
    queue_cancel: 'queue.cancel',                          // 取消排队
  }
}

