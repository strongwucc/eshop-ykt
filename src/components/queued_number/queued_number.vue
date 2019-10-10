<template>
  <div class="queued-number-page">
    <div style="height: 2px"></div>
    <div class="wrapper">

      <div class="head">
        <div class="store-pic">
          <img v-if="storeInfo.store_image" v-lazy="storeInfo.store_image">
          <img v-else src="../../assets/img/home/logo@2x.png">
        </div>
        <p class="store-name">{{storeInfo.store_name}}</p>
        <p class="business-hours">营业时间：{{storeInfo.open_time}}</p>
      </div>

      <div class="main">
        <div class="item people-num">
          <div class="l">就餐人员</div>
          <div class="r">
            <i class="minus" @click="people = people === 1 ? 1 : people - 1">
              <img src="../../assets/img/home/btn_gray@2x.png"/>
            </i>
            <span class="num">{{people}}</span>
            <i class="plus" @click="people++">
              <img src="../../assets/img/home/btn_yellow@2x.png"/>
            </i>
          </div>
        </div>
        <div class="item name">
          <div class="l">姓名</div>
          <div class="r">
            <input type="text" v-model="name" placeholder="请输入"/>
          </div>
        </div>
        <div class="item sex">
          <div class="l">性别</div>
          <div class="r">
            <div class="radio" :class="{activity: sex === 0}" @click="sex = 0">女士</div>
            <div class="radio" :class="{activity: sex === 1}" @click="sex = 1">先生</div>
          </div>
        </div>
        <div class="item tel">
          <div class="l">联系方式</div>
          <div class="r">
            <input type="tel" v-model="tel" placeholder="请输入"/>
          </div>
         </div>
      </div>

      <div class="footer" @click="queueDetailsVisible = true">
        查看排队详情
      </div>
    </div>

    <button class="confirm" v-if="storeInfo.call_status == '1'" @click="addQueue">我要取号</button>
    <button class="confirm" v-else >取号未开启</button>

    <mt-popup
      v-model="queueDetailsVisible"
      popup-transition="popup-fade"
    >
      <div class="queue-detail-view">
        <div class="view-main">
          <div class="title">
            <i></i>
            <span>当前正在排队</span>
            <i></i>
          </div>
          <ul class="table-list">
            <li v-for="(queue) in queues">
              <div class="l">
                <span class="table-type">{{queue.name}}</span>
                <span class="capacity">({{queue.minimum}}~{{queue.maximum}}人)</span>
              </div>
              <div class="r">
                前方<span>{{queue.wait_front}}</span>桌
              </div>
            </li>
          </ul>
        </div>
        <i class="close" @click="queueDetailsVisible = false"><img src="../../assets/img/common/popup_icon_close@2x.png"></i>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import Valid from '../../utils/valid'
    export default {
      name: "queued_number",
      data () {
        return {
          people: 1,
          name: '',//姓名
          sex: 0,//性别 0女 1男
          tel: '',
          queueDetailsVisible: false,
          storeId: this.$route.params.storeId,
          storeInfo: {},
          queues: []
        }
      },
      created () {
        this.getStoreInfo()
      },
      methods: {
        getStoreInfo () {
          this.$http.post(this.API.queue.store_info, {store_id:this.storeId}).then(res => {
            if (res.return_code === '0000') {

              // 已经取号
              if (res.data.queue.id) {
                this.$router.push('/order_detail/queue_detail/'+res.data.queue.id)
                return true
              }

              this.storeInfo = res.data.store_info
              this.getStoreQueueInfo()
            } else {
              this.$myToast(res.return_msg)
              return false
            }
          })
        },
        getStoreQueueInfo () {
          this.$http.post(this.API.queue.queue_show, {store_bn:this.storeInfo.store_bn}).then(res => {
            if (res.return_code === '0000') {
              this.queues = res.data.list
            } else {
              this.$myToast(res.return_msg)
              return false
            }
          })
        },
        addQueue () {

          if (!this.storeInfo.store_bn) {
            return false
          }

          if (this.people < 1) {
            return false
          }

          if (this.name === '') {
            this.$myToast('请输入姓名')
            return false
          }

          if (this.sex !== 0 && this.sex !== 1) {
            this.$myToast('请选择性别')
            return false
          }

          if (Valid.check_mobile(this.tel) === false) {
            this.$myToast('请输入正确的手机号')
            return false
          }

          let queueData = {
            store_bn: this.storeInfo.store_bn,
            people: this.people,
            name: this.name,
            sex: this.sex,
            mobile: this.tel
          }
          this.$http.post(this.API.queue.queue_add, queueData).then(res => {
            if (res.return_code === '0000') {
              this.$myToast('排队成功')
              this.$router.push('/my_order/queue')
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
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .queued-number-page{
    position: relative;
    z-index: 9;
    height: 100%;
    background-color: rgb(242,242,245);
    .wrapper{
      width: 92%;
      margin: 92px auto;
      padding: 0 30px;
      background-color: #ffffff;
      border-radius: 20px;
      .head{
        position: relative;
        text-align: center;
        .store-pic{
          position: relative;
          top: -60px;
          margin: 0 auto -10px auto;
          width: 150px;
          height: 150px;
          box-shadow: 0 5px 18px 0 rgba(10,10,10,0.1);
          img{
            width: 100%;
            height: 100%;
          }
        }
        .store-name{
          font-size: 36px;/*px*/
          margin-bottom: 30px;
        }
        .business-hours{
          font-size: 26px;/*px*/
          color: #999999;
          padding-bottom: 50px;
        }
        &:after{
          @include border-1px(#e5e5e5, bottom);
        }
      }
      .main{
        position: relative;
        &:after{
          @include border-1px(#e5e5e5, bottom);
        }
        .item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 36px 0;
        }
        .people-num{
          .r{
            display: flex;
            align-items: center;
            i{
              width: 50px;
              height: 50px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .num{
              font-size: 32px;/*px*/
              padding: 0 16px;
            }
          }
        }
        .name{
          .r{
            input{
              width: 140px;
              text-align: right;
              padding-right: 16px;
            }
            input::-webkit-input-placeholder{
              color:#cccccc;
            }
            input::-moz-placeholder{   /* Mozilla Firefox 19+ */
              color:#cccccc;
            }
          }
        }
        .sex{
          .r{
            display: flex;
            width: 310px;
            justify-content: space-between;
            .radio{
              position: relative;
              width: 140px;
              height: 50px;
              text-align: center;
              line-height: 50px;
              &:after{
                @include all-border-1px(#dddddd, 8px);
              }
            }
            .activity{
              color: #3cc7b2;
              &:after{
                @include all-border-1px(#3cc7b2, 8px);
              }
            }
          }
        }
        .tel{
          .r{
            input{
              width: 300px;
              text-align: right;
              padding-right: 16px;
            }
            input::-webkit-input-placeholder{
              color:#cccccc;
            }
            input::-moz-placeholder{   /* Mozilla Firefox 19+ */
              color:#cccccc;
            }
          }
        }
      }
      .footer{
        padding: 40px 0;
      }
    }
    .confirm{
      position: absolute;
      bottom: 36px;
      left: 50%;
      transform: translateX(-50%);
      width: 694px;
      height: 88px;
      font-size: 30px;/*px*/
      background-color: $themeColor;
      border-radius: 8px;
    }
    .mint-popup{
      background-color: rgba(0,0,0,0);
      .queue-detail-view{
        position: relative;
        width: 690px;
        .view-main{
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          .title{
            display: flex;
            align-items: center;
            justify-content: center;
            i{
              position: relative;
              width: 32px;
              height: 2px;
              margin-top: -2px;
              &:after{
                @include border-1px(#666666, bottom);
              }
            }
            font-size: 32px;/*px*/
            height: 90px;
            background-color: $themeColor;
            span{
              margin: 0 14px;
            }
          }
          .table-list{
            padding: 20px 60px;
            li{
              display: flex;
              justify-content: space-between;
              padding: 30px 0;
              font-size: 32px;/*px*/
              .l{
                display: flex;
                align-items: center;
                .table-type{
                  margin-right: 20px;
                }
                .capacity{
                  font-size: 26px;/*px*/
                  color: #999999;
                }
              }
              .r{
                display: flex;
                span{
                  color: #ff2e2e;
                  width: 40px;
                  text-align: center;
                }
              }
            }
          }
        }
        .close{
          display: block;
          position: absolute;
          width: 68px;
          height: 68px;
          bottom: -108px;
          left: 50%;
          margin-left: -34px;
          img{
            width: 100%;
          }
        }
      }
    }
  }
</style>
