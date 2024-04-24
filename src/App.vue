<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import ProductList from '@/components/productLists/index.vue'
import Header from '@/components/Header.vue'
import { useProductStore } from '@/stores/ProductStore'
import { useCartStore } from '@/stores/CartStore'
import Footer from '@/components/Footer.vue'
const cartStore = useCartStore()
const productStore = useProductStore()
productStore.fill()
</script>

<template>
  <Header />
  <main>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-xl font-bold text-gray-900">Customers also bought</h2>

        <div
          class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          <ProductList
            v-for="(product, index) in productStore.products"
            :key="index"
            :product="product"
            @addToCart="cartStore.addItems($event, product)"
          />
        </div>
      </div>
    </div>
  </main>
  <Footer />

  <RouterView />
</template>
