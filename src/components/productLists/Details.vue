<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useProductStore } from '@/stores/ProductStore'
import RelatedProduct from '@/components/productLists/index.vue'
import { useCartStore } from '@/stores/CartStore'
import { computed, ref, watchEffect, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppCountInput from '@/components/AppCountInput.vue'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import StarIcon from '../icons/StarIcon.vue'
const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
productStore.fill()
const product = ref(null)

const count = ref(0)
const addToCart = () => {
  cartStore.addItems(count.value, product.value)
}

// Fetch the product based on route params
const getProduct = () => {
  const productId = route.params.id
  if (productId) {
    product.value = productStore.products.find((p) => p.id == productId)
    console.log('Selected product:', product.value)
  }
}

const relatedProducts = computed(() => {
  if (product.value && product.value.category) {
    return productStore.products
      .filter((p) => p.id !== product.value.id) // Exclude the current product
      .filter((p) => p.category === product.value.category) // Filter by category
      .slice(0, 4)
  } else {
    console.warn('Product or its category is undefined.')
    return []
  }
})

watchEffect(() => {
  getProduct()

  console.log('relatedproduct', relatedProducts.value)
})
</script>
<template>
  <Header />
  <main>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <!-- Image gallery -->
          <TabGroup as="div" class="flex flex-col-reverse">
            <!-- Image selector -->
            <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList class="grid grid-cols-4 gap-6">
                <Tab
                  v-for="image in product.images"
                  :key="image.id"
                  class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  v-slot="{ selected }"
                >
                  <span class="absolute inset-0 overflow-hidden rounded-md">
                    <img :src="image" alt="" class="h-full w-full object-cover object-center" />
                  </span>
                  <span
                    :class="[
                      selected ? 'ring-indigo-500' : 'ring-transparent',
                      'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                    ]"
                    aria-hidden="true"
                  />
                </Tab>
              </TabList>
            </div>

            <TabPanels class="aspect-h-1 aspect-w-1 w-full">
              <TabPanel v-for="image in product.images" :key="image.id">
                <img
                  :src="image"
                  :alt="product.imageAlt"
                  class="h-full w-full object-cover object-center sm:rounded-lg"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <!-- Product info -->
          <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>

            <div class="mt-3">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl tracking-tight text-gray-900">${{ product.price }}</p>
            </div>

            <!-- Reviews -->
            <div class="mt-3">
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <div class="flex items-center">
                  <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[
                      product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0'
                    ]"
                    aria-hidden="true"
                  />
                </div>
                <p class="sr-only">{{ product.rating }} out of 5 stars</p>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="sr-only">Description</h3>

              <div class="space-y-6 text-base text-gray-700" v-html="product.description" />
            </div>

            <div class="mt-10">
              <AppCountInput class="flex" v-model="count" />
              <button
                @click="addToCart"
                class="mt-6 max-w-xs rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
        <!-- Related Product -->
        <div class="mt-10">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 text-center">
            Related Products
          </h2>
          <div
            class="mt-8 md:mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            :key="relatedProducts.id"
          >
            <RelatedProduct
              v-for="(product, index) in relatedProducts"
              :key="index"
              :product="product"
              @addToCart="cartStore.addItems($event, product)"
            />
          </div>
          <!-- <pre>
    {{ JSON.stringify(relatedProducts, null, 2) }}
  </pre 
          >-->
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
