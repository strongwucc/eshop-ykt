<template>
  <div class="bind-tel-page">
    <div class="mask-wrapper">
      <div style="height: 2px"></div>
      <img class="store-logo" v-if="storeInfo" v-lazy="storeInfo.store_log"/>
      <img class="store-logo" v-else src="../../assets/img/common/login_logo_default@2x.png"/>
      <div class="input-wrapper tel">
        <input type="tel" v-model="tel" placeholder="请输入手机号"/>
      </div>
      <div class="input-wrapper veri-code">
        <input type="text" v-model="veriCode" maxlength="6" placeholder="请输入验证码"/>
        <div class="get-code">
          <span class="get" v-show="!wait60s" @click="getCode">获取验证码</span>
          <span class="repeat-get" v-show="wait60s">
            重新发送({{second}}s)
          </span>
        </div>
      </div>
      <button class="btn" @click="doLogin">
        登录
      </button>
    </div>
  </div>
</template>

<script>
  import { rootUrl } from '../../config/env'
  import Valid from '../../utils/valid'
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: "login",
    data () {
      return {
        tel: '',
        veriCode: '',
        verifyErrorCount: 0,//手机验证码输入错误次数，错误三次显示图形验证码
        vcode: rootUrl + 'index.php/index-gen_vcode-b2c-4.html',
        wait60s: false,
        posting: false,
        second: 60,
        redirect: this.$route.query.redirect
      }
    },
    activated: function () {
      this.$setgoindex()
    },
    computed: {
      ...mapState({
        storeInfo: state => state.common.common_data.store_info
      })
    },
    methods: {
      ...mapMutations([
        'set_user_login_status',
        'set_user_info',
        'set_user_bind_status',
      ]),
      getCode () {
        if (this.verifyErrorCount >= 3) {
          return
        }
        if (! Valid.check_mobile(this.tel)) {
          this.$myToast('请输入正确的手机号')
          return
        }

        if (this.posting === true) {
          return
        }

        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        this.posting = true
        this.$http.post(this.API.auth.mobile_code,{phoneNumber: this.tel, type: 'login'}).then(res => {

          this.$myLoading.close()
          this.posting = false
          if (res.return_code === '0000') {
            let vm = this
            vm.wait60s = true
            let timer = setInterval(() => {
              vm.second -= 1
              if (vm.second === 0) {
                clearInterval(timer)
                vm.wait60s = false
                vm.second = 60
              }
            }, 1000)
          } else {
            this.$myToast(res.return_msg)
            return
          }
        })
      },
      doLogin () {
        if (! Valid.check_mobile(this.tel)) {
          this.$myToast('请输入正确的手机号')
          return
        }

        if (!this.veriCode) {
          this.$myToast('请输入验证码')
          return
        }

        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        this.$http.post(this.API.auth.login,{phoneNumber: this.tel, captcha: this.veriCode, type: 'login'}).then(res => {
          this.$myLoading.close()
          if (res.return_code === '0000') {
            if (this.redirect) {
              this.set_user_login_status(1)
              this.set_user_info(res.data.userinfo)
              this.set_user_bind_status(1)
              this.$router.push(this.redirect)
            } else {
              if (this.$route.query.goindex === 'true') {
                this.$router.push('/center')
              } else {
                this.$router.back(-1)
              }
            }
          } else {
            this.verifyErrorCount += 1
            this.$myToast(res.return_msg)
            return
          }
        })

      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  .bind-tel-page{
    height: 100%;
    background: url("../../assets/img/home/login_bg@2x.png") no-repeat;
    background-size: 100% 100%;
    background-position: center;
    .mask-wrapper{
      height: 100%;
      background-color: rgba(0,0,0,.1);
      .store-logo{
        display: block;
        width: 150px;
        height: 150px;
        margin: 146px auto 90px auto;
      }
      .input-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 600px;
        height: 98px;
        border-radius: 49px;
        background-color: #ffffff;
        margin: 0 auto 20px auto;
        input{
          width: 440px;
        }
      }
      .tel{
        margin-top: 90px;
      }
      .veri-code{
        position: relative;
        .get-code{
          position: absolute;
          color: $themeColor;
          top: 50%;
          transform: translateY(-50%);
          right: 50px;
          .repeat-get{
            color: #999999;
          }
        }
      }
      .btn{
        display: block;
        width: 600px;
        height: 98px;
        font-size: 32px;
        background-color: $themeColor;
        margin: 60px auto 0 auto;
        border-radius: 49px;
      }
    }

  }
</style>
