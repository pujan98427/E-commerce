import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useProductStore = defineStore('ProductStore', {
  state: () => ({
    products: useLocalStorage('productStore:products', []),
    filterText: ''
  }),
  actions: {
    async fill() {
      const productData = (await import('@/data/products.json')).default
      if (this.filterText == '') {
        this.products = productData
      } else {
        this.showAllButtton = true
        const filteredProducts = productData.filter((product) =>
          product.name.toLowerCase().includes(this.filterText.toLowerCase())
        )
        this.products = filteredProducts
      }
    },
    filterReceivedText(newText: string) {
      this.filterText = newText
      this.fill() // Call the fill method whenever filterText changes
    }
  }
})
