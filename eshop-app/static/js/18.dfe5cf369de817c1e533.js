webpackJsonp([18],{"0FT1":function(t,s,a){"use strict";var i=a("Dd8w"),e=a.n(i),n=a("NYxO"),o={name:"goods_ready_pay",data:function(){return{cartFoodList:[]}},props:["cartInfo"],computed:e()({},Object(n.c)({storeName:function(t){return t.common.common_data.store_info.store_name},storeLogo:function(t){return t.common.common_data.store_info.store_log},deskInfo:function(t){return t.common.common_data.desk_info},lvName:function(t){return t.user.user_info.lv_name}}),{totalData:function(){var t=0,s=0,a=0;return this.cartInfo.forEach(function(i){i.dishes.forEach(function(i){a+=parseInt(i.num),t+=i.member_subtotal*i.num,t+=i.adjunct_member_subtotal*i.num,s+=(i.subtotal-i.member_subtotal)*i.num,s+=(i.adjunct_subtotal-i.adjunct_member_subtotal)*i.num})}),{num:a,total:this.NP.round(t,2),discount:this.NP.round(s,2)}}}),created:function(){},mounted:function(){},methods:e()({},Object(n.b)([]))},r={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"goods-ready-pay",style:{visibility:"visible"}},[i("div",{staticClass:"base-info"},[i("div",{staticClass:"l"},[(t.storeLogo,i("img",{attrs:{src:a("0ykN")}})),t._v(" "),i("span",{staticClass:"title"},[t._v(t._s(t.storeName))])]),t._v(" "),t.deskInfo?i("div",{staticClass:"r"},[i("span",{staticClass:"table-num"},[t._v("\n        "+t._s(t.deskInfo.type_name)+" "+t._s(t.deskInfo.name)+"\n      ")]),t._v(" "),i("span",{staticClass:"diners"},[i("img",{attrs:{src:a("ZWFm")}}),t._v(" "),i("span",[t._v("人数 "+t._s(t.deskInfo.info.people))])])]):t._e()]),t._v(" "),t._l(t.cartInfo,function(s){return i("div",{staticClass:"goods-category"},[i("div",{staticClass:"head"},[i("span",{staticClass:"category-title"},[t._v(t._s(s.cat_name))]),t._v(" "),i("span",{staticClass:"category-total"},[t._v("共"+t._s(s.num)+"份")])]),t._v(" "),i("ul",{staticClass:"goods-list"},t._l(s.dishes,function(s,e){return i("li",[s.goods_image?i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.goods_image,expression:"item.goods_image"}],staticClass:"goods-pic"}):i("img",{staticClass:"goods-pic",attrs:{src:a("3Cyy")}}),t._v(" "),i("div",{staticClass:"goods-info"},[i("div",{staticClass:"l"},[i("p",{staticClass:"goods-name"},[t._v(t._s(t._f("longStrFormat")(s.name,17))),i("span",{staticClass:"unit"},[t._v("/"+t._s(s.unit))])]),t._v(" "),i("p",{staticClass:"adjuncts"},[s.taste.length>0?[t._l(s.taste,function(a,e){return t._l(a.items,function(a,e){return i("span",[t._v("\n                    "+t._s(a.props_name)+"\n                    "),[t._v(t._s(e===s.taste.length-1?"；":"，"))]],2)})})]:t._e(),t._v(" "),s.adjunct.length>0?t._l(s.adjunct,function(a,e){return i("span",[t._v("\n                    "+t._s(a.name+"×"+a.num)+"\n                    "),[t._v(t._s(e===s.adjunct.length-1?"；":"，"))]],2)}):t._e()],2)]),t._v(" "),i("div",{staticClass:"r"},[i("div",{staticClass:"price"},[i("p",{staticClass:"finally-price"},[t._v("￥"+t._s(t._f("formatActualMoney")(s.member_price)))]),t._v(" "),t.NP.round(parseFloat(s.price)-parseFloat(s.member_price),2)>0?i("p",{staticClass:"original-price"},[t._v("￥"+t._s(t._f("formatActualMoney")(s.price)))]):t._e()])]),t._v(" "),i("p",{staticClass:"single-total"},[t._v("×"+t._s(s.num))])])])}))])}),t._v(" "),i("div",{staticClass:"remark"},[i("span",[t._v("备注：")]),t._v("\n    "+t._s(t.deskInfo.info.mark_text)+"\n  ")]),t._v(" "),i("div",{staticClass:"sum-up"},[i("div",{staticClass:"l"},[t._v("\n      商品共"+t._s(t.totalData.num)+"份\n    ")]),t._v(" "),i("div",{staticClass:"r"},[i("div",{staticClass:"member-discount"},[i("div",{staticClass:"member-label"},[t._v(t._s(t.lvName))]),t._v(" "),i("div",{staticClass:"discount-amount"},[i("span",{staticClass:"txt"},[t._v("已优惠")]),t._v(" "),i("span",{staticClass:"num"},[t._v("￥"+t._s(t._f("formatActualMoney")(t.totalData.discount)))])])]),t._v(" "),i("div",{staticClass:"lump-sum"},[i("span",{staticClass:"txt"},[t._v("小计")]),t._v(" "),i("span",{staticClass:"num"},[t._v("￥"+t._s(t._f("formatActualMoney")(t.totalData.total)))])])])])],2)},staticRenderFns:[]};var c=a("VU/8")(o,r,!1,function(t){a("vx/s")},"data-v-3638d03a",null);s.a=c.exports},AyUv:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA3NEQzQUFGQjBEMzExRTg4QTlEOEFCQTc5QzQ2NjEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA3NEQzQUIwQjBEMzExRTg4QTlEOEFCQTc5QzQ2NjEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDc0RDNBQURCMEQzMTFFODhBOUQ4QUJBNzlDNDY2MTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDc0RDNBQUVCMEQzMTFFODhBOUQ4QUJBNzlDNDY2MTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6ieQ01AAABk0lEQVR42mL8//8/w2AGTAyDHIw6cNSBow4cdSCNAQsuibNnz9LVIcbGxqNRTArQBOIrQHxwMDrQH4hPALE2EHMMJgeC7GoE4vVAzAfEd4DYl+xMQmXAD8SLkRz0BIidgfjVYHCgJjTU1KH810DsAsSPBkMmgaU3mOM+ArEHEN8c6FyMnt5A4Bs0is9Ru5g5AMTHgFiVhPS2AYjrgJgRKvYLiEOA+DAtykFRILYE4jNAHEpEejuFljv/AnEcEG+nVUEdDo0eUFStAuJpOMqvACA+CcRqSGKgDk8mEK+kZU0CKvHTkPggC48jRTnIjCYgXgfEvGh6y4F4Nj2quqXQkIMBA2iUJwLxRiCuRUpvMNAGxN00a81gAYVAbATEFlA+KMrn4VAL8kw1vRsLoJwYBi1oCYV2zkC1Zh4DcQw0Z2IDm4A4AZo5Bqy5tQuIG7CI74Pm+D+DoT3YCsRbkfgnocXMD7o1+QkAUBTGQmuZ70DsA8Sf6donIQK8B2L9Ed+rYxwdfht14KgDRx046sDBDQACDACKiUskw4nNiwAAAABJRU5ErkJggg=="},oir1:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={name:"confirm_order",data:function(){return{cart:[],payable:0,deskId:this.$route.params.deskId,deskStatusTimer:null,posting:!1,refreshTimer:null,appending:!1}},components:{GoodsReadyPay:a("0FT1").a},beforeDestroy:function(){clearInterval(this.deskStatusTimer),clearInterval(this.refreshTimer)},created:function(){this.getConfirmInfo(),this.$route.query.appending?this.appending=!0:this.deskStatusTimer=setInterval(this.deskStatus,5e3)},methods:{reFreshList:function(){var t=this;this.$http.post(this.API.cart.cart_confirm,{desk_id:this.deskId}).then(function(s){"0000"==s.return_code&&(t.cart=s.data.cart,t.payable=s.data.payable)})},getConfirmInfo:function(){var t=this;this.$myLoading.open({text:"加载中...",spinnerType:"fading-circle"}),this.$http.post(this.API.cart.cart_confirm,{desk_id:this.deskId}).then(function(s){t.$myLoading.close(),"0000"==s.return_code?(t.cart=s.data.cart,t.payable=s.data.payable,t.refreshTimer=setInterval(t.reFreshList,5e3)):t.$myToast(s.return_msg)})},confirmOrder:function(){var t=this;if(1==this.posting)return!1;this.posting=!0,this.$myLoading.open({text:"加载中...",spinnerType:"fading-circle"});var s=this.$store.state.common.common_data.desk_info.info;this.$http.post(this.API.cart.cart_order,{desk_id:this.deskId,mark_text:s.mark_text,people:s.people}).then(function(s){t.posting=!1,t.$myLoading.close(),"0000"==s.return_code?t.$router.push("/merchant_confirm/"+t.deskId):t.$myToast(s.return_msg)})},deskStatus:function(){var t=this;this.deskId&&this.$http.post(this.API.seller.desk_status,{desk_id:this.deskId}).then(function(s){"0000"===s.return_code&&("2"==s.data.status?t.$router.push("/confirm_pay/"+t.deskId):"3"==s.data.status?t.$router.push("/merchant_confirm/"+t.deskId):"4"==s.data.status||"5"==s.data.status?t.$router.push("/order_detail/dine_detail/"+s.data.order_id):"6"==s.data.status&&t.$router.push("/order_detail/dine_detail/"+s.data.order_id))})}}},e={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"confirm-order-page"},[this._m(0),this._v(" "),s("goods-ready-pay",{attrs:{"cart-info":this.cart}}),this._v(" "),s("button",{staticClass:"confirm-btn",on:{click:this.confirmOrder}},[this._v("\n    确认商品\n  ")])],1)},staticRenderFns:[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"steps"},[i("div",{staticClass:"step in-progress"},[i("div",{staticClass:"icon"},[t._v("1")]),t._v(" "),i("p",{staticClass:"txt"},[t._v("确认商品")])]),t._v(" "),i("div",{staticClass:"step"},[i("div",{staticClass:"icon"},[t._v("2")]),t._v(" "),i("p",{staticClass:"txt"},[t._v("商户确认")])]),t._v(" "),i("div",{staticClass:"step"},[i("div",{staticClass:"icon"},[i("img",{attrs:{src:a("AyUv")}})]),t._v(" "),i("p",{staticClass:"txt"},[t._v("确认结算")])]),t._v(" "),i("ul",{staticClass:"points"},[i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li"),t._v(" "),i("li")])])}]};var n=a("VU/8")(i,e,!1,function(t){a("zObS")},"data-v-5c2a3214",null);s.default=n.exports},"vx/s":function(t,s){},zObS:function(t,s){}});
//# sourceMappingURL=18.dfe5cf369de817c1e533.js.map