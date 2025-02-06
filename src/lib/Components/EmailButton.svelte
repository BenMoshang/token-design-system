<script lang="ts">
	// Props using runes
	let {
		email = 'benjamin@mymodernsite.com',
		label = 'EMAIL US',
		ariaLabel = 'Send us an email'
	} = $props();

	// Add click handler for debugging and analytics
	// function handleClick(e: MouseEvent) {
	// 	console.log('Email link clicked');
	// 	// Track engagement if analytics are set up
	// }

	// Handle keyboard interaction with proper type checking
	// function handleKeydown(e: KeyboardEvent) {
	// 	if (e.key === 'Enter' || e.key === ' ') {
	// 		e.preventDefault();
	// 		const target = e.currentTarget as HTMLAnchorElement;
	// 		target.click();
	// 	}
	// }
</script>

<!-- onclick={handleClick} -->
<!-- onkeydown={handleKeydown} -->

<a
	href={`mailto:${email}`}
	class="email-button"
	role="button"
	aria-label={ariaLabel}
	title={`Send email to ${email}`}
	rel="noopener"
	itemscope
	itemtype="http://schema.org/ContactPoint"
	itemprop="email"
>
	<meta itemprop="contactType" content="customer service" />
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="12"
		width="12"
		viewBox="0 0 512 512"
		aria-hidden="true"
		role="img"
		focusable="false"
		class="email-button__icon"
	>
		<path
			class="email-button__icon--path"
			fill="currentColor"
			d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
		/>
	</svg>
	<span class="text" itemprop="name">{label}</span>
</a>

<style lang="scss">
	.email-button {
		--icon-size: 1em;
		@include flex-center;
		@include button-effect;
		@include shadow-high('darkest', 'lightest');
		height: 2rem;
		gap: get-static-sp('xs');
		text-decoration: none;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		border-radius: $br-default;
		border: 0.0625rem solid get-light-dark('darkest', 'lightest');
		color: get-light-dark('lightest', 'darkest');
		padding: get-static-sp('sm');
		background: get-light-dark('darkest', 'lightest');

		@include respond-to('mobile') {
			padding-inline: get-static-sp('md');
			padding-block: get-static-sp('xs');
		}

		&__icon {
			display: block;
			block-size: var(--icon-size);
			inline-size: var(--icon-size);
			object-fit: cover;
		}
	}

	.text {
		@include display-overview;
		display: none;
		color: inherit;
		line-height: 1;
		font-weight: get-fw('heading');
		font-size: get-static-fsz('x2');

		@include respond-to('mobile') {
			display: inline;
		}
	}
</style>
