<template>
  <tab-bar>
      <tab-bar-item path="/home">
        <template v-slot:item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>
        <template v-slot:item-icon-active><img src="~assets/img/tabbar/home_active.svg"></template>
        <template v-slot:item-text><div>首页</div></template>
        <!-- <img slot="item-icon" src="assets/img/tabbar/home.svg" alt=""> -->
        <!-- <img slot="item-icon-active" src="assets/img/tabbar/home_active.svg" alt=""> -->
        <!-- <div slot="item-text">首页</div> -->
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template v-slot:item-icon><img src="~assets/img/tabbar/category.svg"></template>
        <template v-slot:item-icon-active><img src="~assets/img/tabbar/category_active.svg"></template>
        <template v-slot:item-text><div>分类</div></template>
        <!-- <img slot="item-icon" src="assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div> -->
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template v-slot:item-icon><img src="~assets/img/tabbar/shopcart.svg"></template>
        <template v-slot:item-icon-active><img src="~assets/img/tabbar/shopcart_active.svg"></template>
        <template v-slot:item-text><div>购物车</div></template>
        <!-- <img slot="item-icon" src="assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon-active" src="assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div> -->
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template v-slot:item-icon><img src="~assets/img/tabbar/profile.svg"></template>
        <template v-slot:item-icon-active><img src="~assets/img/tabbar/profile_active.svg"></template>
        <template v-slot:item-text><div>我的</div></template>
        <!-- <img slot="item-icon" src="assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div> -->
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue';
import TabBarItem from 'components/common/tabbar/TabBarItem.vue';

export default {
    name:'MainTabBar',
    components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  /* @import "./assets/css/base.css";   */
</style>