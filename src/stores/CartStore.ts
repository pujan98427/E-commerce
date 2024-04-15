import { defineStore } from 'pinia'
export const useCartStore = defineStore('CartStore', {
  state: () => {
    return {
      items: []
    }
  },
  actions: {
    addItems(count: number, items: []) {
      count = parseInt(String(count))
      for (let index = 0; index < count; index++) {
        this.items.push({ ...items })
      }
    }
  }
})
