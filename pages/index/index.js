// pages/goods_list/index.js
// 引入处理异步请求的promise
import { request } from "../../request/index"
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航数组
    catitemsList: [],
    // 楼层数组
    floordataList: [],
  },
  onLoad() {
    // 请求轮播图数据
    this.swiperReq()
    // 请求分类导航数据
    this.catitemsReq()
    // 请求楼层数据
    this.floordataReq()
  },
  // 请求轮播图数据
  swiperReq() {
    request({
      url: '/home/swiperdata',
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 请求分类导航数据
  catitemsReq() {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        catitemsList: result.data.message
      })
    })
  },
  // 请求楼层数据
  floordataReq() {
    request({
      url: '/home/floordata',
    }).then(result => {
      this.setData({
        floordataList: result.data.message
      })
    })
  }
})