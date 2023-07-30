<script>
export default {
	onLoad: function () {
		request.get(request.url.USERINFO, null).then( res => {
			uni.setStorage({
				key: 'user',
				data: res
			})
		});
	},
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}

}
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
</style>
