<template>
  <div class="shop-cart-page" :style="{visibility: !showLoading ? 'visible' : 'hidden'}">
    <header class="head">
      <div class="left">
        <span class="decoration"></span>
        <span class="gwc">购物车</span>
        <span class="total">共{{totalNum}}件</span>
        <i class="refresh" @click="getCartList"><img src="../../assets/img/shop_cart/shop_icon_refresh@2x.png"/></i>
      </div>
      <span class="clear-cart" @click="clearCart">
        <img src="../../assets/img/shop_cart/shop_icon_del@2x.png"/>
        清空购物车
      </span>
    </header>
    <scroll class="scroll-wrapper"
            :data="memberCartList"
            :bounce="bounce">
      <div>
        <div class="privateOrder" v-for="(item, index) in memberCartList">
          <div class="diner">
            <span class="left">
              <img class="avatar" :src="item.member_logo | avatar">
              <span class="name">{{item.nickname}}</span>
              <span class="sex" v-if="item.sex == '0'">女士</span>
              <span class="sex" v-else>先生</span>
              <span class="member">{{item.member_lv}}</span>
            </span>
            <span class="total">共{{item.dish_count}}份</span>
          </div>
          <ul class="order-list">
            <li v-for="dish in item.dishes">
              <div class="main">
                <p class="goods-name">{{dish.name | longStrFormat(11)}}<span class="unit">/{{dish.unit}}</span></p>
                <div class="r">
                  <div class="price">
                    <p class="finally-price"><span class="member-tip" v-if="NP.round(parseFloat(dish.original) - parseFloat(dish.price),2) > 0">{{lvName}}</span>￥{{dish.price | formatActualMoney}}</p>
                    <p class="original-price" v-if="NP.round(parseFloat(dish.original) - parseFloat(dish.price),2) > 0">￥{{dish.original | formatMoney | formatActualMoney}}</p>
                  </div>
                  <buy-cart :foods="dish" :type="1" :member-id="item.member_id" @refreshCart="getCartList"></buy-cart>
                </div>
              </div>
              <div class="minor">
                <p class="adjuncts">
                  <template v-if="dish.taste.length > 0">
                    <template v-for="(props, propIndex) in dish.taste">
                      <span v-for="(taste, i) in props.items">
                      {{taste.props_name}}
                      <template>{{i === dish.taste.length - 1 ? '；' : '，'}}</template>
                    </span>
                    </template>
                  </template>
                  <template v-if="dish.adjunct.length">
                    <span v-for="(adjunct, j) in dish.adjunct">
                      {{adjunct.name + '×' + adjunct.num}}
                      <template>{{j === dish.adjunct.length - 1 ? '；' : '，'}}</template>
                    </span>
                  </template>
                </p>
                <div class="r">
                  <p class="adjuncts-price" v-if="parseFloat(dish.adjunct_subtotal).toFixed(2) != 0">配菜：<span>￥{{dish.adjunct_subtotal | formatActualMoney}}</span></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="other">
          <div class="diner-num">
            <span class="label">就餐人数</span>
            <div class="counter">
              <i @click="minusPeople"><img src="../../assets/img/shop_cart/shop_icon_minus@112x.png"></i>
              <span>{{people}}</span>
              <i @click="plusPeople"><img src="../../assets/img/shop_cart/shop_icon_plus@112x.png"></i>
            </div>
          </div>
          <div class="remarks" @click="showSetableTaste">
            <span class="label">备注</span>
            <span class="txt">{{taste}}<img src="../../assets/img/common/arrow_right@2x.png"></span>
          </div>
        </div>
        <div class="fill"></div>
      </div>
    </scroll>
    <div class="floating-box">
      <div class="features">
        <div class="title" @click="featuresViewtoggle">
          <img class="icon" src="../../assets/img/home/icon_function@2x.png">
          功能
        </div>
        <ul class="list" v-show="featuresViewVisible">
          <li @click="$router.push({name: 'store', params: {storeId: storeId, deskId: deskId, people}})">点餐首页</li>
          <li @click="$router.push('/center')">会员中心</li>
          <li @click="$router.push('/my_order/dine')">我的订单</li>
          <li @click="$router.push('/my_coupons')">我的优惠券</li>
          <li @click="$router.push('/shop_cart')">购物车</li>
          <li v-if="appending" @click="$router.push({name: 'confirm_pay', params: {deskId: deskId}})">结账</li>
        </ul>
      </div>
      <div class="shopping-cart">
        <div class="circle" ref="cartContainer">
        </div>
        <p class="choose-ok" @click="toOrder">选好啦</p>
        <div class="total">
          总计：
          <span>￥{{totalPrice | formatActualMoney}}</span>
        </div>
      </div>
      <div class="plus-goods" @click="addDish">
        <img class="icon" src="../../assets/img/shop_cart/shop_icon_plus@2x.png">
        加菜
      </div>
    </div>
    <set-taste v-model="setTasteViewVisible" @setTasteCallback="setTaste" @autoScroll="autoScroll"></set-taste>
  </div>
</template>

<script>
  import buyCart from '../../base/buy_cart'
  import Scroll from '../../base/scroll'
  import SetTaste from './set_taste'
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: "shop_cart",
    data () {
      return {
        apending: false,
        bounce: false,//禁止滚动列表回弹效果
        memberCartList: {},//购物车列表
        featuresViewVisible: false,//功能菜单列表显示
        showLoading: true,
        setTasteViewVisible: false,
        deskStatusTimer: null,
        refreshTimer: null,
        appending: false
      }
    },
    components: {
      buyCart, Scroll, SetTaste
    },
    computed: {
      ...mapState({
        storeId: state => state.common.common_data.store_info.store_id,
        deskId: state => state.common.common_data.desk_info.desk_id,
        people: state => state.common.common_data.desk_info.info.people,
        infoId: state => state.common.common_data.desk_info.info.info_id,
        taste: state => state.common.common_data.desk_info.info.mark_text,
        lvName: state => state.user.user_info.lv_name
      }),

      // 购物车中总共商品的数量
      totalNum: function () {
        let num = 0
        let member_id;
        for (member_id in this.memberCartList) {
          num += parseInt(this.memberCartList[member_id].dish_count)
        }
        return num
      },

      //商品总金额
      totalPrice: function () {
        let total = 0

        let member_id;
        for (member_id in this.memberCartList) {
          this.memberCartList[member_id].dishes.forEach(dish => {
            total += parseFloat(dish.adjunct_subtotal)
            total += parseFloat(dish.subtotal)
          })
        }
        return this.NP.round(total,2)
      }
    },
    beforeDestroy () {
      clearInterval(this.refreshTimer)
      clearInterval(this.deskStatusTimer)
    },
    created () {
      this.getCartList()
      if (this.$route.query.appending) {
        this.appending = true
      } else {
        this.deskStatusTimer = setInterval(this.deskStatus, 5000)
      }
    },
    mounted () {
      this.setStyle()
    },
    methods: {
      ...mapMutations([
        'set_user_cart',
        'set_common_data_desk_info'
      ]),

      setStyle () {
        document.querySelector('.scroll-wrapper').style.height = window.innerHeight - document.querySelector('.head').offsetHeight + 'px'
      },
      reFreshList () {
        this.$http.post(this.API.cart.cart_list,{desk_id: this.deskId}).then(res => {
          if (res.return_code == '0000') {
            this.memberCartList = res.data
          }
        })
      },
      getCartList () {
        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        this.$http.post(this.API.cart.cart_list,{desk_id: this.deskId}).then(res => {
          if (res.return_code == '0000') {

            this.memberCartList = res.data
            this.showLoading = false
            this.$myLoading.close()
            this.refreshTimer = setInterval(this.reFreshList, 5000)
          } else {
            this.$myLoading.close()
            this.$myToast(res.return_msg)
            return
          }
        })
      },
      clearCart () {
        this.$http.post(this.API.cart.cart_clear,{info_id: this.infoId}).then(res => {
          if (res.return_code == '0000') {
            this.set_user_cart(res.data.user_cart)
            this.getCartList()
          } else {
            this.$myToast(res.return_msg)
            return
          }
        })
      },

      //功能菜单显示
      featuresViewtoggle () {
        this.featuresViewVisible = !this.featuresViewVisible
      },
      addDish () {
        this.$router.push('/store/'+this.storeId+'/'+this.deskId+'/'+this.people)
      },
      minusPeople () {
        let desk_info = this.$store.state.common.common_data.desk_info
        desk_info.info.people = desk_info.info.people > 1 ? desk_info.info.people - 1 : 1
        this.set_common_data_desk_info(desk_info)
      },
      plusPeople () {
        let desk_info = this.$store.state.common.common_data.desk_info
        desk_info.info.people = parseInt(desk_info.info.people) + 1
        this.set_common_data_desk_info(desk_info)
      },
      toOrder () {
        if (this.memberCartList.length === 0) {
          this.$myToast('购物车为空')
          return false
        }

        if (this.appending) {
          this.$router.push('/confirm_order/'+this.deskId+'?appending=1')
        } else {
          this.$router.push('/confirm_order/'+this.deskId)
        }

      },
      showSetableTaste () {
        this.setTasteViewVisible = true
      },
      setTaste (taste) {
        let desk_info = this.$store.state.common.common_data.desk_info
        desk_info.info.mark_text = taste
        this.set_common_data_desk_info(desk_info)
      },
      deskStatus () {
        if (this.deskId) {
          this.$http.post(this.API.seller.desk_status,{desk_id: this.deskId}).then(res => {
            if (res.return_code === '0000') {
              if (res.data.status == '2') {
                this.$router.push('/confirm_pay/'+this.deskId)
              } else if (res.data.status == '3') {
                this.$router.push('/merchant_confirm/'+this.deskId)
              } else if (res.data.status == '4' || res.data.status == '5') {
                this.$router.push('/order_detail/dine_detail/'+res.data.order_id)
              } else if (res.data.status == '6') {
                this.$router.push('/order_detail/dine_detail/'+res.data.order_id)
              }
            }
          })
        }

      },
      autoScroll () {
        window.scroll(0,0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .shop-cart-page{
    position: relative;
    z-index: 9;
    background-color: rgb(242,242,245);
    header{
      padding-right: 30px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      .left{
        display: flex;
        align-items: center;
        .decoration{
          width: 10px;
          height: 100%;
          background-color: $themeColor;
          margin-right: 20px;
        }
        .gwc{
          margin-right: 20px;
        }
        .total{
          font-weight: 600;
          margin-right: 8px;
        }
        .refresh{
          img{
            width: 36px;
            height: 36px;
          }
        }
      }
      .clear-cart{
        display: flex;
        align-items: center;
        img{
          width: 36px;
          height: 36px;
        }
      }
    }
    .privateOrder{
      background-color: #ffffff;
      padding-top: 40px;
      .diner{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 710px;
        margin-left: 20px;
        height:72px;
        background: url("../../assets/img/shop_cart/shop_img_member@2x.png") no-repeat;
        background-size: 100% 100%;
        .left{
          display: flex;
          align-items: center;
          padding-bottom: 9px;
          .avatar{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 0 8px 0 16px;
          }
          .name{
            font-size: 24px;/*px*/
          }
          .sex{
            font-size: 24px;/*px*/
            color: #999999;
            margin: 0 6px 0 10px;
          }
          .member{
            position: relative;
            padding: 6px;
            font-size: 24px;/*px*/
            color: $themeColor;
            transform: scale(0.833);
            &:after{
              @include all-border-1px($themeColor, 4px);
            }
          }
        }
        .total{
          font-size: 24px;/*px*/
          margin-right: 16px;
          padding-bottom: 9px;
        }
      }
      .order-list{
        padding: 30px 30px 0 30px;
        li{
          padding-bottom: 30px;
          .main{
            display: flex;
            align-items: flex-start;
            min-height: 50px;
            .goods-name{
              font-weight: 600;
              line-height: 1.5;
              width: 38%;
              padding-right: 16px;
              .unit{
                font-size: 24px;/*px*/
                color: #999999;
              }
            }
            .r{
              position: relative;
              width: 62%;
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              .price{
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                padding-right: 20px;
                margin-right: 170px;
                .finally-price{
                  position: relative;
                  font-size: 32px;/*px*/
                  font-weight: 600;
                  line-height: 1.5;
                  .member-tip{
                    height: 37px;
                    font-size: 18px;
                    background: url("../../assets/img/shop_cart/shop_label@2x.png");
                    background-size: 100% 100%;
                    text-align: left;
                    padding: 5px 15px 5px 10px;
                    line-height: 37px;
                    transform: scale(0.75);
                    transform-origin: center;
                  }
                }
                .original-price{
                  font-size: 24px;/*px*/
                  line-height: 1.5;
                  color: #999999;
                  text-decoration: line-through;
                }
              }

            }
          }
          .minor {
            display: flex;
            .adjuncts{
              font-size: 24px;/*px*/
              color: #999999;
              transform: scale(0.917);
              transform-origin: top left;
              line-height: 1.5;
              padding-right: 16px;
              width: 45%;
            }
            .r{
              width: 55%;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              .adjuncts-price{
                font-size: 24px;/*px*/
                line-height: 1.5;
                padding-right: 190px;
                span{
                  margin-left: -10px;
                }
              }
            }
          }
        }
      }
    }
    .other{
      margin-top: 10px;
      background-color: #ffffff;
      padding: 30px 30px 0 30px;
      .diner-num{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 35px;
        .label{
          font-weight: 600;
        }
        .counter{
          display: flex;
          border-radius: 20px;
          border: 2px solid #dddddd;
          i{
            font-size: 0;
            padding: 2px;
            img{
              width: 36px;
            }
          }
          span{
            width: 50px;
            text-align: center;
            line-height: 40px;
            border-right: 2px solid #dddddd;
            border-left: 2px solid #dddddd;
          }
        }
      }
      .remarks{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 35px;
        .label{
          font-weight: 600;
        }
        .txt{
          font-size: 26px;/*px*/
          color: #bbbbbb;
          img{
            vertical-align: middle;
            width: 28px;
            margin-left: 6px;
          }
        }
      }
    }
    .fill{
      height: 230px;
    }
    .floating-box{
      display: flex;
      position: fixed;
      width: 690px;
      justify-content: space-between;
      left: 30px;
      bottom: 40px;
      z-index: 99;
      .features{
        position: relative;
        .title{
          position: relative;
          z-index: 9;
          display: flex;
          width: 180px;
          height: 88px;
          background-color: rgba(51,51,51,.9);
          border-radius: 44px;
          justify-content: center;
          align-items: center;
          font-size: 28px;/*px*/
          color: #ffffff;
          .icon{
            width: 40px;
            margin-right: 6px;
          }
        }
        .list{
          position: absolute;
          left: 0;
          bottom: 0;
          padding-bottom: 88px;
          li{
            width: 180px;
            height: 88px;
            border-radius: 44px;
            background-color: rgba(70,70,70,.8);
            font-size: 26px;/*px*/
            color: #ffffff;
            margin-bottom: 10px;
            text-align: center;
            line-height: 88px;
          }
        }
      }
      .shopping-cart{
        display: flex;
        align-items: center;
        position: relative;
        width: 250px;
        height: 88px;
        border-radius: 44px;
        background-color: rgba(255,215,59,.9);
        .circle{
          width: 82px;
          height: 82px;
          border-radius: 50%;
          margin-left: 3px;
          background: url("../../assets/img/shop_cart/shop_icon_tick@2x.png") no-repeat;
          background-size: 100% 100%;
        }
        .choose-ok{
          padding-left: 18px;
          font-size: 30px;/*px*/
          font-weight: 600;
        }
        .total{
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 360px;
          height: 120px;
          padding-bottom: 20px;
          background: url("../../assets/img/shop_cart/shop_img_price_yinying@2x.png") no-repeat;
          background-size: 100% 100%;
          top: -110px;
          left: -55px;
          font-size: 24px;/*px*/
          span{
            font-size: 32px;/*px*/
            color: #ff2e2e;
            margin-left: -10px;
            font-weight: 600;
          }
        }
      }
      .plus-goods{
        display: flex;
        width: 180px;
        height: 88px;
        background-color: rgba(51,51,51,.9);
        border-radius: 44px;
        justify-content: center;
        align-items: center;
        font-size: 28px;/*px*/
        color: #ffffff;
        .icon{
          width: 40px;
          margin-right: 6px;
        }
      }
    }
  }
</style>
