<script setup lang="ts">
import AppCountInput from '@/components/AppCountInput.vue'
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['updateCount', 'clear'])
</script>

<template>
  <li class="flex py-6">
    <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img
        :src="props.product.imageSrc"
        :alt="props.product.imageAlt"
        class="h-full w-full object-cover object-center"
      />
    </div>

    <div class="ml-4 flex flex-1 flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <a :href="props.product.href">{{ props.product.name }}</a>
          </h3>
          <p class="ml-4">${{ props.count }} x ${{ props.product.price }}</p>
        </div>
        <p class="mt-1 text-sm text-gray-500">{{ props.product.color }}</p>
      </div>
      <div class="flex flex-1 items-end justify-between text-sm">
        <AppCountInput :model-value="count" @update:modelValue="$emit('updateCount', $event)" />

        <div class="flex">
          <button
            type="button"
            class="font-medium text-indigo-600 hover:text-indigo-500"
            @click="$emit('clear')"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped></style>
