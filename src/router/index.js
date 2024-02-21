import { createApp } from 'vue'
// import Router from 'vue-router'
import {createRouter, createWebHistory} from "vue-router";

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

// 1.安装插件
// createApp().use(Router)

// 2.创建路由对象
const routes = [
    {
        //重定向
        path:'',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/category',
        component:Category
    },
    {
        path:'/cart',
        component:Cart
    },
    {
        path:'/profile',
        component:Profile
    }
]
// const router = new Router({
//     routes,
//     mode:'history'
// })
const router = createRouter({
    history: createWebHistory(),
    routes
})

//3.导出router
export default router