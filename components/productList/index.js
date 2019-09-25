Component({
  // 接收子组件的数据
  properties: {
    tabValueList: {
      type: Array,
      value: []
    },
    currentIndex: {
      type: Number,
      value: 0
    }
  },
  methods: {
    // 点击时将数据传递给子组件
    clickIndex(e) {
      const { index } = e.target.dataset
      console.log(index);
      this.triggerEvent("pushIndex", { index })
    }
  }

})