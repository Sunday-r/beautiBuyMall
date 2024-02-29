import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import bus from "./bus";

// createApp(App).config.globalProperties.$bus = bus
// // App.config.globalProperties.$bus = bus;
// createApp(App).use(router).mount('#app')

const app = createApp(App)
app.config.globalProperties.$bus = bus
app.use(router).mount('#app')
