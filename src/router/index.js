import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import orderList from '@/components/order/orderList'
import person from '@/components/person/person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/order',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/person',
      name: 'person',
      component: person
    }
  ],
  linkActiveClass:'on'
})
