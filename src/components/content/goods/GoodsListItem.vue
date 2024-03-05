<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return{}
      }
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('itemImageLoad');
      // console.log('imageLoad');

      //只在主页中的加载完了发送通知  【方法1】
      // if(this.$route.path.indexOf('/home')){
      //   this.$bus.$emit('homeItemImageLoad');
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailItemImageLoad');
      // }
      //【方法2】在home中离开时取消全局监听

    },
    itemClick(){
      // console.log("tiaozhuan到详情页");
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>