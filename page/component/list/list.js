var mockData = require('../../../data/populardata.js');


Page({
  data:{},
  onLoad:function(options){
    this.setData({ productlists: mockData.popularlists });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})