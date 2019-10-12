<template>
  <div class="card-detail-page">
    <div class="banner" ref="banner">
      <div class="virtual-card" v-if="type === '0'">
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
      <div class="entity-card" v-if="type === '1'">
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
    </div>
    <div class="balance-detail">
      <div class="title" ref="title">
        <img src="../../assets/img/my_balance/yue_icon_yue@2x.png">
        余额交易明细
      </div>
      <div class="scroll-box" ref="scrollBox">
        <div v-show="Array.isArray(transactionList) && !transactionList.length" class="no-transaction" ref="noTrans">
          <img src="../../assets/img/my_balance/img_yue@2x.png">
          <p>还没有充值记录哦~</p>
        </div>
        <ul
          v-show="Array.isArray(transactionList) && transactionList.length"
          class="transaction-list"
          ref="transList"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="allLoaded"
          infinite-scroll-immediate-check="false"
          infinite-scroll-distance="50">
          <li class="transaction-info" v-for="item in transactionList">
            <div class="left">
              <h3 class="store-name">{{item.message}}</h3>
              <p class="order-NO">订单号：{{item.order_id}}</p>
              <p class="order-date">订单时间：{{item.mtime|toDate}}</p>
            </div>
            <div class="right" v-if="item.explode_money > 0">-{{item.explode_money|formatMoney}}</div>
            <div class="right" v-else-if="item.import_money > 0">+{{item.import_money|formatMoney}}</div>
          </li>
        </ul>
        <p class="load-more" v-show="!allLoaded"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;加载中...</p>
        <p class="no-more" v-show="allLoaded">已加载全部</p>
        <!--<div class="fill" v-show="allLoaded"></div>-->
      </div>
    </div>
    <back></back>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import back from '../../base/back'
  export default {
    name: "card_detail",
    data () {
      return {
        type: 0,
        transactionList: [],//伪数据
        page: 1,
        pageLimit: 8,
        balanceDescViewVisible: false,
        loading: false,
        allLoaded: false
      }
    },
    components: {back},
    created () {
      if (this.$route.params.type) {
        this.type = this.$route.params.type
      }
    },
    mounted () {
      setTimeout(() => {
        this.setScrollHeight()
        this.loadMore()
      }, 20)
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.user_info
      })
    },
    methods: {
      setScrollHeight () {
        let scrollHeight = window.innerHeight - (this.$refs.banner.offsetHeight + this.$refs.title.offsetHeight)
        this.$refs.scrollBox.style.height = scrollHeight + 'px'
        this.$refs.noTrans.style.height = scrollHeight - 80 + 'px'
      },

      loadMore () {
        this.loading = true
        this.$http.post(this.API.user.recharge_logs,{page: this.page, page_limit: this.pageLimit}).then(res => {
          this.loading = false
          if (res.return_code === '0000') {
            this.transactionList = this.transactionList.concat(res.data.list)
            if (res.data.total <= this.page) {
              this.allLoaded = true
            } else {
              this.page += 1
            }
          }
        })
      },
      goRecharge () {
        this.$router.push('/member_recharge')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .card-detail-page{
    height: 100%;
    .banner{
      width: 100%;
      background-color: #ffffff;
      height: 356px;
      display: flex;
      justify-content: center;
      align-items: center;
      .virtual-card{
        width:669px;
        height:262px;
        padding: 35px 34px 0 49px;
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
    }
    .balance-detail{
      position: relative;
      z-index: 9;
      -webkit-overflow-scrolling : touch;
      .title{
        display: flex;
        padding: 0 30px;
        height: 80px;/*px*/
        align-items: center;
        font-size: 28px;/*px*/
        img{
          width: 36px;
          margin-right: 5px;
        }
      }
      .scroll-box{
        background-color: #ffffff;
        overflow: scroll;
        .no-transaction{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          img{
            width: 256px;
          }
          p{
            margin-top: 75px;
            font-size: 28px;/*px*/
            color: #bbbbbb;
          }
        }
        .transaction-list{
          .transaction-info{
            display: flex;
            position: relative;
            justify-content: space-between;
            align-items: center;
            padding: 30px;
            .left{
              .store-name{
                margin-bottom: 20px;
              }
              .order-NO{
                font-size: 22px;/*px*/
                color: #999999;
                transform: scale(0.917);
                transform-origin: left;
                margin-bottom: 10px;
              }
              .order-date{
                font-size: 22px;/*px*/
                color: #999999;
                transform: scale(0.917);
                transform-origin: left;
              }
            }
            .right{
              font-size: 38px;/*px*/
              color: #8f740d;
            }
            &:after{
              @include border-1px(#e5e5e5, bottom);
            }
          }
        }
        .load-more{
          line-height: 60px;
          text-align: center;
          color: #999999;
          background-color: #ffffff;
          font-size: 24px;/*px*/
        }
        .no-more{
          line-height: 60px;
          text-align: center;
          color: #999999;
          background-color: #ffffff;
          font-size: 24px;/*px*/
        }
        .fill{
          height: 80px;
        }
      }
    }
    .mint-popup{
      background-color: rgba(0,0,0,0);
      .balance-desc-view{
        position: relative;
        width: 560px;
        .view-main{
          border-radius: 8px;
          overflow: hidden;
          .title{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 74px;
            background-color: $themeColor;
            font-size: 32px;/*px*/
            i{
              width: 6px;
              height: 6px;
              background-color: #333333;
              border-radius: 50%;
            }
            span{
              padding: 0 12px;
            }
          }
          .main{
            padding: 50px 75px;
            background-color: #ffffff;
            font-size: 28px;/*px*/
            p{
              text-align: left;
              line-height: 1.3;
              margin: 18px 0;
              span{
                color: #8f740d;
              }
            }
          }
        }
        .hide-view{
          position: absolute;
          left: 50%;
          margin-left: -30px;
          bottom: -100px;
          width: 60px;
          img{
            width: 100%;
          }
        }
      }
    }
    .support{
      position: absolute;
      background-color: rgb(242,242,245);
      bottom: 0;
      line-height: 80px;
      width: 100%;
      text-align: center;
      color: #c1c1c1;
      font-size: 26px;/*px*/
    }
  }
</style>
