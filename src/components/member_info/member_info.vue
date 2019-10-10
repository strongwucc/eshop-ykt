<template>
  <div class="memberInfo-page">
    <div class="info-item my-data" @click="$router.push('my_data')">
      <i class="icon">
        <img src="../../assets/img/member_info/my_ic_ziliao@2x.png"/>
      </i>
      <div class="main">
        <span class="title">我的资料</span>
        <div class="r">
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </div>
      </div>
    </div>
    <div class="info-item my-integral" @click="$router.push('my_scores')">
      <i class="icon">
        <img src="../../assets/img/member_info/my_ic_jifen@2x.png"/>
      </i>
      <div class="main">
        <span class="title">我的积分</span>
        <div class="r">
          <span>{{user_info.point}}分</span>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </div>
      </div>
    </div>
    <div class="info-item my-balance" @click="$router.push('member_recharge')">
      <i class="icon">
        <img src="../../assets/img/member_info/my_ic_yue@2x.png"/>
      </i>
      <div class="main">
        <span class="title">我的余额</span>
        <div class="r">
          <span>￥{{user_info.advance|formatMoney}}</span>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </div>
      </div>
    </div>
    <div class="info-item my-coupons" @click="$router.push('/my_coupons')">
      <i class="icon">
        <img src="../../assets/img/member_info/my_ic_youhuiquan@2x.png"/>
      </i>
      <div class="main">
        <span class="title">我的优惠券</span>
        <div class="r">
          <span>{{user_info.coupon_count.unused}}</span>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </div>
      </div>
    </div>
    <div class="info-item my-lv">
      <i class="icon">
        <img src="../../assets/img/member_info/my_ic_dengji@2x.png"/>
      </i>
      <div class="main">
        <span class="title">我的等级</span>
        <div class="r">
          <span>{{user_info.lv_name}}</span>
          <img class="arrow-r" src="">
          <!--<img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">-->
        </div>
      </div>
    </div>
    <div class="bind-third-party-app">
      <div class="info-item bind-wx">
        <i class="icon">
          <img src="../../assets/img/member_info/my_ic_weixin@2x.png"/>
        </i>
        <div class="main">
          <span class="title">绑定微信</span>
          <div class="r" v-if="user_info.bind_wechat == 1">
            <i class="avatar"><img :src="user_info.headimgurl | avatar"/></i>
            <span>{{user_info.nickname}}</span>
          </div>
          <div class="r" v-else @click="bindWeChat">
            <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
          </div>
        </div>
      </div>
      <!--<div class="info-item bind-zfb">-->
        <!--<i class="icon">-->
          <!--<img src="../../assets/img/member_info/my_ic_zhifubao@2x.png"/>-->
        <!--</i>-->
        <!--<div class="main">-->
          <!--<span class="title">绑定支付宝</span>-->
          <!--<div class="r" v-if="user_info.bind_alipay == 1">-->
            <!--<i class="avatar"><img v-lazy="user_info.alipay_avatar"/></i>-->
            <!--<span>{{user_info.alipay_name}}</span>-->
          <!--</div>-->
          <!--<div class="r" v-else @click="bindAliPay">-->
            <!--<img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <back></back>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {wxRedirect,aliRedirect} from '../../config/env'
  import back from '../../base/back'
  export default {
    components: {back},
    name: "member_info",
    data () {
      return {
      }
    },
    computed:{
      ...mapState({
        'user_info': state => state.user.user_info
      })
    },
    methods: {
      bindWeChat () {
        let appid = this.$store.state.common.common_data.store_info.wechat_appid
        let type = this.$store.state.common.common_data.store_info.wechat_type
        if (!appid) {
          this.$myToast('暂不支持哦！')
          return false
        }

        if (type === '0') {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+wxRedirect+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        } else if (type === '1') {
          window.location.href = 'http://wxgw.yklsh.etonepay.com/authorize?etone_id='+appid+'&redirect_uri='+wxRedirect+'&scope=snsapi_userinfo&state=STATE'
        }

      },
      bindAliPay () {
        let app_id = this.$store.state.common.common_data.store_info.alipay_appid
        if (!app_id) {
          this.$myToast('暂不支持哦！')
          return false
        }
        window.location.href = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id='+app_id+'&scope=auth_user&redirect_uri='+encodeURIComponent(aliRedirect)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  @import "../../assets/css/mixin";
  .memberInfo-page{

    .info-item{
      background-color: #ffffff;
      display: flex;
      align-items: center;
      .icon{
        width: 40px;
        height: 40px;
        margin: 0 20px 0 30px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .main{
        flex-grow: 1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        .title{
          font-size: 30px;/*px*/
        }
        .r{
          display: flex;
          align-items: center;
          font-size: 26px;/*px*/
          color: #666666;
          .arrow-r{
            width: 30px;
            margin-right: 26px;
            margin-left: 15px;
          }

        }
        &:after{
          @include border-1px(#e5e5e5, bottom);
        }
      }

    }
    .bind-third-party-app{
      margin-top: 20px;
      .main{
        .r{
          margin-right: 70px;
          .avatar{
            width: 60px;
            height: 60px;
            border-radius: 30px;
            overflow: hidden;
            margin-right: 20px;
            img{
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
