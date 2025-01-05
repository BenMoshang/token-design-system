<section>
	<h1 class="display--lg">Large Display</h1>
	<h1 class="display--md">Medium Display</h1>
	<h1 class="display--sm">Small Display</h1>

	<h2 class="heading--lg">Large Heading</h2>
	<h3 class="heading--md">Medium Heading</h3>
	<h4 class="heading--sm">Small Heading</h4>
	<p class="body--lg">Large Body</p>
	<p class="body--md">Medium Body</p>
	<p class="body--sm">Small Body</p>
	<p class="label">Label</p>
</section>

<style lang="scss">
	.display--lg {
		@extend %global__display--lg;
	}
	.display--md {
		@extend %global__display--md;
	}
	.display--sm {
		@extend %global__display--sm;
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

	.body--lg {
		@extend %global__body--lg;
	}
	.body--md {
		@extend %global__body--md;
	}
	.body--sm {
		@extend %global__body--sm;
	}

	.label {
		@extend %global__label;
	}
</style>
