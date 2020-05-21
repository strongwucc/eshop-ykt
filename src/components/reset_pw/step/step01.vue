<template>
  <div class="step01-page">
    <div class="input-box now-tel">
      <label for="now_tel">当前账号</label>
      <input type="tel" id="now_tel" v-model="nowTel" placeholder="请输入当前手机号"/>
    </div>
    <div v-if="verifyErrorCount >= 3" class="input-box graphic-code">
      <label for="graphic_code">验证码</label>
      <input type="text" id="graphic_code" v-model="grapCode" placeholder="请输入图形验证码"/>
      <div class="graphic">
        <img class="code" alt="验证码" v-if="!grapCodeCheckSuccess" :src="vcode" @click="vcodeRefresh"/>
        <div class="success" v-if="grapCodeCheckSuccess">
          <img src="../../../assets/img/toast/icon_success@2x.png">
        </div>
      </div>
    </div>
    <div class="input-box veri-code">
      <label for="veri_code">验证码</label>
      <input type="tel" id="veri_code" v-model="veriCode" maxlength="6" placeholder="请输入验证码"/>
      <div class="get-veri-code">
        <button v-if="!wait60s" :style="{backgroundColor: verifyErrorCount >= 3 && !grapCodeCheckSuccess ? '#e5e5e5' : '#ffe169'}" @click="getVeriCode">获取验证码</button>
        <div class="_60s" v-if="wait60s">{{second}}s后重发</div>
      </div>
    </div>
    <button class="confirm" @click="nextStep">下一步</button>
    <!-- <p class="support">易通金服提供支持</p> -->
    <my-toast :visible="warnTip" :options="tipInfo" @hideToast="beHide" class="customize-toast"></my-toast>
  </div>
</template>

<script>
  import MyToast from '../../../base/toast'
  import { mapState } from 'vuex'
  import Valid from '../../../utils/valid'
  import { rootUrl } from "../../../config/env";

  export default {
    name: "step01",
    data () {
      return {
        nowTel: '',
        veriCode: '',
        grapCode: '',
        wait60s: false,
        second: 60,
        //toast提示信息，属性名不可更改
        tipInfo: {
          icon: '',
          txt: ''
        },
        warnTip: false,//显示隐藏toast

        verifyErrorCount: 0,//手机验证码输入错误次数，错误三次显示图形验证码
        vcode: rootUrl + 'index.php/index-gen_vcode-b2c-4.html',
        grapCodeCheckSend: false,
        grapCodeCheckSuccess: false,
        posting: false,
      }
    },
    components: {
      MyToast
    },
    watch: {
      'grapCode' : function (vcode) {
        if (vcode.length === 4 && !this.grapCodeCheckSend && !this.grapCodeCheckSuccess) {
          this.grapCodeCheckSend = true
          this.$http.post(this.API.auth.check_grap_code,{code: this.grapCode}).then(res => {
            this.grapCodeCheckSend = false
            if (res.return_code === '0000') {
              // 验证成功
              this.grapCodeCheckSuccess = true
            } else {
              this.warnTip = true
              this.tipInfo = {
                type: 'error',
                txt: '验证码错误'
              }
              return false
            }
          })
        }
      }
    },
    methods: {
      beHide (bool) {
        this.warnTip = bool
      },
      sendCode () {
        this.$http.post(this.API.auth.mobile_code,{phoneNumber: this.nowTel, type: 'reset_pw'}).then(res => {
          this.$myLoading.close()
          this.posting = false
          if (res.return_code === '0000') {
            this.verifyErrorCount += 1
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
            this.warnTip = true
            this.tipInfo = {
              type: 'error',
              txt: res.return_msg
            }
            return
          }
        })
      },
      getVeriCode () {
        if (this.verifyErrorCount >= 3 && !this.grapCodeCheckSuccess) {
          return
        }
        if (! Valid.check_mobile(this.nowTel)) {
          this.warnTip = true
          this.tipInfo = {
            type: 'error',
            txt: '请输入正确的手机号'
          }
          return
        }

        if (this.posting === true) {
          return
        }

        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        this.posting = true

        this.$http.post(this.API.auth.reset_mobile_exist,{phoneNumber: this.nowTel}).then(res => {
          if (res.return_code !== '0000') {
            this.$myLoading.close()
            this.posting = false
            this.warnTip = true
            this.tipInfo = {
              type: 'error',
              txt: '该手机账号不存在'
            }
            return false
          }
          this.sendCode()
        })
      },
      nextStep () {
        //确认信息，跳到step2
        this.$http.post(this.API.auth.check_mobile_code,{phoneNumber: this.nowTel, type: 'reset_pw', code: this.veriCode}).then(res => {
          if (res.return_code === '0000') {

            this.$router.push('/reset_pw/step02')
          } else {
            this.verifyErrorCount += 1
            this.warnTip = true
            this.tipInfo = {
              type: 'error',
              txt: res.return_msg
            }
            return
          }
        })
      },
      vcodeRefresh () {
        let i = Math.random()
        this.vcode = rootUrl + 'index.php/index-gen_vcode-b2c-4.html?i=' + i
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/common";

  .step01-page{
    position: relative;
    height: 100%;
    .input-box{
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      background-color: #ffffff;
      height: 100px;
      padding: 0 30px;
      font-size: 28px;/*px*/
      label{
        padding-top: 3px;
        width: 150px;
      }
      input{
        height: 100px;
        line-height: 1.5em;
        font-size: 28px;/*px*/
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
      &:after{
        @include border-1px(#e5e5e5, bottom);
      }
    }
    .veri-code{
      position: relative;
      .get-veri-code{
        position: absolute;
        min-width: 160px;
        height: 48px;
        top: 26px;
        right: 30px;
        button{
          width: 100%;
          height: 100%;
          border-radius: 24px;
          font-size: 24px;/*px*/
        }
        ._60s{
          width: 100%;
          height: 100%;
          line-height: 48px;
          border-radius: 24px;
          font-size: 24px;/*px*/
          text-align: center;
          background-color: #e5e5e5;
          color: #666666;
        }
      }
    }
    .graphic-code{
      .graphic{
        position: absolute;
        width: 150px;
        height: 54px;
        top: 23px;
        right: 35px;
        .code{
          width: 100%;
          height: 100%;
        }
        .success{
          position: absolute;
          text-align: center;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 8px;
          img{
            width: 50px;
            vertical-align: middle;
          }
          &:after{
            @include all-border-1px($themeColor, 8px);
          }
        }
      }
    }
    .confirm{
      display: block;
      width: 690px;
      height: 88px;
      margin: 0 auto;
      margin-top: 250px;
      background-color: $themeColor;
      border-radius: 8px;
      font-size: 30px;/*px*/
      color: #666666;
    }
    .support{
      position: absolute;
      bottom: 0;
      line-height: 80px;
      width: 100%;
      text-align: center;
      color: #c1c1c1;
      font-size: 26px;/*px*/
    }
  }
</style>
