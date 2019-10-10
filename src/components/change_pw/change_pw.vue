<template>
  <div class="change-pw-page">
    <div class="input-box now-pw">
      <label for="now_pw">当前密码</label>
      <input type="tel" maxlength="6" id="now_pw" v-model="nowPw" placeholder="请输入6位数字交易密码"/>
    </div>
    <p class="tip">初始密码为手机后六位</p>
    <div class="input-box reset-pw">
      <label for="reset_pw">重置密码</label>
      <input type="tel" maxlength="6" id="reset_pw" v-model="resetPw" placeholder="请输入6位数字交易密码"/>
    </div>
    <div class="input-box confirm-pw">
      <label for="confirm_pw">确认密码</label>
      <input type="tel" maxlength="6" id="confirm_pw" v-model="confirmPw" placeholder="请再次输入密码"/>
    </div>
    <button class="confirm" @click="confirm">确定</button>
    <p class="forget-pw">
      <router-link to="/reset_pw">
        <span>忘记密码？</span>
      </router-link>
    </p>
    <back></back>
    <my-toast :visible="warnTip" :options="tipInfo" @hideToast="beHide" class="customize-toast"></my-toast>
  </div>
</template>

<script>
  import MyToast from '../../base/toast'
  import Valid from '../../utils/valid'
  import Encrypt from "../../assets/js/encrypt/encrypt"
  import back from '../../base/back'

  export default {
    name: "change_pw",
    data () {
      return {
        nowPw: '',
        resetPw: '',
        confirmPw: '',
        tipInfo: {
          icon: '',
          txt: ''
        },
        warnTip: false
      }
    },
    components: {
      MyToast,
      back
    },
    methods: {
      beHide (bool) {
        this.warnTip = bool
      },
      confirm () {
        if (! Valid.check_six_number(this.nowPw)) {
          this.warnTip = true
          this.tipInfo = {
            type: 'warn',
            txt: '请输入6位数当前密码'
          }
          return false
        }

        if (! Valid.check_six_number(this.resetPw)) {
          this.warnTip = true
          this.tipInfo = {
            type: 'warn',
            txt: '请输入重置密码'
          }
          return false
        }

        if (! Valid.check_six_number(this.confirmPw)) {
          this.warnTip = true
          this.tipInfo = {
            type: 'warn',
            txt: '请输入确认密码'
          }
          return false
        }

        if (this.resetPw != this.confirmPw) {
          this.warnTip = true
          this.tipInfo = {
            type: 'error',
            txt: '两次输入密码不一致'
          }
          return false
        }

        this.$http.post(this.API.user.change_paycode,{cur_code: Encrypt.encrypt(this.nowPw), new_code: Encrypt.encrypt(this.resetPw)}).then(res => {
          if (res.return_code === '0000') {
            this.warnTip = true
            this.tipInfo = {
              type: 'success',
              txt: '修改成功'
            }
            this.$router.go(-1)
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
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .change-pw-page{
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

      }
      input::-webkit-input-placeholder{
        color:#bbbbbb;
        vertical-align: middle;
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#bbbbbb;
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
    .reset-pw{
      &:before{
        @include border-1px(#e5e5e5, bottom);
      }
    }
    .tip{
      line-height: 60px;
      color: #999999;
      font-size: 24px;/*px*/
      padding: 0 30px;
    }
    .confirm{
      display: block;
      width: 690px;
      height: 88px;
      margin: 0 auto;
      margin-top: 90px;
      background-color: $themeColor;
      border-radius: 8px;
      font-size: 30px;/*px*/
      color: #333333;
    }
    .forget-pw{
      padding: 40px 30px;
      text-align: right;
      color: #666666;
      font-size: 28px;/*px*/
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
