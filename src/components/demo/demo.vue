<template>
  <div class="demo-page">
    <input type="text" readonly="readonly" id="kb1" name="input3" placeholder="请输入密码" class="default NoneInput90" 	maxlength="50" tabindex="3"/>
    <button @click="test">提交</button>
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

    },
    mounted () {
      // window.passGuard.ib = "Wyc2MycsICcxMTEnLCAnNTYnLCAnMzcnLCAnNTInLCAnNDMnLCAnNjEnLCAnODUnLCAnNDAnLCAnMTE1JywgJzUzJywgJzQyJywgJzEyMScsICcxMjAnLCAnOTcnLCAnODcnLCAnNzcnLCAnMzknLCAnNjQnLCAnODYnLCAnNDEnLCAnOTgnLCAnMTEwJywgJzEwMScsICc0NScsICc2NicsICc5OScsICc3OScsICcxMDcnLCAnNzAnLCAnMTEyJywgJzkxJywgJzU1JywgJzQ5JywgJzEwMicsICc3MycsICcxMTMnLCAnNjAnLCAnNDQnLCAnNTEnLCAnMTE2JywgJzMzJywgJzkyJywgJzEyNicsICc3NCcsICc5MycsICcxMTQnLCAnNzYnLCAnMTA4JywgJzEwMycsICc1NycsICcxMDknLCAnODAnLCAnMTI1JywgJzc1JywgJzEwNScsICc4OScsICczOCcsICc2NycsICc4NCcsICc1OCcsICczNicsICcxMDYnLCAnMzQnLCAnMTIyJywgJzY1JywgJzM1JywgJzgyJywgJzQ4JywgJzQ3JywgJzYyJywgJzcxJywgJzEyNCcsICcxMTknLCAnMTE3JywgJzEwNCcsICc3MicsICc5NicsICc1NCcsICc5NCcsICc4OCcsICcxMjMnLCAnNDYnLCAnMTE4JywgJzkwJywgJzc4JywgJzk1JywgJzU5JywgJzUwJywgJzEwMCcsICc4MycsICc2OScsICc4MScsICc2OCdd"
      window.kb = new keyBoard({
        "chaosMode" : 1,// 混乱模式,0:无混乱;1:打开时乱一次;2:每输入一个字符乱一次,默认值0
        "pressStatus" :1,// 按键状态,0:按下、抬起按键无变化;1:按下后有放大镜效果;2:按下、抬起按键的颜色变化,默认值0
        "kbType" : 0,// 键盘类型,0:全键盘;1:纯数字键盘,默认值0
        "svg":"static/svg"//svg图片的地址
      })
      window.kb.generate()
      window.passGuard1 = new passGuard({
        "mappurl" : "http://ceshi4.sdykt.com.cn:1280/demo/send_mapping",
        "maxLength" : 6,// 最大输入长度
        "regExp1" : "[\\S\\s]",// 输入过程限制的正则
        "regExp2": "[0-9]{6,12}",
        "displayMode" : 0,// 显示形式,0:星号;1:明文,默认值0
        "callBack":this.cb1,//成功回调
        "errorCallBack":this.cb2,//失败回调3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001
        // "rsaPublicKey" : "3081890281810092d9d8d04fb5f8ef9b8374f21690fd46fdbf49b40eeccdf416b4e2ac2044b0cfe3bd67eb4416b26fd18c9d3833770a526fd1ab66a83ed969af74238d6c900403fc498154ec74eaf420e7338675cad7f19332b4a56be4ff946b662a3c2d217efbe4dc646fb742b8c62bfe8e25fd5dc59e7540695fa8b9cd5bfd9f92dfad009d230203010001"// rsa公钥
        "rsaPublicKey" : "30818902818100d17951540859261bcbb00fc61a9e2fb8be1f5794dabd87e87bbac84e975ac7f6f77a094c6b642b3a799bdbdf13841a47943cfb0831578b2e4d82f177b9350e211db3dc84111eb4f0b92bc7d1379436a0f631be371682839461a11d6d2e65cb0c45c526d15429b706ff14498e3fd6c4683ca1092054f5ac95f679ba699fd789d50203010001"// rsa公钥
      })
      console.log(window.passGuard1)
      window.passGuard1.generate("kb1",window.kb,1)
      this.$nextTick(() => {

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
      },
      test () {
        console.log(window.passGuard1.getOutput())
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
