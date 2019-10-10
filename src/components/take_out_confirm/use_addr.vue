<template>
  <div class="use-addr" ref="_useAddr" v-show="currentVisible === true" @hidden="handleVisible">
    <transition name="fade">
      <div v-if="transition" class="mask" @click="transition = false"></div>
    </transition>
    <transition name="slide">
      <div v-if="transition" class="main">
        <div class="title">
          <div class="left"></div>
          <div class="content">选择收货地址</div>
          <div class="icon"><img src="../../assets/img/common/pop_off@2x.png"/></div>
        </div>
        <div class="scroll-wrapper">
          <div class="list-wrapper">
            <div class="no-addrs" v-if="addrs.length === 0">
              <img src="../../assets/img/my_coupons/img_youhuiquan@2x.png">
              <p>还没有地址哦~</p>
            </div>
            <ul class="my-addrs-list" v-if="addrs.length > 0">
              <li v-for="(addr, addrIndex) in addrs" :class="{selected: addr.def_addr == '1'}">
                <div class="icon" @click="useAddr(addrIndex)"><img v-if="addr.def_addr == '1'" src="../../assets/img/pay/option_select_yellow.png"/></div>
                <div class="content" @click="useAddr(addrIndex)">
                  <div class="addr">{{addr.area + addr.addr}}</div>
                  <div class="contact">
                    <div class="name">{{addr.name}}</div>
                    <div class="mobile">{{addr.mobile}}</div>
                  </div>
                </div>
                <div class="action"><img src="../../assets/img/common/arrow_right@2x.png"/></div>
              </li>
            </ul>
            <!--<p class="tip" v-if="allLoaded">没有更多地址了~</p>-->
          </div>
        </div>
        <div class="action">
          <div class="icon"><img src="../../assets/img/common/popup_btn_plus@2x.png"/></div>
          <div class="content">新增收货地址</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "use_addr",
    components: {},
    data () {
      return {
        usedAddr: '',
        page: 1,
        loading: false,
        allLoaded: false,
        currentVisible: false,
        transition: false,
        needLoad: false
      }
    },
    props: {
      value: true,
      addrs: {
        type: Array
      }
    },
    methods: {
      handleVisible () {
        this.currentVisible = false
      },
      useAddr (addrIndex) {
        this.transition = false
        this.$emit('useAddrCallback', addrIndex)
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

      },

    },

    mounted () {
      if (this.value) {
        this.currentVisible = true
      }
      this.$refs._useAddr.style.height = window.innerHeight + 'px'
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .use-addr{
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
      position: absolute;
      width: 100%;

      background-color: #ffffff;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      bottom: 0;
      left: 0;
      text-align: center;
      .scroll-wrapper{
        height: 400px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .no-addrs{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          img{
            width: 256px;
            margin-bottom: 75px;
          }
          p{
            text-align: center;
            color: #bbbbbb;
          }

        }
        .my-addrs-list{
          width: 710px;
          margin: 0 auto;
          /*padding-top: 25px;*/
          padding-bottom: 40px;
          li {
            position: relative;
            display: flex;
            padding: 40px 0;
            .icon {
              flex: 0 0 10%;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 40px;
                height: 40px;
              }
            }
            .content {
              flex: 0 0 80%;
              .addr {
                text-align: left;
                line-height: 45px;
                font-size: 32px;
                font-weight: 600;
              }
              .contact {
                font-size: 30px;
                margin-top: 25px;
                display: flex;
                .mobile {
                  margin-left: 30px;
                }
              }
            }
            .action {
              flex: 0 0 10%;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 40px;
                height: 40px;
              }
            }
            &:after {
              @include border-1px(#e5e5e5, bottom)
            }
          }
          .selected{

          }
        }
        .tip{
          margin-top: 40px;
          margin-bottom: 40px;
          font-size: 26px;/*px*/
          color: #999999;
          text-align: center;
        }
      }
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
        position: relative;
        height: 100px;
        line-height: 100px;
        font-size: 34px;/*px*/
        /*font-weight: 600;*/
        /*padding-top: 52px;*/
        display: flex;
        .left {
          flex: 0 0 10%;
        }
        .content {
          flex: 0 0 80%;
        }
        .icon {
          /*flex: 0 0 10%;*/
          img {
            width: 40px;
            height: 40px;
          }
        }
        &:after {
          @include border-1px(#e5e5e5, bottom)
        }
      }
      .action {
        position: relative;
        height: 100px;
        line-height: 100px;
        display: flex;
        justify-content: center;
        .icon {
          margin-right: 15px;
          img {
            width: 32px;
            height: 32px;
          }
        }
        .content {
          font-size: 30px;
          color: #B8A869;
        }
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
