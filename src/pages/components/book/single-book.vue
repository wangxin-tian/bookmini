<template>
  <view @click="detail" class="book-container flex-sub bg-white padding-sm margin-xs radius single-book"
    :data-id="bookId">
    <image class="book-img" :src="imgSrc">
      <view class="episode">{{ episode }}</view>
    </image>
    <view class="book-info">
      <view>{{ title }}</view>
      <text class="book-msg">
        作者：{{ author }}
        出版商：{{ publisher }}
        分类：{{ cateName }}
      </text>
    </view>
  </view>
</template>

<script>

export default {
  name: "singleBook",
  props: ['bookId', 'imgSrc', 'imgUrl', 'episode', 'title', 'author', 'publisher', 'cateName'],
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    detail(e) {
      let bookdata = {
        author: this.author,
        cateName: this.cateName,
        imgSrc: this.imgSrc,
        imgUrl: this.imgUrl,
        publisher: this.publisher,
        title: this.title,
        _id: this.bookId
      }
      uni.getStorage({
        key: 'user',
        success: function ({ data }) {
          bookdata.user_id = data._id;
          console.log("single: ",bookdata)
          uni.setStorage({
            key: 'book',
            data: bookdata
          });
          uni.navigateTo({
            url: '../detail/detail'
          });
        }
      })
    }
  },
  watch: {},

  // // 页面周期函数--监听页面加载
  // onLoad() {},
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
.single-book {
  margin: 10rpx;
  width: 100%;
  position: relative;
  height: 250rpx;
  /* width: 280rpx; */
  padding: 0 5rpx;
}

.book-container {
  display: flex;
  flex-direction: row;
  /* padding: 0 22rpx; */
}

.book-img {
  width: 200rpx;
  height: 250rpx;
  padding-bottom: 20rpx;
  position: relative;
}

.episode {
  position: absolute;
  /* bottom:20rpx; */
  width: 200rpx;
  font-size: 30rpx;
  color: #ffffff;
  background: #000;
  opacity: 0.6;
  text-align: center;
}

.book-info {
  width: max-content;
  height: max-content;
  padding: 10rpx;
  font-size: large;
}

.book-msg {
  font-size: medium;
  color: #666;
}</style>