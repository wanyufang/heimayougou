// 使用Promise解决回调地狱 简化代码

let requestTimes = 0
export const request = (params) => {
    requestTimes++
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    // 大的函数内 会返回一个promise对象
    return new Promise((resolve, reject) => {
        // 这个代码段 会在promise被new的时候执行
        const baseUrl = 'https://api.zbztb.cn/api/public/v1'
        wx.request({
            // 解构params
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete(){
                requestTimes--;
                if(requestTimes===0) {
                    wx.hideLoading()
                }
            }
        })
    })
}