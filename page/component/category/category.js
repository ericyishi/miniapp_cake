var mockData = require('../../../data/catedetail.js');

Page({
    data: {
        category: [
            {name:'经典',id:'guowei'},
            {name:'法式',id:'shucai'},
            {name:'儿童',id:'chaohuo'},
            {name:'冰淇淋',id:'dianxin'},
            {name:'零食',id:'cucha'},
            {name:'新年',id:'danfan'}
        ],
        detail:[],
        curIndex: 0,
        isScroll: true,
        toView: 'guowei'
    },
    onReady(){
        
                this.setData({
                  detail: mockData.catelists
                })
         
        
    },
    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true
      })
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          isScroll: false
        })
      },1)
        
    }
    
})