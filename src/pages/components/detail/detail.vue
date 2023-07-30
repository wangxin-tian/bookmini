<template>
  <!-- <div class="detail">{{detail.name}}</div> -->
  <view class="detail-page">
    <view class="book-info-title">{{ detail.title }}</view>
    <view class="book-info-wrap">
      <image :src="detail.imgUrl" class="book-cover"></image>
      <view class="btn-subscribe">
        <!-- <u-button text="渐变色按钮" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button> -->
        <uni-fav :checked="checkStatus" class="favBtn" bg-color="#ee0000" bg-color-checked="#007aff" fg-color="#ffffff"
          fg-color-checked="#ffffff" :content-text="contentText" @click="favClick" />
        <button size="mini" type="default" class="btn-read" @click="toBook">开始阅读</button>
      </view>
      <view class="book-info-msg">
        <view class="msg-title">详情</view>
        <view class="msg-content">
          <text>{{ detail.info }}</text>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
// import uNavbar from "uview-ui/components/u-navbar/u-navbar.vue";
// import uButton from "uview-ui/components/u-button/u-button.vue";
import request from '@/util/request';

export default {
  components: {
    // uButton, uNavbar
  },
  data() {
    return {
      detail: {
        author: "author",
        cateName: "cateName",
        imgUrl: "http://localhost:3000/cover_imgs/20230728131808.jpg",
        info: "暂无描述，欢迎补充",
        publisher: "publisher",
        title: "book_name",
      },
      checkStatus: false,
      contentText: {
        contentDefault: '订阅',
        contentFav: '已订阅'
      },
      subscription: {
        user_id: '',
        book_id: ''
      }
    }
  },
  computed: {},
  methods: {
    favClick() {
      this.checkStatus = !this.checkStatus;

      request.post(request.url.SUBSCRIPTBOOK, {
        add: this.checkStatus, /* 判定添加or删除订阅 */
        user_id: this.subscription.user_id || '',
        book_id: this.subscription.book_id || ''
      }).then(data => {
        console.log(data);
      });

      this.$forceUpdate();
    },
    toBook() {
      uni.navigateTo({
        url: '../book/reading'
      });
    }
  },
  watch: {},
  onLoad() {
    let detail = this.detail;
    let _this = this;
    let subscription = this.subscription;
    uni.getStorage({
      key: 'book',
      success: function (res) {
        for (let key in res.data) { // 优先更新detail
              // console.log("value: ", res.data[key]);
              detail[key] = res.data[key];
        } 
        detail.imgUrl = request.commonURL + detail.imgUrl; // 给路由添加域

        // 查询是否订阅
        subscription.user_id = res.data.user_id;
        subscription.book_id = res.data._id;
        request.post(request.url.SUBSCRIPTION, {
          user_id: res.data.user_id, book_id: res.data._id
        }).then(verify => {
          if (verify !== "") {
            _this.checkStatus = true;
          }
        });
      }
    })
  }
}
</script>

<style>
.detail-page {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom,
      rgb(213, 91, 91),
      rgb(213, 91, 91) 50%,
      rgb(255, 196, 196) 100%);
}

.book-info-title {
  text-align: center;
  font-size: 40rpx;
  line-height: 100rpx;
}

.book-info-wrap {
  width: 100%;
  align-content: center;
}

.book-cover {
  margin: 20rpx 225rpx;
  width: 300rpx;
  height: 400rpx;
}

.btn-subscribe {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.uni-fav {
  width: 300rpx !important;
  height: 80rpx !important;
}

.btn-read {
  width: 300rpx !important;
  height: 80rpx !important;
  margin: 0 10rpx !important;
}

.book-info-msg {
  color: #eee;
  font-size: small;
  margin: 60rpx 34rpx;
  width: 682rpx;
}

.book-info-msg>.msg-title {
  font-size: medium;
  border-left: 6rpx solid #DDD;
  padding-left: 20rpx;
}

.book-info-msg>.msg-content {
  color: #fff;
  margin-top: 20rpx;
  text-indent: 2em;
}
</style>