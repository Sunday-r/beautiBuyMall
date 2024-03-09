import { createApp } from 'vue'
import { createStore } from 'vuex'

import getters from './getters'
// 1.安装插件 在main.js里面
// 2.创建Store对象
const store = createStore({
  state () {
    return {
        cartList:[]
    }
  },
  getters,
  mutations: {
    // mutations唯一的目的就是修改state中状态
    // mutations中的每个方法尽可能完成的事件比较单一
    addCounter(state,payload){
      payload.count += 1
    },
    addToCart(state, payload){
      payload.checked = true;
      state.cartList.push(payload)
    }
  },
  actions:{
    addToCart(context, payload){
        //payload是新添加的商品
        // 1.查找之前的数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 2.判断oldProduct
        if(oldProduct){            
            // oldProduct.count += 1;
            context.commit('addCounter',oldProduct)
        }else {
            payload.count = 1;
            // console.log('lalalal');
            // context.state.cartList.push(payload);
            context.commit('addToCart', payload)

        }        
    }
  }
})

// 3.挂载Vue实例上
export default store