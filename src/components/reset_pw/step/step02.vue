<template>
  <div class="step02-page">
    <div class="input-box new-pw">
      <label for="new_pw">新密码</label>
      <input type="tel" maxlength="6" id="new_pw" v-model="newPw" placeholder="请输入6位数字交易密码"/>
    </div>
    <div class="input-box re-enter">
      <label for="re_enter">确认密码</label>
      <input type="tel" maxlength="6" id="re_enter" v-model="reEnter" placeholder="请确认新密码"/>
    </div>
    <button class="confirm" @click="confirm">确认</button>
    <p class="support">易通金服提供支持</p>
    <my-toast :visible="warnTip" :options="tipInfo" @hideToast="beHide" class="customize-toast"></my-toast>
  </div>
</template>

<script>
  import MyToast from '../../../base/toast'
  import Valid from '../../../utils/valid'
  import Encrypt from "../../../assets/js/encrypt/encrypt"

  export default {
    name: "step02",
    data () {
      return {
        newPw: '',
        reEnter: '',
        //toast提示信息，属性名不可更改
        tipInfo: {
          icon: '',
          txt: ''
        },
        warnTip: false,//显示隐藏toast
      }
    },
    components: {
      MyToast
    },
    methods: {
      beHide (bool) {
        this.warnTip = bool
      },

      confirm () {
        //点击确认修改密码
        if (! Valid.check_six_number(this.newPw)) {
          this.warnTip = true
          this.tipInfo = {
            type: 'warn',
            txt: '请输入新的6位数支付密码'
          }
          return false
        }

        if (! Valid.check_six_number(this.reEnter)) {
          this.warnTip = true
          this.tipInfo = {
            type: 'warn',
            txt: '请再次输入密码'
          }
          return false
        }

        if (this.newPw != this.reEnter) {
          this.warnTip = true
          this.tipInfo = {
            type: 'error',
            txt: '两次输入密码不一致'
          }
          return false
        }

        this.$http.post(this.API.user.reset_paycode,{new_code: Encrypt.encrypt(this.newPw)}).then(res => {
          if (res.return_code === '0000') {
            this.warnTip = true
            this.tipInfo = {
              type: 'success',
              txt: '重设密码成功'
            }
            this.$router.go(-3)
            return true
          } else {
            this.warnTip = true
            this.tipInfo = {
              type: 'error',
              txt: res.return_msg
            }
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

  .step02-page{
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
        vertical-align: middle;
        font-size: 28px;/*px*/
        -webkit-text-security:disc;
        text-security:disc;
      }
      input::-webkit-input-placeholder{
        color:#bbbbbb;
        vertical-align: middle;
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#bbbbbb;
      ;
        vertical-align: middle;
      }
      input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#bbbbbb;

        vertical-align: middle;
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#bbbbbb;
      }
      &:after{
        @include border-1px(#e5e5e5, bottom);
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
