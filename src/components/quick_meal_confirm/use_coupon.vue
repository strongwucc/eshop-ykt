<template>
  <div class="use-coupon" ref="_useCoupon" v-show="currentVisible === true" @hidden="handleVisible">
    <transition name="fade">
      <div v-if="transition" class="mask" @click="transition = false"></div>
    </transition>
    <transition name="slide">
      <div v-if="transition" class="main">
        <h4 class="title">使用优惠券</h4>
        <div class="scroll-wrapper">
          <coupons-list :need-load="false" :coupon-list="coupons" @cancelUseCoupon="cancelUse" @useCoupon="queryCoupon"></coupons-list>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import CouponsList from '../../base/my_coupons_list'
  export default {
    name: "use_coupon",
    data () {
      return {
        useCoupon: '',
        currentVisible: false,
        transition: false,
      }
    },

    props: {
      value: true,
      coupons: {
        type: Array
      },
      totalAmount: {
        type: Number
      }
      // point: {
      //   total_point: 0,
      //   point_setting: 1,
      //   rule_name: ''
      // },
    },

    components: {
      CouponsList
    },

    methods: {
      handleVisible () {
        this.currentVisible = false
      },
      queryCoupon (coupon) {
        this.$http.post(this.API.order.coupon_query, {total_money: this.totalAmount, code: coupon.code}).then( res => {
          if (res.return_code == '0000') {
            this.transition = false
            this.$emit('useCouponCallback', {coupon: coupon, discount: res.data.detail.extra.consume_amount})
          } else {
            this.$myToast(res.return_msg)
            return
          }
        })
      },
      cancelUse () {
        this.transition = false
        this.$emit('cancelUseCouponCallback')
      }
    },

    watch: {
      value: function (val) {
        this.currentVisible = val
        if (val) {
          setTimeout(() => {
            this.transition = val
          }, 20)
        }
      },

      transition: function (val) {
        if (!val) {
          setTimeout(() => {
            this.currentVisible = val
          }, 300)
        }
      },

      currentVisible: function (val) {
        this.$emit('input', val)

      },

    },

    mounted () {
      if (this.value) {
        this.currentVisible = true
      }
      this.$refs._useCoupon.style.height = window.innerHeight + 'px'
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .use-coupon{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.6);
    }
    .main{
      position: absolute;
      width: 100%;

      background-color: #ffffff;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      bottom: 0;
      left: 0;
      text-align: center;
      .scroll-wrapper{
        height: 800px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
      }
      .close{
        position: absolute;
        display: block;
        width: 34px;
        height: 34px;
        top: 15px;
        right: 15px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .title{
        font-size: 34px;/*px*/
        font-weight: 600;
        padding-top: 52px;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .slide-enter-active, .slide-leave-active {
    transition: transform .3s;
  }
  .slide-enter, .slide-leave-active {
    transform: translateY(100%);
  }
</style>
