<template>
    <div class="home-page" ref="homePage" :style="{visibility: !showLoading ? 'visible' : 'hidden'}">
      <div class="_100px" ref="_100px"></div>
      <div class="fixed-wrapper">
        <!--banner开始-->
        <div class="banner" ref="banner">
          <img class="bg-image" v-if="storeInf" v-lazy="storeInf.bg_image">
          <img class="bg-image" v-else src="../../assets/img/people_num/img1@2x.png">
          <img class="logo" ref="logo" v-if="storeInf" v-lazy="storeInf.store_log">
          <img class="logo" ref="logo" v-else src="../../assets/img/common/login_logo_default@2x.png">
          <div class="search-icon" ref="searchIcon">
            <img class="block-icon" v-show="blockSearhIocn" src="../../assets/img/home/icon_search@2x.png">
            <div class="scroll-show" v-show="graySearhIocn" @tap="goSearch" @click="goSearch">
              <img src="../../assets/img/home/icon_search_gray@2x.png">
              <span :style="{visibility: graySearhIocn ? 'visible' : 'hidden'}">请输入商品名称搜索</span>
            </div>
          </div>
        </div>
        <!--banner结束-->
        <!--store infomation开始-->
        <div class="store-info" ref="storeInfo" id="store_info">
          <h3 class="store-name" v-if="storeInf">
            {{storeInf.store_name}}
            <span class="in-operation" v-if="operation">营业中</span>
            <span class="resting" v-if="!operation">暂停营业</span>
          </h3>
          <div class="info01">
            <p class="business-hours" v-if="storeInf">
              营业时间：{{storeInf.open_time}}
            </p>
            <p class="introduction-btn">
              商铺信息 >
              <i class="fa fa-angle-right"></i>
            </p>
          </div>
        </div>
        <!--store infomation结束-->
      </div>

      <div class="scroll-wrapper" ref="scrollWrapper">
        <div class="wrapper" ref="_wrapper">
          <div class="search-btn" v-show="showSimulationBtn" @tap="goSearch" @click="goSearch"></div>
          <div class="store-info-btn" v-show="showSimulationBtn" @touchstart="showStoreInfo = true"></div>
          <div class="search-faker" v-show="!showSimulationBtn" @tap="goSearch" @click="goSearch"></div>
          <p class="table-num">
            <!--<span>请扫描桌角二维码点餐</span>-->
          </p>
          <div class="goods-overview" ref="overview">
            <div class="side scroll-box" ref="sideScrollBox">
              <ul class="goods-type-list">
               <li v-for="(item,index) in dishes" :key="index" class="type-item" :class="{activity_menu: index === catIndex}" @click="chooseMenu(index)" @tap="chooseMenu(index)">
                 <img class="icon" v-if="index === 0" src="../../assets/img/home/icon_tuijian@2x.png">
                 <span class="txt">
                   {{item.cat_name}}
                 </span>
                 <span class="category-num" v-if="cartInfo.catList[item.cat_id] > 0">{{cartInfo.catList[item.cat_id]}}</span>
               </li>

              </ul>
            </div>
            <div class="main scroll-box" ref="mainScrollBox">
              <ul class="outside-list">
                <li class="outside-item" v-for="items in dishes">
                  <h4 class="type-name">
                    {{items.cat_name}}
                  </h4>
                  <goods
                    :items="items.goods"
                    @showSpecs="showSpecsList"
                    @moveInCart="listenInCart"
                    @showMoveDot="showMoveDotFun"
                    @showGoodsDetail="showGoodsDetail">
                  </goods>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <floating :appending="appending" @showCart="showCartInfo" ref="floating"></floating>
      <mt-popup
        v-model="specsVisible"
        position="bottom">
        <goods-specification :info="specificationInfo" @closeSpecs="closeSpecsList"></goods-specification>
      </mt-popup>
      <mt-popup
        v-model="goodsDetailVisible"
        class="goods-detail-wrapper"
        position="center"
        popup-transition="popup-fade">
        <div class="goods-detail">
          <img class="goods-pic" v-lazy="goodsPic"/>
        </div>
      </mt-popup>
      <mt-popup
        v-model="cartInfoVisible"
        @input="closeCartInfo"
        position="bottom">
        <cart-specification @closeCart="closeCartInfo"></cart-specification>
      </mt-popup>
      <store-info :store-info="storeInf" :class="{show_info: showStoreInfo}" @close="showStoreInfo = false"></store-info>
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
  import BScroll from 'better-scroll'
  import Goods from '../../base/take_out_goods'
  import Floating from '../../base/quick_meal_floating'
  import StoreInfo from '../store/store_info'
  import GoodsSpecification from '../../base/take_out_goods_specification'
  import CartSpecification from '../../base/quick_meal_cart_info'
  import {mapState, mapMutations} from 'vuex'
  const dpr = document.querySelector('html').getAttribute('data-dpr')

  export default {
    name: "quick_meal",
    data () {
      return {
        appending: false,
        windowHeight: 0,
        standardLength: 0,//标准长度(注意：是dpr为2时的长度)
        showSimulationBtn: true, //显示模拟按钮
        showStoreInfo: false, //显示商户具体信息
        showLoading: true, // 显示加载动画
        storeId: this.$route.params.storeId, //门店ID
        directlyAdd: 0, //是否直接加入购物车
        operation: true,//是否营业
        blockSearhIocn: true,
        graySearhIocn: false,
        dishes: [],//商品列表
        bodyScroll: true,
        sideScroll: false,
        mainScroll: false,
        mainReachTop: true,//判断商品列表是否滚动到顶部
        sideReachTop: true,//判断商品类型名称列表是否滚动到顶部
        jsScroll: false,//判断是否是通过js调用的滚动
        featuresViewVisible: false,//显示功能列表
        goodsTitleListTop: [],//商品标题列表的高度集合
        goodsListTop: [], // 商品列表中商品类型的距离顶部的高度的集合
        mainLengthDifference: 0, //商品列表的高度与包裹该列表的滚动框高度之差
        catIndex: 0, // 已选菜单索引值，默认为0
        catIndexChange: true, // 解决选中index时，scroll监听事件重复判断设置index的bug
        showMoveDot: [], // 控制下落的小圆点显示隐藏
        categoryNum: [], // 商品类型右上角已加入购物车的数量
        totalPrice: 0, // 总共价格
        cartFoodList: [], // 购物车商品列表
        specsVisible: false, //弹出商品规格菜单
        specificationInfo: [], // 商品规格页信息
        goodsDetailVisible: false, //是否显示商品详细信息
        goodsPic: '',
        storeInf: {
          store_log: '',
          desk: {},
          store_name: '',
          open_time: '',
          minimum: 15
        },
        gettingGoodsDetail: false,
        cartInfoVisible: false
      }
    },
    components: {Goods, Floating, StoreInfo, GoodsSpecification, CartSpecification},
    watch: {
      bodyScroll: function (val) {
        if (val) {
          this._bodyScroll.enable()
          this._bodyScroll.scrollTo(0, 0, 400)
        } else {
          this._bodyScroll.disable()
        }
      },
      sideScroll: function (val) {
        if (val) {
          this._sideScroll.enable()
          if (!!this.touchStartX && this.touchStartX < this.elementsStyle.SIDE_WIDTH && !this.jsScroll) {
            const sideHeight = document.querySelector('.side').offsetHeight
            const sideChildrenHeight = document.querySelector('.side').children[0].offsetHeight
            if (sideHeight < sideChildrenHeight) {
              this._sideScroll.scrollTo(0, -200 * dpr, 1000)
            }
          }
        } else {
          this._sideScroll.disable()
        }
      },

      //监听选中的商品标题变化，滚动商品标题列表，使选中状态的标题一直处于显示屏内
      catIndex: function (val) {
        const sideScrollHeight = this.$refs.sideScrollBox.offsetHeight
        if (this.goodsTitleListTop[val] > sideScrollHeight) {
          this._sideScroll.scrollTo(0, this.goodsTitleListTop[val] - sideScrollHeight, 200)
        } else {
          return
        }
      },

      showLoading: function (val) {
        if (!val) {
          this.$nextTick(() => {
            this.getdishesHeight()
          })
        }
      }

    },
    beforeDestroy () {
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (from.name !== 'people_num') {
          vm.getStoreInfo()
        }
      })
    },
    created () {
      this.elementsStyle = null
      if (this.$store.state.common.common_data.store_info) {
        this.storeInf = Object.assign(this.storeInf, this.$store.state.common.common_data.store_info)
      }
    },
    mounted () {
      this.getCartInfo(this.storeId)
      setTimeout(() => {
        this._getStyle()
        this._setStyle()
        this._bodyScrollEvent()
        this._pageTouchListener()
        this.axiosAll()
      }, 30)
    },
    computed: {
      ...mapState({
        cartInfo: state => state.cart.cart,
      })
    },
    methods: {
      ...mapMutations([
        'set_user_cart',
        'set_common_data_store_info',
        'set_common_data_desk_info',
        'getCartInfo'
      ]),

      //获取门店信息
      getStoreInfo () {
        this.$http.post(this.API.seller.store_info,{store_id:this.storeId,desk_id:this.deskId}).then(res => {
          if (res.return_code === '0000') {
            this.storeInfo = res.data.store
            this.set_user_cart(res.data.user_cart);
            if (res.data.store) {
              this.set_common_data_store_info(res.data.store)
              this.storeInf = res.data.store
            }
            if (res.data.desk) {
              this.set_common_data_desk_info(res.data.desk)
            }

          } else {
            this.$myToast(res.return_msg)
            return
          }
        });
      },
      //跳转至search页面
      goSearch () {
        this.$router.push({name: 'take_out_search', params: {storeId: this.storeId}})
      },

      //获取商品
      initDishes () {
        return this.$http.post(this.API.seller.seller_goods,{store_id: this.storeId})
      },

      //并行加载异步请求
      axiosAll () {
        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        this.$http.all([this.initDishes()]).then(result => {

          //获取商铺食品列表
          if (result[0].return_code === '0000') {
            this.dishes = result[0].data.list
            let catIdList = []
            this.dishes.forEach((item) => {
              catIdList.push(item.cat_id)
            })
            this.catIdList = catIdList
          } else {
            this.$myToast(result[0].return_msg)
            return
          }
          this.showLoading = false
          this.$myLoading.close()

        })

      },

      changeCategroyNum (numArr) {
          this.categoryNum = numArr
      },

      //功能菜单显示
      featuresViewtoggle () {
        this.featuresViewVisible = !this.featuresViewVisible
      },

      //显示商品规格菜单
      showSpecsList (goodsItem) {
        if (this.gettingGoodsDetail) {
          return false
        }

        this.gettingGoodsDetail = true

        this.$http.post(this.API.seller.store_goods_detail,{store_id: this.storeId, product_id: goodsItem.product.product_id}).then(res => {
          this.gettingGoodsDetail = false
          if (res.return_code == '0000') {
            this.specsVisible = true
            this.specificationInfo = res.data.detail
          } else {

          }
        })
      },

      // 显示购物车信息
      showCartInfo () {
        console.log(this.cartInfoVisible)
        if (this.cartInfoVisible === true) {
          this.closeCartInfo(false)
          return false
        }
        this.cartInfoVisible = true
        this.$refs.floating.$refs.floatingBox.style.zIndex = 9999
      },

      //关闭商品规格
      closeSpecsList () {
        this.specsVisible = false
      },

      //关闭购物车
      closeCartInfo (isClose) {
        if (isClose === false) {
          this.cartInfoVisible = false
          this.$refs.floating.$refs.floatingBox.style.zIndex = 99
        }
      },

      //显示商品详细信息
      showGoodsDetail (goodsPic) {
        this.goodsDetailVisible = true
        this.goodsPic = goodsPic
      },

      // 获取商品列表的高度，存入goodsListTop
      getdishesHeight () {
        const goodsListContainer = this.$refs.mainScrollBox
        const goodsTitleListContainer = this.$refs.sideScrollBox
        const goodsListArr = Array.from(goodsListContainer.children[0].children)
        const goodsTitleListArr = Array.from(goodsTitleListContainer.children[0].children)
        this.mainLengthDifference = goodsListContainer.children[0].offsetHeight - goodsListContainer.offsetHeight
        goodsListArr.forEach((item, index) => {
          this.goodsListTop[index] = item.offsetTop
        })

        goodsTitleListArr.forEach((item, index, array) => {
          if (index !== array.length - 1) {
            this.goodsTitleListTop[index] = array[index + 1].offsetTop
          } else {
            this.goodsTitleListTop[index] = goodsTitleListContainer.children[0].offsetHeight
          }
        })
        this._sideScrollEvent()
        this._mainScrollEvent()
      },

      // 点击左侧食品列表标题，相应列表移动到最顶层
      chooseMenu (index) {
        this.catIndex = index
        // catIndexChange解决运动时listenScroll依然监听的bug
        this.catIndexChange = false
        this.jsScroll = true
        // if (!this.mainScroll) {
          this._bodyScroll.scrollTo(0, -this.elementsStyle.SCROLL_HEIGHT, 400)
        // } else {

          this._mainScroll.scrollTo(0, -this.goodsListTop[this.catIndex], 400)

        // }

        // this._mainScroll.on('scrollEnd', () => {
        //
        //   this.catIndexChange = true
        // })
      },
      // 显示下落圆球
      showMoveDotFun (showMoveDot, elLeft, elBottom) {
        this.showMoveDot = [...this.showMoveDot, ...showMoveDot]
        this.elLeft = elLeft
        this.elBottom = elBottom
      },
      beforeEnter (el) {
        el.style.transform = `translate3d(0,${this.elBottom - this.windowHeight + this.standardLength * 0.4}px,0)`
        el.children[0].style.transform = `translate3d(${this.elLeft - this.standardLength * 3}px,0,0)`
        el.children[0].style.opacity = 0
      },
      afterEnter (el) {
        el.style.transform = `translate3d(0,0,0)`
        el.children[0].style.transform = `translate3d(0,0,0)`
        el.style.transition = 'transform .5s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
        el.children[0].style.transition = 'transform .5s linear'
        this.showMoveDot = this.showMoveDot.map(item => false)
        el.children[0].style.opacity = 1
        el.children[0].addEventListener('transitionend', () => {
          this.listenInCart()
        }, this.$passiveSupported ? { passive: true } : false)
        el.children[0].addEventListener('webkitAnimationEnd', () => {
          this.listenInCart()
        }, this.$passiveSupported ? { passive: true } : false)
      },
      // 监听圆点是否进入购物车
      listenInCart () {
        if (!this.receiveInCart) {
          this.receiveInCart = true
        }
      },
      _getStyle () {

        // 兼容IOS版微信底部有白条影响window.innerHeight的值
        const appDom = document.getElementById('app')
        appDom.style.height = window.innerHeight + 'px'

        const banner = this.$refs.banner
        const storeInfo = this.$refs.storeInfo
        const searchIcon = document.querySelector('.search-icon')
        const tableNum = document.querySelector('.table-num')
        const side = document.querySelector('.side')
        this.windowHeight = window.innerHeight
        this.standardLength = this.$refs._100px.offsetWidth
        this.elementsStyle = {
          REDUCE_HEIGHT: banner.offsetHeight / 2 + tableNum.offsetHeight,//用于设置overview高度
          SCROLL_HEIGHT: banner.offsetHeight / 2 + storeInfo.offsetHeight,//滚动距离
          SEARCHICON_TRANSLATE_Y: (banner.offsetHeight / 2 - searchIcon.offsetHeight) / 2 + banner.offsetHeight / 2 + searchIcon.offsetHeight / 2,//search-icon上移距离
          SEARCHICON_TRANSLATE_X: (window.innerWidth - searchIcon.offsetWidth * 2 - 220 * dpr) / 2,//search-icon左移距离
          SEARCHICON_INIT_WIDTH: searchIcon.offsetWidth,//search-icon初始宽度
          SEARCH_ADD_WIDTH: 220 * dpr,//search-icon增加宽度
          SEARCHICON_INIT_RADIUS: 15 * dpr,//search-icon初始圆角
          SEARCHICON_ADD_RADIUS: 11 * dpr,//search-icon减掉圆角
          SEARCHICON_GRAY: 115 * dpr,
          SIDE_WIDTH: side.offsetWidth,
          SIDE_HEIGHT: side.offsetHeight,
          SIDE_UL_HEIGHT: side.children[0].offsetHeight
        }
      },

      _setStyle () {
        this.$refs._wrapper.style.paddingTop = this.$refs.banner.offsetHeight + this.$refs.storeInfo.offsetHeight + 'px'
        this.$refs.overview.style.height = window.innerHeight - this.elementsStyle.REDUCE_HEIGHT + 'px'
      },

      _bodyScrollEvent () {
        this._bodyScroll = new BScroll(this.$refs.scrollWrapper, {
          scrollY: true,
          click: false,
          bounce: false,
          tap: true,
          probeType: 3,
          flickLimitDistance: this.standardLength / 2
        })

        let logo = this.$refs.logo
        let searchIcon = this.$refs.searchIcon
        let elHei = this.elementsStyle
        this._bodyScroll.on('scroll', (pos) => {
          let y = -pos.y.toFixed(1)
          let ratio = (elHei.SCROLL_HEIGHT - y) / elHei.SCROLL_HEIGHT
          logo.style.opacity = ratio
          logo.style.transform = `scale(${ratio})`
          if (pos.y < -5) {
            this.blockSearhIocn = false
          } else {
            this.blockSearhIocn = true
          }
          if (pos.y < -elHei.SEARCHICON_GRAY) {
            // this.mainScroll = true
            // this.sideScroll = true
            this.graySearhIocn = true
          } else {
            this.graySearhIocn = false
          }
          searchIcon.style.transform = `translate(-${(1 - ratio) * elHei.SEARCHICON_TRANSLATE_X}px, -${(1 - ratio) * elHei.SEARCHICON_TRANSLATE_Y}px)`
          searchIcon.style.width = (1 - ratio) * elHei.SEARCH_ADD_WIDTH + elHei.SEARCHICON_INIT_WIDTH + 'px'
          searchIcon.style.borderRadius = elHei.SEARCHICON_INIT_RADIUS - (1 - ratio) * elHei.SEARCHICON_ADD_RADIUS + 'px'
        })

        this._bodyScroll.on('scrollEnd', (pos) => {

          if (-pos.y === elHei.SCROLL_HEIGHT) {
            this.bodyScroll = false
            this.showSimulationBtn = false
          } else {
            this.showSimulationBtn = true
          }

          // if (pos.y > -3) {
          //   console.log([pos.y, this.mainReachTop])
          //   // if (this.mainReachTop) {
          //     this.mainScroll = false
          //   // }
          //   if (this.sideReachTop) {
          //     this.sideScroll = false
          //   }
          //
          // }
        })
      },

      _sideScrollEvent () {
        this._sideScroll = new BScroll(this.$refs.sideScrollBox, {
          scrollY: true,
          click: true,
          bounce:false,
          probeType: 3
        })
        !this.sideScroll && this._sideScroll.disable()
        this._sideScroll.on('scrollEnd', (pos) => {
          if (pos.y >= -3) {
            this.sideReachTop = true
          } else {

            this.sideReachTop = false
          }
        })
      },

      _mainScrollEvent () {
        this._mainScroll = new BScroll(this.$refs.mainScrollBox, {
          scrollY: true,
          click: true,
          bounce:false,
          probeType: 3
        })
        // !this.mainScroll && this._mainScroll.disable()
        this._mainScroll.on('scroll', (pos) => {
          if (!this.$refs.sideScrollBox) {
            return
          }
          this.goodsListTop.forEach((item, index) => {
            if (this.catIndexChange && Math.abs(Math.round(pos.y)) >= item) {
              this.catIndex = index
            }
          })
        })
        this._mainScroll.on('scrollEnd', (pos) => {

          if (pos.y >= -3) {
            this.mainReachTop = true
          } else {

            this.mainReachTop = false
          }
          this.catIndexChange = true
        })
      },

      _pageTouchListener () {
        let that = this
        this.$refs.homePage.addEventListener('touchstart', function (e) {
          that.touchStartX = e.touches[0].pageX
          that.touchStartY = e.touches[0].pageY
        }, this.$passiveSupported ? { passive: true } : false)

        this.$refs.homePage.addEventListener('touchend', function (e) {
          const touchEndY = e.changedTouches[0].pageY
          if (!that.bodyScroll && (touchEndY - that.touchStartY > 50 * dpr) && that.mainReachTop) {
            that.bodyScroll = true
          }
        }, this.$passiveSupported ? { passive: true } : false)
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  ::-webkit-scrollbar {
    display: none;
  }
  .home-page{
    position: relative;
    background-color: #ffffff;
    height: 100%;
    overflow: hidden;
    /*overflow: scroll;*/
    /*-webkit-overflow-scrolling : touch;*/
    ._100px{
      width: 100px;
      position: fixed;
      top: 0;
      z-index: -99;
    }

    .fixed-wrapper{
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 9;
      .banner{
        position: relative;
        height: 280px;
        /*background: url("../../assets/img/people_num/img1@2x.png") no-repeat;*/
        /*background-size: 100% auto;*/
        /*background-position: center;*/
        .bg-image {
          width: 100%;
          height: 280px;
        }
        .logo{
          position: absolute;
          bottom: -30px;
          left: 30px;
          width: 150px;
          height: 150px;
          border-radius: 8px;
          box-shadow: 0 5px 18px 0 #1a0a0a0a;
          transform-origin: center 80%;
        }
        .search-icon{
          position: absolute;
          right: 30px;
          bottom: -30px;
          width: 60px;
          height: 60px;
          border-radius: 30px;
          background-color: #ffffff;
          overflow: hidden;
          box-shadow: 0 5px 18px 0 #1a0a0a0a;
          transform-origin: center;
          .block-icon{
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            left: 50%;
            margin-top: -20px;
            margin-left: -20px;
          }
          .scroll-show{
            display: flex;
            overflow-x: visible;
            position: absolute;
            line-height: 40px;
            align-items: center;
            top: 10px;
            left: 50%;
            /*min-width: 250px;*/
            transform: translateX(-50%);
            img{
              vertical-align: middle;
              width: 40px;
              height: 40px;
            }
            span{

              /*visibility: hidden;*/
              font-size: 28px;
              line-height: 42px;
              white-space: nowrap;
              color: #999999;
            }
          }
        }
      }
      .store-info{
        padding: 0 30px;
        .store-name{
          display: flex;
          align-items: center;
          padding-top: 60px;
          font-size: 40px;/*px*/
          font-weight: bold;
          span{
            margin-left: 20px;
            font-size: 22px;/*px*/
            border-radius: 4px;
            padding: 6px 9px;
          }
          .in-operation{
            background-color: #f3ecd4;
            color: #8f740d;
          }
        }
        .info01{
          display: flex;
          justify-content: space-between;
          font-size: 26px;/*px*/
          padding-top: 24px;
          padding-bottom: 12px;
          .business-hours{
            color: #999999;
          }
          .introduction-btn{
            i{
              font-size: 30px;/*px*/
            }
          }
        }
      }
    }
    .scroll-wrapper{
      height: 100%;
      position: relative;
      z-index: 10;
      .wrapper{
        .search-btn{
          position: absolute;
          width: 80px;
          height: 80px;
          right: 20px;
          top: 240px;
        }
        .store-info-btn{
          position: absolute;
          width: 140px;
          height: 50px;
          right: 20px;
          top: 395px;
        }
        .search-faker{
          position: absolute;
          width: 500px;
          height: 80px;
          top: 20.5%;
          left: 50%;
          margin-left: -250px;
        }
        .table-num{
          position: relative;
          padding: 0 30px;
          font-size: 28px;/*px*/
          color: #666666;
          height: 90px;
          line-height: 90px;
          background-color: #ffffff;
          &:after{
            @include border-1px(#e5e5e5, bottom);
          }
        }
        .goods-overview{
          position: relative;
          display: flex;
          background-color: #ffffff;
          .mask{
            position: absolute;
            width: 100%;

            height: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,.2);
          }
          .scroll-box{
            overflow-y: hidden;
            height: 100%;
          }
          .side{
            flex-shrink: 0;
            width: 170px;
            background-color: #f7f7f7;
            .goods-type-list{
              .type-item{
                position: relative;
                width: 100%;
                .txt{
                  display: inline-block;
                  width: 115px;
                  text-align: left;
                  padding: 31px 0;
                  margin-left: 30px;
                  color: #999999;
                  font-size: 26px;/*px*/
                  line-height: 36px;
                }
                .category-num{
                  position: absolute;
                  top: 8px;
                  left: 128px;
                  width: 38px;
                  height: 38px;
                  background-color: #ff2e2e;
                  border-radius: 50%;
                  font-size: 24px;/*px*/
                  color: #ffffff;
                  text-align: center;
                  line-height: 38px;
                  transform: scale(0.75);
                }
              }
              li:first-child{
                .icon{
                  position: absolute;
                  width: 38px;
                  left: 30px;
                  top: 50%;
                  margin-top: -19px;
                }
                .txt{
                  padding-left: 48px;
                }
              }
              li:last-child{
                margin-bottom: 160px;
              }
            }
          }
          .main{
            padding-left: 20px;
            padding-right: 20px;
            flex-grow: 1;
            .outside-list{
              .outside-item{
                .type-name{
                  line-height: 66px;
                  font-size: 26px;/*px*/
                  color: #666666;
                }

                &:last-child{
                  padding-bottom: 120px;
                }
              }
            }
          }
        }
      }
    }
    .floating-box{
      display: flex;
      position: absolute;
      left: 30px;
      bottom: 40px;
      z-index: 99;
      .features{
        position: relative;
        .title{
          position: relative;
          z-index: 9;
          display: flex;
          width: 180px;
          height: 88px;
          background-color: rgba(51,51,51,.9);
          border-radius: 44px;
          justify-content: center;
          align-items: center;
          font-size: 28px;/*px*/
          color: #ffffff;
          .icon{
            width: 40px;
            margin-right: 6px;
          }
        }
        .list{
          position: absolute;
          left: 0;
          bottom: 0;
          padding-bottom: 88px;
          li{
            width: 180px;
            height: 88px;
            border-radius: 44px;
            background-color: rgba(70,70,70,.8);
            font-size: 26px;/*px*/
            color: #ffffff;
            margin-bottom: 10px;
            text-align: center;
            line-height: 88px;
          }
        }
      }
      .shopping-cart{
        display: flex;
        align-items: center;
        width: 250px;
        height: 88px;
        margin-left: 64px;
        border-radius: 44px;
        background-color: rgba(255,215,59,.9);
        .circle{
          position: relative;
          width: 82px;
          height: 82px;
          border-radius: 50%;
          background: url("../../assets/img/home/icon_cart@2x.png") no-repeat;
          background-size: 100% 100%;
          .num {
            position: absolute;
            top: 4px;
            left: 38px;
            width: 38px;
            height: 38px;
            background-color: #ff2e2e;
            border-radius: 50%;
            font-size: 24px;/*px*/
            color: #ffffff;
            text-align: center;
            line-height: 38px;
            transform: scale(0.75);
          }
        }
        .total{
          padding-left: 18px;
          font-size: 24px;/*px*/
          span{
            font-size: 36px;/*px*/
            font-weight: 600;
          }
        }
      }
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
    .mask{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,.6);
      z-index: 99;
    }
    .mint-popup{
      width: 100%;
    }
    .goods-detail-wrapper{
      width: 600px;
      .goods-detail{
        .goods-pic{
          display: block;
          width: 100%;
          height: auto;
          margin: 0 auto;
        }
      }
    }

  }

  /*动态样式*/
  .activity_menu{
    background-color: #ffffff;
    .txt{
      color: #333333!important;
    }
  }
  .show_info{
    transform: translateX(0)!important;
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
