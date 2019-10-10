<template>
    <div class="people-num-page" ref="peopleNumPage">
      <div class="banner">
        <div class="mask">
          <div class="icon">
            <i></i>
            <img v-lazy="storeInfo.store_log">
            <!--<img src="../../assets/img/people_num/icon_mendian@2x.png">-->
            <i></i>
          </div>
          <p class="store-name">{{storeInfo.store_name}}</p>
        </div>
      </div>
      <div class="main">
        <h4 class="title">请选择就餐人数</h4>
        <ul class="choose-list">
          <li class="num" v-for="(item, index) in peopleNum" @click="selectNum(index)">
            {{item}}人
            <div class="selected" v-if="index === selectedIndex">
              <img src="../../assets/img/people_num/icon_tick_black@2x.png">
              <div class="bg-color"></div>
            </div>
          </li>
          <li class="more" @click="moreViewVisible = true">
            {{morePeople}}
            <div class="selected" v-if="selectedIndex === 12">
              <img src="../../assets/img/people_num/icon_tick_black@2x.png">
              <div class="bg-color"></div>
            </div>
          </li>
        </ul>
        <div class="remarks">
          <label for="_remarks">备注：</label>
          <input type="text" id="_remarks" v-model="remarks" placeholder="口味要求、忌口等(可不填)"/>
        </div>
        <div class="confirm">
          <button @click="goShopping">开始点餐</button>
        </div>
      </div>
      <mt-popup
        v-model="moreViewVisible"
        popup-transition="popup-fade"
      >
        <div class="more-view">
          <h4 class="title">输入人数</h4>
          <div class="input-num">
            <input type="tel" v-model="inputNum" :placeholder="inputNumPlaceholder"/>
          </div>
          <div class="btn">
            <button class="cancel" @click="cancelInput">取消</button>
            <button class="confirm" @click="confirmInput">确定</button>
          </div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "people_num",
    data () {
      return {
        storeId: this.$route.params.storeId,
        deskId: this.$route.params.deskId,
        storeInfo: [], //门店信息
        remarks: '',//备注
        selectedIndex: '',
        peopleNum: [1,2,3,4,5,6,7,8,9,10,11],
        morePeople: '更多',
        moreViewVisible: false,
        inputNum: '',
        inputNumPlaceholder: '请输入就餐人数',
        openStatus: false, // 开桌状态
        deskStatusTimer: null,
      }
    },
    created () {

    },
    mounted () {
      // this.$refs.peopleNumPage.addEventListener('touchmove', function (e) {
      //   e.preventDefault()
      // })
      this.$nextTick(() => {
        this.getStoreInfo()
      })
    },
    destroyed () {
      // this.$refs.peopleNumPage.removeEventListener('touchmove', function (e) {
      //   e.preventDefault()
      // })
    },
    beforeDestroy () {
      clearInterval(this.deskStatusTimer)
    },
    methods: {
      ...mapMutations([
        'set_user_cart',
        'set_common_data_store_info',
        'set_common_data_desk_info'
      ]),

      //获取门店信息
      getStoreInfo () {
        this.$http.post(this.API.seller.store_info,{store_id:this.storeId,desk_id:this.deskId}).then(res => {
          if (res.return_code == '0000') {
            this.storeInfo = res.data.store
            this.set_user_cart(res.data.user_cart);
            this.set_common_data_store_info(res.data.store)
            this.set_common_data_desk_info(res.data.desk)
            // 0未开桌,1已开桌,3已下单已接单,3已下单未接单,4未支付（未使用优惠券和积分抵扣）,5未支付（使用过优惠券和积分抵扣）6 已支付
            if (res.data.desk.status == '1') {
              this.$router.push('/store/'+this.storeId+'/'+this.deskId+'/'+res.data.desk.info.people)
            }else if (res.data.desk.status == '2') {
              this.$router.push('/confirm_pay/'+this.deskId)
            } else if (res.data.desk.status == '3') {
              this.$router.push('/merchant_confirm/'+this.deskId)
            } else if (res.data.desk.status == '4' || res.data.desk.status == '5') {
              this.$router.push('/order_detail/dine_detail/'+res.data.desk.info.order_id)
            } else if (res.data.desk.status == '6') {
              this.clearDesk()
            } else {
              this.deskStatusTimer = setInterval(this.deskStatus,5000)
            }

          } else {
            this.$myToast(res.return_msg)
            return
          }
        });
      },
      selectNum (index) {
        this.selectedIndex = index
        this.inputNum = this.peopleNum[index]
      },

      cancelInput () {
        this.moreViewVisible = false
        this.selectedIndex = ''
        this.inputNum = ''
        this.morePeople = '更多'
      },

      confirmInput () {
        if (parseInt(this.inputNum) > 11) {
          this.moreViewVisible = false
          this.selectedIndex = 12
          this.morePeople = this.inputNum + '人'
        } else {
          this.inputNum = ''
          this.inputNumPlaceholder = '请输入大于11的数字'
        }
      },
      goShopping () {
        if (this.openStatus == false) {
          let storeId = this.storeId
          let deskId = this.deskId
          let people = this.inputNum

          if (!people) {
            this.$myToast('请选择就餐人数')
            return false
          }

          this.$http.post(this.API.seller.store_opend,{store_id: storeId, desk_id: deskId, people: people, mark_text: this.remarks}).then(res => {
            if (res.return_code === '0000') {
              this.openStatus = true
              let desk_info = this.$store.state.common.common_data.desk_info
              let info = {people: people}
              desk_info.info = info
              this.set_common_data_desk_info(desk_info)
              this.$router.push('/store/'+this.storeId+'/'+this.deskId+'/'+this.inputNum)
            } else {
              this.$router.replace('/error/请您联系服务员')
            }
          }).catch(err => {
          })
        } else {
        }
      },
      deskStatus () {

        if (this.deskId) {
          this.$http.post(this.API.seller.desk_status,{desk_id: this.deskId}).then(res => {
            if (res.return_code === '0000') {
              if (res.data.status == '1') {
                this.$router.push('/store/'+this.storeId+'/'+this.deskId+'/'+res.data.people)
              }else if (res.data.status == '2') {
                this.$router.push('/confirm_pay/'+this.deskId)
              } else if (res.data.status == '3') {
                this.$router.push('/merchant_confirm/'+this.deskId)
              } else if (res.data.status == '4' || res.data.status == '5') {
                this.$router.push('/order_detail/dine_detail/'+res.data.order_id)
              } else if (res.data.status == '6') {
                this.$router.push('/order_detail/dine_detail/'+res.data.order_id)
              }
            }
          })
        }

      },
      clearDesk () {
        if (this.deskId) {
          this.$http.post(this.API.seller.desk_init,{desk_id: this.deskId}).then(res => {
            if (res.return_code === '0000') {
              this.$router.push('/store/'+this.storeId+'/'+this.deskId+'/'+res.data.people)
            } else {
              this.$router.replace('/error/哎呀！出错啦，请重新扫码')
            }
          })
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .people-num-page{
    display: flex;
    flex-direction: column;
    height: 100%;
    .banner{
      width: 100%;
      height: 420px;
      background-image: url("../../assets/img/people_num/img1@2x.png");
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-position: center;
      .mask{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.3);
        .icon{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0;
          padding-top: 92px;
          i{
            width: 34px;
            height: 4px;/*px*/
            background-color: #ffffff;
            transform: scaleY(0.25);
            transform-origin: center;
          }
          img{
            width: 114px;
            margin: 0 12px;
          }
        }
        .store-name{
          text-align: center;
          margin-top: 20px;
          font-size: 40px;/*px*/
          color: #ffffff;
        }
      }
    }
    .main{
      position: relative;
      flex-grow: 1;
      width: 100%;
      background-color: #303030;
      padding: 0 54px;
      .title{
        padding: 42px 0 32px 0;
        color: #ffffff;
        font-size: 28px;/*px*/
      }
      .choose-list{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
          position: relative;
          overflow: hidden;
          width: 180px;
          line-height: 80px;
          border: 2px solid rgba(225,215,38,.3);
          border-radius: 8px;
          font-size: 28px;/*px*/
          color: $themeColor;
          margin-bottom: 20px;
          text-align: center;
          .selected{
            position: absolute;
            width: 56px;
            height: 56px;
            bottom: -30px;
            right: -30px;
            img{
              position: absolute;
              top: 8px;
              left: 6px;
              width: 18px;
              z-index: 9;
            }
            .bg-color{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: $themeColor;
              transform: rotateZ(45deg);
              transform-origin: center;
            }
          }
        }
      }
      .remarks{
        display: flex;
        align-items: center;
        font-size: 26px;/*px*/
        color: #ffffff;
        label{
          /*line-height: 50px;*/
          padding-top: 2px;
        }
        input{
          flex-grow: 1;
          height: 80px;
          background-color: rgba(0,0,0,0);
          font-size: 26px;/*px*/
          color: #ffffff;
          line-height: 1em;
          padding-bottom: 2px;
        }
        input::-webkit-input-placeholder{
          color:#bbbbbb;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#bbbbbb;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#bbbbbb;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:#bbbbbb;
        }
      }
      .confirm{
        position: absolute;
        width: 100%;
        bottom: 82px;
        left: 0;
        padding: 0 54px;
        button{
          font-size: 30px;/*px*/
          background-color: $themeColor;
          width: 100%;
          height: 88px;
          border-radius: 8px;
        }
      }
    }
    .mint-popup{
      background-color: rgba(0,0,0,0);
      .more-view{
        width: 650px;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        .title{
          text-align: center;
          padding-top: 48px;
          font-size: 32px;/*px*/
        }
        .input-num{
          position: relative;
          width: 420px;
          height: 88px;
          margin: 40px auto 65px auto;
          input{
            position: relative;
            z-index: 9;
            text-align: center;
            width: 94%;
            height: 80px;
            margin: 4px 3%;
            font-size: 28px;/*px*/
          }
          &:after{
            @include all-border-1px(#dddddd, 8px);
          }
        }
        input::-webkit-input-placeholder{
          color:#bbbbbb;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#bbbbbb;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#bbbbbb;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:#bbbbbb;
        }
        .btn{
          display: flex;
          button{
            width: 50%;
            height: 88px;
            font-size: 30px;/*px*/
          }
          .cancel{
            background-color: #eeeeee;
          }
          .confirm{
            background-color: $themeColor;
          }
        }
      }
    }
  }
</style>
