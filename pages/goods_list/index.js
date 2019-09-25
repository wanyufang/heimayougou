// pages/goods_list/index.js
// 引入request
import { request } from '../../request/index'

Page({
    data: {
        // tab栏数据
        tabValueList: [
            { id: 0, name: "综合" },
            { id: 1, name: "销量" },
            { id: 2, name: "价格" },
        ],
        // tab栏索引默认为0
        currentIndex: 0,
        // 商品列表显示的数据
        goodsValue: [],
        isNoMore: false
    },
    // 全局的请求参数对象 不必放在data中
    storeList: {
        // 搜索关键字
        query: '',
        // 从分类页面传来的cid
        cid: '',
        // 页码数
        pagenum: 1,
        // 页容量
        pagesize: 10
    },
    // 总页数
    totalPage: 1,
    // 监听父组件传来的数据
    getsomeList(e) {
        this.setData({
            currentIndex: e.detail.index,
        })
    },
    // 加载页面时触发
    onLoad(options) {
        const { cid } = options
        this.storeList.cid = cid
        this.getStoreList()
    },
    // 获取商品列表数据
    getStoreList() {
        console.log(this.storeList)
        request({
            url: '/goods/search',
            data: this.storeList
        }).then(res => {
            console.log(res);
            // 新的数据 
            let newGoodsValue = res.data.message.goods
            // 旧的数据
            let oldGoodsValue = this.data.goodsValue
            // 总条数
            let total = res.data.message.total
            // 计算总页数
            this.TotalPages = Math.ceil(total / this.storeList.pagesize);
            this.setData({
                goodsValue: [...newGoodsValue, ...oldGoodsValue]
            })
        })
        // 关闭下拉刷新
        wx.stopPullDownRefresh();
    },
    // 页面下拉刷新
    onPullDownRefresh() {
        // 重置页码
        this.storeList.pagenum = 1
        this.setData({
            goodsValue: []
        })
        // 重新请求页面
        this.getStoreList()
    },

    // 上拉触底加载新数据事件
    onReachBottom() {
        if (this.storeList.pagenum >= this.TotalPages) {
            // 则没有下一页
            wx.showToast({
                title: '没有数据了',
                icon: 'none',
                duration: 2000
            })
            this.setData({
                isNoMore: true
            })
        } else {
            // 有下一页数据
            this.storeList.pagenum++;
            // 重新发送异步请求。
            this.getStoreList();
        }

    }


})