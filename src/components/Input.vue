<script setup lang="ts">
interface PropsInterface {
  placeholder?: string
  type?: string
  modelValue?: string | number
  inputPadding?: boolean
}

const props = withDefaults(defineProps<PropsInterface>(), {
  placeholder: '',
  type: 'text'
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    class="rounded shadow-1 h-11 border border-gray-200 w-full text-sm text-base-100 placeholder-gray-200"
    :class="inputPadding ? '' : 'py-2.5 px-4'"
    :type="props.type"
    :placeholder="props.placeholder"
    v-bind="$attrs"
    :value="props.modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
