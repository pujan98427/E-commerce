<script setup lang="ts">
import { ref, watch } from 'vue'
import AppCountInput from '@/components/AppCountInput.vue'

const props = defineProps({
  product: []
})
interface Product {
  id?: number
  name?: string
  color?: string
  href?: string
  imageSrc?: string
  imageAlt?: string
  price?: string
}
watch(
  () => props.product,
  (newVal, oldVal) => {
    const product: Product = props.product
  }
)

const emits = defineEmits(['addToCart'])
const count = ref(0)
const addToCart = () => {
  emits('addToCart', count.value)
}
</script>

<template>
  <div class="group">
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
      <router-link
        :to="{ name: 'category', params: { id: product.id } }"
        class="mt-1 text-sm text-gray-500 hover:text-indigo-600"
        >{{ product.category }}</router-link
      >
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
    </div>
  </div>
</template>

<style scoped></style>
