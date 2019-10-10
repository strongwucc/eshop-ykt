<template>
  <div class="change-tel-page">
    <img class="icon" src="../../assets/img/change_tel/icon_tel@2x.png">
    <p class="now-tel">当前手机号&nbsp;<span>{{ user.user_info.mobile }}</span></p>
    <p class="tip">修改手机号后，会员余额、会员积分等<br/>所有顾客信息将转移到新的手机号</p>
    <div class="input-box new-tel">
      <input type="tel" v-model="newTel" placeholder="请输入新的手机号"/>
      <i class="clear" v-show="newTel.length" @click="clearTel">
        <img src="../../assets/img/common/icon_off@2x.png">
      </i>
    </div>
    <div v-if="verifyErrorCount >= 3" class="input-box graphic-code">
      <input type="text" v-model="grapCode" placeholder="请输入图形验证码" :maxlength="4"/>
      <div class="graphic">
        <img class="code" alt="验证码" v-if="!grapCodeCheckSuccess" :src="vcode" @click="vcodeRefresh"/>
        <div class="success" v-if="grapCodeCheckSuccess">
          <img src="../../assets/img/toast/icon_success@2x.png">
        </div>
      </div>
    </div>
    <div class="input-box veri-code">
      <input type="tel" v-model="veriCode" maxlength="6" placeholder="请输入验证码"/>
      <div class="get-veri-code">
        <button v-if="!wait60s" :style="{backgroundColor: verifyErrorCount >= 3 && !grapCodeCheckSuccess ? '#e5e5e5' : '#ffe169'}" @click="getVeriCode">获取验证码</button>
        <div class="_60s" v-if="wait60s">{{second}}s后重发</div>
      </div>
    </div>
    <button class="confirm" @click="confirm">确定</button>
    <back></back>
    <my-toast :visible="warnTip" :options="tipInfo" @hideToast="beHide" class="customize-toast"></my-toast>
  </div>
</template>

<script>
  import MyToast from '../../base/toast'
  import { mapState, mapMutations } from 'vuex'
  import Valid from '../../utils/valid'
  import { rootUrl } from '../../config/env'
  import back from '../../base/back'

  export default {
    name: "change_tel",
    data () {
      return {
        newTel: '',
        veriCode: '',
        grapCode: '',
        wait60s: false,
        second: 60,
        //toast提示信息，属性名不可更改
        tipInfo: {
          type: '',
          txt: ''
        },
        warnTip: false,//显示隐藏toast
        verifyErrorCount: 0,//手机验证码输入错误次数，错误三次显示图形验证码
        vcode: rootUrl + 'index.php/index-gen_vcode-b2c-4.html',
        grapCodeCheckSend: false,
        grapCodeCheckSuccess: false

    }
    },
    components: {
      MyToast,
      back
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    watch: {
      'grapCode': function (vcode) {
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
    created () {
      //没有在html上交互渲染的属性在此定义
    },
    methods: {
      ...mapMutations([
        'set_user_info'
      ]),
      beHide (bool) {
        this.warnTip = bool
      },

      clearTel () {
        this.newTel = ''
      },

      getVeriCode () {
        if (this.verifyErrorCount >= 3 && !this.grapCodeCheckSuccess) {
          return
        }
        if (! Valid.check_mobile(this.newTel)) {
          this.warnTip = true
          this.tipInfo = {
            type: 'error',
            txt: '请输入正确的手机号'
          }
          return
        }

        if (this.newTel === this.$store.state.user.user_info.mobile) {
          this.warnTip = true
          this.tipInfo = {
            type: 'error',
            txt: '请勿输入相同手机号'
          }
          return
        }

        this.$http.post(this.API.auth.mobile_code,{phoneNumber: this.newTel, type: 'change_tel'}).then(res => {
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
            this.warnTip = true
            this.tipInfo = {
              type: 'error',
              txt: res.return_msg
            }
            return
          }
        })
      },

      confirm () {
        if (! Valid.check_mobile(this.newTel)) {
          this.warnTip = true
          this.tipInfo = {
            type: 'error',
            txt: '请输入正确的手机号'
          }
          return
        }
        if (this.newTel === this.nowTel) {
          this.warnTip = true
          this.tipInfo = {
            type: 'error',
            txt: '请勿输入相同手机号'
          }
          return
        }

        if (!this.veriCode) {
          this.warnTip = true
          this.tipInfo = {
            type: 'error',
            txt: '请输入验证码'
          }
          return
        }

        this.$http.post(this.API.user.change_mobile,{phoneNumber: this.newTel, smsCode: this.veriCode, type: 'change_tel'}).then(res => {
          if (res.return_code === '0000') {
            this.warnTip = true
            this.tipInfo = {
              type: 'success',
              txt: '修改成功'
            }

            let user_info = this.$store.state.user.user_info
            let new_info = Object.assign(user_info,{mobile: this.newTel})
            this.set_user_info(new_info)
            this.$router.go(-1)
            return true
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
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";

  .change-tel-page{
    position: relative;
    text-align: center;
    height: 100%;
    background-color: #ffffff;
    .icon{
      margin-top: 82px;
      width: 138px;
    }
    .now-tel{
      margin-top: 58px;
      font-size: 32px;/*px*/
      color: #666666;
      span{
        font-weight: bold;
      }
    }
    .tip{
      margin-top: 28px;
      font-size: 24px;/*px*/
      line-height: 1.5;
      color: #d68470;
    }
    .input-box{
      position: relative;
      width: 640px;
      margin: 0 auto;
      height: 100px;
      input{
        height: 100px;
        line-height: 1.5em;
        width: 100%;
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
    .new-tel{
      margin-top: 88px;
      .clear{
        position: absolute;
        top: 33px;
        right: 0;
        img{
          width: 34px;
        }
      }
      &:before{
        @include border-1px(#e5e5e5, top);
      }
    }
    .veri-code{
      .get-veri-code{
        position: absolute;
        min-width: 160px;
        height: 48px;
        top: 26px;
        right: 0;
        button{
          width: 100%;
          height: 100%;
          border-radius: 24px;
          /*background-color: #ffe169;*/
          font-size: 24px;/*px*/
        }
        ._60s{
          width: 100%;
          height: 100%;
          line-height: 48px;
          border-radius: 24px;
          font-size: 24px;/*px*/
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
        right: 0;
        .code{
          width: 100%;
          height: 100%;
        }
        .success{
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          text-align: center;
          img{
            vertical-align: middle;
            width: 50px;
          }
          &:after{
            @include all-border-1px($themeColor, 8px);
          }
        }
      }
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
    .confirm{
      width: 640px;
      height: 88px;
      border-radius: 8px;
      background-color: $themeColor;
      font-size: 30px;
      margin: 0 auto;
      margin-top: 76px;
    }
  }
</style>
