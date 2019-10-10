<template>
  <transition name="slide">
    <div class="keyboard" v-show="visible">
      <ul class="num-list">
        <li v-for="(num, index) in numList">
          <div @touchstart="touchStart(index)" @touchend="touchEnd(index)" :class="{light: currentIndex === index && highlight}">{{num}}</div>
        </li>
      </ul>
      <div class="go-back" @click="rollBack">
        回退
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "keyboard",
    data () {
      return {
        numList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        highlight: false,
        currentIndex: '',
        secret: ''
      }
    },
    props: [
      'visible',
      'paying'
    ],
    methods: {
      touchStart (index) {
        if (this.paying) {
          return
        }
        if (this.secret.length >= 6) {
          this.secret = ''
        }
        this.currentIndex = index
        this.highlight = true
      },

      touchEnd (index) {
        if (this.paying) {
          return
        }
        if (this.secret.length >= 6) {
          return false
        }
        this.highlight = false
        this.secret +=  this.numList[this.currentIndex].toString()
        this.$emit('secretCompleted', this.secret)
      },

      rollBack () {
        if (this.paying) {
          return
        }
        let secret = this.secret
        secret = secret.substr(0,secret.length - 1)
        this.secret = secret
        this.$emit('secretCompleted', this.secret)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .keyboard{
      position: fixed;
      z-index: 9999;
      width: 100%;
      bottom: 0;
      background-color: #d2d5da;
      .num-list{
        padding: 14px 7px 0 7px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        li{
          width: 33.33%;
          margin-bottom: 14px;
          div{
            height: 88px;
            line-height: 88px;
            text-align: center;
            background-color: #ffffff;
            border-radius: 8px;
            margin: 0 7px;
          }
          .light{
            background-color: rgba(0,0,0,.1);
          }
        }

      }
      .go-back{
        position: absolute;
        width: 33.33%;
        height: 88px;
        bottom: 14px;
        right: 0;
        text-align: center;
        line-height: 88px;
      }
    }
    .slide-enter-active, .slide-leave-active {
      transition: transform .3s ease;
      transform: translateY(0);
    }
    .slide-enter, .slide-leave-active {
      transform: translateY(100%);
    }
</style>
