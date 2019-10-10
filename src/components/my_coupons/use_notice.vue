<template>
  <div class="use-notice-page">
    <div class="wrapper">
      <div class="notices">
        <span class="NO">1、</span>
        <p>须知内容须知内容须知内容须知内容须知内容须</p>
      </div>
      <div class="notices">
        <span class="NO">2、</span>
        <p>须知内容须知内容须知内容须知内容须知内容须</p>
      </div>
      <div class="notices">
        <span class="NO">3、</span>
        <p>须知内容须知内容须知内容须知内容须知内容须须知内容须知内容须知内容须知内容须知内容须</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "use_notice"
    }
</script>

<style lang="scss" scoped>
  .use-notice-page{
    position: relative;
    background-color: #ffffff;
    z-index: 9;
    height: 100%;
    .wrapper{
      padding: 30px;
      .notices{
        position: relative;
        margin-bottom: 36px;
        .NO{
          position: absolute;
          line-height: 1.3;
          top: 0;
          left: 0;
        }
        p{
          padding-left: 36px;
          line-height: 1.3;
        }
      }
    }
  }
</style>
