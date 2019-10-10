<template>
  <transition name="fade">
    <div class="wrapper" v-if="visible">
      <img v-if="type === 'warn'" class="icon" src="./img/icon_tips@2x.png">
      <img v-if="type === 'success'" class="icon" src="./img/icon_success@2x.png">
      <p class="msg">{{msg}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "toast",
    data () {
      return {
        visible: false,
        type: '',
        msg: '',
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper{
    position: fixed;
    padding: 42px 60px;
    color: #ffffff;
    background-color: rgba(0,0,0,.75);
    border-radius: 8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 9999;
    .icon{
      width: 50px;
      margin-bottom: 10px;
    }
    .msg{
      font-size: 28px;/*px*/

      min-width: 220px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
