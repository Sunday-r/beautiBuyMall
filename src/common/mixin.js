import { debounce } from '@/common/utils'

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