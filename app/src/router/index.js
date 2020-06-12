import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [{
  path: '',
  component: Layout,
  redirect: '',
  children: [{
    path: '',
    component: () => import('@/views/home/index')
  }]
}, {
  path: '/todo',
  component: Layout,
  redirect: '',
  children: [{
    path: '',
    component: () => import('@/views/todo/index')
  }]
}];

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
