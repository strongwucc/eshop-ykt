<template>
  <div class="pay-fail-page">
    <img class="tip-icon" src="../../assets/img/bind/set_ic_weixin_big@2x.png">
    <p class="tip-txt">您还没有绑定微信</p>
    <p class="fail-reason">绑定微信可以在您下次登录时使用微信登录</p>
    <button class="rescan-code" @click="bindWeChat">绑定微信</button>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "bind_wechat",
    data () {
      return {
        code: this.$route.params.code
      }
    },
    methods: {
      ...mapMutations([
        'set_user_info'
      ]),
      bindWeChat () {

        if (this.code == '') {
          this.$myToast('页面出错，请您刷新！')
          return false
        }

        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        this.$http.post(this.API.user.bind_wechat, {code: this.code}).then(res => {
          this.$myLoading.close()
          if (res.return_code === '0000') {
            this.$myToast('绑定成功')
            this.set_user_info(res.data.user_info)
            this.$router.push('/member_info')
            return true
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
  @import "../../assets/css/common";
  .pay-fail-page{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /*text-align: center;*/
    height: 100%;
    background-color: #ffffff;
    .tip-icon{
      width: 114px;
      padding-top: 120px;
    }
    .tip-txt{
      font-size: 32px;/*px*/
      color: #333333;
      margin-top: 80px;
    }
    .fail-reason{
      margin-top: 28px;
      font-size: 24px;
      color: #999999;
    }
    .rescan-code{
      width: 400px;
      height: 88px;
      border-radius: 10px;
      font-size: 30px;/*px*/
      background-color: $themeColor;
      margin-top: 168px;
    }
  }
</style>
