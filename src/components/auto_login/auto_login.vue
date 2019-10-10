<template>
  <div class="pay-fail-page">
    <img class="tip-icon" src="../../assets/img/pay_status/img_fail@2x.png">
    <p class="tip-txt">登录中...</p>
    <p class="fail-reason">{{msg}}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "error",
    data () {
      return {
        msg: '正在登录中...',
        code: null,
        redirect: this.$route.query.redirect,
        openId: this.$route.query.openId
      }
    },
    computed : {
      ...mapState({
        isLogin: state => state.user.user_auth.is_login
      })
    },
    mounted () {
      if (this.isLogin == 0) {
        this.autoLogin()
      }
    },
    methods: {
      autoLogin () {
        let baseUrl = window.location.href.substr(0,window.location.href.indexOf(this.$route.fullPath))
        let redirect = this.redirect ? baseUrl + this.redirect : baseUrl + '/'
        this.$http.post(this.API.auth.weixin_login,{redirect:redirect,base_url:baseUrl}).then(res => {
          if (res.return_code == '0000') {
            window.location.href = res.data.oauth_url
          } else {
            this.$router.push('/error/无法登录，请联系商家')
          }
        })
      }
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
