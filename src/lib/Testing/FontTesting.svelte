<h1>Large Display</h1>
<h2>Medium Display</h2>
<h3>Small Display</h3>
<h4>Large Heading</h4>
<h5>Medium Heading</h5>
<h6>Small Heading</h6>
<p class="p--base">Body Base</p>
<p class="p--sm">Body Small</p>
<p class="p--xs">Body Xtra Small</p>

<style lang="scss">
	h1 {
		@extend %global__display--lg;
	}

	h2 {
		@extend %global__display--md;
	}

	h3 {
		@extend %global__display--sm;
	}

	h4 {
		@extend %global__heading--lg;
	}

	h5 {
		@extend %global__heading--md;
	}

	h6 {
		@extend %global__heading--sm;
	}
	.p--base {
		@extend %global__body--base;
	}

	.p--sm {
		@extend %global__body--sm;
	}

	.p--xs {
		@extend %global__body--xs;
	}
</style>
