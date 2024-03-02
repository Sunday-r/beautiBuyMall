<template>
  <div id="App">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>    
    <main-tab-bar/>
  </div>
</template>
<script>
import MainTabBar from 'components/content/MainTabBar.vue';

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
