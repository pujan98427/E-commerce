<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useProductStore } from '@/stores/ProductStore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels
} from '@headlessui/vue'
import StarIcon from '../icons/StarIcon.vue'
const productStore = useProductStore()
productStore.fill()
const route = useRoute()
const product = ref([])

// import { StarIcon } from '@heroicons/vue/20/solid'
// import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
onMounted(() => {
  product.value = productStore.products[route.params.id - 1]
})

// const selectedColor = ref(product.colors[0])
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
              <p class="text-3xl tracking-tight text-gray-900">{{ product.price }}</p>
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

            <form class="mt-6">
              <!-- Colors -->
              <!-- <div> -->
              <!-- <h3 class="text-sm text-gray-600">Color</h3>

                <RadioGroup v-model="selectedColor" class="mt-2">
                  <RadioGroupLabel class="sr-only">Choose a color</RadioGroupLabel>
                  <span class="flex items-center space-x-3">
                    <RadioGroupOption
                      as="template"
                      v-for="color in product.colors"
                      :key="color.name"
                      :value="color"
                      v-slot="{ active, checked }"
                    >
                      <div
                        :class="[
                          color.selectedColor,
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                        ]"
                      >
                        <RadioGroupLabel as="span" class="sr-only">{{
                          color.name
                        }}</RadioGroupLabel>
                        <span
                          aria-hidden="true"
                          :class="[
                            color.bgColor,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          ]"
                        />
                      </div>
                    </RadioGroupOption>
                  </span>
                </RadioGroup>
              </div> -->

              <div class="mt-10 flex">
                <button
                  type="submit"
                  class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
