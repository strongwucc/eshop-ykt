<template>
  <div class="use-integral" ref="_setTaste" v-show="currentVisible === true" @hidden="handleVisible">
    <transition name="fade">
      <div v-if="transition" class="mask" @click="transition = false"></div>
    </transition>
    <transition name="slide">
      <div v-if="transition" class="main">
        <i class="close" @click="transition = false">
          <img src="../../assets/img/common/pop_off.png">
        </i>
        <h4 class="title">
          备注
        </h4>
        <div class="in-wrapper">
          <textarea type="text" v-model="newTaste" @blur="autoScroll"></textarea>
        </div>
        <button class="confirm" @click="setTaste">确定</button>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "set_taste",
    data () {
      return {
        newTaste: '',
        currentVisible: false,
        transition: false
      }
    },

    props: {
      value: false
    },

    methods: {
      handleVisible () {
        this.currentVisible = false
      },
      setTaste () {
        this.$emit('setTasteCallback',this.newTaste)
        this.transition = false
      },
      autoScroll () {
        this.$emit('autoScroll')
      }
    },

    watch: {
      value: function (val) {
        this.currentVisible = val
        if (val) {
          setTimeout(() => {
            this.transition = val
          }, 20)
        }
      },

      transition: function (val) {
        if (!val) {
          setTimeout(() => {
            this.currentVisible = val
          }, 300)
        }
      },

      currentVisible: function (val) {
        this.$emit('input', val)
      }
    },

    mounted () {
      if (this.value) {
        this.currentVisible = true
      }
      this.$refs._setTaste.style.height = window.innerHeight + 'px'
      this.newTaste = this.$store.state.common.common_data.desk_info.info.mark_text
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .use-integral{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.6);
    }
    .main{
      position: fixed;
      width: 100%;
      background-color: #ffffff;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      bottom: 0;
      left: 0;
      text-align: center;
      .close{
        position: absolute;
        display: block;
        width: 34px;
        height: 34px;
        top: 15px;
        right: 15px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .title{
        font-size: 34px;/*px*/
        font-weight: 700;
        padding-top: 52px;
      }
      .usable{
        font-size: 32px;/*px*/
        margin-top: 92px;
      }
      .in-wrapper{
        position: relative;
        width: 580px;
        height: 190px;
        margin: 40px auto 50px auto;
        textarea{
          position: relative;
          z-index: 9;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0);
          font-size: 28px;
          border: 0px;
          color: #bbbbbb;
        }
        &:after{
          @include all-border-1px(#e5e5e5, 8px);
        }
      }
      .tip{
        font-size: 26px;/*px*/
        color: #8f740d;
        margin-bottom: 144px;
      }
      .confirm{
        width: 100%;
        background-color: $themeColor;
        font-size: 30px;/*px*/

        height: 88px;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .slide-enter-active, .slide-leave-active {
    transition: transform .3s;
  }
  .slide-enter, .slide-leave-active {
    transform: translateY(100%);
  }
</style>
