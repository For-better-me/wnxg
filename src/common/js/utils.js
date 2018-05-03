import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from './config.js'
import md5 from './md5.js'
import store from '@/store/index.js'
Vue.use(VueAxios, axios)
// var QQMapWX = require('./qqmap-wx-jssdk.min.js');
function $http (...options) { // 封装通信函数 可取代request方法
        // 格式化option配置项
        const _promise = new Promise((resolve, reject) => {
            let checkToken = true // token是否验证通过

            for (let i = 0, len = options.length; i < len; i++) {
                let opt = options[i]
                // 检测该接口是否需要token
                if (/^token\|/.test(opt.url)) {
                    if (!store.state.token) {
                        checkToken = false
                        reject({
                            result: 9996,
                            msg: opt.url + '接口需要token参数，但系统中不存在token，请先登录'
                        })
                        break
                    }
                    let _data = opt.data || {}
                    opt.data = null
                    opt.data = {
                        token: store.state.token,
                        ..._data
                    }
                    opt.url = opt.url.replace('token|', '')
                }
    
                // 封装公共入参 和 接口入参
                let _queryString = {
                    encodingType: config.encodingType, // 返回值编码 1 UTF8
                    origin: config.origin, // 来源 1 用户 | 2 Android小哥 | 3 IOS小哥 | 4 商户 | 5 经销商 | 6 Ios用户 | 7 Android用户
                    signType: config.signType, // 签名方式 1 md5
                    ...opt.data,
                    signKey: config.signKey // 加密的key
                }
    
                let queryString = ''
                for (let key in _queryString) {
                    queryString += (queryString != '' ? '&' : '') + `${key}=${_queryString[key]}`
                }
                let queryStirngMd5 = md5(queryString).toUpperCase()
                opt.data = queryString.replace(/signKey=(.*)$/, `signData=${queryStirngMd5}`)
                opt.data = queryStringToObject(opt.data)
    
                 // 格式化接口地址中的占位符
                let apiParams = opt.url.match(/{.*?}/g)
                if (apiParams) {
                    apiParams.forEach(item => {
                        if (opt.data[item.replace(/[{}]/g, '')]) {
                            opt.url = opt.url.replace(new RegExp(item), opt.data[item.replace(/[{}]/g, '')])
                        } else if (opt.expressData[item.replace(/[{}]/g, '')]) {
                            opt.url = opt.url.replace(new RegExp(item), opt.expressData[item.replace(/[{}]/g, '')])
                        }
                    })
                }
    
                let defaultOpt = {
                    loading: true, // 是否显示Loading提示窗
                    method: 'GET', // 请求方法！！
                    data: {}, // 需要加密的数据
                    expressData: {}, // 不需要加密的数据
                    header: {
                        "Access-Control-Allow-Origin": "*",
                        token: store.state.token ? store.state.token : ''
                    }
                }
        
                // 合并配置项
                opt = merge(defaultOpt, opt)
                opt.data = merge(opt.data, opt.expressData)
                var _queryString2 = ''
                for (let key in opt.data) {
                    _queryString2 += (_queryString2 != '' ? '&' : '') + `${key}=${opt.data[key]}`
                }
                opt.url = opt.url+'?'+_queryString2
    
                options[i] = opt
            }

            if (checkToken) {
                let loading = true // 是否显示加载提示弹窗
                let promises = options.map(opt => {
                    loading = opt.loading
                    return new Promise((resolve, reject) => {
                        axios.request({
                            url: opt.url,
                            method: opt.method,
                            data: opt.data,
                            header: opt.header,
                           
                        })
                        .then(function(res){
                            if (res.data.result == 9996) { // token验证失败
                                    reject(res.data)
                            } else {
                                resolve(res)
                            }
                        })
                    })
                })

                if (loading) {
                   
                }

                Promise.all(promises)
                .then(res => {
                    if (loading) {
                        // setTimeout(wx.hideLoading, 300)
                    }
                    if (res.length > 1) {
                        let data = res.map(item => {
                            return item.data
                        })
                        resolve(data)
                    } else {
                        resolve(res[0].data)
                    }
                    console.log('请求完成：',res);
                })
                .catch(err => {
                    if (loading) {
                        // setTimeout(wx.hideLoading, 300)
                    }
                    if (err.result == 9996) { // token验证失败
                        reject({
                            result: 9996,
                            msg: 'token失效'
                        })
                    }
                    reject(reject({
                        result: 1234,
                        msg: '接口请求失败'
                    }))
                })
            }
        })

        return _promise.catch(err => {
            if (err.result == 9996){
                console.log('err:' + err.msg)

                // let routes = getCurrentPages()
                // let redirectUrl = '/pages/login/login?redirect=/pages/index/index'
                // if (routes.length) {
                //     let redirect = routes[routes.length - 1]
                //     let queryString = objectToQueryString(redirect.options)
                //     redirectUrl = `/pages/login/login?redirect=/${redirect.route}&${queryString}`
                // }

                // wx.redirectTo({
                //     url: redirectUrl
                // })
            } else if (err.result == 1234) {
                console.log('接口请求失败:' + err.msg)
            }

            return {
                result: 9996,
                // desc: '登录超时'
            }
        })
    }
// 根据经纬度获取adcode
function gainAdcode(lat,lng,callback){
    var demo = new QQMapWX({
        key: 'O7MBZ-3OKW5-IUEIZ-QPYVF-EVBUE-7XB6K' // 必填 该key是文杰以个人名义申请的，日访问次数（10000）和每秒并发次数（5次/秒），需知晓该问题
    });
    demo.reverseGeocoder({
        location: {
            latitude: lat,
            longitude: lng
        },
        success: function(res) {
            // console.log(res);
            callback(res.result.ad_info.adcode);
        },
        fail: function(res) {
            // console.log(res);
        },
        complete: function(res) {
            // console.log(res);
        }
    })
}
/**
 * 判断指定adcode是否已开通服务
 * @param {array} city_list 
 * @param {number} adcode 
 */
function isOpenCity(city_list, adcode){
    var isOpenInfo = {
      flag:false,
      regionIndex:[]
    };
    for(var i = 0;i<city_list.length;i++){
        for(var j = 0; j<city_list[i].childrenList.length;j++){
            for(var k = 0;k<city_list[i].childrenList[j].childrenList.length;k++){
                if(city_list[i].childrenList[j].childrenList[k].adcode == adcode){
                    isOpenInfo.flag = true;
                    isOpenInfo.regionIndex = [i,j,k];
                    break;
                }
            }
        }
    }
    return isOpenInfo;
}
//验证手机号
function isPhone(num) {
    var reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
    if (reg.test(num)) {
        return true;
    }
    else {
        return false;
    }
}

//加减公共方法；type==1表示加；type==0表示减
function count(_type, count) {
    var _count = count;
    if (_type == '1') {
        _count++;
    }
    else {
        if (_count != 1) {
            _count--;
        }
    }
    return _count;
}

// 格式个位数字
function format(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}

//返回年
function returnYear() {
    const date = new Date();
    const years = [];
    for (let i = 1960; i <= date.getFullYear(); i++) {
        years.push(i)
    }
    return years
}

//返回月
function returnMonth() {
    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(format(i))
    }
    return months;
}
const hourAll = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];

//获取上门时间
function getComingTime() {
    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    var currentMinute = currentTime.getMinutes();
    var timeCurrent = [];
    var timeAll = [
        {
            time: '08:00'
        },
        {
            time: '08:30'
        },
        {
            time: '09:00'
        },
        {
            time: '09:30'
        },
        {
            time: '10:00'
        },
        {
            time: '10:30'
        },
        {
            time: '11:00'
        },
        {
            time: '11:30'
        },
        {
            time: '12:00'
        },
        {
            time: '12:30'
        },
        {
            time: '13:00'
        },
        {
            time: '13:30'
        },
        {
            time: '14:00'
        },
        {
            time: '14:30'
        },
        {
            time: '15:00'
        },
        {
            time: '15:30'
        },
        {
            time: '16:00'
        },
        {
            time: '16:30'
        },
        {
            time: '17:00'
        },
        {
            time: '17:30'
        },
        {
            time: '18:00'
        },
        {
            time: '18:30'
        },
        {
            time: '19:00'
        },
        {
            time: '19:30'
        },
        {
            time: '20:00'
        }
    ]
    function GetDate(AddDayCount) {
        var currentTime = new Date();
        currentTime.setDate(currentTime.getDate() + AddDayCount);//获取AddDayCount天后的日期 
        var y = currentTime.getFullYear();
        var m = currentTime.getMonth() + 1;//获取当前月份的日期 
        var d = currentTime.getDate();
        return y + "-" + format(m) + "-" + format(d);
    }

    // function format(num) {
    //   if (num < 10) {
    //     num = '0' + num;
    //   }
    //   return num;
    // }
    if (currentHour + 2 < 8) {
        timeCurrent = timeAll;
    }
    else if (currentHour + 2 < 20 && currentHour + 2 >= 8) {
        currentHour += 2;
        if (currentMinute < 30) {
            for (var i = 0; i < (20 - currentHour) * 2; i++) {
                if (i % 2 == 0) {
                    timeCurrent.push(format((currentHour + i % 2 + Math.floor(i / 2))) + ':30')
                }
                else {
                    timeCurrent.push(format(currentHour + i % 2 + Math.floor(i / 2)) + ':00');
                }
            }
        }
        else {
            for (var i = 1; i < (20 - currentHour) * 2; i++) {
                if (i % 2) {
                    timeCurrent.push(format(currentHour + i % 2 + Math.floor(i / 2)) + ':00')
                }
                else {
                    timeCurrent.push(format(currentHour + i % 2 + Math.floor(i / 2)) + ':30');
                }
            }
        }
    }
  if(timeCurrent.length == 0){
    var timeData = [[ GetDate(1) + '（明天）', GetDate(2) + '（后天）', GetDate(3), GetDate(4), GetDate(5), GetDate(6)], hourAll]
  } else {
     var timeData = [[GetDate(0) + '（今天）', GetDate(1) + '（明天）', GetDate(2) + '（后天）', GetDate(3), GetDate(4), GetDate(5), GetDate(6)], timeCurrent]
    
  }
  // if (!timeCurrent.length) {
  //   timeCurrent = [{
  //     'time': ''
  //   }];
  //   timeData.shift();
  // }
  return timeData;
}

// 合并对象
function merge(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {}
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop]
                if (value !== undefined) {
                    target[prop] = value
                }
            }
        }
    }
    return target
}

// 查询字符串转对象
function queryStringToObject (queryString) {
    let a = queryString.split(/[&=]/g)
    let result = {}
    while (a.length) {
        result[a.shift()] = a.shift()
    }
    return result
}

// 对象转查询字符串
function objectToQueryString (object) {
    let str = ''
    for (let i in object) {
        str = str + (str != '' ? '&' : '') + `${i}=${object[i]}`
    }
    return str
}

/**
 * 格式化时间函数
 * @param  {[type]} fmt  ['yyyy-MM-dd hh:mm:ss:S q']
 * @param  {[type]} String|Date ['2017-01-11 12:12:55' 时间字符串 | '2017/01/11 12:12:55' 时间字符串 | new Data() 时间对象]
 * @return {[type]}      ['2017-12-09 12:22:03:233 4']
 */
function dateFtt (fmt, date) {
    if (typeof date === 'string') {
        // 将时间字符串中的-转换为/，因为IOS不支持-格式的时间字符串
        date = new Date(date.replace(/-/g, '/'))
    }
    var o = {
        'M+': date.getMonth() + 1,                    // 月份
        'd+': date.getDate(),                         // 日
        'h+': date.getHours(),                        // 小时
        'm+': date.getMinutes(),                      // 分
        's+': date.getSeconds(),                      // 秒
        'S': date.getMilliseconds(),                  // 毫秒
        'q+': Math.floor((date.getMonth() + 3) / 3)   // 季度
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}
// 禁止输入表情
function forbidExpression(val){
    var regRule =  /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
    if(val.match(regRule)) {
         val = val.replace(regRule, '')
         val = val.replace(/(^\s*)|(\s*$)/g, "") 
         return {
            isForbid:true,
            val:val
         }
    } else {
        return {
            isForbid:false
         }
    }
}


export default {
    isPhone,
    count,
    getComingTime,
    hourAll,
    returnYear,
    returnMonth,
    merge,
    queryStringToObject,
    objectToQueryString,
    dateFtt,
    gainAdcode,
    isOpenCity,
    forbidExpression,
    $http
}