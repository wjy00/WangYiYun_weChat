import request from "../../utils/request";
// 登录流程:
// 1. 收集表单项数据
// 2. 前端验证
//   1) 验证用户信息(账号，密码)是否合法
//   2) 前端验证不通过就提示用户，不需要发请求给后端
//   3) 前端验证通过了，发请求(携带账号, 密码)给服务器端
// 3. 后端验证
//   1) 验证用户是否存在
//   2) 用户不存在直接返回，告诉前端用户不存在
//   3) 用户存在需要验证密码是否正确
//   4) 密码不正确返回给前端提示密码不正确
//   5) 密码正确返回给前端数据，提示用户登录成功(会携带用户的相关信息)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', // 手机号码
    password: '' // 用户密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleInput() {},

  async login() {
    let {
      phone,
      password
    } = this.data;
    // 1.前端验证
    /*
     * 手机号验证：
     *   1. 内容为空
     *   2. 手机号格式不正确
     *   3. 手机号格式正确，验证通过
     * */
    if (!phone) {
      // 提示用户(wx.showToast)
      wx.showToast({
        title: '手机号不能为空',
        icon: 'error'
      })
      return;
    }
    // 定义正则表达式,验证手机号格式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return;
    }
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'error'
      })
      return;
    }

    // 2.后端验证
    let result = await request('/login/cellphone', {
      phone,
      password,
      isLogin: true
    })
    
    if (result.code === 200) { // 登录成功
      wx.showToast({
        title: '登录成功'
      })
      // 将用户的信息存储至本地
      wx.setStorageSync('userInfo', result.profile)
      // wx.setStorageSync('cookies', result.profile)
      // 跳转至个人中心personal页面(使用reLaunch，重新加载目标页面)
      wx.reLaunch({
        url: '/page/personal/personal'
      })
    } else if (result.code === 400) {
      wx.showToast({
        title: '手机号错误',
        icon: 'error'
      })
    } else if (result.code === 502) {
      wx.showToast({
        title: '密码错误',
        icon: 'error'
      })
    } else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
    }

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