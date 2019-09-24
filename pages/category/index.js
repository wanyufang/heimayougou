// 引入request
import { request } from '../../request/index'
Page({
  data: {
    // 左侧分类列表数据
    categoryLeft: [],
    // 右侧详细列表表头数据
    categoryRight: [],
    // 右侧详细列表图片及文字
    categoryRightImage: []
  },
  onLoad() {
    // 请求左侧分类列表数据
    this.categoryList()
  },
  // 请求左侧分类列表数据
  categoryList() {
    request({
      url: '/categories'
    }).then(result => {
      // 设置全局this.data 不占用加载资源 
      this.data = result.data.message
      // 设置左侧分类列表
      let categoryLeft = this.data.map(e=>{
        return e.cat_name
      })
      // 右侧详细列表表头
      let categoryRight = this.data[0].children
      // 右侧详细列表图片及文字
      let categoryRightImage = this.data[0].children[0].children
      this.setData({
        categoryLeft,
        categoryRight,
        categoryRightImage
      })
    })
  },
})