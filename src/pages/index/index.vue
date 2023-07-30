<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class="search-wrap">
			<u-search placeholder="搜索书籍、作者等" v-model="keyword" @custom="toSearch" @search="toSearch"
				:show-action="true"></u-search>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-wrap">
			<u-swiper class="swiper" :border-radius="0" :list="list" height="300"></u-swiper>
		</view>
		<view class="books-wrap" v-for="(item, index) in booksData" :key="index">
			<view class="books-type" @click="chooseCate(item[0].cateName)">{{ item[0].cateName }}</view>
			<u-row>
				<u-col span="3" v-for="(subItem, subIndex) in item" :key="subIndex" @click="toDetail(subItem)">
					<view class="book-item" v-if="subIndex < 4">
						<!-- <image :src="subItem.imgUrl" mode="aspectFill"></image> -->
						<image :src="base + subItem.imgUrl" mode="aspectFill"></image>
						<view class="book-item-title">{{ subItem.title }}</view>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
import uSearch from "uview-ui/components/u-search/u-search.vue";
import uSwiper from "uview-ui/components/u-swiper/u-swiper.vue";
import uRow from "uview-ui/components/u-row/u-row.vue";
import uCol from "uview-ui/components/u-col/u-col.vue";

import request from '../../util/request.js'
// const request = require('../../util/request.js');
export default {
	components: {
		uSearch, uSwiper, uRow, uCol
	},
	data() {
		return {
			base: request.commonURL,
			title: 'Hello',
			keyword: "",
			list: request.url.BANNER,
			booksData: []
		}
	},
	onLoad() {
		console.log(request);
		request.get(request.url.GET_BOOK_LIST).then(result => {
			console.log(result);
			this.booksData = result;
		});
	},
	methods: {
		toSearch() {
			let params = this.keyword;
			uni.setStorage({
				key: 'search',
				data: { "params": params }
			});
			uni.navigateTo({
				url: '../components/search/search'
			})
		},
		chooseCate(value) {
			console.log(value);
		},
		toDetail(subItem) {
			// console.log(subItem);
			uni.getStorage({
				key: 'user',
				success: function ({ data }) {
					subItem.user_id = data._id;
					uni.setStorage({
						key: 'book',
						data: subItem
					});
					uni.navigateTo({
						url: '../components/detail/detail'
					});
				}
			})
		}
	}
}
</script>

<style scoped lang="scss">
// * {
// 	margin: 0;
// 	padding: 0;
// }
// .content {
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// }

.search-wrap {
	padding: 20rpx 30rpx;
}

.swiper-wrap {
	height: fit-content;
	padding: 10rpx 10rpx;
}

.books-wrap {
	width: 94%;
	margin: 0 auto;
}

.books-type {
	width: 94%;
	margin: 0 auto;
	height: 100rpx;
	line-height: 100rpx;
	font-weight: 900;
	color: #5f5f5f;
	font-size: 36rpx;
}

.book-item {
	width: 160rpx;
	padding: 5rpx;
	font-size: 32rpx;
	color: #333;
}

.book-item image {
	width: 100%;
	height: 250rpx;
	border-radius: 8rpx;
}

.book-item-title {
	text-align: center;
	padding-bottom: 15rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
