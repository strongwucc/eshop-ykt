webpackJsonp([44],{ye9z:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("GJzV"),o=(a("VUa8"),a("24Yc"),a("3XNK")),i=a("0iPh"),r=a.n(i),s={name:"bind_card",data:function(){return{cardNo:"",cvv2:"",password:"",tipInfo:{icon:"",txt:""},loading:!1,warnTip:!1,mappingId:""}},components:{MyToast:n.a,back:o.a},mounted:function(){var t=this;this.mappingId=this.get_time(),this.$nextTick(function(){window.kb=new keyBoard({chaosMode:0,pressStatus:1,kbType:0,svg:"static/svg"}),window.kb.generate(),window.passGuard1=new passGuard({mappurl:"http://ceshi4.sdykt.com.cn:1280/pos/card/getMapping/"+t.mappingId,maxLength:8,regExp1:"[\\S\\s]",regExp2:"[0-9]{6,12}",displayMode:0,callBack:t.cb1,errorCallBack:t.cb2,rsaPublicKey:"30818902818100d17951540859261bcbb00fc61a9e2fb8be1f5794dabd87e87bbac84e975ac7f6f77a094c6b642b3a799bdbdf13841a47943cfb0831578b2e4d82f177b9350e211db3dc84111eb4f0b92bc7d1379436a0f631be371682839461a11d6d2e65cb0c45c526d15429b706ff14498e3fd6c4683ca1092054f5ac95f679ba699fd789d50203010001"}),window.passGuard1.generate("kb1",window.kb,1)})},methods:{beHide:function(t){this.warnTip=t},confirm:function(){if(!this.cardNo)return this.warnTip=!0,this.tipInfo={type:"warn",txt:"请输入卡号"},!1;if(!this.cvv2)return this.warnTip=!0,this.tipInfo={type:"warn",txt:"请输入cvv2"},!1;if(1==window.passGuard1.getValid())return this.warnTip=!0,this.tipInfo={type:"warn",txt:"请输入6位数交易密码"},!1;var t=this;r.a.ajax({url:"http://ceshi4.sdykt.com.cn:1280/pos/card/getRandkey?"+this.get_time(),type:"GET",async:!1,success:function(e){console.log(e),window.passGuard1.setRandKey(e);var a=window.passGuard1.getOutput();document.getElementById("kb1").value="";for(var n=1;n<=Le;n++)r()("#kb"+n).attr("placeholder",PH.arrPlace[n-1]);t.cardPayViewVisible=!1,console.log(a),t.$myLoading.open({text:"加载中...",spinnerType:"fading-circle"}),t.loading=!0,t.$http.post(t.API.user.bind_card,{card_no:t.cardNo,cvv2:t.cvv2,password:a,key:e,mappingId:t.mappingId}).then(function(e){return t.$myLoading.close(),t.loading=!1,"0000"===e.return_code?(t.$router.go(-1),!0):(t.$myToast(e.return_msg),!1)})}})},cb1:function(){console.log("cb1")},cb2:function(){console.log("cb2")},get_time:function(){return(new Date).getTime().toString()}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bind-card-page"},[a("div",{staticClass:"input-box reset-pw"},[a("label",{attrs:{for:"cardNo"}},[t._v("卡号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.cardNo,expression:"cardNo"}],attrs:{type:"tel",id:"cardNo",placeholder:"请输入卡号"},domProps:{value:t.cardNo},on:{input:function(e){e.target.composing||(t.cardNo=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"input-box reset-pw"},[a("label",{attrs:{for:"cardNo"}},[t._v("cvv2")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.cvv2,expression:"cvv2"}],attrs:{type:"tel",id:"cvv2",placeholder:"请输入cvv2"},domProps:{value:t.cvv2},on:{input:function(e){e.target.composing||(t.cvv2=e.target.value)}}})]),t._v(" "),a("div",{staticClass:"input-box confirm-pw"},[a("label",{attrs:{for:"kb1"}},[t._v("支付密码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"tel",maxlength:"6",id:"kb1",placeholder:"请输入卡密码"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),t._v(" "),a("button",{staticClass:"confirm",on:{click:t.confirm}},[t._v("绑卡")]),t._v(" "),a("back"),t._v(" "),a("my-toast",{staticClass:"customize-toast",attrs:{visible:t.warnTip,options:t.tipInfo},on:{hideToast:t.beHide}})],1)},staticRenderFns:[]};var d=a("VU/8")(s,c,!1,function(t){a("yr4Q")},"data-v-a32e2384",null);e.default=d.exports},yr4Q:function(t,e){}});
//# sourceMappingURL=44.77780b966d3588cefd88.js.map