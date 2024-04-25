import { defineStore, acceptHMRUpdate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { groupBy } from 'lodash'
import { useAuthUserStore } from './AuthUser'
import type { CartItem, CartState } from '../types/CategoryTypes'

export const useCartStore = defineStore('CartStore', {
  state: (): CartState => {
    return {
      items: useLocalStorage('cartStore:items', []),
      count: 0
    }
  },
  getters: {
    count: (state): number => state.items.length,
    isEmpty: (state): boolean => state.count === 0,
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name)
      const sorted = Object.keys(grouped).sort()
      const inOrder = {}
      sorted.forEach((key) => (inOrder[key] = grouped[key]))
      return inOrder
    },
    groupCount: (state) => (name: string) => state.grouped[name].length,
    totalCost: (state): number => state.items.reduce((p, c) => p + parseInt(c.price), 0)
  },

  actions: {
    checkout() {
      const authUserStore = useAuthUserStore()
      alert(
        `${authUserStore.username} just brought ${this.count} items at a total of $${this.totalCost}`
      )
    },
    addItems(count: number, items: CartItem[]) {
      count = parseInt(String(count))
      for (let index = 0; index < count; index++) {
        this.items.push({ ...items })
      }
    },
    removeItem(productId: string) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    setItemCount(item: CartItem, count: number) {
      this.removeItem(item.id)
      this.addItems(count, item)
    },
    resetItems() {
      this.$reset()
      this.items = []
    }
  }
})
// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
