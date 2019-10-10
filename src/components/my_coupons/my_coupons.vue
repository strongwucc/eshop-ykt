<template>
  <div class="my-coupons-page">
    <ul class="coupons-type-nav">
      <li @click="currentIndex = 0" :class="{activityIndex: currentIndex === 0}">未使用({{coupon_count.unused}})</li>
      <li @click="currentIndex = 1" :class="{activityIndex: currentIndex === 1}">已使用({{coupon_count.used}})</li>
      <li @click="currentIndex = 2" :class="{activityIndex: currentIndex === 2}">已过期({{coupon_count.expired}})</li>
    </ul>
    <div class="scroll-wrapper">
      <coupons-list v-if="currentIndex === 0" @unUsedCounted="setUnusedCount"></coupons-list>
      <unused-coupons-list v-if="currentIndex !== 0" :type="unusableType[currentIndex - 1]" @usedCounted="setUsedCount" @expiredCounted="setExpiredCount"></unused-coupons-list>
    </div>
    <back></back>
  </div>
</template>

<script>

  import CouponsList from '../../base/my_coupons_list'
  import UnusedCouponsList from '../../base/unused_coupons_list'
  import {mapState} from 'vuex'
  import back from '../../base/back'
  export default {
    name: "my_coupons",
    data () {
      return {
        currentIndex: 0,
        unusableType: ['used', 'expired'],
        unusedCount: 0,
        usedCount: 0,
        expiredCount: 0,
      }
    },
    components: {
      CouponsList,
      UnusedCouponsList,
      back
    },
    computed:{
      ...mapState({
        'coupon_count': state => state.user.user_info.coupon_count
      })
    },
    mounted () {
      this.setStyle()
    },
    methods: {
      setStyle () {
        const navHeight = document.querySelector('.coupons-type-nav').offsetHeight
        document.querySelector('.scroll-wrapper').style.height = window.innerHeight - navHeight + 'px'
      },
      setUnusedCount (count) {
        this.unusedCount = count
      },
      setUsedCount (count) {
        this.usedCount = count
      },
      setExpiredCount (count) {
        this.expiredCount = count
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .my-coupons-page{
    position: relative;
    height: 100%;
    background-color: rgb(242,242,245);
    z-index: 9;
    .coupons-type-nav{
      display: flex;
      justify-content: space-around;
      color: #666666;
      background-color: #ffffff;
      li{
        padding: 0 8px;
        height: 98px;
        line-height: 98px;
      }
      .activityIndex{
        color: #333333;
        position: relative;
        font-weight: 500;
        &:after{
          position: absolute;
          content: '';
          left: 0;
          bottom: 0;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background-color: $themeColor;
        }
      }
    }
    .scroll-wrapper{
      position: relative;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }

  }
</style>
