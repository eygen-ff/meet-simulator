import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactsView from '../views/ContactsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ContactsView
  },
  {
    path: '/chat/:bot',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "ChatView" */ '../views/ChatView.vue')
  },
  {
    path: '/market',
    name: 'Market',
    component: () => import(/* webpackChunkName: "MarketView" */ '../views/MarketView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
