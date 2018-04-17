/**
 * 小程序全局配置文件
 */

const config = {
    encodingType: '1', // 返回值编码 1 UTF8
    origin: '1', // 来源 1 用户 | 2 Android小哥 | 3 IOS小哥 | 4 商户 | 5 经销商 | 6 Ios用户 | 7 Android用户
    signType: '1', // 签名方式 1 md5
    signKey: 'user000011111111', // 签名时用的key
    scope: { // 用户授权列表
        userInfo: 'scope.userInfo', // 对应wx.getUserInfo接口 | 用户信息
        userLocation: 'scope.userLocation', // 对应wx.getLocation, wx.chooseLocation接口 | 地理位置
        address: 'scope.address', // 对应wx.chooseAddress接口 | 通讯地址
        invoiceTitle: 'scope.invoiceTitle', // 对应wx.chooseInvoiceTitle接口 | 发票抬头
        werun: 'scope.werun', // 对应wx.getWeRunData接口 | 微信运动步数
        record: 'scope.record', // 对应wx.startRecord接口 | 录音功能
        writePhotosAlbum: 'scope.writePhotosAlbum', // 对应wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum接口 | 保存到相册
        camera: 'scope.camera', // '' | 摄像头
    }
}

export default config