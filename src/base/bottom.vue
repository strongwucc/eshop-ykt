<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="(item, index) in renderData">
        <router-link :to="item.path">
          <img class="icon" :src="item.src">
          <p class="txt">{{item.txt}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "bottom",

    props: {
      renderData: {
        type: Array
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bottom-nav{
    position: absolute;
    width: 100%;
    height: 98px;
    background-color: #ffffff;
    bottom: 0;
    left: 0;
    z-index: 99;
    ul{
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-around;
      align-items: center;
      li{
        min-width: 60px;
        text-align: center;
        .icon{
          width: 50px;
          /*margin-bottom: ;*/
        }
        .txt{
          font-size: 20px;/*px*/
          padding-bottom: 8px;
        }
      }
    }
  }
</style>
