// components/swiperImages/index.js
Page({
   methods(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        console.log(result);
      }
    })
   }
    
})