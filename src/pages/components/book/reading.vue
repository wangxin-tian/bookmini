<template>
  <view class="reading bg_read">
    <view class="title">{{ book.title }}</view>
    <view class="content">
      {{ book.chapter }}
    </view>
    <view class="turn_to_page btn-position">
      <button size="mini" type="default" @click="changePage" data-direction="left">上一页</button>
      <button size="mini" type="default" @click="changePage" data-direction="right">下一页</button>
    </view>
  </view>
</template>

<script>
import request from '@/util/request';
export default {
  components: {},
  data() {
    return {
      book: {
        title: '',
        chapter: '',
        pages: '0'
      }
    }
  },
  computed: {},
  methods: {
    changePage(e) {
      let direction = e.currentTarget.dataset.direction;

      (direction === "right" && this.book.chapter !== "到头了") && this.book.pages++;
      (direction === "left" && this.book.pages != 0) && this.book.pages--;

      this.reqChapter();
    },
    reqChapter(book = this.book, fn = () => { }) {
      // console.log("req: ", book);
      if (book.pages > -1) {
        request.post(request.url.READING, {
          title: book.title,
          pages: book.pages
        }).then(data => {
          book.chapter = data.chapters ? data.chapters[0].content : "到头了";
          // console.log("after: ", book);
          fn();
        });
      }
    }
  },
  watch: {},
  onLoad() {
    let book = this.book;
    let reqChapter = this.reqChapter;
    uni.getStorage({
      key: 'book',
      success: function (res) {
        book.title = res.data.title;
        // console.log("load: ", book);
        reqChapter(book);
      }
    });
  }
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
.reading {
  position: relative;
  width: 100%;
  height: 100vh;
}

.bg_read {
  background-color: rgb(111, 203, 172);
}

.title {
  text-align: center;
  width: 100%;
  font-size: 20px;
  line-height: 30px;
  font-weight: 200;
}

.content {
  width: 730rpx;
  height: 82vh;
  color: #000;
  border: 1px solid #000;
  padding: 10rpx;
  overflow: auto;
}

.turn_to_page {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.btn-position {
  position: absolute;
  bottom: 10rpx;
}
</style>