<section>
	<div class="logo-testing">
		<h1 class="logo-testing__version-1">MYMODERN</h1>
		<h1 class="logo-testing__version-2">MYMODERN</h1>
	</div>

	<h1 class="display--x3">Large Display</h1>
	<h1 class="display--x2">Medium Display</h1>
	<h1 class="display--x1">Small Display</h1>

	<h2 class="heading--x3">Large Heading</h2>
	<h3 class="heading--x2">Medium Heading</h3>
	<h4 class="heading--x1">Small Heading</h4>
	<p class="body--x3">Large Body</p>
	<p class="body--x2">Medium Body</p>
	<p class="body--x1">Small Body</p>
	<p class="label">Label</p>
</section>

<style lang="scss">
	.logo-testing {
		padding: 1rem;
		margin: 1rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
		&__version-1 {
			@extend %global__display--x1;
		}

		&__version-2 {
			@extend %global__body--x1;
		}
	}

	.display--x3 {
		@extend %global__display--x3;
	}
	.display--x2 {
		@extend %global__display--x2;
	}
	.display--x1 {
		@extend %global__display--x1;
	}

	.heading--x3 {
		@extend %global__heading--x3;
	}
	.heading--x2 {
		@extend %global__heading--x2;
	}
	.heading--x1 {
		@extend %global__heading--x1;
	}

	.body--x3 {
		@extend %global__body--x3;
	}
	.body--x2 {
		@extend %global__body--x2;
	}
	.body--x1 {
		@extend %global__body--x1;
	}

	.label {
		@extend %global__label;
	}
</style>
