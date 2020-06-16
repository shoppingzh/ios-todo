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
    component: () => import('@/views/home/index'),
    meta: {
      index: 0
    }
  }]
}, {
  path: '/todo',
  component: Layout,
  redirect: '',
  children: [{
    path: '',
    component: () => import('@/views/todo/index'),
    meta: {
      index: 1
    }
  }]
}];

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
