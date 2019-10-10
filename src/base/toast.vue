<template>
  <transition name="fade">
    <div v-if="visible && !errorTxt" class="toast">
      <img v-if="options.type" :src="icon">
      <p>{{options.txt}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "toast",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      options: {
        type: Object,
        default: {
          type: '',
          txt: '提示信息'
        }
      }
    },
    data () {
      return {
        errorTxt: false,
        emitVisible: false,
        icon: ''
      }
    },

    watch: {
      visible: function (val) {
        if (val) {
          setTimeout(() => {
            this.hide()
          },2000)
        }
      },
      options: {
        handler: function (val) {
          this.iconType(val.type)
        },
        deep: true
      }
    },

    methods: {
      hide () {
        this.$emit('hideToast', this.emitVisible)
      },
      iconType (v) {
        switch (v) {
          case '':
            break
          case 'error':
            this.icon = require('../assets/img/toast/icon_tips@2x.png')
                break
          case 'warn':
            this.icon = require('../assets/img/toast/icon_tips@2x.png')
                break
          case 'success':
            this.icon = require('../assets/img/toast/icon_success@2x.png')
                break
          default:
            this.errorTxt = true
            throw 'Type name does not meet the requirements'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .toast{
    position: fixed;
    padding: 48px 60px;
    color: #ffffff;
    background-color: #444444;
    border-radius: 8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -125%);
    font-size: 28px;/*px*/
    text-align: center;
    img{
      position: relative;
      top: -14px;
      width: 50px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
