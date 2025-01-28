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

	let isHovered = $state(false);

	function handleHover() {
		// console.log('hover');
		isHovered = true;
	}

	function handleLeave() {
		// console.log('leave');
		isHovered = false;
	}
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
	onmouseenter={handleHover}
	onmouseleave={handleLeave}
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
		class="email-icon"
	>
		<title>Email icon</title>
		<desc>An envelope icon representing email contact</desc>
		<path
			fill="currentColor"
			d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
		/>
	</svg>
	<span class:is-hovered={isHovered} class="text" itemprop="name">{label}</span>
</a>

<style lang="scss">
	.email-button {
		@include shadow-low;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: get-sp('x2');
		position: relative;
		width: fit-content;
		height: fit-content;
		text-decoration: none;
		padding: get-sp('x2');

		// Typography styles
		font-family: get-ff('primary');
		font-weight: 600;
		font-size: get-static-fsz('body', 'md');

		color: get-light-dark('lightest', 'darkest');
		background-color: get-light-dark('darker', 'lightest');

		// Border and shape
		border: none;
		border-radius: $br-rounded;
		overflow: clip;
		// Interactive states
		cursor: pointer;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;

		// Focus styles for accessibility
		&:focus-visible {
			outline: 0.1875rem solid get-light-dark('lightest', 'darkest');
			outline-offset: 0.125rem;
		}

		&:hover {
			& span {
				position: relative;
			}
		}

		& span {
			position: absolute;
			transition-property: position;
			transition-duration: 0.3s;
			transition-timing-function: ease-in-out;
			transition-behavior: allow-discrete;
			text-wrap: nowrap;
		}

		& svg {
			inline-size: 1.125rem;
			block-size: 1.125rem;
			vertical-align: bottom;

			& path {
				fill: get-light-dark('lightest', 'darkest');
			}
		}
	}
	@keyframes show-text {
		from {
			display: none;
		}
		to {
			display: block;
		}
	}
	.text {
		font-weight: get-fw('medium');
	}
</style>
