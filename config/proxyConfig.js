module.exports = {
  proxy: {
    '/sellerpok': {    //将www.exaple.com印射为/apis
      //target: 'http://192.168.2.116:82',  // 接口域名116
      target: 'http://eshop.test:8081',  // 接口域名123
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
    },
    '/': {    //将www.exaple.com印射为/apis
      target: 'http://192.168.2.116:82',  // 接口域名116
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
    }
  }
}
