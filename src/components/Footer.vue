<script setup>
import { ref } from 'vue'
const year = ref(new Date().getFullYear())
import FacebookSvg from '@/components/icons/FacebookSvg.vue'
import InstagramSvg from '@/components/icons/InstagramSvg.vue'
import LinkedinSvg from '@/components/icons/linkedinSvg.vue'
const navigation = ref({
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/poojan.chapagain',
      icon: FacebookSvg
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/pujanchapagain7',
      icon: InstagramSvg
    },
    {
      name: 'linkedin',
      href: 'https://www.linkedin.com/in/pujanchapagain7',
      icon: LinkedinSvg
    }
  ]
})
</script>

<template>
  <footer class="mt-10 pb-8">
    <router-link to="https://poojanchapagain.com.np/" class="text-center"
      ><img src="/images/mylogo.png" class="mx-auto max-w-[150px]" alt="pujan chapagain logo"
    /></router-link>
    <div class="mt-10 flex justify-center space-x-6">
      <a
        v-for="item in navigation.social"
        :key="item.name"
        :href="item.href"
        class="text-gray-400 hover:text-gray-500"
      >
        <span class="sr-only">{{ item.name }}</span>
        <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
      </a>
    </div>
    <p class="mt-10 text-center text-gray-500">&copy; {{ year }} Pujan Chapagain</p>
  </footer>
</template>

<style lang="scss" scoped></style>
