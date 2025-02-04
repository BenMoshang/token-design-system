<section>
	<h1 class="display--h1">LARGEST DISPLAY</h1>
	<h2 class="display--h2">MEDIUM DISPLAY</h2>

	<h2 class="heading--h2">LARGE HEADING</h2>
	<h3 class="heading--h3">MEDIUM HEADING</h3>
	<h4 class="heading--h4">SMALL HEADING</h4>

	<p class="body--lg">LARGE BODY</p>
	<p class="body--md">MEDIUM BODY</p>

	<p class="label">LABEL</p>
</section>

<style lang="scss">
	* {
		outline: 1px solid red;
	}
	section {
		padding-inline: 1rem;
		padding-top: 10rem;
		@include flex-column-center;
		justify-content: flex-end;
		@extend %page-grid-item;
		& > * {
			text-align: left !important;
		}
	}
	.logo-testing {
		padding: 1rem;
		margin: 1rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;
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
