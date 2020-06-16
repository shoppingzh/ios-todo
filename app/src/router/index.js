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
    path: '/todo/category/:id',
    component: () => import('@/views/todo/index'),
    meta: {
      index: 1
    },
    props: true
  }, {
    path: '',
    component: () => import('@/views/todo/all'),
    meta: {
      index: 1
    }
  }, {
    path: '/todo/flag',
    component: () => import('@/views/todo/flag'),
    meta: {
      index: 1
    }
  }]
}, {
  path: '*',
  component: Layout,
  redirect: '/error/404',
  children: [{
    path: '/error/404',
    component: () => import('@/views/error/404'),
    meta: {
      index: 9999
    }
  }]
  
}];

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
