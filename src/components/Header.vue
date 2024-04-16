<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue'
import ShoppingBagSvg from './icons/ShoppingBagSvg.vue'
import MagnifyingGlassSvg from './icons/MagnifyingGlassSvg.vue'
import { useCartStore } from '@/stores/CartStore'
import AppCountInput from './AppCountInput.vue'
const cartStore = useCartStore()

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.'
  }
  // More products...
]

const open = ref(true)
const navigation = {
  categories: [
    {
      name: 'Women',
      clothing: [
        [
          { name: 'Tops', href: '#' },
          { name: 'Dresses', href: '#' },
          { name: 'Pants', href: '#' },
          { name: 'Denim', href: '#' },
          { name: 'Sweaters', href: '#' },
          { name: 'T-Shirts', href: '#' }
        ],
        [
          { name: 'Jackets', href: '#' },
          { name: 'Activewear', href: '#' },
          { name: 'Shorts', href: '#' },
          { name: 'Swimwear', href: '#' },
          { name: 'Browse All', href: '#' }
        ]
      ],
      accessories: [
        { name: 'Shoes', href: '#' },
        { name: 'Jewelry', href: '#' },
        { name: 'Handbags', href: '#' },
        { name: 'Socks', href: '#' },
        { name: 'Hats', href: '#' },
        { name: 'Browse All', href: '#' }
      ],
      categories: [
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
        { name: 'Basic Tees', href: '#' },
        { name: 'Artwork Tees', href: '#' }
      ]
    },
    {
      name: 'Men',
      clothing: [
        [
          { name: 'Dress Shirts', href: '#' },
          { name: 'Pants', href: '#' },
          { name: 'Jackets', href: '#' },
          { name: 'T-Shirts', href: '#' },
          { name: 'Jeans', href: '#' },
          { name: 'Hoodies', href: '#' }
        ],
        [
          { name: 'Vests', href: '#' },
          { name: 'Kilts', href: '#' },
          { name: 'Outdoors', href: '#' },
          { name: 'Capes', href: '#' },
          { name: 'Browse All', href: '#' }
        ]
      ],
      accessories: [
        { name: 'Watches', href: '#' },
        { name: 'Boots', href: '#' },
        { name: 'Fanny Packs', href: '#' },
        { name: 'Sunglasses', href: '#' },
        { name: 'Browse All', href: '#' }
      ],
      categories: [
        { name: 'Just Added', href: '#' },
        { name: 'Clearance', href: '#' },
        { name: 'Graphic Tees', href: '#' }
      ]
    }
  ],
  other: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' }
  ]
}
</script>

<template>
  <header class="relative bg-white shadow-sm">
    <nav aria-label="Top" class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="px-4 pb-14 sm:px-0 sm:pb-0">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <div class="flex flex-1">
            <h1 class="font-bold text-4xl text-indigo-600">
              <a href="#">
                <span class="sr-only">Your Company</span>
                E-com
              </a>
            </h1>
          </div>

          <!-- Flyout menus -->
          <PopoverGroup class="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
            <div
              class="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0"
            >
              <Popover
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
                    <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                    <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                    <!-- Fake border when menu is open -->
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
              </Popover>

              <a
                v-for="item in navigation.other"
                :key="item.name"
                :href="item.href"
                class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                >{{ item.name }}</a
              >
            </div>
          </PopoverGroup>

          <div class="flex flex-1 items-center justify-end">
            <!-- Search -->
            <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Search</span>
              <MagnifyingGlassSvg class="h-6 w-6" aria-hidden="true" />
            </a>

            <!-- Cart -->
            <Popover class="ml-4 flow-root text-sm lg:relative lg:ml-8">
              <PopoverButton class="group -m-2 flex items-center p-2">
                <ShoppingBagSvg
                  class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{
                  cartStore.count > 0 ? cartStore.count : 0
                }}</span>
                <span class="sr-only">items in cart, view bag</span>
              </PopoverButton>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <PopoverPanel
                  class="absolute z-10 inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-3 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
                >
                  <h2 class="sr-only">Shopping Cart</h2>

                  <div class="mt-8">
                    <div class="flow-root" v-if="cartStore.count > 0">
                      <ul role="list" class="-my-6 divide-y divide-gray-200">
                        <li v-for="product in products" :key="product.id" class="flex py-6">
                          <div
                            class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                          >
                            <img
                              :src="product.imageSrc"
                              :alt="product.imageAlt"
                              class="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div class="ml-4 flex flex-1 flex-col">
                            <div>
                              <div class="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a :href="product.href">{{ product.name }}</a>
                                </h3>
                                <p class="ml-4">{{ product.price }}</p>
                              </div>
                              <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                              <AppCountInput v-model="count" />

                              <div class="flex">
                                <button
                                  type="button"
                                  class="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div class="border-t border-gray-200 mt-6 pt-6">
                        <div class="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>$262.00</p>
                        </div>

                        <div class="mt-6">
                          <a
                            href="#"
                            class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >Checkout</a
                          >
                        </div>
                        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{{ ' ' }}
                            <button
                              type="button"
                              class="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              View Shopping Bag
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="" v-else>
                      <em>Cart is Empty</em>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
