<template>
  <div class="my-order-page">
    <header>
      <ul class="navigation" @click="switchNav($event)">
        <li data-index="0" :class="{activity: currentIndex === '0'}">堂食</li>
        <li data-index="1" :class="{activity: currentIndex === '1'}">外卖</li>
        <li data-index="2" :class="{activity: currentIndex === '2'}">排队</li>
      </ul>
    </header>
    <div class="router-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my_order",
    data () {
      return {
        currentIndex: '0',
        path: ['dine', 'takeaway', 'queue'],
      }
    },
    created () {
      const childrenPath = this.$route.name
      this.currentIndex = this.path.indexOf(childrenPath) + ''
    },
    mounted () {
      setTimeout(() => {
        this.setStyle()
      }, 30)
    },

    methods: {
      switchNav (e) {
        const index = e.target.getAttribute('data-index')
        if (index !== null) {
          this.currentIndex = index
          this.$router.push('/my_order/' + this.path[parseInt(this.currentIndex)])
        } else {
          return
        }
      },

      setStyle () {
        // document.querySelector('.router-wrapper').style.height = window.innerHeight - document.querySelector('.navigation').offsetHeight + 'px'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  .my-order-page{
    position: relative;
    height: 100%;
    background-color: rgb(242,242,245);
    z-index: 9;
    header{
      .navigation{
        padding: 0 30px;
        display: flex;
        justify-content: space-around;
        height: 100px;
        background-color: #ffffff;
        font-size: 28px;/*px*/
        color: #999999;
        box-shadow: 0 6px 10px 0 rgba(204,204,204,.2);
        li{
          position: relative;
          width: 100px;
          text-align: center;
          height: 100%;
          line-height: 100px;

        }
        .activity{
          font-size: 36px;/*px*/
          color: #333333;
          font-weight: 600;
          &:after{
            position: absolute;
            content: '';
            width: 20px;
            height: 20px;
            background-color: #ffffff;
            box-shadow: 0 6px 10px 0 rgba(204,204,204,.2);
            bottom: -10px;
            left: 50%;
            margin-left: -10px;
            transform: rotateZ(45deg);
          }
        }
      }
    }
  }
</style>
