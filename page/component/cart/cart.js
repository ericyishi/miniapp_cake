// page/component/new-pages/cart/cart.js
var app = getApp();
var cartdata = app.globalData.cartdata;
Page({
  data: {
    carts: cartdata ,               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    obj:{
        name:"hello"
    }
  },
  onShow() {
    if (app.globalData.cartdata!=""){
      this.setData({
        hasList: true,
        carts: app.globalData.cartdata
      });
      this.getTotalPrice();
    }
    
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    console.log("点击了选中当前商品");
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let selected = carts[index].selected;
    carts[index].selected = !selected;
    console.log(index,carts[index].selected);
    console.log(carts);
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = app.globalData.cartdata;
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    if(!carts.length){
      app.globalData.cartTotalNum=0;
      console.log("购物车已经清空全局变量为", app.globalData.cartTotalNum);
      this.setData({
        hasList: false,
      });
    }else{
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = app.globalData.cartdata

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = app.globalData.cartdata;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = app.globalData.cartdata;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = app.globalData.cartdata                 // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  }

})