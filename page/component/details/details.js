// page/component/details/details.js
var mockData = require('../../../data/productdetail.js');
var app = getApp();


Page({
  data: {
    num: 1,//状态栏上初始数字
    totalNum: app.globalData.cartTotalNum, //购物车里的商品数
    show: false,//是否显示放入购物车的那个移动的购物车
    scaleCart: false,//是否放大购物车图标
    curIndex: 0
  },
  onLoad(options) {
    console.log("detail页面获取购物车数", app.globalData.cartTotalNum);
    console.log("options.pid", options.pid);
    this.setData({
      totalNum: app.globalData.cartTotalNum
    });
    let productObj = mockData.detail[options.pid];
   
    this.setData({ goods: productObj });

  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.goods.title//使用的时候也要加上this.data
    })

  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num: num
    })
  },
  removeCount() {
    let num = this.data.num;
    num--;
    if (num <= 0) {
      num = 1;
    }
    this.setData({
      num: num
    })
  },
  addToCart() {
    const self = this;
    const num = this.data.num;
    self.setData({
      show: true
    })
    setTimeout(function () {
      setTimeout(function () {
        app.globalData.cartTotalNum = app.globalData.cartTotalNum + num;
        console.log(app.globalData.cartTotalNum);

        self.setData({
          scaleCart: false,

          totalNum: app.globalData.cartTotalNum
        });

      }, 200)
      self.setData({
        show: false,
        scaleCart: true
      })
    }, 300)
    this.gatherGood();

  },
  gatherGood() {
    if (app.globalData.cartdata == "") {
      console.log("全局里面没有数据增加当前的数据");
      let currentGood = {
        id: this.data.goods.pid,
        num: this.data.num,
        title:this.data.goods.title,
        image: this.data.goods.image,
        price: this.data.goods.price,
        selected: true
      }
      app.globalData.cartdata.push(currentGood);
    } else {
      for (let key in app.globalData.cartdata) {
        console.log("循环对象id", app.globalData.cartdata[key].id, "以及当前id",this.data.goods.pid);
        if (app.globalData.cartdata[key].id === this.data.goods.pid) {
         
          app.globalData.cartdata[key].num += this.data.num;
          break;
        } else {
          
          let currentGood = {
            id: this.data.goods.pid,
            num: this.data.num,
            title: this.data.goods.title,
            image: this.data.goods.image,
            price: this.data.goods.price,
            selected: true
          }
          console.log(currentGood );
          app.globalData.cartdata.push(currentGood);
          break;
        }
      }
    }



    console.log(app.globalData.cartdata);
  },
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }

})