<section>
	<h1 class="responsive">responsive</h1>
	<h1 class="static">static</h1>
	<h1 class="static--2">static--2</h1>

	<h1 class="display--xl">XL Display</h1>
	<h1 class="display--lg">Large Display</h1>
	<h1 class="display--md">Medium Display</h1>
	<h1 class="display--sm">Small Display</h1>

	<h2 class="heading--xl">XL Heading</h2>
	<h2 class="heading--lg">Large Heading</h2>
	<h3 class="heading--md">Medium Heading</h3>
	<h4 class="heading--sm">Small Heading</h4>
	<h5 class="heading--xs">Xtra Small Heading</h5>
	<p class="body--xl">XL Body</p>
	<p class="body--lg">Body lg</p>
	<p class="body--md">Body md</p>
	<p class="body--sm">Body Small</p>
	<p class="body--xs">Body Xtra Small</p>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 0.025rem;
	}
	.responsive {
		font-size: get-res-fsz('display', 'sm', 'xl');
	}
	.static {
		font-size: get-static-fsz('display', 'xl');
	}
	.static--2 {
		font-size: get-static-fsz('display', 'sm');
	}
	.display--xl {
		@extend %global__display--xl;
	}
	.display--lg {
		@extend %global__display--lg;
	}
	.display--md {
		@extend %global__display--md;
	}
	.display--sm {
		@extend %global__display--sm;
	}
	.display--xs {
		@extend %global__display--xs;
	}

	.heading--xl {
		@extend %global__heading--xl;
	}
	.heading--lg {
		@extend %global__heading--lg;
	}
	.heading--md {
		@extend %global__heading--md;
	}
	.heading--sm {
		@extend %global__heading--sm;
	}
	.heading--xs {
		@extend %global__heading--xs;
	}

	.body--xl {
		@extend %global__body--xl;
	}
	.body--lg {
		@extend %global__body--lg;
	}
	.body--md {
		@extend %global__body--md;
	}
	.body--sm {
		@extend %global__body--sm;
	}
</style>
