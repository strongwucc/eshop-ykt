<template>
  <div>
    <div class="no-coupons" v-if="coupons.length === 0">
      <img src="../assets/img/my_coupons/img_youhuiquan@2x.png">
      <p>还没有优惠券哦~</p>
    </div>
    <ul class="unused-coupons-list" v-if="coupons.length > 0">
      <li v-for="(coupon, couponIndex) in coupons">
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
            {{coupon.description|longStrFormat(12)}}
          </p>
          <p class="use-date">
            {{coupon.validate_time}}
          </p>
        </div>
        <div class="r" v-if="type === 'expired'"><img src="../assets/img/my_coupons/label_overdue@2x.png"></div>
        <div class="r" v-if="type === 'used'"><img src="../assets/img/my_coupons/label_use@2x.png"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "unused_coupons_list",
    data () {
      return {
        page: 1,
        filter: this.type,
        coupons: [],
        loading: false,
        allLoaded: false
      }
    },
    props: {
      type: {
        type: String,
        default: ''
      }
    },
    created () {
      this.loadMore()
    },
    mounted () {
      setTimeout(() => {
        this.setStyle()
      })
    },
    watch: {
      'type': function (now,prev) {
        this.page = 1
        this.filter = now
        this.loadMore()
      }
    },
    methods: {
      setStyle () {
        if (this.coupons.length > 0) {
          const len = document.querySelector('.use-date').offsetWidth
          document.querySelectorAll('.use-condition').forEach(dom => {
            dom.style.width = len + 'px'
          })
        }

      },
      loadMore () {
        this.loading = true
        this.$http.post(this.API.user.coupon_list,{filter: this.filter}).then(res => {
          this.loading = false
          if (res.return_code === '0000') {
            this.coupons = res.data.list
            if (this.page == 1) {
              if (this.filter == 'used') {
                this.$emit('usedCounted', res.data.total)
              } else if (this.filter == 'expired') {
                this.$emit('expiredCounted', res.data.total)
              }
            }
            if (res.data.total_page <= this.page) {
              this.allLoaded = true
            } else {
              this.page += 1
            }
          }
        })
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
  .unused-coupons-list{
    width: 710px;
    margin: 0 auto;
    padding-top: 25px;
    padding-bottom: 40px;
    color: #999999!important;
    li{
      display: flex;
      align-items: center;
      width: 100%;
      height: 230px;
      background: url("../assets/img/my_coupons/img_bg_youhuiquan@2x.png") no-repeat;
      background-size: 100%;
      .l{
        display: flex;
        width: 228px;
        flex-direction: column;
        align-items: center;
        .icon{
          position: relative;
          width: 100px;
          height: 32px;
          border-radius: 4px;
          text-align: center;
          line-height: 32px;
          font-size: 24px;/*px*/
          margin-top: 22px;
          color: #999999;
          &:after{
            @include all-border-1px(#999999, 4px);
          }
        }
      }
      .m{
        margin-right: 24px;
        .use-date{
          font-size: 24px;/*px*/
          color: #999999;
          transform: scale(0.917);
          transform-origin: left center;
          margin-top: 22px;
        }
      }
      .r{
        width: 112px;
        height: 112px;
        img{
          width: 100%;
          height: 100%;
        }

      }
      .manjian{
        .value{
          span{
            font-size: 60px;/*px*/
            font-weight: bold;
          }
        }
      }
      .duihuan{
        .value{
          font-size: 40px;/*px*/
          font-weight: bold;
        }
      }
      .zhekou{
        .value{
          span{
            font-size: 60px;/*px*/
            font-weight: bold;
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
      }
    }
  }
  .tip{
    margin-top: 40px;
    font-size: 26px;/*px*/
    color: #999999;
    text-align: center;
  }
</style>
