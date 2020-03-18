import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactsView from '../views/ContactsView.vue'
import IntroView from '../views/IntroView.vue';
import AuthView from '../views/AuthView.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IntroView
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  },
  {
    path: '/contacts',
    name: 'Contacts',
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
  },
  {
    path: '/bot-editor',
    name: 'BotEditor',
    component: () => import(/* webpackChunkName: "BotEditorView" */ '../views/BotEditorView.vue')
  },
  {
    path: '/bot-story-config/:bot',
    name: 'BotStoryConfigurator',
    component: () => import(/* webpackChunkName: "BotEditorView" */ '../views/BotStoryConfiguratorView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
