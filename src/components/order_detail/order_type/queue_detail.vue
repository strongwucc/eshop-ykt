<template>
  <div class="queue-detail">
    <div class="wrapper processing">
      <div class="info">
        <h4 class="title">{{queueInfo.store_name}}</h4>
        <div class="content">
          <div class="l">
            <p class="txt">前方桌数</p>
            <p class="num"><span>{{queueInfo.wait_front}}</span>桌</p>
          </div>
          <div class="r">
            <p class="table-type">
              {{queueInfo.position_prefix + queueInfo.no + ' ' +queueInfo.position_name}}
            </p>
            <div class="txt">
              <p class="take-time">取号时间：{{queueInfo.order_at}}</p>
              <p class="dine-people-num">就餐人数：{{queueInfo.person}}人</p>
              <p class="queue-time">排队时间：{{queueInfo.wait_mins}}分钟</p>
            </div>

          </div>
        </div>
      </div>
      <div class="icon">
        <img v-if="queueInfo.status === '0'" src="../../../assets/img/my_order/label_quhao@2x.png"/>
        <img v-else-if="queueInfo.status === '3'" src="../../../assets/img/my_order/order_img_cancel@2x.png"/>
      </div>
    </div>
    <div class="buttens" v-if="queueInfo.status === '0'">
      <button class="cancel" @click="cancelTipVisible = true">取消排队</button>
      <button class="confirm" @click="$router.push('/save_queue_num/'+queueId)">保存单号</button>
    </div>
    <back :url="'/my_order/queue'"></back>
    <mt-popup
      v-model="cancelTipVisible"
      popup-transition="popup-fade"
    >
      <div class="tip-view">
        <div class="view-main">
          <h4 class="title">提示</h4>
          <p class="txt">取消后您的排队信息无法恢复</p>
          <p class="txt">您确定取消吗？</p>
        </div>
        <div class="tip-buttons">
          <button class="yes" @click="cancelQueue">确定取消</button>
          <button class="no" @click="cancelTipVisible = false">我再想想</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import back from '../../../base/back'
  export default {
    name: "queue_detail",
    data () {
      return {
        cancelTipVisible: false,
        queueId: this.$route.params.queueId,
        queueInfo: {
          position_prefix:'',
          no:'',
          position_name:''
        }
      }
    },
    components: {
      back
    },
    created () {
      this.getQueueDetail()
    },
    methods: {
      getQueueDetail () {
        this.$http.post(this.API.queue.queue_queue, {queue_id:this.queueId}).then(res => {
          if (res.return_code === '0000') {
            this.queueInfo = res.data
          } else {
            this.$myToast(res.return_msg)
            return false
          }
        })
      },
      cancelQueue () {
        this.$http.post(this.API.queue.queue_cancel, {queue_id:this.queueId}).then(res => {
          this.cancelTipVisible = false
          this.$myToast(res.return_msg)
          if (res.return_code === '0000') {
            this.$router.push('/my_order/queue')
          }
          return false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/common";
  .queue-detail{
    background-color: #ffffff;
    padding-bottom: 60px;
    .wrapper{
      display: flex;
      padding: 30px;
      .info{
        flex-grow: 1;
        .title{
          position: relative;
          padding-bottom: 30px;
          &:after{
            @include border-1px(#e5e5e5, bottom);
          }
        }
      }
      .icon{
        width: 110px;
        height: 110px;
        flex-shrink: 0;
        margin-left: 30px;
        margin-right: -10px;
        margin-top: -10px;
        img{
          width: 100%;
        }
      }
    }
    .processing{
      .content{
        display: flex;
        margin-top: 38px;
        .l{
          margin-right: 50px;
          .txt{
            margin-bottom: 30px;
          }
          .num{
            text-align: center;
            span{
              color: #ff2e2e;
            }
          }
        }
        .r{
          .table-type{
            margin-bottom: 30px;
          }
          .txt{
            margin-top: -4px;
            p{
              color: #666666;
              line-height: 1.7;
              font-size: 24px;/*px*/
            }

          }
        }
      }
    }
    .buttens{
      display: flex;
      padding-top: 70px;
      justify-content: center;
      button{
        display: block;
        margin: 0 20px;
        width: 180px;
        height: 72px;
        font-size: 28px;/*px*/

      }
      .cancel{
        position: relative;
        background-color: #ffffff;
        &:after{
          @include all-border-1px(#999999, 8px);

        }
      }
      .confirm{
        background-color: $themeColor;
        border-radius: 8px;
      }
    }
    .mint-popup{
      background-color: rgba(0,0,0,0);
      .tip-view{
        position: relative;
        width: 560px;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        .view-main{
          text-align: center;
          padding-bottom: 60px;
          .title{
            font-size: 32px;/*px*/
            padding: 50px 0 40px 0;
          }
          .txt{
            padding-bottom: 20px;
          }
        }
        .tip-buttons{
          display: flex;
          button{
            width: 50%;
            height: 88px;
            font-size: 30px;/*px*/
          }
          .yes{
            background-color: #eeeeee;
          }
          .no{
            background-color: $themeColor;
          }
        }
      }
    }
  }
</style>
