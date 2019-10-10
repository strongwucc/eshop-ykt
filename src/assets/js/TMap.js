export function TMap() {
  return new Promise(function (resolve, reject) {
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"
    script.onerror = reject
    document.head.appendChild(script)
    script.onload = function(){
      var geolocation = new qq.maps.Geolocation("7UIBZ-BFO3V-7RXPM-UPRZE-OR2T3-QVFPN", "eshopkey")
      resolve(geolocation)
    };
  })
}
