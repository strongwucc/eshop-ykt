<template>
  <div class="pay-fail-page">
    <img class="tip-icon" src="../../assets/img/pay_status/img_fail@2x.png">
    <p class="tip-txt">出错啦</p>
    <p class="fail-reason">{{msg}}</p>
  </div>
</template>

<script>
  export default {
    name: "error",
    data () {
      return {
        msg: '哎呀，怎么就出错了呢',
      }
    },
    mounted () {
      this.msg = this.$route.params.msg
    }
  }
</script>

<style lang="scss" scoped>
  .pay-fail-page{
    text-align: center;
    height: 100%;
    background-color: #ffffff;
    .tip-icon{
      width: 230px;
      box-sizing: content-box;
      padding-left: 8px;
      margin-top: 60px;
    }
    .tip-txt{
      font-size: 36px;/*px*/
      color: #a18b35;
    }
    .fail-reason{
      margin-top: 90px;
    }
    .rescan-code{
      width: 600px;
      height: 88px;
      border-radius: 8px;
      font-size: 30px;/*px*/
      background-color: #ffe169;
      margin-top: 168px;
    }
  }
</style>
