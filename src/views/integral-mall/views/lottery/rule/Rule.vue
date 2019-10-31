<template>
	<div class="rule">
		<div class="title">签到规则</div>
		<div class="content">
			<p>1、积分签到为手动签到。</p>
			<p>2、首日签到为1积分，连续签到每次递增1积分，单日可领取积分上限为7积分。</p>
			<p>3、以连续签到7天为一周期，如有断签情况，记录累计天数自动清零。</p>
			<p>4、所获积分可以在我的积分明细中查询。</p>
		</div>
		<div class="title">抽奖规则</div>
		<div class="content">
			<p>1、每连续签到满7天,可获得一次抽奖机会，如未抽奖，于当日 24:00:00 时抽奖机会作废。</p>
			<p>2、抽奖说明：<br />中奖几率100%。</p>
			<p>3、奖品发放说明：<br />积分：您可在“积分明细”中查看；</p>
			<p>好物代金券：关注“华能成长宝”微信公众号，并完成账号的绑定，才可保证好物代金券的顺利发放；</p>
			<p>全网话费：话费将直接充值在您的注册手机号中，请注意查看。</p>
			<p>4、抽奖过程中,如遇到疑问,请及时电话咨询客服人员，客服联系电话。</p>
			<p>5、签到抽奖仅限华能成长宝APP用户参加。</p>
			<p>6、如经查证属实有作弊行为用户，华能成长宝有权取消您的中奖资格。</p>
		</div>
		<div class="tips">本次活动的最终解释权归华能成长宝所有</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
	name: 'Rule'
})
export default class Home extends Vue {

	private created() {
		document.title = '玩法'
	}
}
</script>

<style scoped lang="less">
	@import "./rule.less";
</style>
