<template>
  <div class="mine">
    <div class="mine_center">
      <a href="personInfo.html" class="wrap">
        <img src="static/img/avatar2.png">
        <div class="mine_info">
          <h2>随心所遇<b class="woman"></b></h2>
          <p>15625415687</p>
        </div>
      </a>
    </div>
    <div class="order_center">
      <p><a href="order_list.html" class="wrap">我的订单<span>更多订单</span></a></p>
      <div class="order_sort">
        <ul>
          <li>
            <a href="order_list.html">
              <img src="static/img/icon_order1.png">
              <p>待提交</p>
            </a>
          </li>
          <li>
            <a href="order_list.html">
              <img src="static/img/icon_order2.png">
              <p>进行中</p>
            </a>
          </li>
          <li>
            <a href="order_list.html">
              <img src="static/img/icon_order3.png">
              <p>待评价</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="mine_list form_common">
      <ul>
        <li>
          <a href="javascript:;">
            <img src="static/img/icon_mine1.png">
            <p>我的二维码</p>
          </a>
        </li>
        <li>
          <a href="coupon.html">
            <img src="static/img/icon_mine2.png">
            <p>我的优惠券</p>
          </a>
        </li>
        <li>
          <a href="myAddr.html">
            <img src="static/img/icon_min3.png">
            <p>我的地址</p>
          </a>
        </li>
        <li>
          <a href="bill.html">
            <img src="static/img/icon_min6.png">
            <p>发票管理</p>
          </a>
        </li>
        <li>
          <a href="shoppingCart.html">
            <img src="static/img/icon_mine4.png">
            <p>我的购物车</p>
          </a>
        </li>
        <li>
          <a href="reset.html">
            <img src="static/img/icon_mine5.png">
            <p>设置</p>
          </a>
        </li>
      </ul>
    </div>
     

  </div>
</template>

<script>
export default {
  name: 'person',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
