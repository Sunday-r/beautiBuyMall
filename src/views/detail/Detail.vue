<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"/>
        <scroll class="content" ref="scroll">
            <detail-swiper v-if="topImages!=''" :topImages="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
            <detail-param-info :param-info="paramInfo"/>
            <detail-comment-info :comment-info="commentInfo"/>
            <goods-list :goods="recommends"/>
        </scroll>               
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

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getDetail, Goods, Shop, GoodsParam,getRecommend} from 'network/detail.js'
import { itemListenerMixin } from '@/common/mixin'


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
    GoodsList,
    Scroll
   },
   mixins:[itemListenerMixin],
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
        ItemImageListener:null
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
    })

    //3.请求推荐数据
    getRecommend().then(res =>{
        this.recommends = res.data.list;
    })
   },
   mounted(){
    
   },
   methods:{
    imageLoad(){
        this.$refs.scroll.refresh()
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
    height: calc(100% - 44px);
}
</style>
