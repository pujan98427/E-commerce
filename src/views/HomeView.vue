<script setup lang="ts">
import ProductList from '@/components/productLists/index.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useProductStore } from '@/stores/ProductStore'
const productStore = useProductStore()

productStore.fill()

let categories = [
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
categories = categories.slice(0, 3)
const sliceProducts = productStore.products.slice(0, 4)

// https://www.youtube.com/watch?v=cfiN8lCA3RM
// https://github.com/thecodeholic/vue-meals-app/blob/main/src/components/MealItem.vue
</script>

<template>
  <Header />
  <main>
    <div class="relative">
      <!-- Background image and overlap -->
      <div aria-hidden="true" class="absolute inset-0 hidden sm:flex sm:flex-col">
        <div class="relative w-full flex-1 bg-gray-800">
          <div class="absolute inset-0 overflow-hidden">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
              alt=""
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div class="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div class="h-32 w-full bg-white md:h-40 lg:h-48" />
      </div>

      <div class="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
        <!-- Background image and overlap -->
        <div aria-hidden="true" class="absolute inset-0 flex flex-col sm:hidden">
          <div class="relative w-full flex-1 bg-gray-800">
            <div class="absolute inset-0 overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                alt=""
                class="h-full w-full object-cover object-center"
              />
            </div>
            <div class="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div class="h-48 w-full bg-white" />
        </div>
        <div class="relative py-32">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-5xl">
            Mid-Season Sale
          </h1>
          <div class="mt-6 sm:mt-10">
            <router-link
              :to="{ name: 'shop' }"
              class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
              >Shop Collection</router-link
            >
          </div>
        </div>
      </div>

      <section aria-labelledby="collection-heading" class="relative -mt-96 sm:mt-0">
        <h2 id="collection-heading" class="sr-only">Collections</h2>
        <div
          class="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8"
        >
          <div
            v-for="collection in categories"
            :key="collection.name"
            class="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto"
          >
            <div>
              <div aria-hidden="true" class="absolute inset-0 overflow-hidden rounded-lg">
                <div class="absolute inset-0 overflow-hidden group-hover:opacity-75">
                  <img
                    :src="collection.imageSrc"
                    :alt="collection.imageAlt"
                    class="h-full w-full object-cover object-center transition-all scale-100 group-hover:scale-110 duration-300"
                  />
                </div>
                <div
                  class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
                />
              </div>
              <div
                class="absolute inset-0 flex items-end justify-center text-center rounded-lg p-6"
              >
                <div>
                  <h3 class="mt-1 font-semibold text-white">
                    <router-link
                      :to="{ name: 'category', params: { id: collection.id } }"
                      class="transitio-all ease-in-out duration-300 group-hover:text-indigo-600"
                    >
                      <span class="absolute inset-0" />
                      {{ collection.name }}
                    </router-link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section aria-labelledby="trending-heading">
      <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
        <h2
          id="favorites-heading"
          class="text-3xl text-center font-bold tracking-tight text-gray-900"
        >
          Trending Products
        </h2>

        <div
          class="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8"
        >
          <div
            v-for="product in sliceProducts"
            :key="product.id"
            class="group relative text-center"
          >
            <div class="w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                :src="product.imageSrc"
                :alt="product.imageAlt"
                class="h-full w-full object-cover object-center transition-all scale-100 group-hover:scale-110 duration-300"
              />
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">
              <router-link
                :to="{ name: 'details', params: { id: product.id } }"
                class="transitio-all ease-in-out duration-300 hover:text-indigo-600"
              >
                <span class="absolute inset-0" />
                {{ product.name }}
              </router-link>
            </h3>
            <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
            <p class="mt-1 text-lg font-semibold text-black">${{ product.price }}</p>
          </div>
        </div>

        <div class="mt-10 text-sm text-center">
          <router-link
            :to="{ name: 'shop' }"
            class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </router-link>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>
