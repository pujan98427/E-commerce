<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductList from '@/components/productLists/index.vue'
import Header from '@/components/Header.vue'
import { useProductStore } from '@/stores/ProductStore'
import { useCartStore } from '@/stores/CartStore'
import Footer from '@/components/Footer.vue'
const cartStore = useCartStore()
const productStore = useProductStore()

productStore.fill()
const product = ref([])
const route = useRoute()
function showAll() {
  productStore.filterText = ''
  productStore.fill()
}
const pagination = ref({
  currentPage: 1,
  maxPerPost: 8
})

const getRouteProduct = productStore.products.filter((product) => product.id == route.params.id)
const categoryProduct = productStore.products.filter(
  (product) => product.category == getRouteProduct[0].category
)

const paginatedOrders = computed(() => {
  return categoryProduct.slice(0, pagination.value.currentPage * pagination.value.maxPerPost)
})
function loadMore() {
  pagination.value.currentPage += 0.5
}
product.value = productStore.products[route.params.id - 1]
</script>

<template>
  <Header />
  <main>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 text-center">Latest Product</h2>

        <div
          class="mt-8 md:mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          <ProductList
            v-for="(product, index) in paginatedOrders"
            :key="index"
            :product="product"
            @addToCart="cartStore.addItems($event, product)"
          />
        </div>
        <div class="text-center" v-if="productStore.filterText !== ''">
          <button
            class="mt-8 rounded-md max-w-[220px] w-full border border-transparent bg-indigo-600 px-10 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="showAll"
          >
            Show All
          </button>
        </div>
        <div class="text-center" v-if="productStore.filterText == ''">
          <button
            v-if="
              pagination.currentPage * pagination.maxPerPost < categoryProduct.length &&
              categoryProduct.length > 4
            "
            class="mt-16 rounded-md max-w-[220px] w-full border border-transparent bg-indigo-600 px-10 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="loadMore"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
