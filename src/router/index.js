import Vue from 'vue'
import Router from 'vue-router'
const Store = r => require.ensure([], () => r(require('@/components/store/store')), 'store')//门店主页
const StorePreview = r => require.ensure([], () => r(require('@/components/store_preview/store_preview')), 'store_preview')//门店预览
const TakeOut = r => require.ensure([], () => r(require('@/components/take_out/take_out')), 'take_out')//外卖点餐
const QuickMeal = r => require.ensure([], () => r(require('@/components/quick_meal/quick_meal')), 'quick_meal')//快餐
const Center = r => require.ensure([], () => r(require('@/components/center/center')), 'center')//会员中心
const QuickMealCenter = r => require.ensure([], () => r(require('@/components/quick_meal_center/quick_meal_center')), 'quick_meal_center')//会员中心（快餐）
const MemberInfo = r => require.ensure([], () => r(require('@/components/member_info/member_info')), 'member_info')//会员信息
const MyData = r => require.ensure([], () => r(require('@/components/my_data/my_data')), 'my_data')//我的资料
const ChangeName = r => require.ensure([], () => r(require('@/components/change_name/change_name')), 'change_name')//修改姓名
const SelectSex = r => require.ensure([], () => r(require('@/components/select_sex/select_sex')), 'select_sex')//选择性别
const PaySuccess = r => require.ensure([], () => r(require('@/components/pay_status/pay_success')), 'pay_success')//支付成功
const PayFail = r => require.ensure([], () => r(require('@/components/pay_status/pay_fail')), 'pay_fail')//支付失败
const ChangeTel = r => require.ensure([], () => r(require('@/components/change_tel/change_tel')), 'change_tel')//修改绑定手机
const ChangePw = r => require.ensure([], () => r(require('@/components/change_pw/change_pw')), 'change_pw')//修改密码
const ResetPw = r => require.ensure([], () => r(require('@/components/reset_pw/reset_pw')), 'reset_pw')//重置密码
  const Step01 = r => require.ensure([], () => r(require('@/components/reset_pw/step/step01')), 'step01')//重置密码(步骤1)
  const Step02 = r => require.ensure([], () => r(require('@/components/reset_pw/step/step02')), 'step02')//重置密码(步骤2)
const MyScores = r => require.ensure([], () => r(require('@/components/my_scores/my_scores')), 'my_scores')//我的积分
const SetCardPw = r => require.ensure([], () => r(require('@/components/set_card_pw/set_card_pw')), 'set_card_pw')//设置支付密码
const MyBalance = r => require.ensure([], () => r(require('@/components/my_balance/my_balance')), 'my_balance')//我的余额
const MyCardHolder = r => require.ensure([], () => r(require('@/components/my_card_holder/my_card_holder')), 'my_card_holder')//我的卡包
const BindCard = r => require.ensure([], () => r(require('@/components/bind_card/bind_card')), 'bind_card')//绑卡
const MyBalanceNew = r => require.ensure([], () => r(require('@/components/my_balance_new/my_balance_new')), 'my_balance_new')//我的余额（新）
const CardDetail = r => require.ensure([], () => r(require('@/components/card_detail/card_detail')), 'card_detail')//卡详情
const MemberRecharge = r => require.ensure([], () => r(require('@/components/member_recharge/member_recharge')), 'member_recharge')//会员充值
const CardRecharge = r => require.ensure([], () => r(require('@/components/card_recharge/card_recharge')), 'member_recharge')//会员卡充值
const PeopleNum = r => require.ensure([], () => r(require('@/components/people_num/people_num')), 'people_num')//就餐人数
const ShopCart = r => require.ensure([], () => r(require('@/components/shop_cart/shop_cart')), 'shop_cart')//购物车页面
const Search = r => require.ensure([], () => r(require('@/components/search/search')), 'search')//搜索页面
const PreviewSearch = r => require.ensure([], () => r(require('@/components/preview_search/preview_search')), 'preview_search')//搜索页面
const TakeOutSearch = r => require.ensure([], () => r(require('@/components/take_out_search/take_out_search')), 'take_out_search')//搜索页面
const ConfirmOrder = r => require.ensure([], () => r(require('@/components/confirm_order/confirm_order')), 'confirm_order')//确认下单
const MerchantConfirm = r => require.ensure([], () => r(require('@/components/merchant_confirm/merchant_confirm')), 'merchant_confirm')//商户确认订单
const MerchantRefuse = r => require.ensure([], () => r(require('@/components/merchant_refuse/merchant_refuse')), 'merchant_refuse')//商家拒绝
const ConfirmPay = r => require.ensure([], () => r(require('@/components/confirm_pay/confirm_pay')), 'confirm_pay')//确认支付
const Error = r => require.ensure([], () => r(require('@/components/error/error')), 'error')//错误页面
const Pay = r => require.ensure([], () => r(require('@/components/pay/pay')), 'pay')//订单支付
const Login = r => require.ensure([], () => r(require('@/components/login/login')), 'login')//登录页面
const MyOrder = r => require.ensure([], () => r(require('@/components/my_order/my_order')), 'my_order')//我的订单页面
  const Dine = r => require.ensure([], () => r(require('@/components/my_order/order_type/dine')), 'dine')//堂食订单
  const Takeaway = r => require.ensure([], () => r(require('@/components/my_order/order_type/takeaway')), 'takeaway')//外卖订单
  const Queue = r => require.ensure([], () => r(require('@/components/my_order/order_type/queue')), 'queue')//排队取号订单
const QuickMealOrder = r => require.ensure([], () => r(require('@/components/quick_meal_order/quick_meal_order')), 'quick_meal_order')//我的订单页面（快餐）
const OrderDetail = r => require.ensure([], () => r(require('@/components/order_detail/order_detail')), 'order_detail')//订单详情
  const DineDetail = r => require.ensure([], () => r(require('@/components/order_detail/order_type/dine_detail')), 'dine_detail')//堂食订单详情
  const QuickMealDetail = r => require.ensure([], () => r(require('@/components/order_detail/order_type/quick_meal_detail')), 'quick_meal_detail')//快餐订单详情
  const TakeawayDetail = r => require.ensure([], () => r(require('@/components/order_detail/order_type/takeaway_detail')), 'takeaway_detail')//外卖订单详情
  const QueueDetail = r => require.ensure([], () => r(require('@/components/order_detail/order_type/queue_detail')), 'queue_detail')//堂食订单详情
  const RechargeDetail = r => require.ensure([], () => r(require('@/components/order_detail/order_type/recharge_detail')), 'recharge_detail')//充值订单详情
const MyCoupons = r => require.ensure([], () => r(require('@/components/my_coupons/my_coupons')), 'my_coupons')//我的优惠券
const UseCoupon = r => require.ensure([], () => r(require('@/components/my_coupons/use_coupon')), 'use_coupon')//使用优惠券
const UseNotice = r => require.ensure([], () => r(require('@/components/my_coupons/use_notice')), 'use_notice')//使用须知
const ApplicableStore = r => require.ensure([], () => r(require('@/components/my_coupons/applicable_store')), 'applicable_store')//适用门店
const QueuedNumber = r => require.ensure([], () => r(require('@/components/queued_number/queued_number')), 'queued_number')//排队取号
const SaveQueueNum = r => require.ensure([], () => r(require('@/components/save_queue_num/save_queue_num')), 'save_queue_num')//保存排队单号
const BindWeChat = r => require.ensure([], () => r(require('@/components/bind/bind_wechat')), 'bind_wechat')//绑定微信
const BindAliPay = r => require.ensure([], () => r(require('@/components/bind/bind_alipay')), 'bind_alipay')//绑定支付宝
const TakeOutConfirm = r => require.ensure([], () => r(require('@/components/take_out_confirm/take_out_confirm')), 'take_out_confirm')//提交订单（外卖）
const QuickMealConfirm = r => require.ensure([], () => r(require('@/components/quick_meal_confirm/quick_meal_confirm')), 'quick_meal_confirm')//提交订单（快餐）
const Demo = r => require.ensure([], () => r(require('@/components/demo/demo')), 'demo')//调试页面

Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/center'
    },

    {
      path: '/store/:storeId/:deskId?/:peopleNum?',
      name: 'store',
      component: Store,
      meta: {
        auth: 1,
        title: '堂食点餐',
        index: 1,
        fullScreen: false,
      }
    },

    {
      path: '/store_preview/:storeId',
      name: 'store_preview',
      component: StorePreview,
      meta: {
        auth: 1,
        title: '堂食点餐',
        index: 1,
        fullScreen: false,
      }
    },

    {
      path: '/take_out/:storeId',
      name: 'take_out',
      component: TakeOut,
      meta: {
        auth: 1,
        title: '外卖点餐',
        index: 1,
        fullScreen: false,
      }
    },

    {
      path: '/quick_meal/:storeId',
      name: 'quick_meal',
      component: QuickMeal,
      meta: {
        auth: 1,
        title: '下单首页',
        index: 1,
        fullScreen: false,
      }
    },

    {
      path: '/center',
      name: 'center',
      component: Center,
      meta: {
        auth: 1,
        title: '会员中心',
        index: 1,
        fullScreen: true
      }
    },

    {
      path: '/quick_meal_center',
      name: 'quick_meal_center',
      component: QuickMealCenter,
      meta: {
        auth: 1,
        title: '会员中心',
        index: 1,
        fullScreen: true
      }
    },

    {
      path: '/pay_success/:orderId',
      name: 'pay_success',
      component: PaySuccess,
      meta: {
        auth: 1,
        title: '支付成功',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/pay_fail',
      name: 'pay_fail',
      component: PayFail,
      meta: {
        auth: 1,
        title: '支付失败',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/change_tel',
      name: 'change_tel',
      component: ChangeTel,
      meta: {
        auth: 1,
        title: '修改绑定手机号',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/change_pw',
      name: 'change_pw',
      component: ChangePw,
      meta: {
        auth: 1,
        title: '修改支付密码',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/reset_pw',
      name: 'reset_pw',
      component: ResetPw,
      redirect: '/reset_pw/step01',
      meta: {
        auth: 1,
        title: '重置密码',
        index: 2,
        fullScreen: true
      },
      children: [
        {
          path: 'step01',
          name: 'step01',
          component: Step01,
          meta: {
            auth: 1,
            title: '手机号验证'
          }
        },

        {
          path: 'step02',
          name: 'step02',
          component: Step02,
          meta: {
            auth: 1,
            title: '设置新支付密码'
          }
        }
      ]
    },

    {
      path: '/my_scores',
      name: 'my_scores',
      component: MyScores,
      meta: {
        auth: 1,
        title: '我的积分',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/set_card_pw',
      name: 'set_card_pw',
      component: SetCardPw,
      meta: {
        auth: 1,
        title: '设置支付密码',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/my_balance',
      name: 'my_balance',
      component: MyBalance,
      meta: {
        auth: 1,
        title: '我的余额',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/my_card_holder',
      name: 'my_card_holder',
      component: MyCardHolder,
      meta: {
        auth: 1,
        title: '我的卡包',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/my_balance_new',
      name: 'my_balance_new',
      component: MyBalanceNew,
      meta: {
        auth: 1,
        title: '我的余额',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/bind_card',
      name: 'bind_card',
      component: BindCard,
      meta: {
        auth: 1,
        title: '绑卡',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/card_detail/:cardNo',
      name: 'card_detail',
      component: CardDetail,
      meta: {
        auth: 1,
        title: '卡详情',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/member_recharge',
      name: 'member_recharge',
      component: MemberRecharge,
      meta: {
        auth: 1,
        title: '会员充值',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/card_recharge/:cardNo',
      name: 'card_recharge',
      component: CardRecharge,
      meta: {
        auth: 1,
        title: '会员卡充值',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/people_num/:storeId/:deskId',
      name: 'people_num',
      component: PeopleNum,
      meta: {
        auth: 0,
        title: '选择人数',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/shop_cart',
      name: 'shop_cart',
      component: ShopCart,
      meta: {
        auth: 1,
        title: '购物车',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/search/:storeId/:deskId?/:peopleNum?',
      name: 'search',
      component: Search,
      meta: {
        auth: 1,
        title: '搜索',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/preview_search/:storeId',
      name: 'preview_search',
      component: PreviewSearch,
      meta: {
        auth: 1,
        title: '搜索',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/take_out_search/:storeId',
      name: 'take_out_search',
      component: TakeOutSearch,
      meta: {
        auth: 1,
        title: '搜索',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/confirm_order/:deskId',
      name: 'confirm_order',
      component: ConfirmOrder,
      meta: {
        auth: 1,
        title: '确认商品',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/merchant_confirm/:deskId',
      name: 'merchant_confirm',
      component: MerchantConfirm,
      meta: {
        auth: 1,
        title: '商家确认',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/merchant_refuse/:deskId',
      name: 'merchant_refuse',
      component: MerchantRefuse,
      meta: {
        auth: 1,
        title: '商家拒绝',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/confirm_pay/:deskId',
      name: 'confirm_pay',
      component: ConfirmPay,
      meta: {
        auth: 1,
        title: '确认支付',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/error/:msg?',
      name: 'error',
      component: Error,
      meta: {
        auth: 0,
        title: '出错啦',
        index: 2,
        fullScreen: true
      }
    },
    {
      path: '/pay/:orderId',
      name: 'pay',
      component: Pay,
      meta: {
        auth: 1,
        title: '订单支付',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: 0,
        title: '登录',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/my_order',
      name: 'my_order',
      component: MyOrder,
      meta: {
        auth: 1,
        title: '我的订单',
        index: 2,
        fullScreen: false
      },
      children: [
        {
          path: 'dine',
          name: 'dine',
          component: Dine,
          meta: {
            auth: 1,
            title: '堂食订单'
          }
        },

        {
          path: 'takeaway',
          name: 'takeaway',
          component: Takeaway,
          meta: {
            auth: 1,
            title: '外卖订单'
          }
        },

        {
          path: 'queue',
          name: 'queue',
          component: Queue,
          meta: {
            auth: 1,
            title: '排队'
          }
        },
      ]
    },

    {
      path: '/quick_meal_order',
      name: 'quick_meal_order',
      component: QuickMealOrder,
      meta: {
        auth: 1,
        title: '我的订单',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/member_info',
      name: 'member_info',
      component: MemberInfo,
      meta: {
        auth: 1,
        title: '会员信息',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/my_data',
      name: 'my_data',
      component: MyData,
      meta: {
        auth: 1,
        title: '我的资料',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/change_name/:oldName?',
      name: 'change_name',
      component: ChangeName,
      meta: {
        auth: 1,
        title: '修改姓名',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/select_sex/:oldSex',
      name: 'select_sex',
      component: SelectSex,
      meta: {
        auth: 1,
        title: '选择性别',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/order_detail',
      name: 'order_detail',
      component: OrderDetail,
      children: [
        {
          path: 'dine_detail/:orderId',
          name: 'dine_detail',
          component: DineDetail,
          meta: {
            auth: 1,
            title: '订单详情'
          }
        },

        {
          path: 'quick_meal_detail/:orderId',
          name: 'quick_meal_detail',
          component: QuickMealDetail,
          meta: {
            auth: 1,
            title: '订单详情'
          }
        },

        {
          path: 'takeaway_detail/:orderId',
          name: 'takeaway_detail',
          component: TakeawayDetail,
          meta: {
            auth: 1,
            title: '订单详情'
          }
        },

        {
          path: 'queue_detail/:queueId',
          name: 'queue_detail',
          component: QueueDetail,
          meta: {
            auth: 1,
            title: '排队详情'
          }
        },

        {
          path: 'recharge_detail/:orderId',
          name: 'recharge_detail',
          component: RechargeDetail,
          meta: {
            auth: 1,
            title: '会员充值详情'
          }
        },
      ],
      meta: {
        auth: 1,
        title: '订单详情',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/my_coupons',
      name: 'my_coupons',
      component: MyCoupons,
      meta: {
        auth: 1,
        title: '优惠券',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/use_coupon/:couponCode',
      name: 'use_coupon',
      component: UseCoupon,
      meta: {
        auth: 1,
        title: '使用优惠券',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/applicable_store/:cid',
      name: 'applicable_store',
      component: ApplicableStore,
      meta: {
        auth: 1,
        title: '适用门店',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/use_notice',
      name: 'use_notice',
      component: UseNotice,
      meta: {
        auth: 1,
        title: '适用门店',
        index: 2,
        fullScreen: false
      }
    },

    {
      path: '/queued_number/:storeId',
      name: 'queued_number',
      component: QueuedNumber,
      meta: {
        auth: 1,
        title: '排队取号',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/save_queue_num/:queueId',
      name: 'save_queue_num',
      component: SaveQueueNum,
      meta: {
        auth: 1,
        title: '排队单号',
        index: 2,
        fullScreen: true
      }
    },

    {
      path: '/bind_wechat/:code',
      name: 'bind_wechat',
      component: BindWeChat,
      meta: {
        auth: 1,
        title: '绑定微信',
        index: 2,
        fullScreen: true
      }
    },
    {
      path: '/bind_alipay/:code',
      name: 'bind_alipay',
      component: BindAliPay,
      meta: {
        auth: 1,
        title: '绑定支付宝',
        index: 2,
        fullScreen: true
      }
    },
    {
      path: '/take_out_confirm',
      name: 'take_out_confirm',
      component: TakeOutConfirm,
      meta: {
        auth: 1,
        title: '提交订单',
        index: 2,
        fullScreen: true
      }
    },
    {
      path: '/quick_meal_confirm',
      name: 'quick_meal_confirm',
      component: QuickMealConfirm,
      meta: {
        auth: 1,
        title: '提交订单',
        index: 2,
        fullScreen: true
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo,
      meta: {
        auth: 1,
        title: '调试页面',
        index: 1,
        fullScreen: true
      }
    },
  ]
})
