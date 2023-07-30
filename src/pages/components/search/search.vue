<template>
  <!-- <div class="search">search</div> -->
  <view>
    <!-- 搜索框 -->
    <view class="search-wrap">
      <u-sticky>
        <u-search placeholder="搜索书籍、作者等" v-model="keyword" @custom="search" @search="search"
          :show-action="true"></u-search>
      </u-sticky>
    </view>
    <view class="result-warp">
      <singleBook v-for="(item, index) of searchlist" :key="index" :cateName="item.cateName" :author="item.author"
        :publisher="item.publisher" :bookId="item._id" episode="只供阅览" :imgUrl="item.imgUrl" :imgSrc="item.imgSrc" :title="item.title" />
    </view>
  </view>
</template>

<script>
import uSearch from "uview-ui/components/u-search/u-search.vue";
import uSticky from "uview-ui/components/u-sticky/u-sticky.vue";
import singleBook from "../book/single-book.vue"

import request from '../../../util/request.js'

export default {
  components: {
    uSearch, uSticky, singleBook
  },
  data() {
    return {
      keyword: '',
      defaultSrc: "/static/logo.png",
      searchlist: [{
        id: '1001',
        title: 'vue基础',
        author: 'dhx',
        publisher: '凤凰出版社',
        cateName: '教材',
        imgSrc: '/static/logo.png',
        episode: '这里'
      }, {
        id: '1001',
        title: 'vue基础',
        author: 'dhx',
        publisher: '凤凰出版社',
        cateName: '教材',
        imgSrc: '/static/logo.png',
        episode: '这里'
      }]
    }
  },
  computed: {},
  methods: {
    search() {
      this.searchlist && (this.searchlist = []);
      this.toSearch();
    },
    toSearch(params = this.keyword, list = this.searchlist) {
      request.post(request.url.SEARCH, { "msg": params }).then( result => {
          console.log(result);
          for(let item of result) {
            console.log(request.commonURL, item.imgUrl);
            item.imgSrc = item.imgUrl === "" ? '/static/logo.png' : request.commonURL + item.imgUrl;
            list.push(item);
          }
        });
    }
  },
  watch: {},

  onLoad() {
    this.searchlist = [];
    let list = this.searchlist;
    let toSearch = this.toSearch;
    uni.getStorage({
      key: 'search',
      success: function (res) {
        // console.log(res.data.params);
        toSearch(res.data.params,list);
      }
    });
  }
}
</script>

<style scoped>
.search-wrap {
  padding: 20rpx 30rpx;
}
</style>