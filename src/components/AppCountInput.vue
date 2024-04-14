<script setup lang="ts">
const props = defineProps({
  modelValue: { type: [Number, String], default: 0 }
})
const emit = defineEmits(['update:modelValue', 'input'])
const updateValue = (value) => emit('update:modelValue', value)
</script>
<template>
  <div class="flex justify-center mt-6">
    <button
      class="bg-gray-200 px-2 rounded-l cursor-pointer"
      @click="updateValue(modelValue > 0 ? modelValue - 1 : null)"
    >
      -
    </button>
    <input
      :value="modelValue"
      min="0"
      @input="updateValue"
      type="number"
      readonly
      class="max-w-12"
    />
    <button class="bg-gray-200 px-2 rounded-r cursor-pointer" @click="updateValue(modelValue + 1)">
      +
    </button>
  </div>
</template>

<style scoped>
input[type='number'] {
  appearance: none;
  -moz-appearance: textfield;
  border: 1px solid rgb(219, 219, 219);
  text-align: center;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
