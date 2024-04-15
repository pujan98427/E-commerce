<script setup lang="ts">
import { ref } from 'vue'
import AppCountInput from '@/components/AppCountInput.vue'

const props = defineProps({
  product: []
})
interface Product {
  id: number
  name: string
  color: string
  href: string
  imageSrc: string
  imageAlt: string
  price: string
}
const product: Product = props.product

const emits = defineEmits(['addToCart'])
const count = ref(0)
const addToCart = () => {
  emits('addToCart', count.value)
  count.value = 0
}
</script>

<template>
  <div>
    <div class="relative h-72 w-full overflow-hidden rounded-lg">
      <img
        :src="product.imageSrc"
        :alt="product.imageAlt"
        class="h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
      />
    </div>
    <div class="relative mt-4 text-center">
      <h3 class="text-sm font-medium text-gray-900">
        <a :href="product.href">{{ product.name }}</a>
      </h3>
      <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
    </div>
    <div class="mt-4 text-center">
      <p class="relative text-lg font-semibold text-black">{{ product.price }}</p>
    </div>
    <AppCountInput v-model="count" />

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
