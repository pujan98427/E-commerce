<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
const products = ref([])
const fetchProducts = (): void => {
  axios.get('http://localhost:3000/products').then((response) => {
    console.log(response.data)
    products.value = response.data.slice().reverse()
    console.log('products', products.value)
  })
}
const deleteProduct = (Id) => {
  axios.delete(`http://localhost:3000/products/${Id}`).then((response) => {
    fetchProducts()
    console.log(response.data)
  })
}
onMounted(() => {
  fetchProducts()
})
</script>
<template>
  <div
    class="mt-8 md:mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
  >
    <div class="group" v-for="product in products" :key="product.id">
      <div class="relative h-72 w-full overflow-hidden rounded-lg">
        <router-link :to="{ name: 'details', params: { id: product.id } }">
          <img
            :src="product.imageSrc"
            :alt="product.imageAlt"
            class="h-full w-full object-cover transition-all scale-100 group-hover:scale-110 duration-300 object-center"
          />
        </router-link>
        <router-link
          :to="{ name: 'details', params: { id: product.id } }"
          class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
        />
      </div>
      <div class="relative mt-4 text-center">
        <h3 class="text-lg font-medium text-gray-900">
          <router-link
            :to="{ name: 'details', params: { id: product.id } }"
            class="hover:text-indigo-600"
          >
            {{ product.name }}
          </router-link>
        </h3>
        <route-link to="#" class="mt-1 text-sm text-gray-500">{{ product.category }}</route-link>
      </div>
      <div class="mt-4 text-center">
        <p class="relative text-lg font-semibold text-black">${{ product.price }}</p>
      </div>
      <AppCountInput class="flex justify-center mt-6" v-model="count" />

      <div class="mt-6">
        <Button
          @click="addToCart"
          class="relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
          >Add to bag<span class="sr-only">, {{ product.name }}</span></Button
        >
        <Button
          @click="deleteProduct(product.id)"
          class="relative mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
          >Delete</Button
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
