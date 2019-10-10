
import {setStore, getStore} from '../../../utils/storge'

export default {
  // 网页初始化时从本地缓存获取购物车数据
  getCartInfo (state, storeId) {
    let cartInfo = getStore('cartInfo' + storeId)
    let catInfo = getStore('catInfo' + storeId)
    if (cartInfo) {
      state.cart.cartList = JSON.parse(cartInfo)
    }
    if (catInfo) {
      state.cart.catList = JSON.parse(catInfo)
    }
  },

  //加入购物车
  addCart (
    state,
    cartData
  ) {

    let storeId = cartData.storeId
    let catId = cartData.catId
    let goods = cartData.goods

    let cartList = (state.cart.cartList || [])
    let catList = (state.cart.catList || {})

    if (catList[catId]) {
      catList[catId] += 1
    } else {
      catList[catId] = 1
    }

    let exist = false

    for (var i=0; i<cartList.length; i++) {
      if (cartList[i].product_id == goods.product_id) {

        // 检查配菜是否一致
        if (JSON.stringify(cartList[i].adjunct) != JSON.stringify(goods.adjunct)) {
          continue
        }

        // 检查属性是否一致
        if (JSON.stringify(cartList[i].taste) != JSON.stringify(goods.taste)) {
          continue
        }

        cartList[i].num += 1
        exist = true
        break
      }
    }

    if (exist === false) {
      cartList.push(goods)
    }

    state.cart.cartList = cartList
    state.cart.catList = catList
    // 存入localStorage
    setStore('cartInfo' + storeId, state.cart.cartList)
    setStore('catInfo' + storeId, state.cart.catList)
  },

  // 移出购物车
  reduceCart (state, data) {
    let cartList = (state.cart.cartList || [])
    let catList = (state.cart.catList || {})

    let storeId = data.storeId
    let itemId = data.itemId

    if (cartList[itemId]) {
      let catId = cartList[itemId].catId
      if (catList[catId]) {
        if (catList[catId] > 1) {
          catList[catId] -= 1
        } else {
          delete catList[catId]
        }
      }

      if (cartList[itemId].num > 1) {
        cartList[itemId].num -= 1
      } else {
        cartList.splice(itemId, 1)
      }
    }

    state.cart.cartList = cartList
    state.cart.catList = Object.assign({}, catList)
    // 存入localStorage
    setStore('cartInfo' + storeId, state.cart.cartList)
    setStore('catInfo' + storeId, state.cart.catList)
  },

  // 清空购物车
  clearCart (state, storeId) {
    state.cart.cartList = []
    state.cart.catList = {}
    setStore('cartInfo' + storeId, [])
    setStore('catInfo' + storeId, {})
  }
}
