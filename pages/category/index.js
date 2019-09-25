// 引入request
import { request } from '../../request/index'
Page({
  data: {
    // 左侧分类列表数据
    categoryLeft: [],
    // 右侧详细列表数据
    categoryRight: [],
    // 点击左侧列表栏的索引
    categoryIndex: 0,
    // 设置左侧滚动条的位置
    scrollTop: 0
  },
  // 自定义变量数据
  data1: [],
  onLoad() {
    // 请求左侧分类列表数据
    this.categoryList()
  },
  // 加载页面时将本地数据提取出来
  localValue() {
    let getStorage = wx.getStorageSync('keys')
    if (getStorage) {
      // 判断本地存储的数据是否过期 如果过期则请求新数据 如果没过期就使用旧数据
      if (Date.now() - getStorage.time > 1000 * 5) {
        // 如果请求时间超过一分钟 则重新请求数据
        this.categoryList()
      } else {
        this.data1 = getStorage.data
        const categoryLeft = this.data1.map(v => {
          return v.cat_name
        })
        const categoryRight = this.data1[0].children
        this.setData({
          categoryLeft,
          categoryRight
        })
      }
    } else {
      // 如果没有的话就重新请求数据
      this.categoryList()
    }
  },
  // 请求左侧分类列表数据
  categoryList() {
    request({
      url: '/categories'
    }).then(result => {
      // 设置全局this.data 不占用加载资源 
      this.data1 = result.data.message
      // 将数据存储到本地存储中
      wx.setStorageSync('keys', {
        // 设置时间就是现在
        time: Date.now(),
        // 将总的数据传入本地存储
        data: this.data1
      })
      // 设置左侧分类列表
      let categoryLeft = this.data1.map(e => {
        return e.cat_name
      })
      // 右侧详细列表表头
      let categoryRight = this.data1[0].children
      console.log(categoryRight);
      this.setData({
        categoryLeft,
        categoryRight
      })
    })
  },
  // 左侧菜单点击事件
  clickIndex(e) {
    const { index } = e.target.dataset
    const categoryRight = this.data1[index].children
    this.setData({
      categoryIndex: index,
      categoryRight,
      scrollTop: 0
    })
  }
})