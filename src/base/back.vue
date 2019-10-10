<template>
  <div class="features">
    <div class="title" @click="goBack">
      <img class="icon" src="../assets/img/common/icon_arrow_left@2x.png">
    </div>
  </div>
</template>

<script>
  export default {
    name: "back",
    props: {
      url: {
        type: String,
        default: ''
      }
    },
    methods: {
      goBack () {
        if (this.url != '') {
          this.$router.push(this.url)
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .features{
    position: fixed;
    left: 30px;
    bottom: 40px;
    z-index: 99;
    .title{
      position: relative;
      z-index: 9;
      display: flex;
      width: 76px;
      height: 76px;
      background-color: rgba(51,51,51,.9);
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      font-size: 28px;/*px*/
      color: #ffffff;
      .icon{
        width: 40px;
        margin-right: 6px;
      }
    }
  }
</style>
