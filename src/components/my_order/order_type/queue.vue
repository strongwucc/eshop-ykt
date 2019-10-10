<template>
  <div class="queue-page">
    <ul class="order-status" @click="switchStatus($event)">
      <li data-index="0" :class="{activity: currentIndex === '0'}">当前</li>
      <li data-index="1" :class="{activity: currentIndex === '1'}">历史</li>
    </ul>
    <scroll class="scroll-wrapper" :bounce="bounce" v-if="(currentIndex === '0' && pendingList.length > 0) || (currentIndex === '1' && pendedList.length > 0) ">
      <div class="scroll-content">
        <template v-if="currentIndex === '0'">
          <div v-for="(pending) in pendingList" class="order-item processing" @click="$router.push('/order_detail/queue_detail/'+pending.id)">
            <div class="info">
              <h4 class="title">{{pending.store_name}}</h4>
              <div class="content">
                <div class="l">
                  <p class="txt">前方桌数</p>
                  <p class="num"><span>{{pending.wait_front}}</span>桌</p>
                </div>
                <div class="r">
                  <p class="table-type">
                    {{pending.position_prefix + pending.no + ' ' +pending.position_name}}
                  </p>
                  <p class="take-time">取号时间：{{pending.order_at}}</p>
                </div>
              </div>
            </div>
            <div class="icon">
              <img src="../../../assets/img/my_order/label_quhao@2x.png"/>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-for="(pended) in pendedList" class="order-item completed">
            <div class="info">
              <h4 class="title">{{pended.store_name}}</h4>
              <div class="content">
                <p class="table-type">
                  {{pended.position_prefix + pended.no + ' ' +pended.position_name}}
                </p>
                <p class="take-time time">
                  取号时间：{{pended.order_at}}
                </p>
                <p class="eat-time time" v-if="pended.status === '1'">
                  就餐时间：{{pended.place_at}}
                </p>
                <p class="eat-time time" v-else-if="pended.status === '2'">
                  过号时间：{{pended.past_at}}
                </p>
                <p class="take-time time" v-else-if="pended.status === '3'">
                  取消时间：{{pended.cancel_at}}
                </p>
              </div>
            </div>
            <div class="icon" v-if="pended.status === '1'">
              <img src="../../../assets/img/my_order/label_jiucan@2x.png"/>
            </div>
            <div class="icon" v-else-if="pended.status === '2'">
              <img src="../../../assets/img/my_order/label_guohao@3x.png"/>
            </div>
            <div class="icon" v-else-if="pended.status === '3'">
              <img src="../../../assets/img/my_order/label_quxiao@2x.png"/>
            </div>
          </div>
        </template>
      </div>
    </scroll>
    <div class="no-queue" v-else>
      <img src="../../../assets/img/my_order/img_paidui@2x.png">
      <p>还没有排队信息哦~</p>
    </div>
    <back :url="'/center'"></back>
  </div>
</template>

<script>
    import Scroll from '../../../base/scroll'
    import back from '../../../base/back'
    export default {
      name: "queue",
      components: {
        back,
        Scroll
      },
      data () {
        return {
          currentIndex: '0',
          pendingList: [],//当前列表
          pendedList: [],//历史列表
          bounce: false, //禁止滚动列表回弹效果
        }
      },
      created () {
        this.getPendingList()
      },
      mounted () {
        setTimeout(() => {
          this.setStyle()
        }, 30)
      },
      methods: {
        switchStatus (e) {
          const index = e.target.getAttribute('data-index')
          if (index !== null) {
            if (this.currentIndex !== index) {
              this.currentIndex = index
              if (this.currentIndex === '0' && this.pendingList.length === 0) {
                this.getPendingList()
              } else if (this.currentIndex === '1' && this.pendedList.length === 0) {
                this.getPendedList()
              }
            }
          } else {
            return
          }
        },

        setStyle () {
          const navigation = document.querySelector('.navigation')
          const orderStatus = document.querySelector('.order-status')
          document.querySelector('.scroll-wrapper').style.height = window.innerHeight - navigation.offsetHeight - orderStatus.offsetHeight + 'px'
        },

        getPendingList () {
          this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
          this.$http.post(this.API.queue.queue_list, {type:'pending'}).then(res => {
            this.$myLoading.close()
            if (res.return_code === '0000') {
              this.pendingList = res.data.list
            } else {
              this.$myToast(res.return_msg)
              return false
            }
          })
        },

        getPendedList () {
          this.$http.post(this.API.queue.queue_list, {type:'pended'}).then(res => {
            if (res.return_code === '0000') {
              this.pendedList = res.data.list
            } else {
              this.$myToast(res.return_msg)
              return false
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/common";
  .queue-page{
    height: 100%;
    .no-queue {
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
    .order-status{
      display: flex;
      width: 100%;
      justify-content: space-around;
      font-size: 26px;/*px*/
      color: #999999;
      padding: 0 20px;
      border-bottom: 1px solid #e5e5e5;
      li{
        height: 90px;
        line-height: 90px;
        padding: 0 10px;
      }
      .activity{
        color: #333333;
        border-bottom: 4px solid $themeColor;
      }
    }
    .scroll-wrapper{
      .order-item{
        display: flex;
        background-color: #ffffff;
        padding: 30px;
        margin-bottom: 20px;
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
            .take-time{
              color: #666666;
              line-height: 34px;
              font-size: 24px;/*px*/
            }
          }
        }
      }
      .completed{
        .content{
          margin-top: 38px;
          .table-type{
            margin-bottom: 18px;
          }
          .time{
            color: #666666;
            font-size: 24px;/*px*/
            line-height: 1.7;
          }
        }
      }
    }
  }
</style>
