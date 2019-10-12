<template>
  <div class="my-card-holder-page">
    <div class="my-cards-area">
      <div class="title">
        <span class="label">我的卡</span>
        <span class="count">共{{userInfo.card_info.cardNum}}张</span>
      </div>
      <div class="virtual-card">
        <div class="info">
          <div class="left">
            <span class="label">会员卡</span>
            <span class="no">NO.1254****5654</span>
          </div>
          <div class="right" @click="$router.push({name: 'card_recharge', params: {cardNo: 111}})">充值</div>
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
          <div class="right" @click="$router.push({name: 'card_recharge', params: {cardNo: 111}})"><span class="btn">充值</span></div>
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
    </div>
    <back></back>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import back from '../../base/back'
  export default {
    name: "my_card_holder",
    data () {
      return {
        cards: [],
        activable: false,
        loading: false,
        allLoaded: false
      }
    },
    components: {back},
    created () {
    },
    mounted () {
      this.getCards()
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.user_info
      })
    },
    methods: {
      getCards () {
        this.loading = true
        this.$http.post(this.API.user.member_cards,{}).then(res => {
          this.loading = false
          if (res.return_code === '0000') {
            this.cards = this.cards.concat(res.data.list)
          }
        })
      },
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
  .my-card-holder-page{
    height: 100%;
    background:rgba(255,255,255,255);
    .my-cards-area{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title{
        display: flex;
        width: 100%;
        padding: 40px;
        justify-content: space-between;
        align-items: center;
        .label{
          height:50px;
          font-size:36px;
          font-weight:bold;
          line-height:50px;
          color:rgba(51,51,51,1);
        }
        .count{
          height:40px;
          font-size:28px;
          font-weight:400;
          line-height:40px;
          color:rgba(153,153,153,1);
        }
      }
      .virtual-card{
        /*margin-top: 60px;*/
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
    }
  }
</style>
