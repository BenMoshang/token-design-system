<section>
	<div class="logo-testing">
		<h1 class="logo-testing__version-1">MYMODERN</h1>
		<h1 class="logo-testing__version-2">MYMODERN</h1>
	</div>

	<h1 class="display--h1">largest display</h1>
	<h2 class="display--h2">Medium Display</h2>

	<h2 class="heading--h2">Large Heading</h2>
	<h3 class="heading--h3">Medium Heading</h3>
	<h4 class="heading--h4">Small Heading</h4>

	<p class="body--lg">Large Body</p>
	<p class="body--md">Medium Body</p>
	
	<p class="label">Label</p>
</section>

<style lang="scss">
	* {
		outline: 1px solid red;
	}
	.logo-testing {
		padding: 1rem;
		margin: 1rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
		& > * {
			text-align: center;
		}
	}

	.display {
		&--h1 {
			@extend %global__display--h1;
		}
		&--h2 {
			@extend %global__display--h2;
		}
	}
	.heading {
		&--h2 {
			@extend %global__heading--h2;
		}

		&--h3 {
			@extend %global__heading--h3;
		}
		&--h4 {
			@extend %global__heading--h4;
		}
	}

	.body {
		&--lg {
			@extend %global__body--lg;
		}
		&--md {
			@extend %global__body--md;
		}
	}

	.label {
		@extend %global__label;
	}
</style>
