webpackJsonp([16],{"0w05":function(t,s){},"3QV5":function(t,s){},LV3v:function(t,s,e){"use strict";var a=e("woOf"),i=e.n(a),n=e("Dd8w"),c=e.n(n),o=e("NYxO"),r={name:"goods_specification",data:function(){return{appending:this.$route.query.appending,dish:null,adjunctsData:[],tastesData:[],showTastesData:[],adjunctsDataIndex:null,adjunctNumShow:!1,adjunctNum:1,tasteSelectedIndex:[],adjunctSelectedIndex:[]}},props:["info"],watch:{info:function(t){var s=this;this.dish=t,this.adjunctsData=[],this.tastesData=[],this.showTastesData=[],this.adjunctsDataIndex=null,this.adjunctNumShow=!1,this.adjunctNum=1,this.tasteSelectedIndex=[],this.adjunctSelectedIndex=[],this.dish.props.forEach(function(t){var e=t.values[0];if(e){s.tasteSelectedIndex[e.id]=!0;var a=s.getPropName(e.props_id);s.tastesData.push({props_id:e.props_id,name:a,items:[{props_value_id:e.id,props_name:e.name}]}),s.showTastesData.push({id:e.id,name:e.name})}})}},mounted:function(){this.$nextTick(function(){})},computed:c()({},Object(o.c)(["common"]),{adjunctTotal:function(){var t=0;return this.adjunctsData.forEach(function(s,e){t+=s.price*s.num}),this.NP.round(t,2)}}),methods:c()({},Object(o.b)(["set_user_cart"]),{wrapperAttr:function(){if(this.dish){var t=this.$refs.goodsSpecification.offsetHeight,s=this.$refs.goodsInfo.offsetHeight;this.$refs.specification.offsetHeight>t-s&&(this.$refs.wrapper.style.height=t-s+"px")}},close:function(){this.$emit("closeSpecs")},getPropName:function(t){var s="";return this.dish.props.forEach(function(e,a){e.props_id==t&&(s=e.name)}),s},selectTaste:function(t){var s=this,e=!1,a=!1,i=0,n=0;if(this.tastesData.forEach(function(s,c){t.props_id===s.props_id&&(i=c,e=!0,s.items.forEach(function(s,e){t.id===s.props_value_id&&(a=!0,n=e)}))}),!0===a)this.tasteSelectedIndex[t.id]=!1,this.tastesData[i].items.splice(n,1),this.showTastesData.splice(n,1);else if(!0===e){var c=this.dish.props[i];c&&c.values&&c.values.forEach(function(t){s.tasteSelectedIndex[t.id]&&(s.tasteSelectedIndex[t.id]=!1)}),this.tastesData[i].items=[],this.showTastesData=[],this.tasteSelectedIndex[t.id]=!0,this.tastesData[i].items.push({props_value_id:t.id,props_name:t.name}),this.showTastesData.push({id:t.id,name:t.name})}else{this.tasteSelectedIndex[t.id]=!0;var o=this.getPropName(t.props_id);this.tastesData.push({props_id:t.props_id,name:o,items:[{props_value_id:t.id,props_name:t.name}]}),this.showTastesData.push({id:t.id,name:t.name})}},selectAjunct:function(t){var s=this.dish.adjuncts[t],e=!1,a=0;this.adjunctsData.forEach(function(t,i){s.bn===t.bn&&(e=!0,a=i)}),!0===e?(this.adjunctsData[a].num+=1,this.adjunctsDataIndex=a,this.adjunctNum=this.adjunctsData[a].num,this.adjunctSelectedIndex[t]+=1):(this.adjunctSelectedIndex[t]=1,this.adjunctsDataIndex=this.adjunctsData.length,this.adjunctNum=1,this.adjunctsData.push({bn:s.bn,name:s.name,price:s.member_price,num:1,index:t})),this.adjunctNumShow=!0},selectSpec:function(t){var s=this;if("1"===t.checked||""===t.product_id)return!1;var e=this.common.common_data.store_info.store_id;this.$http.post(this.API.seller.store_goods_detail,{store_id:e,product_id:t.product_id}).then(function(t){"0000"==t.return_code&&(s.dish=i()({},t.data.detail))})},minusAdjunct:function(){var t=this.adjunctsData[this.adjunctsDataIndex].num;1===t?(this.adjunctSelectedIndex[this.adjunctsData[this.adjunctsDataIndex].index]=0,this.adjunctsData.splice(this.adjunctsDataIndex,1),this.adjunctNumShow=!1,this.adjunctsDataIndex=null,this.adjunctNum=1):(this.adjunctsData[this.adjunctsDataIndex].num=t-1,this.adjunctNum=t-1,this.adjunctSelectedIndex[this.adjunctsData[this.adjunctsDataIndex].index]=t-1)},addAdjunct:function(){this.adjunctsData[this.adjunctsDataIndex].num+=1,this.adjunctNum+=1,this.adjunctSelectedIndex[this.adjunctsData[this.adjunctsDataIndex].index]+=1},addCart:function(){var t=this,s=this.common.common_data.store_info.store_id,e=this.common.common_data.desk_info.desk_id,a=this.dish.product.bn,i=[];this.adjunctsData.forEach(function(t){var s={goods_bn:t.bn,num:t.num};i.push(s)});var n="1"===this.appending?this.API.cart.cart_append:this.API.cart.cart_add;this.$http.post(n,{store_id:s,desk_id:e,goods_bn:a,num:1,taste:this.tastesData,adjunct:i}).then(function(s){"0000"===s.return_code?(t.set_user_cart(s.data.user_cart),t.$emit("closeSpecs")):t.$myToast(s.return_msg)})}})},d={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{ref:"goodsSpecification",staticClass:"goods-specification"},[a("div",{staticClass:"close",on:{touchstart:t.close}},[a("img",{attrs:{src:e("qI6Q")}})]),t._v(" "),t.dish?a("div",{ref:"goodsInfo",staticClass:"goods-info"},[a("div",{staticClass:"goods-pic"},[t.dish.image_url?a("img",{staticClass:"pic",attrs:{src:t.dish.image_url}}):a("img",{staticClass:"pic",attrs:{src:e("3Cyy")}}),t._v(" "),t.dish.member_price?a("img",{staticClass:"member-tip",attrs:{src:e("T2dr")}}):t._e()]),t._v(" "),a("div",{staticClass:"r"},[a("p",{staticClass:"name"},[t._v("\n        "+t._s(t.dish.name)+"\n        "),a("span",{staticClass:"unit"},[t._v("/"+t._s(t.dish.unit))])]),t._v(" "),a("div",{staticClass:"price"},[a("span",{staticClass:"finally-price"},[a("span",{staticClass:"money-symbol"},[t._v("￥")]),t._v(t._s(t._f("formatActualMoney")(t.dish.member_price)))]),t._v(" "),t.NP.round(t.dish.price-t.dish.member_price)>0?a("span",{staticClass:"original-price"},[a("span",{staticClass:"money-symbol"},[t._v("￥")]),t._v(t._s(t._f("formatActualMoney")(t._f("formatMoney")(t.dish.price))))]):t._e()]),t._v(" "),a("div",{staticClass:"have-choose"},[t._v("\n        已选：\n        "),a("span",[t._l(t.tastesData,function(s,e){return[t._l(s.items,function(e,a){return[t._v("\n              "+t._s(e.props_name)+"\n              "),a===s.items.length-1?[t._v("；")]:t._e()]})]})],2),t._v(" "),a("span",[t._l(t.adjunctsData,function(s,e){return[t._v("\n            "+t._s(s.name)+"x"+t._s(s.num)+"\n            "),e===t.adjunctsData.length-1?[t._v("；")]:[t._v("，")]]})],2)])])]):t._e(),t._v(" "),t.dish?a("div",{ref:"wrapper",staticClass:"wrapper"},[a("div",{ref:"specification",staticClass:"specification"},[t._l(t.dish.specs,function(s){return[a("div",{staticClass:"category"},[a("h4",{staticClass:"title"},[t._v(t._s(s.spec_name))]),t._v(" "),a("ul",{staticClass:"parameter-list"},t._l(s.items,function(s,e){return a("li",{staticClass:"parameter",class:{selected:"1"==s.checked},on:{click:function(e){t.selectSpec(s)}}},[a("span",{staticClass:"txt"},[t._v("\n            "+t._s(s.spec_value)+"\n          ")])])}))])]}),t._v(" "),t._l(t.dish.props,function(s){return[a("div",{staticClass:"category"},[a("h4",{staticClass:"title"},[t._v(t._s(s.name))]),t._v(" "),a("ul",{staticClass:"parameter-list"},t._l(s.values,function(s,e){return a("li",{staticClass:"parameter",class:{selected:t.tasteSelectedIndex[s.id]},on:{click:function(e){t.selectTaste(s)}}},[a("span",{staticClass:"txt"},[t._v("\n            "+t._s(s.name)+"\n          ")])])}))])]}),t._v(" "),t.dish.adjuncts.length>0?a("div",{staticClass:"category"},[a("h4",{staticClass:"title"},[t._v("配菜")]),t._v(" "),a("ul",{staticClass:"parameter-list"},t._l(t.dish.adjuncts,function(s,e){return a("li",{staticClass:"parameter",class:{selected:t.adjunctSelectedIndex[e]},on:{click:function(s){t.selectAjunct(e)}}},[a("span",{staticClass:"txt"},[t._v("\n              "+t._s(s.name)+"\n              "),s.member_price?a("span",{staticClass:"price"},[t._v("￥"+t._s(s.member_price))]):t._e()]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.adjunctSelectedIndex[e],expression:"adjunctSelectedIndex[index]"}],staticClass:"selected-num"},[t._v("\n              "+t._s(t.adjunctSelectedIndex[e])+"\n            ")])])}))]):t._e(),t._v(" "),a("div",{staticClass:"filler"})],2)]):t._e(),t._v(" "),a("div",{staticClass:"bottom-assembly"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.adjunctNumShow,expression:"adjunctNumShow"}],staticClass:"num"},[a("span",{staticClass:"title"},[t._v("配菜数量")]),t._v(" "),a("div",{staticClass:"inputNumber"},[a("i",{staticClass:"reduce",on:{click:t.minusAdjunct}},[a("img",{attrs:{src:e("OE/g")}})]),t._v("\n        "+t._s(t.adjunctNum)+"\n        "),a("i",{staticClass:"add",on:{click:t.addAdjunct}},[a("img",{attrs:{src:e("Aazb")}})])])]),t._v(" "),a("button",{staticClass:"add-cart",on:{click:t.addCart}},[t._v("加入购物车")])])])},staticRenderFns:[]};var u=e("VU/8")(r,d,!1,function(t){e("0w05")},"data-v-7231fe29",null);s.a=u.exports},YOyO:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("Gu7T"),i=e.n(a),n=e("HR77"),c=e("Ewld"),o=e("vyE0"),r=e("LV3v"),d={name:"search",data:function(){return{searchTxt:"",dishes:[],showLoading:!1,specificationInfo:[],storeId:this.$route.params.storeId,deskId:this.$route.params.deskId,peopleNum:this.$route.params.peopleNum,bounce:!1,specsVisible:!1,showMoveDot:[],receiveInCart:!1,windowHeight:0,standardLength:0,timer:null}},components:{Scroll:c.a,Goods:n.a,Floating:o.a,GoodsSpecification:r.a},watch:{searchTxt:function(t){if(t){var s=this;clearTimeout(this.timer),this.timer=setTimeout(function(){s.searchDishes()},500)}else clearTimeout(this.timer),this.dishes=[]}},mounted:function(){this.getStyle(),this.setStyle(),this.autoFocus()},methods:{routerBack:function(){window.history.back(-1)},autoFocus:function(){setTimeout(function(){document.querySelector(".search-input").focus()},100)},showSpecsList:function(t){var s=this;this.$http.post(this.API.seller.store_goods_detail,{store_id:this.storeId,product_id:t.product.product_id}).then(function(t){"0000"==t.return_code&&(s.specsVisible=!0,s.specificationInfo=t.data.detail)})},setStyle:function(){document.querySelector(".scroll-wrapper")&&(document.querySelector(".scroll-wrapper").style.height=window.innerHeight-document.querySelector(".head").offsetHeight+"px")},getStyle:function(){this.windowHeight=window.innerHeight,this.standardLength=this.$refs._100px.offsetWidth},searchDishes:function(){var t=this;this.showLoading=!0,this.$http.post(this.API.seller.store_search,{store_id:this.storeId,name:this.searchTxt}).then(function(s){if("0000"!==s.return_code)return t.$myToast(s.return_msg),void(t.showLoading=!1);t.dishes=s.data.list,t.showLoading=!1})},showMoveDotFun:function(t,s,e){this.showMoveDot=[].concat(i()(this.showMoveDot),i()(t)),this.elLeft=s,this.elBottom=e},beforeEnter:function(t){t.style.transform="translate3d(0,"+(this.elBottom-this.windowHeight)+"px,0)",t.children[0].style.transform="translate3d("+(this.elLeft-.4*this.standardLength)+"px,0,0)",t.children[0].style.opacity=0},afterEnter:function(t){t.style.transform="translate3d(0,0,0)",t.children[0].style.transform="translate3d(0,0,0)",t.style.transition="transform .5s cubic-bezier(0.3, -0.1, 0.7, -0.15)",t.children[0].style.transition="transform .5s linear",this.showMoveDot=this.showMoveDot.map(function(t){return!1}),t.children[0].style.opacity=1},listenInCart:function(){this.receiveInCart||(this.receiveInCart=!0)},closeSpecsList:function(){this.specsVisible=!1},emptySearchTxt:function(){this.searchTxt=""}}},u={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"search-page"},[a("div",{ref:"_100px",staticClass:"_100px"}),t._v(" "),a("div",{staticClass:"head"},[a("div",{staticClass:"search-wrapper"},[a("img",{attrs:{src:e("Puz1")}}),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchTxt,expression:"searchTxt"}],staticClass:"search-input",attrs:{type:"text",placeholder:"想吃什么搜一下吧"},domProps:{value:t.searchTxt},on:{input:function(s){s.target.composing||(t.searchTxt=s.target.value)}}}),t._v(" "),t.searchTxt?a("img",{attrs:{src:e("j33x")},on:{click:t.emptySearchTxt}}):t._e()]),t._v(" "),a("div",{staticClass:"cancel",on:{click:t.routerBack}},[t._v("取消")])]),t._v(" "),t.dishes.length>0?a("scroll",{staticClass:"scroll-wrapper",attrs:{data:t.dishes,bounce:t.bounce}},[a("div",{staticClass:"wrapper"},[a("goods",{attrs:{items:t.dishes},on:{showSpecs:t.showSpecsList,moveInCart:t.listenInCart,showMoveDot:t.showMoveDotFun}}),t._v(" "),a("div",{staticClass:"fill"},[a("div")])],1)]):a("div",{staticClass:"no-dish"},[a("img",{attrs:{src:e("0Pde")}}),t._v(" "),a("p",[t._v("暂时没有找到商品哦~")]),t._v(" "),a("p",[t._v("换个关键词试试~")])]),t._v(" "),a("floating"),t._v(" "),a("mt-popup",{attrs:{position:"bottom"},model:{value:t.specsVisible,callback:function(s){t.specsVisible=s},expression:"specsVisible"}},[a("goods-specification",{attrs:{info:t.specificationInfo},on:{closeSpecs:t.closeSpecsList}})],1),t._v(" "),t._l(t.showMoveDot,function(s,e){return a("transition",{key:e,attrs:{appear:""},on:{"after-appear":t.afterEnter,"before-appear":t.beforeEnter}},[s?a("div",{staticClass:"move-dot"},[a("span",{staticClass:"move-liner"})]):t._e()])})],2)},staticRenderFns:[]};var l=e("VU/8")(d,u,!1,function(t){e("3QV5")},"data-v-16e3bb82",null);s.default=l.exports},jyNL:function(t,s){},vyE0:function(t,s,e){"use strict";var a=e("Dd8w"),i=e.n(a),n=e("NYxO"),c={name:"floating",data:function(){return{featuresViewVisible:!1}},props:{appending:{type:Boolean,default:!1}},computed:i()({},Object(n.c)({userCart:function(t){return t.user.user_cart},deskId:function(t){return t.common.common_data.desk_info.desk_id},storeId:function(t){return t.common.common_data.store_info.store_id},people:function(t){return t.common.common_data.desk_info.info.people}}),{totalNum:function(){var t=0;return this.userCart.goods_list&&this.userCart.goods_list.forEach(function(s){t+=parseInt(s.num)}),t},totalPrice:function(){var t=0,s=0;if(this.userCart.goods_list&&this.userCart.goods_list.forEach(function(s){t+=s.num*s.price}),this.userCart.adjunct_list){var e=void 0;for(e in this.userCart.adjunct_list)this.userCart.adjunct_list[e].forEach(function(t){t.forEach(function(t){s+=t.num*t.price})})}return this.NP.round(t+s,2)}}),created:function(){},methods:{featuresViewtoggle:function(){this.featuresViewVisible=!this.featuresViewVisible},goShopCart:function(){this.appending?this.$router.push("/shop_cart?appending=1"):this.$router.push("/shop_cart")}}},o={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"floating-box"},[a("div",{staticClass:"features"},[a("div",{staticClass:"title",on:{click:t.featuresViewtoggle}},[a("img",{staticClass:"icon",attrs:{src:e("DHIp")}}),t._v("\n      功能\n    ")]),t._v(" "),a("ul",{directives:[{name:"show",rawName:"v-show",value:t.featuresViewVisible,expression:"featuresViewVisible"}],staticClass:"list"},[a("li",{on:{click:function(s){t.$router.push("/center")}}},[t._v("会员中心")]),t._v(" "),a("li",{on:{click:function(s){t.$router.push("/my_order/dine")}}},[t._v("我的订单")]),t._v(" "),a("li",{on:{click:function(s){t.$router.push("/my_coupons")}}},[t._v("我的优惠券")]),t._v(" "),a("li",{on:{click:function(s){t.$router.push("/shop_cart")}}},[t._v("购物车")]),t._v(" "),t.appending?a("li",{on:{click:function(s){t.$router.push({name:"confirm_pay",params:{deskId:t.deskId}})}}},[t._v("结账")]):t._e()])]),t._v(" "),a("div",{staticClass:"shopping-cart",on:{click:t.goShopCart}},[a("div",{ref:"cartContainer",staticClass:"circle"},[t.totalNum?a("div",{staticClass:"num"},[t._v(t._s(t.totalNum))]):t._e()]),t._v(" "),a("p",{staticClass:"total"},[t._v("￥"),a("span",[t._v(t._s(t._f("formatActualMoney")(t.totalPrice)))])])])])},staticRenderFns:[]};var r=e("VU/8")(c,o,!1,function(t){e("jyNL")},"data-v-be508818",null);s.a=r.exports}});
//# sourceMappingURL=16.98db430ac66c2a5f6c11.js.map