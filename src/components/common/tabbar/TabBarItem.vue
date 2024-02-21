<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot  name="item-icon"></slot></div>    
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot> </div>      
  </div>
</template>

<script>
export default {
    name:'TabBatItem',
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return{
            // isActive:false
        }
    },
    computed:{
        isActive(){
            //indexOf方法判断里面包不包含 ！==-1 就是包含
            return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle(){
            return this.isActive? {color:this.activeColor} : {}
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path)
            // this.isActive = !this.isActive  //这个不能保证每次只有一个活跃
        }
    }
}
</script>

<style>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    color: red;
  }
</style>