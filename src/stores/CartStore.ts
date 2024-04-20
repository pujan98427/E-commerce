import { defineStore } from 'pinia'
import { groupBy } from 'lodash'
export const useCartStore = defineStore('CartStore', {
  state: () => {
    return {
      items: []
    }
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.name),
    groupCount: (state) => (name) => state.grouped[name].length,
    totalCost: (state) => state.items.reduce((p, c) => p + parseInt(c.price), 0)
  },

  actions: {
    addItems(count: number, items: []) {
      count = parseInt(String(count))
      for (let index = 0; index < count; index++) {
        this.items.push({ ...items })
      }
    },
    removeItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
    }
  }
})
