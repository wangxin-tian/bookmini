<template>
	<view class="my">
		<uni-section title="mine" type="line">
			<uni-card :title="userInfo.username"
				:thumbnail="userInfo.avatar">
				<!-- <u-avatar :src="src"></u-avatar> -->
				<text>{{ userInfo.info }}</text>
			</uni-card>
		</uni-section>
		<uni-section title="基础用法">
			<uni-list>
				<uni-list-item title="历史记录" showArrow link 
				@click="showToast" />
				<uni-list-item title="我的发布" showArrow link to="../components/person/upload"
					@click="changeNav('../components/person/upload')" />
				<uni-list-item title="个人信息" showArrow link to="../components/person/modify"
					@click="changeNav('../components/person/modify')" />
				<uni-list-item title="用户反馈" showArrow link
					@click="showToast" />
			</uni-list>
		</uni-section>
		<view class="my-toast toast-bg" v-show="show">
			<text>只是当时已惘然</text>
		</view>
		
	</view>
</template>

<script>
// import uToast from "uview-ui/components/u-toast/u-toast.vue";
// import uAvatar from "uview-ui/components/u-avatar/u-avatar.vue";
// let intruduce = "个人中心";
import request from '@/util/request';

export default {
	components: {
		// uAvatar
		// uToast
	},
	data() {
		return {
			userInfo: {},
			info: [],
			msgType: 'info',
			messageText: '略',
			show: false,
			toast: null,
			msg: {
				type: 'error',
				icon: false,
				title: '失败主题',
				message: "一弦一柱思华年",
				duration: "1000"
			}
		}
	},
	computed: {},
	methods: {
		changeNav(e) {
			console.log(e);
			uni.navigateTo({
				url: e
			});
		},
		showToast() {
			clearTimeout(this.toast);
			this.show = true;
			this.toast = setTimeout(()=>{ 
				this.show = false;
				// this.$forceUpdate();
			}, 2000);
		}
	},
	watch: {},
	// 页面周期函数--监听页面加载
	onLoad() {
		request.get(request.url.USERINFO, null).then( res => {
			res.avatar = request.commonURL + res.avatar;
			this.userInfo = res;
		});
		
	},
	// 页面周期函数--监听页面初次渲染完成
	// onReady() {},
	// 页面周期函数--监听页面显示(not-nvue)
	// onShow() {},
	// 页面周期函数--监听页面隐藏
	// onHide() {},
	// 页面周期函数--监听页面卸载
	// onUnload() {},
	// 页面处理函数--监听用户下拉动作
	// onPullDownRefresh() { uni.stopPullDownRefresh(); },
	// 页面处理函数--监听用户上拉触底
	// onReachBottom() {},
	// 页面处理函数--监听页面滚动(not-nvue)
	// onPageScroll(event) {},
	// 页面处理函数--用户点击右上角分享
	// onShareAppMessage(options) {},
} 
</script>

<style>
.uni-list {
	margin: 0 34rpx;
	padding: 5rpx;
	border: 1px solid #DDD;
	border-radius: 5px;
	box-shadow: 0 0 2px 2px #EEE;
}
.my {
	position: relative;
}
.my-toast {
	position: absolute;
	height: 60rpx;
	width: 50%;
	top: 40%;
	left: 50%;
	transform: translateX(-50%); 
	z-index: 999;
}
.toast-bg {
	background: #ffb9b9;
	border: 2px solid #ff6666;
	border-radius: 15rpx;
	color: #fff;
	line-height: 60rpx;
	text-align: center;
}
</style>