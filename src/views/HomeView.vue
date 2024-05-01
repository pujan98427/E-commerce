<script setup lang="ts">
import ProductList from '@/components/productLists/index.vue'
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

// https://www.youtube.com/watch?v=cfiN8lCA3RM
// https://github.com/thecodeholic/vue-meals-app/blob/main/src/components/MealItem.vue
</script>

<template>
  <Header />
  <main>
    <div class="">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:pt-10 lg:px-8">
        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          <div
            class="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2"
          >
            <img
              :src="categories[0].imageSrc"
              alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
              class="object-cover object-center group-hover:opacity-75"
            />
            <div aria-hidden="true" class="bg-gradient-to-b from-transparent to-black opacity-50" />
            <div class="flex items-end p-6">
              <div>
                <h3 class="font-semibold text-white">
                  <router-link
                    class="transition ease-in-out duration-300 hover:text-white/80"
                    :to="{ name: 'category', params: { id: categories[0].id } }"
                  >
                    {{ categories[0].name }}
                  </router-link>
                </h3>
                <router-link
                  :to="{ name: 'category', params: { id: categories[0].id } }"
                  aria-hidden="true"
                  class="mt-1 text-sm text-white group hover:text-indigo-600"
                >
                  Shop now
                  <span
                    class="transition ease-in-out duration-300 ml-0 group-hover:ml-1"
                    aria-hidden="true"
                  >
                    &rarr;</span
                  >
                </router-link>
              </div>
            </div>
          </div>
          <div
            class="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full"
          >
            <img
              :src="categories[1].imageSrc"
              alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
              class="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
            />
            <div
              aria-hidden="true"
              class="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div class="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 class="font-semibold text-white">
                  <router-link
                    class="transition ease-in-out duration-300 hover:text-white/80"
                    :to="{ name: 'category', params: { id: categories[1].id } }"
                  >
                    {{ categories[1].name }}
                  </router-link>
                </h3>
                <router-link
                  :to="{ name: 'category', params: { id: categories[1].id } }"
                  aria-hidden="true"
                  class="mt-1 text-sm text-white group hover:text-indigo-600"
                >
                  Shop now
                  <span
                    class="transition ease-in-out duration-300 ml-0 group-hover:ml-1"
                    aria-hidden="true"
                  >
                    &rarr;</span
                  >
                </router-link>
              </div>
            </div>
          </div>
          <div
            class="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full"
          >
            <img
              :src="categories[2].imageSrc"
              alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
              class="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
            />
            <div
              aria-hidden="true"
              class="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
            />
            <div class="flex items-end p-6 sm:absolute sm:inset-0">
              <div>
                <h3 class="font-semibold text-white">
                  <router-link
                    class="transition ease-in-out duration-300 hover:text-white/80"
                    :to="{ name: 'category', params: { id: categories[2].id } }"
                  >
                    {{ categories[2].name }}
                  </router-link>
                </h3>
                <router-link
                  :to="{ name: 'category', params: { id: categories[2].id } }"
                  aria-hidden="true"
                  class="mt-1 text-sm text-white group hover:text-indigo-600"
                >
                  Shop now
                  <span
                    class="transition ease-in-out duration-300 ml-0 group-hover:ml-1"
                    aria-hidden="true"
                  >
                    &rarr;</span
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 md:mt-10 text-center">
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
