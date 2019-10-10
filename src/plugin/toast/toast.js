import Toast from './Toast.vue'

let plugin = {}

// 插件必须要有一个install方法
plugin.install = function (Vue, options = {}) {

  const ToastController = Vue.extend(Toast)
  // 实现toast的关闭方法
  ToastController.prototype.close = function () {
    this.visible = false
  }

  // 在Vue原型实现toast的DOM挂载、以及功能实现
  // 用户可以在Vue实例（Vue单文件就是一个Vue实例）通过this.$toast来访问以下内容
  Vue.prototype.$myToast = (option = {}) => {
    // toast实例挂载到刚创建的div
    let instance = new ToastController().$mount(document.createElement('div'));
    let duration = option.duration || options.duration || 2500;
    // 如果用户在Vue实例中没有设置option的属性msg,则直接将option的内容作为msg信息进行toast内容进行显示
    instance.msg = typeof option === 'string' ? option : option.msg;
    instance.type = typeof option === 'string' ? '' : option.type;
    instance.visible = true;
    // 将toast的DOM挂载到body上
    document.body.appendChild(instance.$el);

    // 自动关闭功能的实现
    setTimeout(function () {
      instance.close()
    }, duration)
  }
}

// 最后将以上内容导出，即可在其他地方进行使用
export default plugin
