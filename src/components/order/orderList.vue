<template>
  <div class="order_list_wrap">
    <div class="order_sort">
      <ul>
        <li class="on">全部</li>
        <li>待预付</li>
        <li>进行中</li>
        <li>已完成</li>
        <li>待评价</li>
      </ul>
    </div>
    <div class="order_list">
      <div class="order_list_box">
        <ul>
          <li>
            <div class="order_code wrap">
              <h1>订单编号：<b>WNQYD14587736</b></h1>
              <span class="main_color">待预付</span>
            </div>
            <div class="order_information wrap">
              <a href="order_unpay.html">
                <img src="static/img/order_pic.png">
                <div class="order_information_txt">
                  <h1>马桶维修</h1>
                  <p>下单时间：2017-03-19 15:32</p>
                  <p>上门时间：2017-03-19 15:32</p>
                  <span>石家庄市新华区中储广场写字楼A座17层</span>
                </div>
              </a>
            </div>
            <div class="order_btn_wrap wrap">
              <span class="main_color">预付费：￥30</span>
              <a href="javascript:;" class="go_pay">去支付</a>
            </div>
          </li>
          
        </ul>
        <div class="no_order none">
          订单空空
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'order',
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
