<template>
  <div id="app">
    <router-view/>
    <div class="footer_menu" v-show="$store.state.requiresMenu">
        <dl>
            <router-link to='/index'>
              <dt></dt>
              <dd>首页</dd>
            </router-link>
        </dl>
        <dl>
            <router-link to='/order'>
              <dt></dt>
              <dd>订单</dd>
            </router-link>
        </dl>
        <dl>
            <router-link to='/person'>
              <dt></dt>
              <dd>我的</dd>
            </router-link>
        </dl>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  name: 'App',

}
</script>

<style>

</style>
