<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { useProductStore } from '@/stores/ProductStore'
import MagnifyingGlassSvg from './icons/MagnifyingGlassSvg.vue'
import { ref } from 'vue'
const productStore = useProductStore()

const query = ref<string>('')
const handleSearchChange = () => {
  productStore.filterReceivedText(query.value)
}
</script>

<template>
  <Popover class="ml-4 flow-root text-sm lg:relative lg:ml-8">
    <PopoverButton class="group -m-2 flex items-center p-2">
      <MagnifyingGlassSvg
        class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
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
        class="absolute z-10 inset-x-0 top-16 mt-px bg-white shadow-lg lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
      >
        <div class="overflow-hidden rounded-lg border border-gray-200">
          <div class="relative">
            <input
              class="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
              placeholder="Find product"
              aria-label="Search components"
              type="text"
              v-model="query"
              @change="query = $event.target.value"
            />
            <button
              class="cursor-pointer absolute right-4 top-4 h-6 w-6 text-slate-500 hover:text-indigo-600"
              @click="handleSearchChange"
            >
              <MagnifyingGlassSvg class="" aria-hidden="true" />
            </button>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<style scoped></style>
