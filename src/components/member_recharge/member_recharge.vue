<template>
  <div class="member-recharge-page">
    <div class="member-NO">
      <div class="wrapper">
        <p class="txt">您充值的会员卡号</p>
        <p class="num">NO.{{userInfo.mobile}}</p>
      </div>
    </div>
    <div class="recharge-list">
      <p class="title">充值金额</p>
      <ul>
        <li class="recharge-item" v-for="(item, index) in rechargeList" @click="selectPrice(index)" :class="{chosed: index === currentIndex}">
          <p class="recharge-amount">{{item.face}}元</p>
          <p class="price">售价：{{item.amount}}元</p>
        </li>
      </ul>
    </div>
    <button class="confirm" @click="recharge">立即充值</button>
    <back></back>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import back from '../../base/back'
  export default {
    name: "member_recharge",
    components: {back},
    data () {
      return {
        currentIndex: 0,
        rechargeList: [],
      }
    },
    created () {
      this.getRechargeFaces()
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.user_info,
      })
    },
    methods: {
      selectPrice (index) {
       this.currentIndex = index
      },
      getRechargeFaces () {
        let storeId = this.$store.state.common.common_data.store_info.store_id
        this.$http.post(this.API.user.recharge_face, {store_id: storeId}).then(res => {
          if (res.return_code === '0000') {
            this.rechargeList = res.data.list
          }
        })
      },
      recharge () {
        let rechargeData = this.rechargeList[this.currentIndex]
        if (!rechargeData) {
          return false
        }
        let rechargeCode = rechargeData.code
        let storeId = this.$store.state.common.common_data.store_info.store_id

        this.$http.post(this.API.user.recharge, {store_id: storeId, recharge_code: rechargeCode}).then(res => {
          if (res.return_code === '0000') {
            this.$router.push('/pay/'+res.data.order_id)
            return true
          } else {
            // 充值失败
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .member-recharge-page{
    position: relative;
    z-index: 9;
    height: 100%;
    background-color: #ffffff;
    .member-NO{
      padding: 0 40px;
      .wrapper{
        position: relative;
        .txt{
          font-size: 30px;/*px*/
          padding: 40px 0;
        }
        .num{
          font-size: 40px;/*px*/
          padding-bottom: 40px;
        }
        &:after{
          @include border-1px(#e5e5e5, bottom);
        }
      }

    }
    .recharge-list{
      padding: 0 40px;
      .title{
        padding: 50px 0 40px 0;
      }
      ul{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .recharge-item{
          width: 320px;
          height: 140px;
          border-radius: 8px;
          border: 2px solid $themeColor;
          margin-bottom: 20px;
          .recharge-amount{
            font-size: 36px;/*px*/
            padding-top: 30px;
            text-align: center;
          }
          .price{
            font-size: 24px;/*px*/
            padding-top: 17px;
            text-align: center;
          }
        }
        .chosed{
          background-color: $themeColor!important;
        }
      }
    }
    .confirm{
      display: block;
      position: absolute;
      width: 640px;
      height: 88px;
      background-color: $themeColor;
      border-radius: 8px;
      font-size: 30px;/*px*/
      bottom: 60px;
      left: 50%;
      margin-left: -320px;
    }
  }
</style>
