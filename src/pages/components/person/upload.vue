<template>
  <view class="upload-wrap">
    <view class="input-wrap">
      <view>标题：</view>
      <input class="book-input" v-model="book.title" type="text">
    </view>
    <view class="input-wrap">
      <view>作者：</view>
      <input class="book-input" v-model="book.author" type="text">
    </view>
    <view class="input-wrap">
      <view>出版商：</view>
      <input class="book-input" v-model="book.publisher" type="text">
    </view>
    <view class="input-wrap">
      <view>分类：</view>
      <input class="book-input" v-model="book.cateName" type="text">
    </view>
    <view class="input-wrap">
      <view>详情：</view>
      <input class="book-input" v-model="book.info" type="text">
    </view>
    <view class="content-upload">
      <view>上传的文件名：</view>
      <button type="primary" style="width: 500rpx;" @click="upload()">点击上传</button>
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
        title: '与文件名保持一致',
        author: "",
        publisher: "",
        cateName: "",
        imgUrl: "cover_imgs/default.jpg",
        info: "暂无描述"
      },
      library: {}
    }
  },
  computed: {},
  methods: {
    upload() {
      const book = this.book;
      wx.chooseMessageFile({
        count: 10,
        type: 'file',
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFiles
          console.log(tempFilePaths);
          uni.uploadFile({
            url: `${request.commonURL}${request.url.APPENDBOOK}`, //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0].path,
            name: book.title,
            formData: book,
            success: (uploadFileRes) => {
              console.log("uploadFileRes", uploadFileRes.data);
              uni.navigateBack();
            }
          });
        }
      });
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() { },

}
</script>

<style scoped>
.upload-wrap {
  display: flex;
  flex-direction: column;

  height: 90vh;
  width: 700rpx;
  padding: 25rpx;
}

.upload-wrap .input-wrap {
  margin-top: 20rpx;
  padding: 10rpx;
  border: 1rpx #999 solid;
  border-radius: 15rpx;
  box-shadow: 1px 2px 1px 1px #EEE;
  /* width: 700rpx; */
  /* height: ; */

  display: flex;
  flex-direction: row;
}

.input-wrap>view,
.input-wrap>.book-input {
  height: 100rpx;
  line-height: 100rpx;
}

.input-wrap>.book-input {
  color: #999;
}

.content-upload {
  flex: 1;
  margin-top: 20rpx;
  padding: 10rpx;
  border: 1rpx #999 solid;
  border-radius: 15rpx;
  box-shadow: 1px 2px 1px 1px #EEE;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content-upload view {
  font-weight: 900;
}

.content-upload button {
  margin-top: 100rpx;
  width: 50%;
}
</style>