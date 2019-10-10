<template>
  <div class="search-page">
    <div class="_100px" ref="_100px"></div>
    <div class="head">
      <div class="search-wrapper">
        <img src="../../assets/img/home/icon_search@2x.png">
        <input class="search-input" type="text" v-model="searchTxt" placeholder="想买什么搜一下吧" />
        <img v-if="searchTxt" src="../../assets/img/common/icon_off@2x.png" @click="emptySearchTxt">
      </div>
      <div class="cancel" @click="routerBack">取消</div>
    </div>
    <scroll class="scroll-wrapper"
            :data="dishes"
            :bounce="bounce" v-if="dishes.length > 0">
      <div class="wrapper">
        <goods :items="dishes" @showSpecs="showSpecsList"  @moveInCart="listenInCart" @showMoveDot="showMoveDotFun"></goods>
        <div class="fill">
          <div></div>
        </div>
      </div>
    </scroll>
    <div class="no-dish" v-else>
      <img src="../../assets/img/home/img_search@2x.png">
      <p>暂时没有找到商品哦~</p>
      <p>换个关键词试试~</p>
    </div>

    <floating></floating>
    <mt-popup
      v-model="specsVisible"
      position="bottom">
      <goods-specification :info="specificationInfo" @closeSpecs="closeSpecsList"></goods-specification>
    </mt-popup>

    <transition
      appear
      @after-appear = 'afterEnter'
      @before-appear="beforeEnter"
      v-for="(item,index) in showMoveDot"
      :key="index"
    >
      <div class="move-dot" v-if="item">
        <span class="move-liner"></span>
      </div>
    </transition>
  </div>
</template>

<script>
  import Goods from '../../base/take_out_goods'
  import Scroll from '../../base/scroll'
  import Floating from '../../base/quick_meal_floating'
  import GoodsSpecification from '../../base/take_out_goods_specification'

  export default {
    name: "take_out_search",
    data () {
      return {
        searchTxt: '',//搜索内容
        dishes: [],
        showLoading: false,
        specificationInfo: [], // 商品规格页信息
        storeId: this.$route.params.storeId, //门店ID
        deskId: this.$route.params.deskId, //桌台ID
        peopleNum: this.$route.params.peopleNum, //就餐人数
        bounce: false, //禁止滚动列表回弹效果
        specsVisible: false, //弹出商品规格菜单
        showMoveDot: [], // 控制下落的小圆点显示隐藏
        receiveInCart: false, // 购物车组件下落的圆点是否到达目标位置
        windowHeight: 0,
        standardLength: 0,//标准长度(注意：是dpr为2时的长度)
        timer: null
      }
    },

    components: {
      Scroll,
      Goods,
      Floating,
      GoodsSpecification
    },

    watch: {
      searchTxt: function (val) {
        if (val) {
          let that = this
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            that.searchDishes()
          }, 500)
        } else {
          clearTimeout(this.timer)
          this.dishes = []
        }
      }
    },

    mounted () {
      this.getStyle()
      this.setStyle()
      // this.getStoreTastes()
      // this.getStoreAdjuncts()
      this.autoFocus()
    },
    methods: {
      routerBack () {
        window.history.back(-1)
      },
      autoFocus () {
        setTimeout(() => {
          document.querySelector('.search-input').focus()
        }, 100)
      },
      showSpecsList (goodsItem) {
        this.$http.post(this.API.seller.store_goods_detail,{store_id: this.storeId, product_id: goodsItem.product.product_id}).then(res => {
          if (res.return_code == '0000') {
            this.specsVisible = true
            this.specificationInfo = res.data.detail
          } else {

          }
        })
      },

      setStyle () {
        if (document.querySelector('.scroll-wrapper')) {
          document.querySelector('.scroll-wrapper').style.height = window.innerHeight - document.querySelector('.head').offsetHeight + 'px'
        }
      },
      getStyle () {
        this.windowHeight = window.innerHeight
        this.standardLength = this.$refs._100px.offsetWidth
      },

      //获取商品
      searchDishes () {
        // 获取商铺食品列表
        this.showLoading = true

        this.$http.post(this.API.seller.store_search,{store_id: this.storeId, name: this.searchTxt}).then(res => {
          if (res.return_code === '0000') {

            this.dishes = res.data.list
            this.showLoading = false
          } else {
            this.$myToast(res.return_msg)
            this.showLoading = false
            return
          }
        });
      },

      // 显示下落圆球
      showMoveDotFun (showMoveDot, elLeft, elBottom) {
        this.showMoveDot = [...this.showMoveDot, ...showMoveDot]
        this.elLeft = elLeft
        this.elBottom = elBottom
      },
      beforeEnter (el) {
        el.style.transform = `translate3d(0,${this.elBottom - this.windowHeight}px,0)`
        el.children[0].style.transform = `translate3d(${this.elLeft - this.standardLength * 0.4}px,0,0)`
        el.children[0].style.opacity = 0
      },
      afterEnter (el) {
        el.style.transform = `translate3d(0,0,0)`
        el.children[0].style.transform = `translate3d(0,0,0)`
        el.style.transition = 'transform .5s cubic-bezier(0.3, -0.1, 0.7, -0.15)'
        el.children[0].style.transition = 'transform .5s linear'
        this.showMoveDot = this.showMoveDot.map(item => false)
        el.children[0].style.opacity = 1
        // el.children[0].addEventListener('transitionend', () => {
        //   this.listenInCart()
        // })
        // el.children[0].addEventListener('webkitAnimationEnd', () => {
        //   this.listenInCart()
        // })
      },
      // 监听圆点是否进入购物车
      listenInCart () {
        if (!this.receiveInCart) {
          this.receiveInCart = true
          // this.$refs.cartContainer.addEventListener('animationend', () => {
          //   this.receiveInCart = false
          // })
          // this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
          //   this.receiveInCart = false
          // })
        }
      },
      //关闭商品规格
      closeSpecsList () {
        this.specsVisible = false
      },
      emptySearchTxt () {
        this.searchTxt = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-page{
    position: relative;
    height: 100%;
    background-color: rgb(242,242,245);
    z-index: 9;
    .head{
      position: relative;
      z-index: 9;
      display: flex;
      align-items: center;
      padding: 25px 30px;
      background-color: #ffffff;
      .search-wrapper{
        flex-grow: 1;
        display: flex;
        align-items: center;
        height: 70px;
        background-color: #eeeeee;
        border-radius: 8px;
        img{
          width: 34px;
          margin: 0 14px;
        }
        input{
          flex-grow: 1;
          background-color: #eeeeee;
        }
        input::-webkit-input-placeholder{
          color:#bbbbbb;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
          color:#bbbbbb;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#bbbbbb;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
          color:#bbbbbb;
        }
      }
      .cancel{
        padding-left: 30px;
        height: 70px;
        line-height: 70px;
      }
    }
    .scroll-wrapper{
      .wrapper{
        padding: 0 30px;
        background-color: #ffffff;
        .fill{
          position: relative;
          height: 158px;
          div{
            position: absolute;
            top: 0;
            left: -50px;
            height: 100%;
            background-color: rgb(242,242,245);
          }
        }
      }

    }
    .no-dish {
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
    .mint-popup{
      width: 100%;
    }
    .move-dot{
      position: fixed;
      z-index: 98;
      left: 300px;
      bottom: 67px;
      .move-liner{
        display: block;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: #ff2e2e;
      }
    }

  }
</style>
