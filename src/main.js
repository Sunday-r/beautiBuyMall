import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import bus from "./bus";
import store from './store';

import VueLazyLoad from 'vue3-lazyload'
import 'lib-flexible/flexible.js'

// import toast from 'components/common/toast/index'

// createApp(App).config.globalProperties.$bus = bus
// // App.config.globalProperties.$bus = bus;
// createApp(App).use(router).mount('#app')

const app = createApp(App)
app.config.globalProperties.$bus = bus
app.use(router).use(store)

// 安装自定义插件toast
// app.use(toast)

//图片懒加载
app.use(VueLazyLoad, {
    // options...
    loading: '',//可以放加载时的图片，占位图
    error: '',
  })

app.mount('#app')
