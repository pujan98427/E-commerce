<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import gsap from 'gsap'
import ProductList from '@/components/productLists/index.vue'
import Header from '@/components/Header.vue'
import { useProductStore } from '@/stores/ProductStore'
import { useCartStore } from '@/stores/CartStore'
import Footer from '@/components/Footer.vue'
const cartStore = useCartStore()
const productStore = useProductStore()

productStore.fill()

function showAll() {
  productStore.filterText = ''
  productStore.fill()
}
const pagination = ref({
  currentPage: 1,
  maxPerPost: 8
})
const paginatedOrders = computed(() => {
  return productStore.products.slice(0, pagination.value.currentPage * pagination.value.maxPerPost)
})

const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'scale(0)'
  el.style.translateY = '200px'
}
const enter = (el) => {
  gsap.to(el, {
    duration: 0.8,
    opacity: 1,
    scale: 1,
    y: 0,
    ease: 'power1',
    stagger: {
      each: 0.1,
      from: 'center'
    }
  })
}
// function animation() {
//   gsap.from('.product', {
//     duration: 0.5,
//     opacity: 0,
//     scale: 0,
//     y: 200,
//     ease: 'power1',
//     stagger: {
//       each: 0.1,
//       from: 'center'
//     }
//   }) //stagger means delay
// }
onMounted(() => {
  // animation()
  // const the_animation = document.querySelectorAll('.product')
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('scroll-animation')
  //       } else {
  //         entry.target.classList.remove('scroll-animation')
  //       }
  //     })
  //   },
  //   { threshold: 0.1 }
  // )
  // //
  // for (let i = 0; i < the_animation.length; i++) {
  //   const elements = the_animation[i]
  //   observer.observe(elements)
  // }
})

function loadMore() {
  pagination.value.currentPage += 0.5
}
// https://www.youtube.com/watch?v=cfiN8lCA3RM
// https://github.com/thecodeholic/vue-meals-app/blob/main/src/components/MealItem.vue
</script>

<template>
  <Header />
  <main>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 text-center">Shop</h2>

        <div
          class="mt-8 md:mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          <transition-group appear @before-enter="beforeEnter" @enter="enter" :css="false">
            <ProductList
              v-for="(product, index) in paginatedOrders"
              :key="index"
              :product="product"
              class="product"
              @addToCart="cartStore.addItems($event, product)"
            />
          </transition-group>
          <!-- <ProductList
            v-for="(product, index) in paginatedOrders"
            :key="index"
            :product="product"
            class="product"
            @addToCart="cartStore.addItems($event, product)"
          /> -->
        </div>
        <div class="text-center" v-if="productStore.filterText !== ''">
          <button
            class="mt-8 rounded-md max-w-[220px] w-full border border-transparent bg-indigo-600 px-10 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="showAll"
          >
            Show All
          </button>
        </div>
        <div class="text-center" v-if="productStore.filterText == ''">
          <button
            v-if="pagination.currentPage * pagination.maxPerPost < productStore.products.length"
            class="mt-16 rounded-md max-w-[220px] w-full border border-transparent bg-indigo-600 px-10 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="loadMore"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
<style>
.product figure:before {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  display: block;
  content: '';
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 100%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
.product:hover figure::before {
  animation: circle 0.75s;
}
.product:hover figure img {
  animation: blur 0.75s;
}
@keyframes circle {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  100% {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}
@keyframes blur {
  0% {
    filter: blur(1.1px);
  }
  40% {
    filter: blur(1px);
  }
  100% {
    filter: blur(0px);
  }
}
.animation {
  opacity: 0;
  transform: translatey(20px);
  transition: all 1s;
}
.scroll-animation {
  opacity: 1;
  transform: translatey(0);
}
</style>
