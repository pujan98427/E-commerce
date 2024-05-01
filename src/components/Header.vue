<script setup lang="ts">
import { ref } from 'vue'
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import { useRoute } from 'vue-router'

import CartWidget from '@/components/cart/CartWidget.vue'
import SearchField from './SearchField.vue'
const route = useRoute()
const navigation = {
  // categories: [
  //   {
  //     name: 'Women',
  //     clothing: [
  //       [
  //         { name: 'Tops', href: '#' },
  //         { name: 'Dresses', href: '#' },
  //         { name: 'Pants', href: '#' },
  //         { name: 'Denim', href: '#' },
  //         { name: 'Sweaters', href: '#' },
  //         { name: 'T-Shirts', href: '#' }
  //       ],
  //       [
  //         { name: 'Jackets', href: '#' },
  //         { name: 'Activewear', href: '#' },
  //         { name: 'Shorts', href: '#' },
  //         { name: 'Swimwear', href: '#' },
  //         { name: 'Browse All', href: '#' }
  //       ]
  //     ],
  //     accessories: [
  //       { name: 'Shoes', href: '#' },
  //       { name: 'Jewelry', href: '#' },
  //       { name: 'Handbags', href: '#' },
  //       { name: 'Socks', href: '#' },
  //       { name: 'Hats', href: '#' },
  //       { name: 'Browse All', href: '#' }
  //     ],
  //     categories: [
  //       { name: 'New Arrivals', href: '#' },
  //       { name: 'Sale', href: '#' },
  //       { name: 'Basic Tees', href: '#' },
  //       { name: 'Artwork Tees', href: '#' }
  //     ]
  //   },
  //   {
  //     name: 'Men',
  //     clothing: [
  //       [
  //         { name: 'Dress Shirts', href: '#' },
  //         { name: 'Pants', href: '#' },
  //         { name: 'Jackets', href: '#' },
  //         { name: 'T-Shirts', href: '#' },
  //         { name: 'Jeans', href: '#' },
  //         { name: 'Hoodies', href: '#' }
  //       ],
  //       [
  //         { name: 'Vests', href: '#' },
  //         { name: 'Kilts', href: '#' },
  //         { name: 'Outdoors', href: '#' },
  //         { name: 'Capes', href: '#' },
  //         { name: 'Browse All', href: '#' }
  //       ]
  //     ],
  //     accessories: [
  //       { name: 'Watches', href: '#' },
  //       { name: 'Boots', href: '#' },
  //       { name: 'Fanny Packs', href: '#' },
  //       { name: 'Sunglasses', href: '#' },
  //       { name: 'Browse All', href: '#' }
  //     ],
  //     categories: [
  //       { name: 'Just Added', href: '#' },
  //       { name: 'Clearance', href: '#' },
  //       { name: 'Graphic Tees', href: '#' }
  //     ]
  //   }
  // ],
  other: [
    { name: 'Shop', href: 'shop' },
    { name: 'Category', href: 'categories' }
  ]
}
</script>

<template>
  <header class="relative bg-white shadow-sm sticky top-0 z-50">
    <nav aria-label="Top" class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="px-4 pb-14 sm:px-0 sm:pb-0">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <div class="flex flex-1">
            <h1 class="font-bold text-4xl text-indigo-600">
              <router-link to="/">
                <span class="sr-only">Your Company</span>
                E-com
              </router-link>
            </h1>
          </div>

          <!-- Flyout menus -->
          <PopoverGroup class="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
            <div
              class="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0"
            >
              <!-- <Popover
                v-for="(category, categoryIdx) in navigation.categories"
                :key="categoryIdx"
                class="flex"
                v-slot="{ open }"
              >
                <div class="relative flex">
                  <PopoverButton
                    :class="[
                      open
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-gray-700 hover:text-gray-800',
                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                    ]"
                    >{{ category.name }}</PopoverButton
                  >
                </div>

                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <PopoverPanel
                    class="absolute inset-x-0 top-full z-20 bg-white text-gray-500 sm:text-sm"
                  >
                   
                    <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                  
                    <div
                      class="absolute inset-0 -top-px mx-auto h-px max-w-7xl sm:top-0 sm:px-6 lg:px-8"
                      aria-hidden="true"
                    >
                      <div
                        :class="[
                          open ? 'bg-gray-200' : 'bg-transparent',
                          'h-px w-full transition-colors duration-200 ease-out'
                        ]"
                      />
                    </div>

                    <div class="relative">
                      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div
                          class="grid grid-cols-1 items-start gap-x-6 gap-y-10 pb-12 pt-10 md:grid-cols-2 lg:gap-x-8"
                        >
                          <div class="grid grid-cols-1 gap-x-6 gap-y-10 lg:gap-x-8">
                            <div>
                              <p id="clothing-heading" class="font-medium text-gray-900">
                                Clothing
                              </p>
                              <div
                                class="mt-4 border-t border-gray-200 pt-6 sm:grid sm:grid-cols-2 sm:gap-x-6"
                              >
                                <ul
                                  role="list"
                                  aria-labelledby="clothing-heading"
                                  class="space-y-6 sm:space-y-4"
                                >
                                  <li
                                    v-for="item in category.clothing[0]"
                                    :key="item.name"
                                    class="flex"
                                  >
                                    <a :href="item.href" class="hover:text-gray-800">{{
                                      item.name
                                    }}</a>
                                  </li>
                                </ul>
                                <ul
                                  role="list"
                                  aria-label="More clothing"
                                  class="mt-6 space-y-6 sm:mt-0 sm:space-y-4"
                                >
                                  <li
                                    v-for="item in category.clothing[1]"
                                    :key="item.name"
                                    class="flex"
                                  >
                                    <a :href="item.href" class="hover:text-gray-800">{{
                                      item.name
                                    }}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-8">
                            <div>
                              <p id="accessories-heading" class="font-medium text-gray-900">
                                Accessories
                              </p>
                              <ul
                                role="list"
                                aria-labelledby="accessories-heading"
                                class="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4"
                              >
                                <li
                                  v-for="item in category.accessories"
                                  :key="item.name"
                                  class="flex"
                                >
                                  <a :href="item.href" class="hover:text-gray-800">{{
                                    item.name
                                  }}</a>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <p id="categories-heading" class="font-medium text-gray-900">
                                Categories
                              </p>
                              <ul
                                role="list"
                                aria-labelledby="categories-heading"
                                class="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4"
                              >
                                <li
                                  v-for="item in category.categories"
                                  :key="item.name"
                                  class="flex"
                                >
                                  <a :href="item.href" class="hover:text-gray-800">{{
                                    item.name
                                  }}</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover> -->

              <router-link
                v-for="item in navigation.other"
                :key="item.name"
                :to="{ name: item.href }"
                class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >{{ item.name }}</router-link
              >
              <router-link
                :to="{ name: 'category', params: { id: 3 } }"
                class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >Clothes</router-link
              >
              <router-link
                :to="{ name: 'category', params: { id: 1 } }"
                class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >Bags</router-link
              >
            </div>
          </PopoverGroup>

          <div class="flex flex-1 items-center justify-end">
            <!-- Search -->
            <SearchField v-if="route.path === '/shop'" />

            <!-- Cart -->
            <CartWidget />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
