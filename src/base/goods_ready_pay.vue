<template>
    <div class="goods-ready-pay" :style="{visibility: 'visible'}">
      <div class="base-info">
        <div class="l">
          <img v-if="storeLogo" src="../assets/img/pay/order_img_shop@2x.png">
          <img v-else src="../assets/img/pay/order_img_shop@2x.png">
          <span class="title">{{storeName}}</span>
        </div>
        <div class="r" v-if="deskInfo">
          <span class="table-num">
            {{deskInfo.type_name}} {{deskInfo.name}}
          </span>
            <span class="diners">
            <img src="../assets/img/pay/order_step_ic_people@2x.png">
            <span>人数 {{deskInfo.info.people}}</span>
          </span>
        </div>
      </div>

      <div class="goods-category" v-for="cat in cartInfo">
        <div class="head">
          <span class="category-title">{{cat.cat_name}}</span>
          <span class="category-total">共{{cat.num}}份</span>
        </div>
        <ul class="goods-list">
          <li v-for="(item, index) in cat.dishes">
            <img class="goods-pic" v-if="item.goods_image" v-lazy="item.goods_image">
            <img class="goods-pic" v-else src="../assets/img/common/goods_img_default_100@2x.png">
            <div class="goods-info">
              <div class="l">
                <p class="goods-name">{{item.name | longStrFormat(17)}}<span class="unit">/{{item.unit}}</span></p>
                <p class="adjuncts">
                  <template v-if="item.taste.length > 0">
                    <template v-for="(props, index) in item.taste">
                      <span v-for="(taste, i) in props.items">
                        {{taste.props_name}}
                        <template>{{i === item.taste.length - 1 ? '；' : '，'}}</template>
                      </span>
                    </template>
                  </template>
                  <template v-if="item.adjunct.length > 0">
                      <span v-for="(adjunct, j) in item.adjunct">
                        {{adjunct.name + '×' + adjunct.num}}
                        <template>{{j === item.adjunct.length - 1 ? '；' : '，'}}</template>
                      </span>
                  </template>
                </p>
              </div>
              <div class="r">
                <div class="price">
                  <p class="finally-price">￥{{item.member_price | formatActualMoney}}</p>
                  <p class="original-price" v-if="NP.round(parseFloat(item.price) - parseFloat(item.member_price),2) > 0">￥{{item.price | formatActualMoney}}</p>
                </div>
              </div>
              <p class="single-total">×{{item.num}}</p>
            </div>

          </li>
        </ul>
      </div>

      <div class="remark">
        <span>备注：</span>
        {{deskInfo.info.mark_text}}
      </div>

      <div class="sum-up">
        <div class="l">
          商品共{{totalData.num}}份
        </div>
        <div class="r">
          <div class="member-discount">
            <div class="member-label">{{lvName}}</div>
            <div class="discount-amount">
              <span class="txt">已优惠</span>
              <span class="num">￥{{totalData.discount | formatActualMoney}}</span>
            </div>
          </div>
          <div class="lump-sum">
            <span class="txt">小计</span>
            <span class="num">￥{{totalData.total | formatActualMoney}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
      name: "goods_ready_pay",
      data () {
        return {
          cartFoodList: [],//购物车列表
        }
      },
      props:[
        'cartInfo'
      ],
      computed: {
        ...mapState({
          storeName: state => state.common.common_data.store_info.store_name,
          storeLogo: state => state.common.common_data.store_info.store_log,
          deskInfo: state => state.common.common_data.desk_info,
          lvName: state => state.user.user_info.lv_name
        }),

        //商品总金额
        totalData: function () {
          let total = 0
          let discount = 0
          let num = 0
          this.cartInfo.forEach(catItem => {
            catItem.dishes.forEach(dishItem => {
              num += parseInt(dishItem.num)
              total += dishItem.member_subtotal*dishItem.num
              total += dishItem.adjunct_member_subtotal*dishItem.num
              discount += (dishItem.subtotal - dishItem.member_subtotal) * dishItem.num
              discount += (dishItem.adjunct_subtotal - dishItem.adjunct_member_subtotal) * dishItem.num
            })
          })

          return {num: num, total: this.NP.round(total,2), discount: this.NP.round(discount,2)}
        }
      },

      created () {
      },

      mounted () {
      },
      methods: {
        ...mapMutations([
        ])
      }
    }
</script>

<style lang="scss" scoped>
  @import "../assets/css/mixin";
  @import "../assets/css/common";
  .goods-ready-pay{
    .base-info{
      display: flex;
      justify-content: space-between;
      height: 60px;
      background-color: #f7f7f7;
      padding: 0 30px;
      .l{
        display: flex;
        height: 100%;
        align-items: center;
        img{
          width: 44px;
          margin-right: 10px;
        }
      }
      .r{
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 26px;/*px*/
        .table-num{

          margin-right: 20px;
        }
        .diners{
          display: flex;
          align-items: center;
          img{
            width: 34px;
          }
        }
      }
    }
    .goods-category{
      background-color: #ffffff;
      padding: 0 30px;
      .head{
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        font-size: 24px;/*px*/
        .category-total{
          color: #666666;
        }
        &:after{
          @include border-1px(#e5e5e5, bottom);
        }
      }
      .goods-list{
        position: relative;
        padding-top: 40px;
        li{
          padding-bottom: 30px;
          display: flex;

          .goods-pic{
            width: 100px;
            height: 100px;
            flex-shrink: 0;
            margin-right: 20px;
            border-radius: 8px;
          }
          .goods-info{
            position: relative;
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            min-height: 100px;
            padding-bottom: 26px;
            .l{
              width: 340px;
              .goods-name{
                font-weight: 600;
                line-height: 36px;
                margin-top: -4px;
                margin-bottom: 6px;
                .unit{
                  font-size: 24px;
                  color: #999999;
                }
              }
              .adjuncts{
                font-size: 24px;/*px*/
                color: #999999;
                transform: scale(0.917);
                transform-origin: top left;
                line-height: 30px;
              }
            }
            .r{
              .price{
                text-align: right;
                .finally-price{
                  font-size: 30px;
                  font-weight: 600;
                  margin-bottom: 10px;
                }
                .original-price{
                  font-size: 24px;
                  color: #999999;
                  text-decoration: line-through;
                }
              }
            }

            .single-total{
              position: absolute;
              font-size: 24px;/*px*/
              color: #999999;
              bottom: 0;
              left: 0;
            }
          }
        }
        &:after{
          @include border-1px(#e5e5e5, bottom);
        }
      }
    }
    .remark{
      height: 100px;
      padding: 0 30px;
      line-height: 100px;
      background-color: #ffffff;
      font-size: 26px;/*px*/
      span{
        font-weight: 700;
        font-size: 28px;/*px*/
      }
    }
    .sum-up{
      display: flex;
      justify-content: space-between;
      background-color: #ffffff;
      margin-top: 10px;
      padding: 40px 30px;

      .r{
        .member-discount{
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 24px;
          .member-label{
            font-size: 24px;/*px*/
            padding: 6px;
            position: relative;
            color: #666666;
            transform: scale(0.833);
            transform-origin: center;
            margin-right: 10px;
            &:after{
              @include all-border-1px(#666666, 4px);
            }
          }
          .discount-amount{
            .num{
              display: inline-block;
              margin-left: 20px;
              text-align: right;
            }
          }
        }
        .lump-sum{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .num{
            font-size: 32px;
            display: inline-block;
            font-size: 38px;
            font-weight: bold;
            /*color: #ff2e2e;*/
            margin-left: 20px;
            text-align: right;
          }
        }
      }
    }
  }
</style>
