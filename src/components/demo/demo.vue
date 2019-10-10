<template>
  <div class="demo-page">
    <input type="text" readonly="readonly" id="kb1" name="input3" placeholder="请输入密码" class="default NoneInput90" 	maxlength="50" tabindex="3"/>
  </div>
</template>

<script>
  export default {
    name: "demo",
    data () {
        return {
          kb: {},
          passGuard: {}
        }
    },
    components: {
    },
    created () {
      this.kb = new keyBoard({
        "chaosMode" : 1,// 混乱模式,0:无混乱;1:打开时乱一次;2:每输入一个字符乱一次,默认值0
        "pressStatus" :1,// 按键状态,0:按下、抬起按键无变化;1:按下后有放大镜效果;2:按下、抬起按键的颜色变化,默认值0
        "kbType" : 0,// 键盘类型,0:全键盘;1:纯数字键盘,默认值0
        "svg":"svg"//svg图片的地址
      })
      this.passGuard = new passGuard({
        "mappurl" : "./static/send_mapping.jsp",
        "maxLength" : 12,// 最大输入长度
        "regExp1" : "[\\S\\s]",// 输入过程限制的正则
        "regExp2": "[0-9]{6,12}",
        "displayMode" : 0,// 显示形式,0:星号;1:明文,默认值0
        "callBack":this.cb1,//成功回调
        "errorCallBack":this.cb2,//失败回调3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001
        "rsaPublicKey" : "3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001"// rsa公钥
      })
      console.log(this.passGuard)
    },
    mounted () {
      this.$nextTick(() => {
        this.kb.generate()
        this.passGuard.generate("kb1",this.kb,1)
      })
    },

    beforeDestroy () {
    },

    computed: {
    },
    methods: {
      cb1 () {
        console.log('cb1')
      },
      cb2 () {
        console.log('cb2')
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";

  $color01: #604d06;
  $color02: #ff6a59;
  .center-page{
    height: 100%;
  }
</style>
