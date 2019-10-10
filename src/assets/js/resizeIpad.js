
		var w_w = window.innerWidth;
		function IsPC(){
		   var userAgentInfo = navigator.userAgent;
		   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		   var flag = true;
		   for (var v = 0; v < Agents.length; v++) {
		       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
		   }
		   return flag;
		}
		var h = document.getElementsByTagName('html');
		var dpr = h[0].getAttribute("data-dpr");

		if(w_w/dpr >= 768 && !IsPC()){
			h[0].setAttribute(
				"data-dpr","2",
			)
			// h.css({
			// 	"font-size":(w_w/dpr/10)+"px",
			// })
			h[0].style.fontSize = (w_w/dpr/10)+"px"
		}
