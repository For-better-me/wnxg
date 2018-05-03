import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import orderList from '@/components/order/orderList'
import person from '@/components/person/person'
import list from '@/components/index/list'
import store from '@/store/index'

Vue.use(Router)

 const router= new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta:{
        requiresMenu:true
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta:{
        requiresMenu:true
      }
    },
    {
      path: '/order',
      name: 'orderList',
      component: orderList,
      meta:{
        requiresMenu:true
      }
    },
    {
      path: '/person',
      name: 'person',
      component: person,
      meta:{
        requiresMenu:true
      }
    },
    {
      path: '/list/:id/:cityCode',
      name: 'list',
      component: list,
      meta:{
        requiresMenu:false
      }
    }
  ],
  linkActiveClass:'on',
  
})
router.beforeEach((to, from, next) => {
    store.commit('changeMenuShow',to.meta.requiresMenu);
    next();
})

export default  router
