<template>
   <div class="index">
     <div class="top">
         <div class="top_addr">
             <a href="choose_city2.html">
                 <span>乌鲁木齐</span>
             </a>
         </div>
         <div class="top_search">
             <ul>
                 <li>输入维修品类的关键字</li>
             </ul>
         </div>
     </div>
     <div class="banner" id="banner">
         <div class="hd">
             <ul></ul>
         </div>
         <div class="bd">
             <ul>
                 <li v-for="item in bannerList"><a href="javascript:;"><img :src="item.imgUrl"></a></li>
             </ul>
         </div>
     </div>
     <div class="class_one">
        <a href="javascript:;" v-for="item in skuFirst" @click="goSort(item.id,item.cityCode)">
            <img :src="item.logoUrl">
            <p>{{item.name}}</p>
        </a>
     </div>
     <div class="selection">
         <div class="tit_common">
             <img src="static/img/icon-jx.png">
             <p>当季精选</p>
         </div>
         <div class="selection_item">
             <ul>
                 <li>
                     <a href="javascript:;">
                         <img src="static/img/sift1.png">
                         <p>灯具安装<span>50元起</span></p>
                     </a>
                 </li>
                 <li>
                     <a href="javascript:;">
                         <img src="static/img/sift2.png">
                         <p>灯具安装<span>50元起</span></p>
                     </a>
                 </li>
                 <li>
                     <a href="javascript:;">
                         <img src="static/img/sift3.png">
                         <p>灯具安装<span>50元起</span></p>
                     </a>
                 </li>
             </ul>
             <a href="javascript:;" class="more">查看更多</a>
         </div>
     </div>
     <div class="serve_hot">
         <div class="tit_common">
             <img src="static/img/icon_hot.png">
             <p>热门服务</p>
         </div>
         <div class="item_list">
             <ul>
                <!--  <li class="wrap">
                     <a href="javascript:;">
                         <div class="item_img">
                             <img src="static/img/item1.png">
                         </div>
                         <div class="item_des">
                             <h2>洗衣机安装维修安装维修安装维修</h2>
                             <p>查看问题并维修安装洗维修安装洗维修安装洗维修安装洗衣机</p>
                             <span>￥45起</span>
                         </div>
                     </a>
                 </li> -->
             </ul>
         </div>
     </div>
     
     <div class="hang_cart">
         <a href="shoppingCart.html">
             <span>6</span>
         </a>
     </div>
   </div>
</template>

<script>
import $api from '@/common/js/api.js'
import util from '@/common/js/utils.js'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      bannerList:[],
      skuFirst:[]
    }
  },
  methods:{
    goSort(id,cityCode){
        this.$router.push({name:'list',params:{id:id,cityCode:cityCode}})
    }
  },
  mounted(){
    util.$http({
       url: $api.public.adInfo,
       data: { typeCode: 'user_banner', cityCode: '130105' },
    },
    {
        url: $api.skuList.skuFirst,
        data: { cityCode: '130105', serviceId: 0 }
    })
    .then(res=>{
       this.bannerList.push(res[0].data[0]);
       this.skuFirst = res[1].data;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
