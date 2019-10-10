<template>
  <div class="pay-fail-page">
    <img class="tip-icon" src="../../assets/img/pay/order_fail_img@2x.png">
    <p class="tip-txt">商家拒绝啦</p>
    <p class="fail-reason">{{reason}}</p>
    <button class="rescan-code" @click="$router.push('/store/'+storeId+'/'+deskId+'?appending=1')">重新点菜</button>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "merchant_refuse",
    data () {
      return {
        deskId: this.$route.params.deskId,
        reason: this.$route.query.reason
      }
    },
    computed: {
      ...mapState({
        storeId: state => state.common.common_data.store_info.store_id
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  .pay-fail-page{
    text-align: center;
    height: 100%;
    background-color: #ffffff;
    .tip-icon{
      width: 232px;
      padding-top: 120px;
    }
    .tip-txt{
      font-size: 36px;/*px*/
      color: #dc4a28;
      margin-top: 80px;
    }
    .fail-reason{
      margin-top: 28px;
    }
    .rescan-code{
      width: 600px;
      height: 88px;
      border-radius: 44px;
      font-size: 30px;/*px*/
      background-color: $themeColor;
      margin-top: 168px;
    }
  }
</style>
