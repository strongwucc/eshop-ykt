<template>
  <div class="goods-specification" ref="goodsSpecification">
    <div class="close" @touchstart="close">
      <img src="../assets/img/common/pop_off@2x.png">
    </div>
    <div class="goods-info" v-if="dish" ref="goodsInfo">
      <div class="goods-pic">
        <img class="pic" v-if="dish.image_url" :src="dish.image_url">
        <img class="pic" v-else src="../assets/img/common/goods_img_default_100@2x.png">
        <img class="member-tip" v-if="dish.member_price" src="../assets/img/home/member@2x.png">
      </div>
      <div class="r">
        <p class="name">
          {{ dish.name }}
          <span class="unit">/例</span>
        </p>
        <div class="price">
          <span class="finally-price"><span class="money-symbol">￥</span>{{ dish.member_price | formatActualMoney}}</span>
          <span class="original-price" v-if="NP.round(dish.price - dish.member_price) > 0"><span class="money-symbol">￥</span>{{ dish.price | formatMoney | formatActualMoney}}</span>
        </div>
        <div class="have-choose">
          已选：
          <span>
            <template v-for="(propItem, propIndex) in tastesData">
              <template v-for="(tasteItem, index) in propItem.items">
                {{ tasteItem.props_name }}
                <template v-if="index === propItem.items.length - 1">；</template>
              </template>
            </template>
          </span>
          <span>
            <template v-for="(adjunctItem, index) in adjunctsData">
              {{ adjunctItem.name }}x{{ adjunctItem.num }}
              <template v-if="index === adjunctsData.length - 1">；</template>
              <template v-else>，</template>
            </template>
          </span>
        </div>
      </div>
    </div>
    <div  v-if="dish" class="wrapper" ref="wrapper">
      <div class="specification" ref="specification">
        <template v-for="(spec) in dish.specs">
          <div class="category">
            <h4 class="title">{{spec.spec_name}}</h4>
            <ul class="parameter-list">
              <li class="parameter" v-for="(item, index) in spec.items" @click="selectSpec(item)" :class="{selected: item.checked == '1'}">
            <span class="txt">
              {{item.spec_value}}
            </span>
              </li>
            </ul>
          </div>
        </template>
        <template v-for="(props) in dish.props">
          <div class="category">
            <h4 class="title">{{props.name}}</h4>
            <ul class="parameter-list">
              <li class="parameter" v-for="(item, index) in props.values" @click="selectTaste(item)" :class="{selected: tasteSelectedIndex[item.id]}">
            <span class="txt">
              {{item.name}}
            </span>
              </li>
            </ul>
          </div>
        </template>
        <div class="category" v-if="dish.adjuncts.length >0">
          <h4 class="title">配菜</h4>
          <ul class="parameter-list">
            <li class="parameter" v-for="(item, index) in dish.adjuncts" @click="selectAjunct(index)" :class="{selected: adjunctSelectedIndex[index]}">
              <span class="txt">
                {{item.name}}
                <span class="price" v-if="!!item.member_price">￥{{item.member_price}}</span>
              </span>
              <div class="selected-num" v-show="adjunctSelectedIndex[index]">
                {{adjunctSelectedIndex[index]}}
              </div>
            </li>
          </ul>
        </div>
        <div class="filler"></div>
      </div>
    </div>
    <div class="bottom-assembly">
      <div class="num" v-show="adjunctNumShow">
        <span class="title">配菜数量</span>
        <div class="inputNumber">
          <i class="reduce" @click="minusAdjunct">
            <img src="../assets/img/common/popup_btn_minus@2x.png">
          </i>
          {{ adjunctNum }}
          <i class="add" @click="addAdjunct">
            <img src="../assets/img/common/popup_btn_plus@2x.png">
          </i>
        </div>
      </div>
      <button class="add-cart" @click="addToCart">加入购物车</button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: "take_out_goods_specification",
    data () {
      return {
        appending: this.$route.query.appending,
        dish: null,
        adjunctsData: [], // 已选的配菜
        tastesData: [], // 提交的口味数据
        showTastesData: [], // 显示的口味数据
        adjunctsDataIndex: null,
        adjunctNumShow: false, // 配菜数量显示
        adjunctNum: 1, // 配菜数量
        tasteSelectedIndex: [],//高亮已选的口味
        adjunctSelectedIndex: []//高亮已选的配菜
      }
    },
    props: [
      'info'
    ],
    watch: {
      'info': function (value) {
        this.dish = value
        this.adjunctsData = []
        this.tastesData = []
        this.showTastesData = []
        this.adjunctsDataIndex = null
        this.adjunctNumShow = false
        this.adjunctNum = 1
        this.tasteSelectedIndex = []
        this.adjunctSelectedIndex = []
      }
    },
    mounted () {
      this.$nextTick(() => {
        // this.wrapperAttr()
      })

    },
    computed: {
      ...mapState([
        'common'
      ]),
      adjunctTotal : function () {
        let total = 0
        this.adjunctsData.forEach((item, index) => {
          total += item.price * item.num
        })
        return this.NP.round(total,2)
      }
    },
    methods: {
      ...mapMutations([
        'set_user_cart',
        'addCart'
      ]),
      //当规格列表过长时，外层包裹框固定高度，使之可以滚动
      wrapperAttr () {
        if (this.dish) {
          const maxHeight = this.$refs.goodsSpecification.offsetHeight
          const headHeight = this.$refs.goodsInfo.offsetHeight
          const scrollHeight = this.$refs.specification.offsetHeight
          if (scrollHeight > maxHeight - headHeight) {
            this.$refs.wrapper.style.height = maxHeight - headHeight + 'px'
          }
        }
      },

      close () {
        this.$emit('closeSpecs')
      },

      getPropName (props_id) {
        let name = ''
        this.dish.props.forEach((prop,propIndex) => {
          if (prop.props_id == props_id) {
            name = prop.name
          }
        })
        return name
      },

      selectTaste (taste) {
        let existP = false
        let existC = false
        let existPIndex = 0
        let existCIndex = 0
        this.tastesData.forEach((pItem,pTasteIndex) => {
          if (taste.props_id === pItem.props_id) {
            existPIndex = pTasteIndex
            existP = true
            pItem.items.forEach((cItem,cTasteIndex) => {
              if (taste.id === cItem.props_value_id) {
                existC = true
                existCIndex = cTasteIndex
              }
            })
          }
        })

        if (existC === true) {
          this.tasteSelectedIndex[taste.id] = false
          this.tastesData[existPIndex]['items'].splice(existCIndex,1)
          this.showTastesData.splice(existCIndex,1)
        } else if (existP === true) {
          this.tasteSelectedIndex[taste.id] = true
          this.tastesData[existPIndex]['items'].push({props_value_id:taste.id,props_name:taste.name})
          this.showTastesData.push({id:taste.id,name:taste.name})
        } else {
          this.tasteSelectedIndex[taste.id] = true
          let name = this.getPropName(taste.props_id)
          this.tastesData.push({props_id:taste.props_id,name:name,items:[{props_value_id:taste.id,props_name:taste.name}]})
          this.showTastesData.push({id:taste.id,name:taste.name})
        }
      },

      selectAjunct (index) {
        let selectItem = this.dish.adjuncts[index]
        let exist = false
        let existIndex = 0
        this.adjunctsData.forEach((item,adjunctIndex) => {
          if (selectItem.bn === item.bn) {
            exist = true
            existIndex = adjunctIndex
          }
        })

        if (exist === true) {
          this.adjunctsData[existIndex].num += 1
          this.adjunctsDataIndex = existIndex
          this.adjunctNum = this.adjunctsData[existIndex].num
          this.adjunctSelectedIndex[index] += 1
        } else {
          this.adjunctSelectedIndex[index] = 1
          this.adjunctsDataIndex = this.adjunctsData.length
          this.adjunctNum = 1
          this.adjunctsData.push({bn:selectItem.bn,name:selectItem.name,price:selectItem.price,member_price:selectItem.member_price,num:1,index:index})
        }

        this.adjunctNumShow = true;
      },
      selectSpec (spec) {
        if (spec.checked === '1' || spec.product_id === '') {
          return false
        }
        let storeId = this.common.common_data.store_info.store_id
        this.$http.post(this.API.seller.store_goods_detail,{store_id: storeId, product_id: spec.product_id}).then(res => {
          if (res.return_code == '0000') {
            this.dish = Object.assign({}, res.data.detail)
          } else {

          }
        })
      },
      minusAdjunct () {
        let num = this.adjunctsData[this.adjunctsDataIndex].num
        if (num === 1) {
          this.adjunctSelectedIndex[this.adjunctsData[this.adjunctsDataIndex].index] = 0
          this.adjunctsData.splice(this.adjunctsDataIndex,1)
          this.adjunctNumShow = false
          this.adjunctsDataIndex = null
          this.adjunctNum = 1
        } else {
          this.adjunctsData[this.adjunctsDataIndex].num = num - 1
          this.adjunctNum = num - 1
          this.adjunctSelectedIndex[this.adjunctsData[this.adjunctsDataIndex].index]  = num - 1
        }
      },
      addAdjunct () {
        this.adjunctsData[this.adjunctsDataIndex].num += 1
        this.adjunctNum += 1
        this.adjunctSelectedIndex[this.adjunctsData[this.adjunctsDataIndex].index] += 1
      },
      addToCart () {
        let storeId = this.common.common_data.store_info.store_id

        let goods = {}
        goods.product_id = this.dish.product.product_id
        goods.goods_bn = this.dish.bn
        goods.bn = this.dish.product.bn
        goods.name = this.dish.product.name
        goods.image_url = this.dish.image_url
        goods.price = this.dish.price
        goods.member_price = this.dish.member_price
        goods.num = 1
        goods.unit = this.dish.unit
        goods.catId = this.dish.cat_id

        let adjunctData = [];
        this.adjunctsData.forEach(adjunctItem => {
          var adjunct = {goods_bn: adjunctItem.bn, num: adjunctItem.num, price: adjunctItem.price, member_price: adjunctItem.member_price, name: adjunctItem.name}
          adjunctData.push(adjunct)
        })

        goods.adjunct = adjunctData
        goods.taste = this.tastesData

        this.addCart({storeId: storeId, catId: this.dish.cat_id, goods: goods})

        this.$emit('closeSpecs')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/mixin";
  @import "../assets/css/common";
  .goods-specification{
    /*max-height: 1100px;*/
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background-color: #ffffff;
    padding: 0 30px;
    ::-webkit-scrollbar {
      display: none;
    }
    .close{
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 9;
      width: 50px;
      height: 50px;
      img{
        width: 100%;
      }
    }
    .goods-info{
      position: relative;
      padding-top: 45px;
      padding-bottom: 15px;
      display: flex;
      .goods-pic{
        position: relative;
        flex-shrink: 0;
        width: 170px;
        height: 170px;
        border-radius: 8px;
        overflow: hidden;
        .pic{
          width: 100%;
          height: 100%;
        }
        .member-tip{
          position: absolute;
          width: 50%;
          height: 50%;
          top: 0;
          left: 0;
          z-index: 2;
        }
      }
      .r{
        margin-left: 20px;
        .name{
          font-size: 38px;/*px*/
          font-weight: 600;
          padding-top: 10px;
          .unit{
            font-size: 24px;/*px*/
            font-weight: normal;
            color: #999999;
          }
        }
        .price{
          margin-top: 20px;
          .finally-price{
            font-size: 40px;/*px*/
            color: #ff2e2e;
            font-weight: 600;
          }

          .original-price{
            font-size: 24px;/*px*/
            color: #999999;
            text-decoration: line-through;
          }
          .other-price{
            margin-left: 30px;
            font-size: 24px;/*px*/
            .total{
              color: #ff2e2e;
              margin-left: -15px;
            }
          }
          .money-symbol{
            font-size: 24px;/*px*/
            transform: scale(0.833);
          }
        }
        .have-choose{
          margin-top: 30px;
          line-height: 1.5;
          font-size: 24px;/*px*/
        }
      }
      &:after{
        @include border-1px(#e5e5e5, bottom);
      }
    }
    .wrapper{
      overflow-y: scroll;
      -webkit-overflow-scrolling : touch;
      height: 800px;
      .specification{
        .title{
          padding: 28px 0;
          font-size: 28px;/*px*/
        }
        .parameter-list{
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .parameter{
            position: relative;
            display: flex;
            justify-content: center;
            min-width: 160px;
            height: 60px;
            border: 2px solid #dddddd;
            border-radius: 30px;
            margin-bottom: 30px;
            margin-right: 30px;
            .txt{
              display: block;
              line-height: 60px;
              padding: 0 25px;
              font-size: 26px;
            }
            .selected-num{
              position: absolute;
              width: 38px;
              height: 38px;
              border-radius: 50%;
              line-height: 38px;
              text-align: center;
              font-size: 24px;/*px*/
              transform: scale(0.75);
              top: -14px;
              right: -14px;
              background-color: #ffd726;
            }
          }
        }
        .filler{
          height: 188px;
        }
      }
    }

    .bottom-assembly{
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      .num{
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        padding: 0 30px;
        .title{
          font-size: 28px;/*px*/
        }
        .inputNumber{
          display: flex;
          justify-content: space-between;
          width: 185px;
          height: 50px;
          background-color: #f7f7f7;
          line-height: 50px;
          text-align: center;
          font-size: 28px;/*px*/
          border-radius: 25px;
          i{
            width: 50px;
            height: 50px;
            background-color: #ffffff;
            border-radius: 50%;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .add-cart{
        width: 100%;
        height: 88px;
        background-color: $themeColor;
        font-size: 30px;/*px*/
      }
      &:after{
        @include border-1px(#e5e5e5, top);
      }
    }
  }


  .selected{
    background-color: #fff6ce!important;
    border: 2px solid #ffd726!important;
  }
</style>
