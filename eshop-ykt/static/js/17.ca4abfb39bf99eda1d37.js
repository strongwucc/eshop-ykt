webpackJsonp([17],{TkdU:function(t,e,s){"use strict";var i=s("Dd8w"),o=s.n(i),n=s("NYxO"),a={name:"quick_meal_floating",data:function(){return{featuresViewVisible:!1}},props:{appending:{type:Boolean,default:!1}},computed:o()({},Object(n.c)({cartInfo:function(t){return t.cart.cart},storeInfo:function(t){return t.common.common_data.store_info}}),{totalNum:function(){var t=0;return this.cartInfo.cartList.length>0&&this.cartInfo.cartList.forEach(function(e){t+=parseInt(e.num)}),t},totalPrice:function(){var t=0,e=0;return this.cartInfo.cartList.length>0&&this.cartInfo.cartList.forEach(function(s){t+=s.num*s.member_price,s.adjunct.length>0&&s.adjunct.forEach(function(t){e+=t.num*t.member_price})}),this.NP.round(t+e,2)},minimum:function(){var t=this.$store.state.common.common_data.store_info;return t.minimum?t.minimum:.01}}),created:function(){},methods:{featuresViewtoggle:function(){this.featuresViewVisible=!this.featuresViewVisible},showCart:function(){this.$emit("showCart")},goSettle:function(){if(this.totalNum<=0)return this.$myToast("空空如也"),!1;this.$router.push("/quick_meal_confirm")}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"floatingBox",staticClass:"floating-box"},[i("div",{staticClass:"features"},[i("div",{staticClass:"title",on:{click:t.featuresViewtoggle}},[i("img",{staticClass:"icon",attrs:{src:s("DHIp")}}),t._v("\n      功能\n    ")]),t._v(" "),i("ul",{directives:[{name:"show",rawName:"v-show",value:t.featuresViewVisible,expression:"featuresViewVisible"}],staticClass:"list"},[i("li",{on:{click:function(e){t.$router.push("/quick_meal_center")}}},[t._v("会员中心")]),t._v(" "),i("li",{on:{click:function(e){t.$router.push("/quick_meal_order")}}},[t._v("我的订单")]),t._v(" "),i("li",{on:{click:function(e){t.$router.push("/my_coupons")}}},[t._v("我的优惠券")])])]),t._v(" "),i("div",{staticClass:"shopping-cart"},[i("div",{ref:"cartContainer",staticClass:"circle",on:{click:t.showCart}},[t.totalNum?i("div",{staticClass:"num"},[t._v(t._s(t.totalNum))]):t._e()]),t._v(" "),t.totalNum>0?i("p",{staticClass:"total",on:{click:t.showCart}},[t._v("￥"),i("span",[t._v(t._s(t._f("formatActualMoney")(t.totalPrice)))])]):i("p",{staticClass:"empty",on:{click:t.showCart}},[i("span",[t._v("空空如也")])]),t._v(" "),i("p",{staticClass:"action",on:{click:function(e){return e.stopPropagation(),t.goSettle(e)}}},[t._v("去结算")])])])},staticRenderFns:[]};var c=s("VU/8")(a,r,!1,function(t){s("irHZ")},"data-v-5bb67e76",null);e.a=c.exports},V7Dh:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("Gu7T"),o=s.n(i),n=s("c/Tr"),a=s.n(n),r=s("Dd8w"),c=s.n(r),l=s("woOf"),h=s.n(l),f=s("GQaK"),d=s("8jqG"),u=s("TkdU"),_=s("MYSA"),p=s("ePS5"),m=s("NYxO"),v={name:"quick_meal_cart_info",components:{BuyCart:s("flB3").a},data:function(){return{}},props:[],watch:{},mounted:function(){this.$nextTick(function(){})},computed:c()({},Object(m.c)({cartList:function(t){return t.cart.cart.cartList},storeId:function(t){return t.common.common_data.store_info.store_id}}),{cartNum:function(){var t=0;return this.$store.state.cart.cart.cartList.forEach(function(e,s){t+=e.num}),t}}),methods:c()({},Object(m.b)(["addCart","reduceCart","clearCart"]),{wrapperAttr:function(){if(this.cartItem){var t=this.$refs.cartSpecification.offsetHeight,e=this.$refs.title.offsetHeight;this.$refs.specification.offsetHeight>t-e&&(this.$refs.wrapper.style.height=t-e+"px")}},addToCart:function(){var t=this.common.common_data.store_info.store_id,e={};e.product_id=this.cartItem.product.product_id,e.goods_bn=this.cartItem.bn,e.bn=this.cartItem.product.bn,e.name=this.cartItem.product.name,e.image_url=this.cartItem.image_url,e.price=this.cartItem.price,e.member_price=this.cartItem.member_price,e.num=1,e.unit=this.cartItem.unit,e.catId=this.cartItem.cat_id;var s=[];this.adjunctsData.forEach(function(t){var e={goods_bn:t.bn,num:t.num,price:t.price,member_price:t.member_price};s.push(e)}),e.adjunct=s,e.taste=this.tastesData,this.addCart({storeId:t,catId:this.cartItem.cat_id,goods:e}),this.$emit("closeCart")}})},g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"cartSpecification",staticClass:"cart-specification"},[i("div",{ref:"title",staticClass:"title"},[i("div",{staticClass:"left"},[t._v("购物车（共"+t._s(t.cartNum)+"件）")]),t._v(" "),i("div",{staticClass:"right",on:{click:function(e){e.stopPropagation(),t.clearCart(t.storeId)}}},[i("img",{attrs:{src:s("7SVW")}}),i("span",[t._v("清空购物车")])])]),t._v(" "),i("div",{ref:"wrapper",staticClass:"wrapper"},[i("div",{ref:"specification",staticClass:"specification"},[i("ul",{staticClass:"order-list"},t._l(t.cartList,function(e){return i("li",[i("div",{staticClass:"main"},[i("p",{staticClass:"goods-name"},[t._v(t._s(t._f("longStrFormat")(e.name,11))),i("span",{staticClass:"unit"},[t._v("/"+t._s(e.unit))])]),t._v(" "),i("div",{staticClass:"r"},[i("div",{staticClass:"price"},[i("p",{staticClass:"finally-price"},[t.NP.round(parseFloat(e.price)-parseFloat(e.member_price),2)>0?i("span",{staticClass:"member-tip"},[t._v("会员价")]):t._e(),t._v("￥"+t._s(t._f("formatActualMoney")(e.member_price)))]),t._v(" "),t.NP.round(parseFloat(e.price)-parseFloat(e.member_price),2)>0?i("p",{staticClass:"original-price"},[t._v("￥"+t._s(t._f("formatActualMoney")(t._f("formatMoney")(e.price))))]):t._e()]),t._v(" "),i("buy-cart",{attrs:{foods:e,type:1}})],1)]),t._v(" "),i("div",{staticClass:"minor"},[i("p",{staticClass:"adjuncts"},[e.taste.length>0?[t._l(e.taste,function(s,o){return t._l(s.items,function(s,o){return i("span",[t._v("\n                      "+t._s(s.props_name)+"\n                      "),[t._v(t._s(o===e.taste.length-1?"；":"，"))]],2)})})]:t._e(),t._v(" "),e.adjunct.length?t._l(e.adjunct,function(s,o){return i("span",[t._v(t._s(s.name+"×"+s.num)),[t._v(t._s(o===e.adjunct.length-1?"；":"，"))]],2)}):t._e()],2),t._v(" "),i("div",{staticClass:"r"})])])})),t._v(" "),i("div",{staticClass:"filler"})])])])},staticRenderFns:[]};var I=s("VU/8")(v,g,!1,function(t){s("vqiP")},"data-v-314c1a1e",null).exports,S=document.querySelector("html").getAttribute("data-dpr"),C={name:"quick_meal",data:function(){return{appending:!1,windowHeight:0,standardLength:0,showSimulationBtn:!0,showStoreInfo:!1,showLoading:!0,storeId:this.$route.params.storeId,directlyAdd:0,operation:!0,blockSearhIocn:!0,graySearhIocn:!1,dishes:[],bodyScroll:!0,sideScroll:!1,mainScroll:!1,mainReachTop:!0,sideReachTop:!0,jsScroll:!1,featuresViewVisible:!1,goodsTitleListTop:[],goodsListTop:[],mainLengthDifference:0,catIndex:0,catIndexChange:!0,showMoveDot:[],categoryNum:[],totalPrice:0,cartFoodList:[],specsVisible:!1,specificationInfo:[],goodsDetailVisible:!1,goodsPic:"",storeInf:{store_log:"",desk:{},store_name:"",open_time:"",minimum:15},gettingGoodsDetail:!1,cartInfoVisible:!1}},components:{Goods:d.a,Floating:u.a,StoreInfo:_.a,GoodsSpecification:p.a,CartSpecification:I},watch:{bodyScroll:function(t){t?(this._bodyScroll.enable(),this._bodyScroll.scrollTo(0,0,400)):this._bodyScroll.disable()},sideScroll:function(t){t?(this._sideScroll.enable(),this.touchStartX&&this.touchStartX<this.elementsStyle.SIDE_WIDTH&&!this.jsScroll&&document.querySelector(".side").offsetHeight<document.querySelector(".side").children[0].offsetHeight&&this._sideScroll.scrollTo(0,-200*S,1e3)):this._sideScroll.disable()},catIndex:function(t){var e=this.$refs.sideScrollBox.offsetHeight;this.goodsTitleListTop[t]>e&&this._sideScroll.scrollTo(0,this.goodsTitleListTop[t]-e,200)},showLoading:function(t){var e=this;t||this.$nextTick(function(){e.getdishesHeight()})}},beforeDestroy:function(){},beforeRouteEnter:function(t,e,s){s(function(t){"people_num"!==e.name&&t.getStoreInfo()})},created:function(){this.elementsStyle=null,this.$store.state.common.common_data.store_info&&(this.storeInf=h()(this.storeInf,this.$store.state.common.common_data.store_info))},mounted:function(){var t=this;this.getCartInfo(this.storeId),setTimeout(function(){t._getStyle(),t._setStyle(),t._bodyScrollEvent(),t._pageTouchListener(),t.axiosAll()},30)},computed:c()({},Object(m.c)({cartInfo:function(t){return t.cart.cart}})),methods:c()({},Object(m.b)(["set_user_cart","set_common_data_store_info","set_common_data_desk_info","getCartInfo"]),{getStoreInfo:function(){var t=this;this.$http.post(this.API.seller.store_info,{store_id:this.storeId,desk_id:this.deskId}).then(function(e){"0000"===e.return_code?(t.storeInfo=e.data.store,t.set_user_cart(e.data.user_cart),e.data.store&&(t.set_common_data_store_info(e.data.store),t.storeInf=e.data.store),e.data.desk&&t.set_common_data_desk_info(e.data.desk)):t.$myToast(e.return_msg)})},goSearch:function(){this.$router.push({name:"take_out_search",params:{storeId:this.storeId}})},initDishes:function(){return this.$http.post(this.API.seller.seller_goods,{store_id:this.storeId})},axiosAll:function(){var t=this;this.$myLoading.open({text:"加载中...",spinnerType:"fading-circle"}),this.$http.all([this.initDishes()]).then(function(e){if("0000"===e[0].return_code){t.dishes=e[0].data.list;var s=[];t.dishes.forEach(function(t){s.push(t.cat_id)}),t.catIdList=s,t.showLoading=!1,t.$myLoading.close()}else t.$myToast(e[0].return_msg)})},changeCategroyNum:function(t){this.categoryNum=t},featuresViewtoggle:function(){this.featuresViewVisible=!this.featuresViewVisible},showSpecsList:function(t){var e=this;if(this.gettingGoodsDetail)return!1;this.gettingGoodsDetail=!0,this.$http.post(this.API.seller.store_goods_detail,{store_id:this.storeId,product_id:t.product.product_id}).then(function(t){e.gettingGoodsDetail=!1,"0000"==t.return_code&&(e.specsVisible=!0,e.specificationInfo=t.data.detail)})},showCartInfo:function(){if(console.log(this.cartInfoVisible),!0===this.cartInfoVisible)return this.closeCartInfo(!1),!1;this.cartInfoVisible=!0,this.$refs.floating.$refs.floatingBox.style.zIndex=9999},closeSpecsList:function(){this.specsVisible=!1},closeCartInfo:function(t){!1===t&&(this.cartInfoVisible=!1,this.$refs.floating.$refs.floatingBox.style.zIndex=99)},showGoodsDetail:function(t){this.goodsDetailVisible=!0,this.goodsPic=t},getdishesHeight:function(){var t=this,e=this.$refs.mainScrollBox,s=this.$refs.sideScrollBox,i=a()(e.children[0].children),o=a()(s.children[0].children);this.mainLengthDifference=e.children[0].offsetHeight-e.offsetHeight,i.forEach(function(e,s){t.goodsListTop[s]=e.offsetTop}),o.forEach(function(e,i,o){i!==o.length-1?t.goodsTitleListTop[i]=o[i+1].offsetTop:t.goodsTitleListTop[i]=s.children[0].offsetHeight}),this._sideScrollEvent(),this._mainScrollEvent()},chooseMenu:function(t){this.catIndex=t,this.catIndexChange=!1,this.jsScroll=!0,this._bodyScroll.scrollTo(0,-this.elementsStyle.SCROLL_HEIGHT,400),this._mainScroll.scrollTo(0,-this.goodsListTop[this.catIndex],400)},showMoveDotFun:function(t,e,s){this.showMoveDot=[].concat(o()(this.showMoveDot),o()(t)),this.elLeft=e,this.elBottom=s},beforeEnter:function(t){t.style.transform="translate3d(0,"+(this.elBottom-this.windowHeight+.4*this.standardLength)+"px,0)",t.children[0].style.transform="translate3d("+(this.elLeft-3*this.standardLength)+"px,0,0)",t.children[0].style.opacity=0},afterEnter:function(t){var e=this;t.style.transform="translate3d(0,0,0)",t.children[0].style.transform="translate3d(0,0,0)",t.style.transition="transform .5s cubic-bezier(0.3, -0.25, 0.7, -0.15)",t.children[0].style.transition="transform .5s linear",this.showMoveDot=this.showMoveDot.map(function(t){return!1}),t.children[0].style.opacity=1,t.children[0].addEventListener("transitionend",function(){e.listenInCart()},!!this.$passiveSupported&&{passive:!0}),t.children[0].addEventListener("webkitAnimationEnd",function(){e.listenInCart()},!!this.$passiveSupported&&{passive:!0})},listenInCart:function(){this.receiveInCart||(this.receiveInCart=!0)},_getStyle:function(){document.getElementById("app").style.height=window.innerHeight+"px";var t=this.$refs.banner,e=this.$refs.storeInfo,s=document.querySelector(".search-icon"),i=document.querySelector(".table-num"),o=document.querySelector(".side");this.windowHeight=window.innerHeight,this.standardLength=this.$refs._100px.offsetWidth,this.elementsStyle={REDUCE_HEIGHT:t.offsetHeight/2+i.offsetHeight,SCROLL_HEIGHT:t.offsetHeight/2+e.offsetHeight,SEARCHICON_TRANSLATE_Y:(t.offsetHeight/2-s.offsetHeight)/2+t.offsetHeight/2+s.offsetHeight/2,SEARCHICON_TRANSLATE_X:(window.innerWidth-2*s.offsetWidth-220*S)/2,SEARCHICON_INIT_WIDTH:s.offsetWidth,SEARCH_ADD_WIDTH:220*S,SEARCHICON_INIT_RADIUS:15*S,SEARCHICON_ADD_RADIUS:11*S,SEARCHICON_GRAY:115*S,SIDE_WIDTH:o.offsetWidth,SIDE_HEIGHT:o.offsetHeight,SIDE_UL_HEIGHT:o.children[0].offsetHeight}},_setStyle:function(){this.$refs._wrapper.style.paddingTop=this.$refs.banner.offsetHeight+this.$refs.storeInfo.offsetHeight+"px",this.$refs.overview.style.height=window.innerHeight-this.elementsStyle.REDUCE_HEIGHT+"px"},_bodyScrollEvent:function(){var t=this;this._bodyScroll=new f.a(this.$refs.scrollWrapper,{scrollY:!0,click:!1,bounce:!1,tap:!0,probeType:3,flickLimitDistance:this.standardLength/2});var e=this.$refs.logo,s=this.$refs.searchIcon,i=this.elementsStyle;this._bodyScroll.on("scroll",function(o){var n=-o.y.toFixed(1),a=(i.SCROLL_HEIGHT-n)/i.SCROLL_HEIGHT;e.style.opacity=a,e.style.transform="scale("+a+")",o.y<-5?t.blockSearhIocn=!1:t.blockSearhIocn=!0,o.y<-i.SEARCHICON_GRAY?t.graySearhIocn=!0:t.graySearhIocn=!1,s.style.transform="translate(-"+(1-a)*i.SEARCHICON_TRANSLATE_X+"px, -"+(1-a)*i.SEARCHICON_TRANSLATE_Y+"px)",s.style.width=(1-a)*i.SEARCH_ADD_WIDTH+i.SEARCHICON_INIT_WIDTH+"px",s.style.borderRadius=i.SEARCHICON_INIT_RADIUS-(1-a)*i.SEARCHICON_ADD_RADIUS+"px"}),this._bodyScroll.on("scrollEnd",function(e){-e.y===i.SCROLL_HEIGHT?(t.bodyScroll=!1,t.showSimulationBtn=!1):t.showSimulationBtn=!0})},_sideScrollEvent:function(){var t=this;this._sideScroll=new f.a(this.$refs.sideScrollBox,{scrollY:!0,click:!0,bounce:!1,probeType:3}),!this.sideScroll&&this._sideScroll.disable(),this._sideScroll.on("scrollEnd",function(e){e.y>=-3?t.sideReachTop=!0:t.sideReachTop=!1})},_mainScrollEvent:function(){var t=this;this._mainScroll=new f.a(this.$refs.mainScrollBox,{scrollY:!0,click:!0,bounce:!1,probeType:3}),this._mainScroll.on("scroll",function(e){t.$refs.sideScrollBox&&t.goodsListTop.forEach(function(s,i){t.catIndexChange&&Math.abs(Math.round(e.y))>=s&&(t.catIndex=i)})}),this._mainScroll.on("scrollEnd",function(e){e.y>=-3?t.mainReachTop=!0:t.mainReachTop=!1,t.catIndexChange=!0})},_pageTouchListener:function(){var t=this;this.$refs.homePage.addEventListener("touchstart",function(e){t.touchStartX=e.touches[0].pageX,t.touchStartY=e.touches[0].pageY},!!this.$passiveSupported&&{passive:!0}),this.$refs.homePage.addEventListener("touchend",function(e){var s=e.changedTouches[0].pageY;!t.bodyScroll&&s-t.touchStartY>50*S&&t.mainReachTop&&(t.bodyScroll=!0)},!!this.$passiveSupported&&{passive:!0})}})},b={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"homePage",staticClass:"home-page",style:{visibility:t.showLoading?"hidden":"visible"}},[i("div",{ref:"_100px",staticClass:"_100px"}),t._v(" "),i("div",{staticClass:"fixed-wrapper"},[i("div",{ref:"banner",staticClass:"banner"},[t.storeInf?i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.storeInf.bg_image,expression:"storeInf.bg_image"}],staticClass:"bg-image"}):i("img",{staticClass:"bg-image",attrs:{src:s("ewvu")}}),t._v(" "),t.storeInf?i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.storeInf.store_log,expression:"storeInf.store_log"}],ref:"logo",staticClass:"logo"}):i("img",{ref:"logo",staticClass:"logo",attrs:{src:s("Qcae")}}),t._v(" "),i("div",{ref:"searchIcon",staticClass:"search-icon"},[i("img",{directives:[{name:"show",rawName:"v-show",value:t.blockSearhIocn,expression:"blockSearhIocn"}],staticClass:"block-icon",attrs:{src:s("Puz1")}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.graySearhIocn,expression:"graySearhIocn"}],staticClass:"scroll-show",on:{tap:t.goSearch,click:t.goSearch}},[i("img",{attrs:{src:s("lmx/")}}),t._v(" "),i("span",{style:{visibility:t.graySearhIocn?"visible":"hidden"}},[t._v("请输入商品名称搜索")])])])]),t._v(" "),i("div",{ref:"storeInfo",staticClass:"store-info",attrs:{id:"store_info"}},[t.storeInf?i("h3",{staticClass:"store-name"},[t._v("\n        "+t._s(t.storeInf.store_name)+"\n        "),t.operation?i("span",{staticClass:"in-operation"},[t._v("营业中")]):t._e(),t._v(" "),t.operation?t._e():i("span",{staticClass:"resting"},[t._v("暂停营业")])]):t._e(),t._v(" "),i("div",{staticClass:"info01"},[t.storeInf?i("p",{staticClass:"business-hours"},[t._v("\n          营业时间："+t._s(t.storeInf.open_time)+"\n        ")]):t._e(),t._v(" "),t._m(0)])])]),t._v(" "),i("div",{ref:"scrollWrapper",staticClass:"scroll-wrapper"},[i("div",{ref:"_wrapper",staticClass:"wrapper"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.showSimulationBtn,expression:"showSimulationBtn"}],staticClass:"search-btn",on:{tap:t.goSearch,click:t.goSearch}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showSimulationBtn,expression:"showSimulationBtn"}],staticClass:"store-info-btn",on:{touchstart:function(e){t.showStoreInfo=!0}}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.showSimulationBtn,expression:"!showSimulationBtn"}],staticClass:"search-faker",on:{tap:t.goSearch,click:t.goSearch}}),t._v(" "),i("p",{staticClass:"table-num"}),t._v(" "),i("div",{ref:"overview",staticClass:"goods-overview"},[i("div",{ref:"sideScrollBox",staticClass:"side scroll-box"},[i("ul",{staticClass:"goods-type-list"},t._l(t.dishes,function(e,o){return i("li",{key:o,staticClass:"type-item",class:{activity_menu:o===t.catIndex},on:{click:function(e){t.chooseMenu(o)},tap:function(e){t.chooseMenu(o)}}},[0===o?i("img",{staticClass:"icon",attrs:{src:s("FyJC")}}):t._e(),t._v(" "),i("span",{staticClass:"txt"},[t._v("\n               "+t._s(e.cat_name)+"\n             ")]),t._v(" "),t.cartInfo.catList[e.cat_id]>0?i("span",{staticClass:"category-num"},[t._v(t._s(t.cartInfo.catList[e.cat_id]))]):t._e()])}))]),t._v(" "),i("div",{ref:"mainScrollBox",staticClass:"main scroll-box"},[i("ul",{staticClass:"outside-list"},t._l(t.dishes,function(e){return i("li",{staticClass:"outside-item"},[i("h4",{staticClass:"type-name"},[t._v("\n                "+t._s(e.cat_name)+"\n              ")]),t._v(" "),i("goods",{attrs:{items:e.goods},on:{showSpecs:t.showSpecsList,moveInCart:t.listenInCart,showMoveDot:t.showMoveDotFun,showGoodsDetail:t.showGoodsDetail}})],1)}))])])])]),t._v(" "),i("floating",{ref:"floating",attrs:{appending:t.appending},on:{showCart:t.showCartInfo}}),t._v(" "),i("mt-popup",{attrs:{position:"bottom"},model:{value:t.specsVisible,callback:function(e){t.specsVisible=e},expression:"specsVisible"}},[i("goods-specification",{attrs:{info:t.specificationInfo},on:{closeSpecs:t.closeSpecsList}})],1),t._v(" "),i("mt-popup",{staticClass:"goods-detail-wrapper",attrs:{position:"center","popup-transition":"popup-fade"},model:{value:t.goodsDetailVisible,callback:function(e){t.goodsDetailVisible=e},expression:"goodsDetailVisible"}},[i("div",{staticClass:"goods-detail"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.goodsPic,expression:"goodsPic"}],staticClass:"goods-pic"})])]),t._v(" "),i("mt-popup",{attrs:{position:"bottom"},on:{input:t.closeCartInfo},model:{value:t.cartInfoVisible,callback:function(e){t.cartInfoVisible=e},expression:"cartInfoVisible"}},[i("cart-specification",{on:{closeCart:t.closeCartInfo}})],1),t._v(" "),i("store-info",{class:{show_info:t.showStoreInfo},attrs:{"store-info":t.storeInf},on:{close:function(e){t.showStoreInfo=!1}}}),t._v(" "),t._l(t.showMoveDot,function(e,s){return i("transition",{key:s,attrs:{appear:""},on:{"after-appear":t.afterEnter,"before-appear":t.beforeEnter}},[e?i("div",{staticClass:"move-dot"},[i("span",{staticClass:"move-liner"})]):t._e()])})],2)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"introduction-btn"},[this._v("\n          商铺信息 >\n          "),e("i",{staticClass:"fa fa-angle-right"})])}]};var w=s("VU/8")(C,b,!1,function(t){s("zqQj")},"data-v-167499ea",null);e.default=w.exports},ewvu:function(t,e,s){t.exports=s.p+"static/img/img1@2x.b37bc37.png"},irHZ:function(t,e){},vqiP:function(t,e){},zqQj:function(t,e){}});
//# sourceMappingURL=17.ca4abfb39bf99eda1d37.js.map