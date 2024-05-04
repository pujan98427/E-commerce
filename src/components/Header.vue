<script setup lang="ts">
import { ref, computed } from 'vue'
import { PopoverGroup } from '@headlessui/vue'
import { useRoute, useRouter } from 'vue-router'

import CartWidget from '@/components/cart/CartWidget.vue'
import SearchField from './SearchField.vue'
const route = useRoute()
const router = useRouter()
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
    { name: 'Shop', href: { name: 'shop' } },
    { name: 'Category', href: { name: 'categories' } },
    { name: 'Clothes', href: { name: 'category', params: { id: 3 } } },
    { name: 'Bags', href: { name: 'category', params: { id: 1 } } }
  ]
}
function generateTo(item) {
  return { name: item.href.name, params: item.href.params }
}
function isLinkActive(item) {
  return route.path === router.resolve(generateTo(item)).href
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
              <router-link
                v-for="item in navigation.other"
                :key="item.name"
                :to="generateTo(item)"
                class="flex items-center text-sm font-medium hover:text-indigo-600"
                :class="{ 'text-indigo-600': isLinkActive(item) }"
                exact
                >{{ item.name }}</router-link
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
