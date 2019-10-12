<template>
  <div class="my-balance-new-page">
    <div class="my-balance-area">
      <div class="title">余额总计(元)</div>
      <div class="balance">0.00</div>
      <div class="virtual-card">
        <div class="info">
          <div class="left">
            <span class="label">会员卡</span>
            <span class="no">NO.1254****5654</span>
          </div>
          <div class="right">充值</div>
        </div>
        <div class="money">
          <span class="label">余额(元)</span>
          <span class="value">0.00</span>
        </div>
      </div>
      <div class="entity-card">
        <div class="info">
          <div class="left">
            <span class="label">实体卡</span>
            <span class="no">NO.1254****5654</span>
          </div>
          <div class="right"><span class="btn">充值</span></div>
        </div>
        <div class="money">
          <div class="left">
            <span class="label">余额(元)</span>
            <span class="expired-date">有效期：2010.05.06-2020.05.06</span>
          </div>
          <div class="right">20.00</div>
        </div>
      </div>
      <div class="add-card-area" @click.stop="$router.push('/bind_card')">
        <img class="icon" src="../../assets/img/my_blance_new/icon_plus@2x.png"/>
        <span class="notice">添加实体卡</span>
      </div>
      <div class="activate-btn" @click.stop="activate">激活会员卡</div>
    </div>
    <div class="mask" v-show="activable"></div>
    <div class="activate-area" v-show="activable">
      <div class="content">
        <div class="label">激活会员卡</div>
        <div class="icon"><img src="../../assets/img/my_blance_new/dialog_bg_zhanghu@2x.png"/></div>
        <div class="notice">会员卡未激活</div>
        <div class="notice">请先设置支付密码进行激活</div>
      </div>
      <div class="actions">
        <span class="cancel" @click.stop="cancelActivate">取消</span>
        <span class="confirm" @click.stop="setCardPw">设置支付密码</span>
      </div>
    </div>
    <back></back>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import back from '../../base/back'
  export default {
    name: "my_balance_new",
    data () {
      return {
        activable: false,
        loading: false,
        allLoaded: false
      }
    },
    components: {back},
    created () {
    },
    mounted () {
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.user_info
      })
    },
    methods: {
      activate () {
        this.activable = true
      },
      cancelActivate () {
        this.activable = false
      },
      setCardPw () {
        this.$router.push('/set_card_pw')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .my-balance-new-page{
    height: 100%;
    background:rgba(255,255,255,255);
    .my-balance-area{
      padding-top: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title{
        height:40px;
        font-size:28px;
        font-weight:400;
        line-height:24px;
        color:rgba(153,153,153,1);
      }
      .balance{
        height:100px;
        font-size:72px;
        font-weight:bold;
        line-height:100px;
        color:rgba(51,51,51,1);
      }
      .virtual-card{
        margin-top: 60px;
        padding: 35px 34px 0 49px;
        width:669px;
        height:262px;
        background: url("../../assets/img/my_blance_new/member_card@2x.png") no-repeat;
        background-size:cover;
        border-radius:20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .info{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: left;
            .label{
              height:50px;
              font-size:36px;
              font-weight:bold;
              line-height:50px;
              color:rgba(154,82,8,1);
            }
            .no{
              height:29px;
              font-size:21px;
              font-weight:400;
              line-height:29px;
              color:rgba(154,82,8,1);
            }
          }
          .right{
            width:140px;
            height:60px;
            background:rgba(154,82,8,1);
            border-radius:35px;
            font-size:27px;
            font-weight:400;
            line-height:60px;
            color:rgba(255,255,255,1);
            text-align: center;
          }
        }
        .money{
          width: 100%;
          padding-right: 16px;
          padding-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .label{
            height:33px;
            font-size:24px;
            font-weight:400;
            line-height:33px;
            color:rgba(206,130,53,1);
          }
          .value{
            height:67px;
            font-size:48px;
            font-weight:bold;
            line-height:67px;
            color:rgba(87,69,0,1);
          }
        }
      }
      .entity-card{
        margin-top: 31px;
        padding: 35px 34px 0 49px;
        width:669px;
        height:262px;
        background: url("../../assets/img/my_blance_new/member_card1@2x.png") no-repeat;
        background-size:cover;
        border-radius:20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .info{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: left;
            .label{
              height:50px;
              font-size:36px;
              font-weight:bold;
              line-height:50px;
              color:rgba(87,69,0,1);
            }
            .no{
              height:33px;
              font-size:24px;
              font-weight:400;
              line-height:33px;
              color:rgba(87,69,0,1);
            }
          }
          .right{
            width:140px;
            height:60px;
            background:rgba(143,116,13,1);
            border-radius:35px;
            font-size:27px;
            font-weight:400;
            line-height:60px;
            color:rgba(255,255,255,1);
            text-align: center;
          }
        }
        .money{
          width: 100%;
          padding-bottom: 40px;
          padding-right: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left{
            display: flex;
            flex-direction: column;
            .label,.expired-date{
              height:33px;
              font-size:24px;
              font-weight:400;
              line-height:33px;
              color:rgba(186,154,31,1);
            }
            .expired-date{
              margin-top: 10px;
            }
          }
          .right{
            height:67px;
            font-size:48px;
            font-weight:bold;
            line-height:67px;
            color:rgba(87,69,0,1);
          }
        }
      }
      .add-card-area{
        width:670px;
        height:260px;
        margin-top: 30px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(187,187,187,1);
        border-radius:20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon{
          width: 32px;
          height: 32px;
          margin-right: 6px;
        }
        .notice{
          height:40px;
          font-size:28px;
          font-weight:400;
          line-height:40px;
          color:rgba(153,153,153,1);
        }
      }
      .activate-btn{
        width:670px;
        height:88px;
        margin-top: 49px;
        background:rgba(51,51,51,1);
        opacity:1;
        border-radius:8px;
        font-size:27px;
        font-weight:400;
        line-height:88px;
        color:rgba(255,255,255,1);
        text-align: center;
      }
    }
    .mask{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color:rgba(0,0,0,0.5);
      z-index: 9;
    }
    .activate-area{
      width:550px;
      height:582px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      z-index: 99;
      position: absolute;
      top: 309px;
      left: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .label{
          margin-top: 60px;
          height:50px;
          font-size:36px;
          font-weight:bold;
          line-height:50px;
          color:rgba(51,51,51,1);
        }
        .icon{
          margin-top: 31px;
          img{
            width: 140px;
            height: 140px;
          }
        }
        .notice{
          height:42px;
          font-size:28px;
          font-weight:400;
          line-height:42px;
          color:rgba(153,153,153,1);
        }
        .notice:nth-of-type(3){
          margin-top: 30px;
        }
      }
      .actions{
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          width:275px;
          height:88px;
          line-height: 88px;
          text-align: center;
          font-size:30px;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        .cancel{
          background:rgba(238,238,238,1);
          border-radius: 0px 0px 0px 8px;
        }
        .confirm{
          background:rgba(255,215,38,1);
          border-radius: 0px 0px 8px 0px;
        }
      }
    }
  }
</style>
