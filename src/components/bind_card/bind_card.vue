<template>
  <div class="bind-card-page">
    <div class="input-box reset-pw">
      <label for="cardNo">卡号</label>
      <input type="tel" id="cardNo" v-model="cardNo" placeholder="请输入卡号"/>
    </div>
    <div class="input-box reset-pw">
      <label for="cardNo">cvv2</label>
      <input type="tel" id="cvv2" v-model="cvv2" placeholder="请输入cvv2"/>
    </div>
    <div class="input-box confirm-pw">
      <label for="kb1">支付密码</label>
      <input type="tel" maxlength="6" id="kb1" v-model="password" placeholder="请输入卡密码"/>
    </div>
    <button class="confirm" @click="confirm">绑卡</button>
    <back></back>
    <my-toast :visible="warnTip" :options="tipInfo" @hideToast="beHide" class="customize-toast"></my-toast>
  </div>
</template>

<script>
  import MyToast from '../../base/toast'
  import Valid from '../../utils/valid'
  import Encrypt from "../../assets/js/encrypt/encrypt"
  import back from '../../base/back'
  import $ from 'jquery'

  export default {
    name: "bind_card",
    data () {
      return {
        cardNo: '',
        cvv2: '',
        password: '',
        tipInfo: {
          icon: '',
          txt: ''
        },
        loading: false,
        warnTip: false,
        mappingId: ''
      }
    },
    components: {
      MyToast,
      back
    },
    mounted () {
      this.mappingId = this.get_time()
      this.$nextTick(() => {
        window.kb = new keyBoard({
          "chaosMode" : 0,// 混乱模式,0:无混乱;1:打开时乱一次;2:每输入一个字符乱一次,默认值0
          "pressStatus" :1,// 按键状态,0:按下、抬起按键无变化;1:按下后有放大镜效果;2:按下、抬起按键的颜色变化,默认值0
          "kbType" : 0,// 键盘类型,0:全键盘;1:纯数字键盘,默认值0
          "svg":"static/svg"//svg图片的地址
        })
        window.kb.generate()
        window.passGuard1 = new passGuard({
          "mappurl" : "http://ceshi4.sdykt.com.cn:1280/pos/card/getMapping/" + this.mappingId,
          "maxLength" : 8,// 最大输入长度
          "regExp1" : "[\\S\\s]",// 输入过程限制的正则
          "regExp2": "[0-9]{6,12}",
          "displayMode" : 0,// 显示形式,0:星号;1:明文,默认值0
          "callBack":this.cb1,//成功回调
          "errorCallBack":this.cb2,//失败回调3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001
          // "rsaPublicKey" : "3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001"// rsa公钥
          "rsaPublicKey" : "30818902818100d17951540859261bcbb00fc61a9e2fb8be1f5794dabd87e87bbac84e975ac7f6f77a094c6b642b3a799bdbdf13841a47943cfb0831578b2e4d82f177b9350e211db3dc84111eb4f0b92bc7d1379436a0f631be371682839461a11d6d2e65cb0c45c526d15429b706ff14498e3fd6c4683ca1092054f5ac95f679ba699fd789d50203010001"// rsa公钥
        })
        window.passGuard1.generate("kb1",window.kb,1)
      })

    },
    methods: {
      beHide (bool) {
        this.warnTip = bool
      },
      confirm () {

        if (!this.cardNo) {
          this.warnTip = true
          this.tipInfo = {
            type: 'warn',
            txt: '请输入卡号'
          }
          return false
        }

        if (!this.cvv2) {
          this.warnTip = true
          this.tipInfo = {
            type: 'warn',
            txt: '请输入cvv2'
          }
          return false
        }

        if(window.passGuard1.getValid() == 1){
          this.warnTip = true
          this.tipInfo = {
            type: 'warn',
            txt: '请输入6位数交易密码'
          }
          return false
        }

        let _this = this

        $.ajax( {
          url : "http://ceshi4.sdykt.com.cn:1280/pos/card/getRandkey?" + this.get_time(),
          type : "GET",
          async : false,
          success : function(ranKey) {
            console.log(ranKey)
            window.passGuard1.setRandKey(ranKey);
            let password = window.passGuard1.getOutput()
            document.getElementById("kb1").value = "";
            //这一段for循环，如果没用必须加上，防止placeholder效果失效。
            for(var i = 1;i <= Le;i++){
              $("#kb"+i).attr('placeholder',PH.arrPlace[i-1])
            }
            _this.cardPayViewVisible = false
            console.log(password)
            _this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
            _this.loading = true
            _this.$http.post(_this.API.user.bind_card,{card_no: _this.cardNo, cvv2: _this.cvv2, password: password, key: ranKey, mappingId: _this.mappingId}).then(res => {
              _this.$myLoading.close()
              _this.loading = false
              if (res.return_code === '0000') {
                _this.$router.go(-1)
                return true
              } else {
                _this.$myToast(res.return_msg)
                return false
              }
            })
          }
        })

        // this.$http.post(this.API.user.change_paycode,{cur_code: Encrypt.encrypt(this.nowPw), new_code: Encrypt.encrypt(this.resetPw)}).then(res => {
        //   if (res.return_code === '0000') {
        //     this.warnTip = true
        //     this.tipInfo = {
        //       type: 'success',
        //       txt: '修改成功'
        //     }
        //     this.$router.go(-1)
        //     return true
        //   } else {
        //     this.warnTip = true
        //     this.tipInfo = {
        //       type: 'error',
        //       txt: res.return_msg
        //     }
        //     return false
        //   }
        // })
      },
      cb1 () {
        console.log('cb1')
      },
      cb2 () {
        console.log('cb2')
      },
      get_time () {
        return new Date().getTime().toString();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .bind-card-page{
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
