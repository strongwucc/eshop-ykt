import Loading from './loading.vue'

let plugin = {}

// 插件必须要有一个install方法
plugin.install = function (Vue, options = {}) {

  const LoadingController = Vue.extend(Loading)

  LoadingController.prototype.open = function () {
    this.visible = true
  }

  LoadingController.prototype.close = function () {
    this.visible = false
  }

  //创建一个loading单例
  Vue.prototype.$myLoading = (function () {
    var unique

    function getInstance(){
      if( unique === undefined ){
        unique = new Construct()
      }
      return unique;
    }

    getInstance()

    function Construct(){
      // ... 生成单例的构造函数的代码
      let instance = new LoadingController().$mount(document.createElement('div'))
      document.body.appendChild(instance.$el)
      return instance
    }

    function open() {
      unique.open()
    }

    function close() {
      unique.close()
    }

    return {
      open: open,
      close: close
    }
  })();

}

// 最后将以上内容导出，即可在其他地方进行使用
export default plugin
