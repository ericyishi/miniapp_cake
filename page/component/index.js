var mockData= require('../../data/homedata.js');
Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  onLoad: function (options) {

    this.setData({ productlists: mockData.proudctlists });
  },
})