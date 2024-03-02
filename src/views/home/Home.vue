<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
    <tab-control  :titles="['流行','新款','精选']" 
                    @tabClick="tabClick" 
                    ref="tabControl1"
                    class="tab-control"
                    v-show="isTabFixed"
                    />
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad" />
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control  :titles="['流行','新款','精选']" 
                    @tabClick="tabClick" 
                    ref="tabControl2"
                    />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>   
    <back-top @click="backClick" v-show="isShowBackTop"/> 
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView';

import NavBar from '@/components/common/navbar/NavBar.vue';
import TabControl from '@/components/content/tabControl/TabControl.vue';
import GoodsList from '@/components/content/goods/GoodsList.vue';
import Scroll from '@/components/common/scroll/Scroll.vue';
import BackTop from '@/components/content/backTop/BackTop.vue'


import { getHomeMultidata,getHomeGoods } from '@/network/home';
import { debounce } from '@/components/common/utils';


export default {
    name:'Home',
    components:{     
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 0, list:[]},
          'new':{page: 0, list:[]},
          'sell':{page: 0, list:[]}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY);
    },
    // 离开
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
    },
    created(){
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      
    },
    mounted(){
      //1.图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh);
      //监听item中图片加载完成
      this.$bus.$on('itemImageLoad',()=>{
        // console.log("-----")
        // this.$refs.scroll.refresh()
        refresh()
      })  
    },
    methods:{
      /**
       * 事件监听相关的方法
       */      
      tabClick(index){
        // console.log(index);
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break          
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
       this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position){
        // console.log(position);
        //1.判断BackTop是否显示
        this.isShowBackTop =  (-position.y) > 1000;
        //2.决定TabControl是否吸顶（position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
        // console.log(this.tabOffsetTop);
        // console.log(this.isTabFixed)
      },
      loadMore(){
        // console.log("shanglajiazai ");
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad(){
        //获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
       
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata(){
          getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;   
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();
      })
      }
    }
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height:100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  /* .tab-control{
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  .content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* 确定中间的高度的两种方法 见上和下 */
  /* .content{
    height: calc(100vh-98px);
    overflow: hidden;
    /* margin-top: 44px; 
  } */
  /* .wrapper{
    height: 100%;
  } */
  .tab-control{
    position: relative;
    z-index: 9;
  }
 
</style>