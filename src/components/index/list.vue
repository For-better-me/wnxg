<template>
  <div class="sort">
          <div class="sort_list">
              <ul>
                  <li v-for="item in secondSku">{{item.name}}</li>
              </ul>
          </div>
          <div class="fix_list">
              <ul>
                  <li>
                      <a href="fix_details.html">
                          <div class="fix_pic">
                              <img src="static/img/fix.png">
                          </div>
                          <div class="fix_des">
                              <h2>其他沙发安装<b>限时特惠</b></h2>
                              <p>沙发简单安装维修，更换订单维修，更换订单数维维修，更换订单数维维修，更换订单数维维修，更换订单数维维修，更换订单数维修，更换订单数数字 坏的东西零件</p>
                              <span>￥198起</span>
                          </div>
                      </a>
                  </li>
                  <li>
                      <a href="fix_details.html">
                          <div class="fix_pic">
                              <img src="static/img/fix.png">
                          </div>
                          <div class="fix_des">
                              <h2>其他沙发安装<b>限时特惠</b></h2>
                              <p>沙发简单安装维修件</p>
                              <span>￥198起</span>
                          </div>
                      </a>
                  </li>
                  <li>
                      <a href="fix_details.html">
                          <div class="fix_pic">
                              <img src="static/img/fix.png">
                          </div>
                          <div class="fix_des">
                              <h2>其他沙发安装<b>限时特惠</b></h2>
                              <p>沙发简单安装维修，更换订单数字 坏的东西零件</p>
                              <span>￥198起</span>
                          </div>
                      </a>
                  </li>
              </ul>
          </div>
      </div>

</template>

<script>
import $api from '@/common/js/api.js'
import util from '@/common/js/utils.js'
import store from '@/store/index'
export default {
  name: 'sort',
  data(){
    return{
      secondSku:[],
      spuList:[],
    }
  },
  mounted(){
      let id = this.$route.params.id;
      let adcode = this.$route.params.cityCode;
      util.$http({
         url: $api.skuList.skuFirst,
         data: { cityCode: adcode, serviceId: id },
      })
      .then(res=>{
         if(res.result == '1'){
            this.secondSku = res.data;
            util.$http({
               url: $api.skuList.skuFirst,
               data: { cityCode: adcode, serviceId: id },
            })
            .then(res=>{
               if(res.result == '1'){
                  this.secondSku = res.data;
               }
            })
         }
      })
  }

}
</script>

<style>

</style>
