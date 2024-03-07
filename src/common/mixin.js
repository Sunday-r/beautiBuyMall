import { debounce } from '@/common/utils'
import BackTop from 'components/content/backTop/BackTop.vue'
import {BACKTOP_DISTANCE} from 'common/const.js'

export const itemListenerMixin = {
    data() {
        return {
            itemListenerMixin:null
        }
    },
    mounted() {
    //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh);

    //对监听的事件进行保存
    this.ItemImageListener = ()=>{
      // console.log("-----")
      // this.$refs.scroll.refresh()
      refresh()
    }
    //监听item中图片加载完成 this.ItemImageListener代表函数
    this.$bus.$on('itemImageLoad',this.ItemImageListener) 
    },    
}

export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop: false
        }
    },
    methods: {
        backClick(){
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
        listenShowBackTop(position){
            //判断BackTop是否显示
            this.isShowBackTop =  (-position.y) > BACKTOP_DISTANCE;
        }
    },
}