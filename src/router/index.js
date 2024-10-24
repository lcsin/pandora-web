import { createRouter, createWebHistory } from 'vue-router'
import api from '../api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/Home.vue') },
    { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
    { path: '/register', name: 'register', component: () => import('../views/Register.vue') },
    { path: '/:pathMatch(.*)*', name: '404', component: () => import('../views/404.vue') },  // 访问不存在的路径时，直接跳转到404页面
  ]
})

router.beforeEach((to, from) => {
  api.users.info().then(response => {
    if (response.data.code == -3 && to.name !== 'login' && to.name !== 'register') {
      return { name: 'login' }
    }
  }).catch(error => {
    console.log(error)
    return { name: 'login' }
  })

  // if (token == null && to.name !== 'login' && to.name !== 'register') {
  //   return { name: 'login' }
  // }
})

export default router
