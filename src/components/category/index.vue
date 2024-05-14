<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useProductStore } from '@/stores/ProductStore'
const productStore = useProductStore()

productStore.fill()

const categories = [
  ...new Map(
    productStore.products
      .filter((product) => product.category)
      .map((product) => [
        product.category,
        {
          id: product.id,
          name: product.category,
          imageSrc: product.images[0]
        }
      ])
  ).values()
]
</script>
<template>
  <Header />
  <main>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 text-center">Shop by Category</h2>

        <div class="mt-8 md:mt-16">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-4 xl:gap-x-">
            <transition-group appear name="fade-slide" mode="out-in">
              <router-link
                v-for="product in categories"
                :key="product.name"
                :to="{ name: 'category', params: { id: product.id } }"
                class="relative group flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
              >
                <span aria-hidden="true" class="absolute inset-0">
                  <img
                    :src="product.imageSrc"
                    alt=""
                    class="h-full w-full object-cover transition-all scale-100 group-hover:scale-110 duration-300 object-center"
                  />
                </span>
                <span
                  aria-hidden="true"
                  class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                />
                <span
                  class="relative mt-auto text-center text-xl font-bold text-white group-hover:text-indigo-600"
                  >{{ product.name }}</span
                >
              </router-link>
            </transition-group>
          </div>
        </div>

        <div class="mt-6 px-4 sm:hidden">
          <a href="#" class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
