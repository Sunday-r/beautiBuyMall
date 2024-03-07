<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content"
                ref="scroll" 
                :probe-type="3"
                @scroll="contentScroll">
                <ul>
                    <li v-for="(item,index) in $store.state.carList" :key="index">{{ item }}</li>
                </ul>
            <detail-swiper v-if="topImages!=''" :topImages="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
            <detail-param-info :param-info="paramInfo" ref="params"/>
            <detail-comment-info :comment-info="commentInfo" ref="comment"/>
            <goods-list :goods="recommends" ref="recommend"/>
        </scroll>        
        <detail-bottom-bar @addToCart="addToCart"/>    
        <back-top @click="backClick" v-show="isShowBackTop"/>            
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getDetail, Goods, Shop, GoodsParam,getRecommend} from 'network/detail.js'
import { itemListenerMixin,backTopMixin } from '@/common/mixin'
import { debounce } from '@/common/utils'


export default {
   name:'Detail',
   components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
   },
   mixins:[itemListenerMixin,backTopMixin],
   data(){
    return {
        iid: null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        ItemImageListener:null,
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0
    }
   },
   created(){
    // 1.保存传入的id
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
        // console.log(res);
        const data = res.result
        // 1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.创建店铺信息
        this.shop = new Shop(data.shopInfo)
        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo
        // 5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 6.取出评论的信息
        if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0];
        }

        //1.第一次获取，值不对
        //值不对的原因：this.$refs.params.$el压根没有渲染
        // this.themeTopYs = []
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);

        //2.第二次获取：值不对
        //值不对的原因：图片没有计算在内
        //根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片）
        // offsetTop值不对的时候，都是因为图片的问题
        // this.$nextTick(()=>{
            // this.themeTopYs = []
            // this.themeTopYs.push(0);
            // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            // console.log(this.themeTopYs);            
        // })
    })

    //3.请求推荐数据
    getRecommend().then(res =>{
        this.recommends = res.data.list;
    }),

    //4.给getThemeTopY赋值(加入防抖操作)
    this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
    }, 100)
   },
   mounted(){
    
   },
   methods:{
    imageLoad(){
        this.$refs.scroll.refresh();
        this.getThemeTopY()        
    },
    titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position){
        // console.log(position);
        // 1.获取y值
        const positionY = -position.y;
        // 2.positionY和主题中值进行对比
        let length = this.themeTopYs.length;
        for(let i = 0; i < length; i++){
            if(this.currentIndex !== i &&
                (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                this.currentIndex = i;
                // console.log(this.currentIndex);
                this.$refs.nav.currentIndex = this.currentIndex;
               }
        }
        this.listenShowBackTop(position);
    },
    addToCart(){
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.Price = this.goods.realPrice;
        product.iid = this.iid;
        // 2.添加到购物车中  npm install vuex --save
        this.$store.commit('addCart', product)
        console.log("addCart");
    }
   },
   //不在缓存里，所以不用deactivated
   unmounted() {
    // console.log("unmounted");
    this.$bus.$off('itemImageLoad',this.ItemImageListener)
   }
}
</script>
<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}

.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}

.content{
    /* height: calc(100% - 44px -58px); */
    position: fixed;
    top: 44px;
    bottom: 58px;
}
</style>
