<template>
  <view class="modify">
    <view class="user-warp">
      <view class="ua-warp">
        <text>姓名：{{ user.username }} </text>
        <view class="_"></view>
        <img :src="user.avatar" class="avatar" alt="头像">
      </view>
      <view><text>密码：{{ user.password }}</text></view>
      <view><text>邮箱：{{ user.email }}</text></view>
      <view class="info">
        <text>个人信息：</text>
        <view class="info-last">{{ user.info }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import request from '@/util/request';

export default {
  components: {  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        email: '',
        info: '',
        avatar: ''
      }
    }
  },
  computed: {},
  methods: {},
  watch: {},

  // // 页面周期函数--监听页面加载
  onLoad() {
    let user = this.user;
    uni.getStorage({
      key: 'user',
      success: function (res) {
        for (let x in res.data) {
          user[x] = res.data[x];
        }
      }
    })
  },
  // // 页面周期函数--监听页面初次渲染完成
  // onReady() {},
  // // 页面周期函数--监听页面显示(not-nvue)
  // onShow() {},
  // // 页面周期函数--监听页面隐藏
  // onHide() {},
  // // 页面周期函数--监听页面卸载
  // onUnload() {},
  // // 页面处理函数--监听用户下拉动作
  // // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // // 页面处理函数--监听用户上拉触底
  // // onReachBottom() {},
  // // 页面处理函数--监听页面滚动(not-nvue)
  // // onPageScroll(event) {},
  // // 页面处理函数--用户点击右上角分享
  // // onShareAppMessage(options) {},
}
</script>

<style scoped>
.modify {
  width: 100%;
  height: 100vh;
  padding: 32rpx;
}

.user-warp {
  width: 686rpx;
}

.user-warp {
  line-height: 100rpx;
}


.ua-warp {
  display: flex;
  flex-direction: row;
  justify-content: baseline;
}

.ua-warp>._ {
  flex: 1;
}

.ua-warp img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
.user-warp .info {
  display: flex;
  flex-direction: row;
}
.user-warp .info>text {
  display: block;
}

.info-last {
  flex: 1;
  color: #636363;
  font-size: medium;
  line-height: 60rpx;
  margin-top: 20rpx;
}
</style>