webpackJsonp([39],{LCjo:function(t,e){},d3xt:function(t,e,s){t.exports=s.p+"static/img/logo@2x.682d783.png"},dhFa:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("VUa8"),a={name:"queued_number",data:function(){return{people:1,name:"",sex:0,tel:"",queueDetailsVisible:!1,storeId:this.$route.params.storeId,storeInfo:{},queues:[]}},created:function(){this.getStoreInfo()},methods:{getStoreInfo:function(){var t=this;this.$http.post(this.API.queue.store_info,{store_id:this.storeId}).then(function(e){return"0000"!==e.return_code?(t.$myToast(e.return_msg),!1):e.data.queue.id?(t.$router.push("/order_detail/queue_detail/"+e.data.queue.id),!0):(t.storeInfo=e.data.store_info,void t.getStoreQueueInfo())})},getStoreQueueInfo:function(){var t=this;this.$http.post(this.API.queue.queue_show,{store_bn:this.storeInfo.store_bn}).then(function(e){if("0000"!==e.return_code)return t.$myToast(e.return_msg),!1;t.queues=e.data.list})},addQueue:function(){var t=this;if(!this.storeInfo.store_bn)return!1;if(this.people<1)return!1;if(""===this.name)return this.$myToast("请输入姓名"),!1;if(0!==this.sex&&1!==this.sex)return this.$myToast("请选择性别"),!1;if(!1===i.a.check_mobile(this.tel))return this.$myToast("请输入正确的手机号"),!1;var e={store_bn:this.storeInfo.store_bn,people:this.people,name:this.name,sex:this.sex,mobile:this.tel};this.$http.post(this.API.queue.queue_add,e).then(function(e){if("0000"!==e.return_code)return t.$myToast(e.return_msg),!1;t.$myToast("排队成功"),t.$router.push("/my_order/queue")})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"queued-number-page"},[i("div",{staticStyle:{height:"2px"}}),t._v(" "),i("div",{staticClass:"wrapper"},[i("div",{staticClass:"head"},[i("div",{staticClass:"store-pic"},[t.storeInfo.store_image?i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.storeInfo.store_image,expression:"storeInfo.store_image"}]}):i("img",{attrs:{src:s("d3xt")}})]),t._v(" "),i("p",{staticClass:"store-name"},[t._v(t._s(t.storeInfo.store_name))]),t._v(" "),i("p",{staticClass:"business-hours"},[t._v("营业时间："+t._s(t.storeInfo.open_time))])]),t._v(" "),i("div",{staticClass:"main"},[i("div",{staticClass:"item people-num"},[i("div",{staticClass:"l"},[t._v("就餐人员")]),t._v(" "),i("div",{staticClass:"r"},[i("i",{staticClass:"minus",on:{click:function(e){t.people=1===t.people?1:t.people-1}}},[i("img",{attrs:{src:s("l3+1")}})]),t._v(" "),i("span",{staticClass:"num"},[t._v(t._s(t.people))]),t._v(" "),i("i",{staticClass:"plus",on:{click:function(e){t.people++}}},[i("img",{attrs:{src:s("O9c/")}})])])]),t._v(" "),i("div",{staticClass:"item name"},[i("div",{staticClass:"l"},[t._v("姓名")]),t._v(" "),i("div",{staticClass:"r"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",placeholder:"请输入"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"item sex"},[i("div",{staticClass:"l"},[t._v("性别")]),t._v(" "),i("div",{staticClass:"r"},[i("div",{staticClass:"radio",class:{activity:0===t.sex},on:{click:function(e){t.sex=0}}},[t._v("女士")]),t._v(" "),i("div",{staticClass:"radio",class:{activity:1===t.sex},on:{click:function(e){t.sex=1}}},[t._v("先生")])])]),t._v(" "),i("div",{staticClass:"item tel"},[i("div",{staticClass:"l"},[t._v("联系方式")]),t._v(" "),i("div",{staticClass:"r"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.tel,expression:"tel"}],attrs:{type:"tel",placeholder:"请输入"},domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value)}}})])])]),t._v(" "),i("div",{staticClass:"footer",on:{click:function(e){t.queueDetailsVisible=!0}}},[t._v("\n      查看排队详情\n    ")])]),t._v(" "),"1"==t.storeInfo.call_status?i("button",{staticClass:"confirm",on:{click:t.addQueue}},[t._v("我要取号")]):i("button",{staticClass:"confirm"},[t._v("取号未开启")]),t._v(" "),i("mt-popup",{attrs:{"popup-transition":"popup-fade"},model:{value:t.queueDetailsVisible,callback:function(e){t.queueDetailsVisible=e},expression:"queueDetailsVisible"}},[i("div",{staticClass:"queue-detail-view"},[i("div",{staticClass:"view-main"},[i("div",{staticClass:"title"},[i("i"),t._v(" "),i("span",[t._v("当前正在排队")]),t._v(" "),i("i")]),t._v(" "),i("ul",{staticClass:"table-list"},t._l(t.queues,function(e){return i("li",[i("div",{staticClass:"l"},[i("span",{staticClass:"table-type"},[t._v(t._s(e.name))]),t._v(" "),i("span",{staticClass:"capacity"},[t._v("("+t._s(e.minimum)+"~"+t._s(e.maximum)+"人)")])]),t._v(" "),i("div",{staticClass:"r"},[t._v("\n              前方"),i("span",[t._v(t._s(e.wait_front))]),t._v("桌\n            ")])])}))]),t._v(" "),i("i",{staticClass:"close",on:{click:function(e){t.queueDetailsVisible=!1}}},[i("img",{attrs:{src:s("4BH9")}})])])])],1)},staticRenderFns:[]};var n=s("VU/8")(a,o,!1,function(t){s("LCjo")},"data-v-2cccf5cf",null);e.default=n.exports}});
//# sourceMappingURL=39.5aab8bf35073e757319a.js.map