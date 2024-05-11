import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ErrorView from '../views/404View.vue'
import Categories from '@/components/category/index.vue'
import Category from '@/components/category/category.vue'
import Shop from '@/components/productLists/shop.vue'
import Details from '@/components/productLists/Details.vue'
import ProductCreate from '@/components/admin/product/ProductCreate.vue'
import ProductEdit from '@/components/admin/product/ProductEdit.vue'
import ProductIndex from '@/components/admin/product/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/product/:id',
      name: 'details',
      component: Details
    },
    {
      path: '/products/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/products/category/:id',
      name: 'category',
      component: Category
    },
    {
      path: '/admin/product',
      name: 'product-index',
      component: ProductIndex
    },
    {
      path: '/admin/product/create',
      name: 'product-create',
      component: ProductCreate
    },
    {
      path: '/admin/product/edit',
      name: 'product-edit',
      component: ProductEdit
    },

    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: ErrorView
    }
  ]
})

export default router
