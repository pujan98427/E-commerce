import { defineStore } from 'pinia'
export const useCartStore = defineStore('CartStore', {
  state: () => {
    return {
      items: []
    }
  }
  // actions: {
  //     addToCart(product) {
  //         this.cart.push(product)
  //     }
  // }
})
