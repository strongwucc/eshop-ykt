webpackJsonp([32],{JmlQ:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAABACAYAAADF9O+2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRGNEUzN0UzOTk2QjExRThCNTZDRkQwNTEwODA0OEQxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRGNEUzN0U0OTk2QjExRThCNTZDRkQwNTEwODA0OEQxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEY0RTM3RTE5OTZCMTFFOEI1NkNGRDA1MTA4MDQ4RDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEY0RTM3RTI5OTZCMTFFOEI1NkNGRDA1MTA4MDQ4RDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DU2HnAAABiElEQVR42uzdMUoDQRSH8VlJq1iaYCtap9IjeI54Fk+hR0haRez1CPEAGktF+/WtmYgIYhMXn/w++JMwKfKY+XiTXZJMMx6PSzKOI+eRYbK6F5FJ5KIkpEkoykNCST7LMspY+CBhzStJmmR1t4kFLxsFIAqIAqKAKCAKiAKimAIQBUQBUUAUEAVEAYgCooAoIAqIAqKAKABRQBQQBUQBUUAU/HO63x63Pb1XY7p/hbYvUSxgbnpZP1sPiAKigCggCogCogBEAVFAFPTNIHHtreXTUaCjrI2M/1yto8DWAxAFRAFR1s5eZBp5rpnWMayuHBIe7NSu+apnP3Ib2f4y/hQ5jNz90bp1lJ45rZJcluXpXKP6fLu+Bh3lnW6r2aqCLOpYd1JXdyTda2RTR9FRflpUEOWD6/p4FtmJ7JblKagdV6bH1rPiIHLzzYfZo8jc1qOjlCpCd3Uzi7zUzOrY3PToKOrWUUAUEAVEQXIyfsOtu3s6LDlvij3qKP1xknTC7yOTrKK8CTAA1Dk1UtAKglEAAAAASUVORK5CYII="},gQht:function(e,t){},mmRM:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("woOf"),r=i.n(o),n=i("Dd8w"),s=i.n(n),a=i("GJzV"),c=i("NYxO"),l=i("VUa8"),p=i("uaSg"),d=i("3XNK"),h={name:"change_tel",data:function(){return{newTel:"",veriCode:"",grapCode:"",wait60s:!1,second:60,tipInfo:{type:"",txt:""},warnTip:!1,verifyErrorCount:0,vcode:p.c+"index.php/index-gen_vcode-b2c-4.html",grapCodeCheckSend:!1,grapCodeCheckSuccess:!1}},components:{MyToast:a.a,back:d.a},computed:s()({},Object(c.c)(["user"])),watch:{grapCode:function(e){var t=this;4!==e.length||this.grapCodeCheckSend||this.grapCodeCheckSuccess||(this.grapCodeCheckSend=!0,this.$http.post(this.API.auth.check_grap_code,{code:this.grapCode}).then(function(e){if(t.grapCodeCheckSend=!1,"0000"!==e.return_code)return t.warnTip=!0,t.tipInfo={type:"error",txt:"验证码错误"},!1;t.grapCodeCheckSuccess=!0}))}},created:function(){},methods:s()({},Object(c.b)(["set_user_info"]),{beHide:function(e){this.warnTip=e},clearTel:function(){this.newTel=""},getVeriCode:function(){var e=this;if(!(this.verifyErrorCount>=3)||this.grapCodeCheckSuccess)return l.a.check_mobile(this.newTel)?this.newTel===this.$store.state.user.user_info.mobile?(this.warnTip=!0,void(this.tipInfo={type:"error",txt:"请勿输入相同手机号"})):void this.$http.post(this.API.auth.mobile_code,{phoneNumber:this.newTel,type:"change_tel"}).then(function(t){if("0000"!==t.return_code)return e.warnTip=!0,void(e.tipInfo={type:"error",txt:t.return_msg});var i=e;i.wait60s=!0;var o=setInterval(function(){i.second-=1,0===i.second&&(clearInterval(o),i.wait60s=!1,i.second=60)},1e3)}):(this.warnTip=!0,void(this.tipInfo={type:"error",txt:"请输入正确的手机号"}))},confirm:function(){var e=this;return l.a.check_mobile(this.newTel)?this.newTel===this.nowTel?(this.warnTip=!0,void(this.tipInfo={type:"error",txt:"请勿输入相同手机号"})):this.veriCode?void this.$http.post(this.API.user.change_mobile,{phoneNumber:this.newTel,smsCode:this.veriCode,type:"change_tel"}).then(function(t){if("0000"===t.return_code){e.warnTip=!0,e.tipInfo={type:"success",txt:"修改成功"};var i=e.$store.state.user.user_info,o=r()(i,{mobile:e.newTel});return e.set_user_info(o),e.$router.go(-1),!0}return e.verifyErrorCount+=1,e.warnTip=!0,void(e.tipInfo={type:"error",txt:t.return_msg})}):(this.warnTip=!0,void(this.tipInfo={type:"error",txt:"请输入验证码"})):(this.warnTip=!0,void(this.tipInfo={type:"error",txt:"请输入正确的手机号"}))},vcodeRefresh:function(){var e=Math.random();this.vcode=p.c+"index.php/index-gen_vcode-b2c-4.html?i="+e}})},v={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"change-tel-page"},[o("img",{staticClass:"icon",attrs:{src:i("JmlQ")}}),e._v(" "),o("p",{staticClass:"now-tel"},[e._v("当前手机号 "),o("span",[e._v(e._s(e.user.user_info.mobile))])]),e._v(" "),e._m(0),e._v(" "),o("div",{staticClass:"input-box new-tel"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.newTel,expression:"newTel"}],attrs:{type:"tel",placeholder:"请输入新的手机号"},domProps:{value:e.newTel},on:{input:function(t){t.target.composing||(e.newTel=t.target.value)}}}),e._v(" "),o("i",{directives:[{name:"show",rawName:"v-show",value:e.newTel.length,expression:"newTel.length"}],staticClass:"clear",on:{click:e.clearTel}},[o("img",{attrs:{src:i("j33x")}})])]),e._v(" "),e.verifyErrorCount>=3?o("div",{staticClass:"input-box graphic-code"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.grapCode,expression:"grapCode"}],attrs:{type:"text",placeholder:"请输入图形验证码",maxlength:4},domProps:{value:e.grapCode},on:{input:function(t){t.target.composing||(e.grapCode=t.target.value)}}}),e._v(" "),o("div",{staticClass:"graphic"},[e.grapCodeCheckSuccess?e._e():o("img",{staticClass:"code",attrs:{alt:"验证码",src:e.vcode},on:{click:e.vcodeRefresh}}),e._v(" "),e.grapCodeCheckSuccess?o("div",{staticClass:"success"},[o("img",{attrs:{src:i("j1tw")}})]):e._e()])]):e._e(),e._v(" "),o("div",{staticClass:"input-box veri-code"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.veriCode,expression:"veriCode"}],attrs:{type:"tel",maxlength:"6",placeholder:"请输入验证码"},domProps:{value:e.veriCode},on:{input:function(t){t.target.composing||(e.veriCode=t.target.value)}}}),e._v(" "),o("div",{staticClass:"get-veri-code"},[e.wait60s?e._e():o("button",{style:{backgroundColor:e.verifyErrorCount>=3&&!e.grapCodeCheckSuccess?"#e5e5e5":"#ffe169"},on:{click:e.getVeriCode}},[e._v("获取验证码")]),e._v(" "),e.wait60s?o("div",{staticClass:"_60s"},[e._v(e._s(e.second)+"s后重发")]):e._e()])]),e._v(" "),o("button",{staticClass:"confirm",on:{click:e.confirm}},[e._v("确定")]),e._v(" "),o("back"),e._v(" "),o("my-toast",{staticClass:"customize-toast",attrs:{visible:e.warnTip,options:e.tipInfo},on:{hideToast:e.beHide}})],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("p",{staticClass:"tip"},[this._v("修改手机号后，会员余额、会员积分等"),t("br"),this._v("所有顾客信息将转移到新的手机号")])}]};var u=i("VU/8")(h,v,!1,function(e){i("gQht")},"data-v-79d3b0f7",null);t.default=u.exports}});
//# sourceMappingURL=32.2c74f8d391cc02de8b32.js.map