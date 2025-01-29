<script lang="ts">
	let { icon, title, description, subtitle } = $props();
	let isActive = $state(false);
</script>

<article
	class="benefit-card"
	onmouseenter={(e) => (isActive = true)}
	onmouseleave={(e) => (isActive = false)}
>
	<img src={icon} alt={title} class="benefit-card__icon" />
	<h4 class="benefit-card__title">{title}</h4>
	<h5 class="benefit-card__subtitle">{subtitle}</h5>
	<p class="benefit-card__description">{description}</p>
</article>

<style lang="scss">
	/*
	*!TODO: ADD CUSTOM CURSOR WHEN HOVERING OVER THE CARD LIKE 
	*
	*
	*/

	* {
		// outline: 1px dashed red;
	}
	.benefit-card {
		@include shadow-medium();
		display: grid;

		grid-template-columns: 1fr;
		grid-template-rows: auto-fit;
		grid-template-areas: 'title' 'icon' 'subtitle';
		padding: get-static-sp('x4');
		justify-content: center;
		align-content: center;
		max-block-size: 15.875rem;
		max-inline-size: 11.875rem;
		background-color: get-light-dark('lightest', 'darker');
		border-radius: $br-default;

		&__icon {
			--icon-size: 100%;
			object-fit: contain;
			grid-area: icon;
			inline-size: var(--icon-size);
			block-size: var(--icon-size);
		}

		&__title {
			@extend %global__heading--h2;
			grid-area: title;
			color: get-light-dark('darkest', 'lightest');
		}
		&__subtitle {
			@extend %global__label;
			grid-area: subtitle;
		}
		&__description {
			grid-area: description;
			//animates from display none;

			opacity: 0;
			height: 0;
			overflow: hidden;
			visibility: hidden;
			&.is-active {
				opacity: 1;
				height: auto;
				overflow: visible;
				visibility: visible;
			}
		}
	}

	svg {
		grid-area: icon;
		--icon-size: 1.5rem;
		width: var(--icon-size);
		height: var(--icon-size);
		margin-bottom: get-static-sp('x2');

		& path {
			fill: get-light-dark('darkest', 'lightest');
			stroke-width: 0.5rem;
		}
	}
</style>
