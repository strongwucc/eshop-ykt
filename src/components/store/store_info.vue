<template>
  <div class="store-info" @touchstart="close">
    <img class="logo" v-lazy="storeInfo.store_log">
    <h4 class="name">{{storeInfo.store_name}}</h4>
    <div class="ccc">
      <div class="cut-off">
        <i></i>
        <span>商户信息</span>
        <i></i>
      </div>
      <div class="x business-hours">
        <i class="point"></i>
        营业时间：{{storeInfo.open_time}}
      </div>
      <div class="x tel">
        <i class="point"></i>
        电话：{{storeInfo.tel}}
      </div>
      <div class="x addr">
        <i class="point"></i>
        地址：{{storeInfo.addr}}
      </div>
    </div>
    <img class="close" src="../../assets/img/common/popup_icon_off@2x.png">
  </div>
</template>

<script>
  export default {
    name: "store_info",
    props: [
      'storeInfo'
    ],
    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  .store-info{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: translateX(100%);
    z-index: 999;
    background-color: rgba(0,0,0,.75);
    text-align: center;
    transition: transform 0.3s ease;
    color: #ffffff;
    .logo{
      width: 150px;
      height: 150px;
      margin-top: 170px;
    }
    .name{
      font-size: 32px;/*px*/
      margin-top: 40px;
    }
    .ccc{
      width: 644px;
      margin: 80px auto 0 auto;
      .cut-off{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 60px;
        i{
          width: 250px;
          height: 5px;
          margin-top: -5px;
          border-bottom: 1px dashed #999999;
        }
        span{
          font-size: 28px;/*px*/
        }
      }
      .x{
        display: flex;
        align-items: center;
        font-size: 24px;/*px*/
        margin-bottom: 24px;
        .point{
          width: 6px;
          height: 6px;
          background-color: $themeColor;
          border-radius: 50%;
          margin-right: 20px;
        }
      }
    }
    .close{
      width: 80px;
      height: 80px;
      position: absolute;
      left: 50%;
      margin-left: -25px;
      bottom: 180px;
    }
  }
</style>
