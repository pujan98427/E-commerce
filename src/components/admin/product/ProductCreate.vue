<script setup lang="ts">
import { ref, watch } from 'vue'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { debounce } from 'lodash'
import Input from '@/components/Input.vue'

interface FormData {
  userId: number
  name: string
  slug: string
  description: string
}

const formData = ref<FormData>({
  userId: null,
  name: '',
  slug: '',
  description: ''
})

const generateSlug = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

watch(
  () => formData.value.name,
  debounce((newValue) => {
    formData.value.slug = generateSlug(newValue)
  }, 600)
)

const createProduct = () => {
  formData.value.userId = Math.floor(Math.random() * 1000)
  axios
    .post('http://localhost:3000/products', { ...formData.value })
    .then((response: AxiosResponse) => {
      console.log(response.data)
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 422) {
        console.log(error.response.data.errors)
      }
    })
}

const getFormName = () => {
  createProduct()
}
</script>
<template>
  <section class="">
    <div class="max-w-[1127px] mx-auto p-8 bg-white">
      <div class="text-left">
        <form @submit.prevent="getFormName">
          <div>
            <input
              type="text"
              v-model="formData.name"
              class="text-4xl openInput text-gray-800 font-medium p-1 w-full"
              placeholder="Product Title"
              autofocus
            />
          </div>
          <div class="border-b border-base-20 pt-4"></div>
          <div class="mt-6 w-full">
            <div class="basis-[248px] inline-flex items-center gap-1.5">
              <label for="email_address" class="text-sm font-semibold text-gray-800">URL</label>
            </div>
            <div class="flex-1">
              <div class="flex items-center">
                <Input
                  type="url"
                  :value="`ecom.poojanchapagain.com.np`"
                  class="text-base-40 flex-1 rounded-tr-[0] rounded-br-[0]"
                  readonly
                />
                <Input
                  type="text"
                  :value="`${formData.slug}/`"
                  class="rounded-tl-[0] flex-1 rounded-bl-[0]"
                />
                <a
                  class="inline-block text-base-50 hover:text-indigo-600 ml-1.5 cursor-pointer"
                  target="_blank"
                >
                  <LinkSvg />
                </a>
              </div>

              <div></div>
            </div>
          </div>
          <div class="flex gap-8 mt-6">
            <div class="space-y-6 flex-1">
              <div class="">
                <div class="basis-[248px] inline-flex items-center gap-1.5">
                  <label for="email_address" class="text-sm font-semibold text-gray-800">
                    Select Parent
                  </label>
                </div>
                <div class="flex items-center gap-1.5 flex-1">
                  <select
                    class="select-ui border border-[rgb(var(--base-color-30))] pl-4 py-2.5 pr-8 w-full rounded-lg"
                  >
                    <option value="">sdfsdf</option>
                  </select>
                </div>
              </div>

              <div class="">
                <div class="inline-flex items-center gap-1.5">
                  <label for="email_address" class="text-sm font-semibold text-gray-800">
                    Description
                  </label>
                </div>
                <textarea
                  class="mt-1.5 w-full border border-base-30 rounded shadow-1 py-2.5 px-4 resize-none min-h-[150px]"
                  cols="50"
                  v-model="formData.description"
                  placeholder="Enter Image Caption"
                ></textarea>
              </div>
            </div>
            <div class="max-w-[352px] w-full">
              <!-- field  -->
              <div class="">
                <div class="inline-flex items-center gap-1.5">
                  <label for="email_address" class="text-sm font-semibold text-gray-800">
                    Featured Image</label
                  >
                  <span class="inline-block text-base-50">
                    <HelpToolSvg />
                  </span>
                </div>
                <div class="mt-1">
                  <div class="rounded-lg p-4 cursor-pointer text-center border border-dark w-full">
                    <span class="inline-block text-center text-indigo-600">
                      <UploadSvg />
                    </span>
                    <p class="text-sm">
                      <span class="font-semibold text-indigo-600">Open Image Gallery</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-b border-base-20 my-8"></div>

          <div class="flex gap-4">
            <button
              type="submit"
              class="text-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Save
            </button>

            <!-- <router-link
              class="inline-block relative hoverElement text-base-50 hover:text-indigo-600 cursor-pointer"
              :to="{
                name: 'post-category'
              }"
            >
              <ButtonOutline class="py-[7px] px-6"> Cancel </ButtonOutline>
            </router-link> -->
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
