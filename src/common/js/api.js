/**
 * 接口定义文件
 */

const baseUrl = "http://118.31.116.206:8080/wnxg-platform" // 测试版 数据接口
const ulbBaseUrl = 'https://mantest.wannengxiaoge.com' // 测试版 功能接口

// const baseUrl = 'http://mantest.wannengxiaoge.com/wnxg-platform' // 正式版 数据接口
// const ulbBaseUrl = 'http://mantest.wannengxiaoge.com' // 正式版 功能接口

const api = {
    public: { // 公共接口
        login: `${baseUrl}/ws/user/login`, // 登录接口，获取openId, sessionKey, unionId
        register: `${baseUrl}/ws/user/register`, // 4.1.用户注册接口(POST)
        sms: `${baseUrl}/ws/user/sms`, // 3.1.获取短信接口(POST)
        adInfo: `${baseUrl}/ws/user/ad_info/{typeCode}/{cityCode}`, // 3.3.用户端banner图查询接口(GET)
        citys: `${baseUrl}/ws/user/citys/{adcode}`, // 3.2.城市列表查询接口(GET)
        allCitys: `${baseUrl}/ws/user/all_citys`, // 3.4.城市列表查询接口树结构返回值(GET)
        virtualTel: `token|${baseUrl}/ws/user/axb/{orderId}`, // 4.51.获取虚拟号(GET)
        xgInfo: `token|${baseUrl}/ws/user/xg_info/{xgId}`, // 4.53.获取小哥信息接口(GET)
        login: `${baseUrl}/ws/user/login`, // 4.2.用户登录接口(POST)
        fast_registe: `${baseUrl}/ws/user/fast_register`, // 文档暂无说明：用户快速登录(POST)
        loginOut: `${baseUrl}/ws/user/logout`, // 4.47.退出接口(POST)
        unifiedorder: `${ulbBaseUrl}/ulb/pay/wechat/unifiedorder`, // 统一下单接口
        getWechatOpenid: `${ulbBaseUrl}/ulb/wechat/openid`, // 获取用户openid，用来支付
    },
    problem: { // 问题
        problems: `${baseUrl}/ws/user/problems`, // 4.5.常见问题列表查询接口(POST)
        problemDetail: `${baseUrl}/ws/user/problem/{id}`, // 4.6.常见问题详情查询接口(GET)
        problemAdd: `${baseUrl}/ws/user/problem`, // 4.7.问题添加接口(POST)
        skus: `${baseUrl}/ws/user/skus`, // 4.9.根据名称查询SKU列表接口（POST）(相关服务)
    },
    skuList: { // sku列表
        skuFirst: `${baseUrl}/ws/user/service_type/{cityCode}/{serviceId}`, // 4.10.服务类型列表查询接口（GET）
        spuList: `${baseUrl}/ws/user/sku/service/{id}/{adcode}`, // 4.12.根据服务基表主键查询SKU列表接口(GET)
        skuList: `${baseUrl}/ws/user/sku/super/{id}`, // 4.22.根据spu主键查询sku列表接口（GET）
    },
    skuInfo: { // sku详情
        spuInfo: `${baseUrl}/ws/user/sku/{id}`, // 4.21.spu详情查询接口(GET)
        citySkuExist: `${baseUrl}/ws/user/sku/info/{skuBaseId}/{adcode}/{type}`, // 4.58.根据adcode和skuBaseId获取sku详情接口（GET）
        skuInfo: `${baseUrl}/ws/user/sku_activity_info/{id}/{type}`, // 4.61.根据sku查询活动信息接口(GET)
        fastOrderInfo: `${baseUrl}/ws/user/service_type_info/{serviceId}`, // 4.11.服务类型详情查询接口（GET）
    },
    skuComment: { // sku评论
        commentList: `${baseUrl}/ws/user/sku_comment/{id}`, // 4.23.SKU评论列表查询接口(GET)
    },
    service: { // 服务、服务类型
        recommends: `${baseUrl}/ws/user/recommends/{cityCode}/{type}`, // 4.13.推荐信息服务列表查询接口（GET）--未使用
    },
    order: { // 订单
        order: `token|${baseUrl}/ws/user/order`, // 4.15.下单接口(POST)
        my_orders: `token|${baseUrl}/ws/user/my_orders/{status}`, // 4.26.我的订单列表查询接口(GET)
        my_order_details: `token|${baseUrl}/ws/user/my_order_details/{orderId}`, // 4.27.我的订单详情查询接口(GET)
        my_order_operate_record: `token|${baseUrl}/ws/user/my_order_operate_record/{orderId}`, // 4.28.订单跟踪记录查询接口(GET)
        orderCancel: `token|${baseUrl}/ws/user/order`, // 4.30.取消订单接口(PUT)
        order_pay: `token|${baseUrl}/ws/user/order_pay`, // 4.33.订单支付接口（PUT）
        end_order: `token|${baseUrl}/ws/user/end_order/{orderId}`, // 4.52.完结订单接口(PUT)
        payment_list: `token|${baseUrl}/ws/user/payment_list/{payNumber}`, // 4.56.根据支付单号生成新的支付记录接口（PUT）
        order_cancel: `token|${baseUrl}/ws/user/order_cancel`, // 4.59.用户取消订单接是否扣上门费查询接口(GET)
        order_cancel_detail: `token|${baseUrl}/ws/user/order_cancel`, // 提交取消订单原因(POST)
        order_cancel_reason: `${baseUrl}/ws/user/order_cancel_reason/{type}`, // 4.72.用户订单取消原因查询接口(GET)
    },
    orderComment: { // 订单评论
        order_comment: `token|${baseUrl}/ws/user/order_comment`, // 4.32.订单评论添加接口(POST)
        order_comment_detail: `token|${baseUrl}/ws/user/order_comment/{orderId}`, // 4.55.根据订单id查询评价详情(GET)
    },
    paySms: { // 支付短信

    },
    coupon: { // 优惠券
        first_coupon_list: `token|${baseUrl}/ws/user/first_coupon_list/{merchantId}/{skuId}`, // 4.67.维修前查询可用优惠卷列表接口(GET)
        second_coupon_list: `token|${baseUrl}/ws/user/second_coupon_list/{orderId}`, // 4.68.维修后查询可用优惠卷列表接口(GET)
        use_coupon: `token|${baseUrl}/ws/user/use_coupons/{orderId}`, // 4.34.可用优惠券列表查询接口(GET)
        my_coupon: `token|${baseUrl}/ws/user/user_coupon_list/{type}` // 4.66.我的优惠卷列表查询接口(GET)
    },
    shoppingCart: { // 购物车

    },
    invoice: { // 发票
        my_invoice_orders: `token|${baseUrl}/ws/user/my_invoice_orders/{type}`, // 4.40.发票订单列表查询接口(GET)
        apply_invoice: `token|${baseUrl}/ws/user/apply_invoice`, // 4.41.用户发票申请接口(POST)
        apply_invoices: `token|${baseUrl}/ws/user/apply_invoices`, // 4.42.查询发票申请记录接口(GET)
        apply_invoice_detail: `token|${baseUrl}/ws/user/apply_invoice_detail/{id}`, // 4.43.查询发票申请详情接口(GET)
    },
    address: { // 用户地址
        user_default_address: `token|${baseUrl}/ws/user/user_default_address/`, // 4.16.用户默认地址查询接口（GET）
        user_address_default: `token|${baseUrl}/ws/user/user_address_default/`, // 4.49.用户地址修改接口（PUT）
        user_address: `token|${baseUrl}/ws/user/user_address/`, // 4.19.用户地址修改接口（PUT）4.18新增（POST）
        user_addresses: `token|${baseUrl}/ws/user/user_addresses/`, // 4.17.用户地址列表查询接口（GET）
        user_address_del: `token|${baseUrl}/ws/user/user_address/del`, // 4.20.用户地址删除接口（PUT）
        user_addresse: `token|${baseUrl}/ws/user/user_addresse`, //4.54.根据id查询用户地址信息接口(GET)
    },
    userInfo: { // 个人信息
        userInfo: `token|${baseUrl}/ws/user/info`, //4.25.个人信息查询(GET)
        postUserInfo: `token|${baseUrl}/ws/user/user`, //4.24.个人信息修改(PUT)
    },
    activity: { // 活动
        sku_activity_info: `${baseUrl}/ws/user/sku_activity_info/{id}/{type}`, // 4.61.根据sku查询活动信息接口(GET)
        sku_activity_info_thirdparty: `${baseUrl}/ws/user/sku_activity_info_thirdparty/{activityId}/{skuId}`, // 4.69.根据活动主键和sku主键查询活动sku详情接口(GET)
        user_activity_join: `token|${baseUrl}/ws/user/user_activity_join/{skuId}/{type}/{activityId}`, // 4.70.查询用户是否可以参加活动接口(GET)
    },
    uploadImag: { // 图片上传接口
        uploadImag: `${ulbBaseUrl}/ulb/object/storage/image`, // 参考：https://www.showdoc.cc/wnxg2
    },
    //订单投诉
    orderComplaint: {
        orders_complaints: `token|${baseUrl}/ws/user/orders_complaints/{type}`, // 4.44.投诉订单列表查询接口(GET)
        add_complaints: `token|${baseUrl}/ws/user/orders_complaints`, // 4.45.投诉订单添加接口(POST)
        orders_complaints_info: `token|${baseUrl}/ws/user/order_complaints/{orderId}`, // 4.46.投诉详情查询接口(GET)
    }
}

export default api