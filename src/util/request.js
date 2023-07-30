// 公共路径
const commonURL = 'http://localhost:3000/';

import url from './requestURL.js';

// 封装get请求
function getRequest(url, data) {
    let promise = new Promise((resolve, reject) => {
        let _this = this;
        let postData = data;

        uni.showNavigationBarLoading() // 在当前页面显示导航条加载动画
        uni.request({
            url: commonURL + url,
            data: postData,
            method: 'GET',
            dataType: 'json',
            // header: {
            //     "content-type": "application/json"
            // },
            success: function (res) {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    resolve(res.data.msg);
                }
                uni.hideNavigationBarLoading();
            },
            fail: function (e) {
                reject(e);
                uni.hideNavigationBarLoading();
            }
        });
    });

    return promise;

}
// 封装post请求
function postRequest(url, data) {
    let promise = new Promise((resolve, reject) => {
        let _this = this;
        let postData = data;

        uni.showNavigationBarLoading() // 在当前页面显示导航条加载动画
        uni.request({
            url: commonURL + url,
            data: postData,
            method: 'POST',
            header: {
                "content-type": "application/json",
                token: uni.getStorageSync("token")
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    resolve(res.data.msg);
                }
                uni.hideNavigationBarLoading();
            },
            fail: function (e) {
                reject(e);
                uni.hideNavigationBarLoading();
            }
        });
    });

    return promise;

}

export default {
    post: postRequest,
    get: getRequest,
    url: url,
    commonURL: commonURL
}