<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{ totalPrice }}
    </div>
    <div class="calculate">
      去计算 ({{ checkLength }})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex';

	export default {
		name: "CartBottomBar",
    components: {
		  CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥'+ this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item)=>{
          return preValue + item.Price *item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.cartList.length === 0) return false;
        return this.cartList.every(item => item.checked)
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){//全部选中
          this.cartList.forEach(item => item.checked = false);
        }else{//部分或全部不选中
          this.cartList.forEach(item => item.checked = true);
        }
        // 简化写法失败，因为同时在影响着item的checked属性，isSelectAll是基于此的,在相互影响
        // this.cartList.forEach(item => item.checked = !isSelectAll);

      }
    }
   
	}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;

  display: flex;
  justify-content: space-between;
  position: relative;
  line-height: 40px;  
}
.check-content{
  display: flex;
  
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 10px 10px;
}
.calculate{
  padding: 0 10px;
  background-color: rgb(255, 154, 46);
  font-size: small;
}
</style>
