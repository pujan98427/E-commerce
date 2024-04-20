<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import ShoppingBagSvg from './icons/ShoppingBagSvg.vue'
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
</script>

<template>
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
          <div class="flow-root" v-if="!cartStore.isEmpty">
            <ul role="list" class="-my-6 divide-y divide-gray-200">
              <li v-for="(product, name) in cartStore.grouped" :key="name" class="flex py-6">
                {{ product.id }}
                <div
                  class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                >
                  <img
                    :src="product[0].imageSrc"
                    :alt="product[0].imageAlt"
                    class="h-full w-full object-cover object-center"
                  />
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a :href="product[0].href">{{ product[0].name }}</a>
                      </h3>
                      <p class="ml-4">{{ product[0].price }}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{{ product[0].color }}</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <AppCountInput v-model="product.count" />

                    <div class="flex">
                      <button
                        type="button"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                        @click="cartStore.removeItem(product[0].id)"
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
                <p>${{ cartStore.totalCost }}</p>
              </div>

              <div class="flex items-center gap-4 mt-6">
                <a
                  href="#"
                  class="flex-1 text-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >Checkout</a
                >

                <button
                  class="relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-6 py-3 text-base font-medium text-gray-900 hover:bg-gray-200"
                  @click="cartStore.$reset()"
                >
                  clear
                </button>
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
</template>

<style scoped></style>
