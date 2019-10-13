/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let rootUrl = ''
let baseUrl = ''
let imgBaseUrl
let wxAppId = 'wxe413db41714cb4c7'
let wxSecret = '42604eded9c04bff44ea7f4230a09bcb'
let wxOauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize'
let wxAccessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token'
let wxRefreshTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/refresh_token'
let wxUserInfoUrl = 'https://api.weixin.qq.com/sns/userinfo'
let wxCheckTokenUrl = 'https://api.weixin.qq.com/sns/auth'
let wxOauth
let wxRedirect
let aliRedirect

if (process.env.NODE_ENV === 'development') {
  // rootUrl = 'http://192.168.1.104/sellerpok/'
  // rootUrl = 'http://192.168.2.116:82/'
  // rootUrl = 'http://shop00129.yklsh.etonepay.com/'
  rootUrl = 'http://ceshi6.sdykt.com.cn:1280/sellerpok/'
  baseUrl = rootUrl + 'index.php/openapi/catering_route/accept'
  imgBaseUrl = rootUrl + 'index.php/openapi/catering_route/accept'
  wxOauth = rootUrl + 'index.php/openapi/catering_route/esOauth'
  wxRedirect = 'http://ceshi6.sdykt.com.cn:1280/eshop/wechat.html'
  aliRedirect = 'http://ceshi6.sdykt.com.cn:1280/eshop/alipay.html'
} else if (process.env.NODE_ENV === 'production') {
  // rootUrl = 'http://192.168.2.116:82/'
  rootUrl = 'http://' + window.location.host + '/sellerpok/'
  // rootUrl = 'http://' + window.location.host + '/'
  baseUrl = rootUrl + 'index.php/openapi/catering_route/accept'
  imgBaseUrl = rootUrl + 'index.php/openapi/catering_route/accept'
  wxOauth = rootUrl + 'index.php/openapi/catering_route/esOauth'
  wxRedirect = 'http://' + window.location.host + '/eshop-ykl/wechat.html'
  aliRedirect = 'http://' + window.location.host + '/eshop-ykl/alipay.html'
}

export {
  rootUrl,
  baseUrl,
  imgBaseUrl,
  wxAppId,
  wxSecret,
  wxOauthUrl,
  wxAccessTokenUrl,
  wxRefreshTokenUrl,
  wxUserInfoUrl,
  wxCheckTokenUrl,
  wxOauth,
  wxRedirect,
  aliRedirect
}
