<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import ShoppingBagSvg from '@/components/icons/ShoppingBagSvg.vue'
import { useCartStore } from '@/stores/CartStore'
import CartItem from './CartItem.vue'
const cartStore = useCartStore()
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
              <CartItem
                v-for="(product, name) in cartStore.grouped"
                :key="name"
                :product="product[0]"
                :count="cartStore.groupCount(name)"
                @updateCount="cartStore.setItemCount(product[0], $event)"
                @clear="cartStore.removeItem(product[0].id)"
              />
            </ul>
            <div class="border-t border-gray-200 mt-6 pt-6">
              <div class="flex justify-between text-lg font-medium text-gray-900">
                <p>Subtotal</p>
                <strong class="text-indigo-600 font-semibold">${{ cartStore.totalCost }}</strong>
              </div>
              <div class="border-t border-gray-200 my-6"></div>

              <div class="flex items-center gap-4">
                <Button
                  class="flex-1 text-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  @click="cartStore.checkout"
                  >Checkout</Button
                >

                <button
                  class="relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-6 py-3 text-base font-medium text-gray-900 hover:bg-gray-200"
                  @click="cartStore.resetItems"
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
