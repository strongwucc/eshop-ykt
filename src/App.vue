<template>
  <div id="app">
    <router-view/>
    <p class="support">易通金服提供支持</p>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'App',
    data () {
      return {

      }
    },

    computed: {
      ...mapState({
        startX: state => state.common.common_data.startX,
        startY: state => state.common.common_data.startY,
      })
    },

    watch: {
      $route (to, from) {
        if (to.meta.fullScreen) {
          document.body.addEventListener('touchmove', function (e) {
            // e.preventDefault()
          }, this.$passiveSupported ? { passive: true } : false)
        } else {
          document.body.removeEventListener('touchmove', function (e) {
            // e.preventDefault()
          })
        }

        let refreshRouters = ['center','my_scores','my_balance','member_recharge','my_data','my_coupons','quick_meal_center']

        if (refreshRouters.indexOf(to.name) >= 0) {
          this.refreshUserInfo()
        }
      }
    },
    methods: {
      ...mapMutations([
        'start_pos',
        'set_user_info'
      ]),

      touchStart (e) {
        try {
          let touch = e.touches[0]
          let data = {}
          data.x = touch.pageX
          data.y = touch.pageY
          this.start_pos(data)
        } catch (e) {
          alert(e)
        }
      },
      refreshUserInfo () {
        this.$http.post(this.API.user.member_center,{}).then( result => {
          if(result.return_code == '0000'){
            this.set_user_info(result.data.userinfo)
          }
        });
      }
    },
    created () {

    },
    beforeMount () {
      document.body.addEventListener('touchstart', this.touchStart, this.$passiveSupported ? { passive: true } : false)
    },

    mounted() {
      const appDom = document.getElementById('app')

      appDom.style.height = window.innerHeight + 'px'
      window.onresize = function () {

        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);//ios终端
        if (isiOS) {
          appDom.style.height = window.innerHeight + 'px'
          // if (appDom.children[0].offsetHeight === initWinHeight) {
          //   appDom.children[0].style.height = window.innerHeight + 'px'
          // }
        }
      }

    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  /*text-align: center;*/
  color: #333333;
  font-size: 30px;/*px*/
  background-color: rgb(242,242,245);
}
.support{
  position: fixed;
  bottom: 0;
  line-height: 80px;
  width: 100%;
  text-align: center;
  color: #c1c1c1;
  font-size: 26px;/*px*/
}
</style>
