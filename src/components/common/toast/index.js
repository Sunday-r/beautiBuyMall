import { createApp } from 'vue';

import Toast from './Toast'

const createMount = options => {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)

  const app = createApp(Toast, {
    ...options,
    remove() {
      app.unmount(mountNode)
      document.body.removeChild(mountNode)
    }
  })
  return app.mount(mountNode)
}

const toast = options => {
  return createMount(options)
}

// toast.install = app => {
//   app.component('Toast', Toast)
//   app.config.globalProperties.$toast = new toast()
// }

//vue2方法
// const obj = {}

// obj.install = function (Vue) {
//   // 1.创建组件构造器
//   const toastContrustor = Vue.extend(Toast)

//   // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
//   const toast = new toastContrustor()

//   // 3.将组件对象手动挂载到某一个元素上
//   toast.$mount(document.createElement('div'))

//   // 4.toast.$el对应的就是div
//   document.body.appendChild(toast.$el)

//   Vue.prototype.$toast = toast
// }

export default toast