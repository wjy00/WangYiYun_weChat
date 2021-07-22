import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], // 轮播图数据
    recommendList:[],// 推荐歌单数据
    topList:[] // 排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 1.获取轮播图数据
    let bannerRes = await request('/banner', {type: 2})
    this.setData({
      bannerList: bannerRes.banners
    })
    // 2.获取推荐歌单数据
    let recommendRes = await request('/personalized',{limit: 10})
    this.setData({
      recommendList: recommendRes.result
    })
    // 3.获取排行榜数据
      // 需求分析：
      // 1. 需要根据idx的值获取对应的数据
      // 2. idx的取值范围是0-20， 我们需要0-4
      // 3. 需要发送5次请求
      let resultArr = [];
      for(let i=0; i<5; i++){
        let topListData = await request('/top/list', {idx: i});
        let topListItem = {name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0, 3)}; //解构赋值
        resultArr.push(topListItem);
        // 若放在循环外更新topList 的值,会导致发送请求的过程中页面长时间白屏，用户体验差
        // 放在循环内不需要等待五次请求全部结束才更新，用户体验较好，但是渲染次数会多一些
        this.setData({
          topList: resultArr
        })
      }
  },
  

  // 跳转至recommendSong页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/songPackage/recommendSong/recommendSong',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})