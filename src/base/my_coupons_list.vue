<template>
  <div class="list-wrapper">
    <div class="no-coupons" v-if="coupons.length === 0">
      <img src="../assets/img/my_coupons/img_youhuiquan@2x.png">
      <p>还没有优惠券哦~</p>
    </div>
    <ul class="my-coupons-list" v-if="coupons.length > 0">
      <li v-for="(coupon, couponIndex) in coupons" :class="{selected: coupon.selected}">
        <div class="l manjian" v-if="coupon.card_type == 'CASH'">
          <div class="value">
            <span>{{coupon.reduce_cost|formatMoney(0)}}</span>
            元
          </div>
          <div class="icon">满减券</div>
        </div>
        <div class="l duihuan" v-else-if="coupon.card_type == 'EXCHANGE'">
          <div class="value">
            兑换券
          </div>
          <div class="icon">兑换券</div>
        </div>
        <div class="l zhekou" v-else-if="coupon.card_type == 'DISCOUNT'">
          <div class="value">
            <span>{{(100 - coupon.discount) / 10}}</span>
            折
          </div>
          <div class="icon">折扣券</div>
        </div>
        <div class="l duihuan" v-else-if="coupon.card_type == 'REDUCE'">
          <div class="value">
            团购券
          </div>
          <div class="icon">团购券</div>
        </div>
        <div class="m">
          <p class="use-condition">
            {{coupon.description|longStrFormat(9)}}
          </p>
          <p class="use-date">
            {{coupon.validate_time}}
          </p>
        </div>
        <button v-if="coupon.selected" class="r cancel-use" @click="cancelUseCoupon(coupon)">取消使用</button>
        <button v-else class="r" @click="useCoupon(coupon)">立即使用</button>
      </li>
      <!--<li>-->
      <!--<div class="l daijin">-->
      <!--<div class="value">-->
      <!--<span>100</span>-->
      <!--元-->
      <!--</div>-->
      <!--<div class="icon">代金券</div>-->
      <!--</div>-->
      <!--<div class="m">-->
      <!--<p class="use-condition">-->
      <!--全场通用全场通全场通用全场通-->
      <!--</p>-->
      <!--<p class="use-date">-->
      <!--2018.03.01-2018.04.03-->
      <!--</p>-->
      <!--</div>-->
      <!--<button class="r">立即使用</button>-->
      <!--</li>-->

    </ul>
    <p class="tip" v-if="allLoaded">没有更多优惠券了~</p>
  </div>
</template>

<script>
  export default {
    name: "my_coupons_list",
    data () {
      return {
        page: 1,
        coupons: [],
        loading: false,
        allLoaded: false
      }
    },
    props: {
      needLoad: {
        type: Boolean,
        default: true
      },
      couponList: {
        type: Array
      }
    },
    created () {
      this.loadMore()
    },
    mounted () {
      setTimeout(() => {
        this.setStyle()
      }, 30)
    },

    methods: {
      setStyle () {
        // if (this.coupons.length > 0) {
        //   const len = document.querySelector('.use-date').offsetWidth
        // console.log(len)
        //   document.querySelectorAll('.use-condition').forEach(dom => {
        //     dom.style.width = len + 'px'
        //   })
        // }

      },
      loadMore () {
        if (this.needLoad == false) {
          this.coupons = this.couponList
          return false
        }
        this.loading = true
        this.$http.post(this.API.user.coupon_list,{filter: 'unused'}).then(res => {
          this.loading = false
          if (res.return_code === '0000') {
            this.coupons = res.data.list
            if (this.page == 1) {
              this.$emit('unUsedCounted', res.data.total)
            }
            if (res.data.total_page <= this.page) {
              this.allLoaded = true
            } else {
              this.page += 1
            }
          }
        })
      },
      useCoupon (coupon) {
        if (this.$route.name === 'my_coupons') {
          this.$router.push({name: 'use_coupon', params: {couponCode: coupon.code}})
        } else {
          let couponList = this.coupons
          couponList.forEach(couponItem => {
            if (couponItem.code == coupon.code) {
              couponItem.selected = 1
            } else {
              couponItem.selected = 0
            }
          })
          this.coupons = couponList
          this.$emit('useCoupon', coupon)
        }
      },
      cancelUseCoupon (coupon) {
        coupon.selected = 0
        this.$emit('cancelUseCoupon')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/mixin";
  @import "../assets/css/common";

  .no-coupons{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    img{
      width: 256px;
      margin-bottom: 75px;
    }
    p{
      text-align: center;
      color: #bbbbbb;
    }

  }
  .my-coupons-list{
    width: 710px;
    margin: 0 auto;
    padding-top: 25px;
    padding-bottom: 40px;
    li{
      display: flex;
      align-items: center;
      width: 100%;
      height: 230px;
      background: url("../assets/img/my_coupons/img_bg_youhuiquan@2x.png") no-repeat;
      background-size: 100%;
      .l{
        display: flex;
        width: 220px;
        flex-direction: column;
        align-items: center;
        padding-left: 8px;
        .icon{
          position: relative;
          width: 100px;
          height: 32px;
          border-radius: 4px;
          text-align: center;
          line-height: 32px;
          font-size: 24px;/*px*/
          margin-top: 22px;
        }
      }
      .m{
        margin-right: 24px;
        width: 250px;
        display: flex;
        flex-direction: column;
        .use-condition{
          width: 100%;
          text-align: left;
        }
        .use-date{
          font-size: 24px;/*px*/
          color: #999999;
          transform: scale(0.917);
          transform-origin: left center;
          margin-top: 22px;
          text-align: left;
        }
      }
      .r{
        width: 160px;
        height: 60px;
        font-size: 24px;/*px*/
        border-radius: 30px;
        background-color: $themeColor;

      }
      .cancel-use{
        background-color:#f5f5f5!important;
      }
      .manjian{
        .value{
          span{
            font-size: 60px;/*px*/
            font-weight: bold;
          }
        }
        .icon{
          color: #567fe4;
          background-color: #f5f8ff;
          &:after{
            @include all-border-1px(#567fe4, 4px);
          }
        }
      }
      .duihuan{
        .value{
          font-size: 40px;/*px*/
          font-weight: bold;
        }
        .icon{
          color: #3cc7b2;
          background-color: #f5fffd;
          &:after{
            @include all-border-1px(#3cc7b2, 4px);
          }
        }
      }
      .zhekou{
        .value{
          span{
            font-size: 60px;/*px*/
            font-weight: bold;
          }
        }
        .icon{
          color: #f87148;
          background-color: #fff7f5;
          &:after{
            @include all-border-1px(#f87148, 4px);
          }
        }
      }
      .daijin{
        .value{
          span{
            font-size: 60px;/*px*/
            font-weight: bold;
          }
        }
        .icon{
          color: #d1ae14;
          background-color: #fffdf5;
          &:after{
            @include all-border-1px(#d1ae14, 4px);
          }
        }
      }
    }
    .selected{

    }
  }
  .tip{
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 26px;/*px*/
    color: #999999;
    text-align: center;
  }
</style>
