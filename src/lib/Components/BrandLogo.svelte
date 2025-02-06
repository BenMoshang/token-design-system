<a class="logo-text"><span>MY</span> <span>MODERN</span></a>

<style lang="scss">
	.logo-text {
		@include elastic-text-hover;
		@include label-overview;
		font-family: get-ff('display');
		font-size: get-static-fsz('x2');
		font-weight: 600;
		color: get-light-dark('darkest', 'lightest');
		line-height: 1;
		text-wrap: balance;
		cursor: pointer;
		display: flex;
		flex-direction: column;

		& span {
			display: block;
		}
	}
</style>
