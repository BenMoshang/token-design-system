<script lang="ts">
	import { onMount } from 'svelte';

	const currentYear = new Date().getFullYear();

	interface Link {
		name: string;
		href: string;
		icon?: string;
		ariaLabel?: string;
	}

	interface FooterLinks {
		services: Link[];
		company: Link[];
		social: Link[];
	}

	const footerLinks: FooterLinks = {
		services: [
			{
				name: 'Web Development',
				href: '/services/web-development',
				ariaLabel: 'Learn about our web development services'
			},
			{
				name: 'UI/UX Design',
				href: '/services/design',
				ariaLabel: 'Explore our UI/UX design services'
			},
			{
				name: 'Consulting',
				href: '/services/consulting',
				ariaLabel: 'View our consulting services'
			}
		],
		company: [
			{ name: 'About', href: '/about', ariaLabel: 'Learn more about our company' },
			{ name: 'Services', href: '/blog', ariaLabel: 'Read our latest blog posts' },
			{ name: 'Contact', href: '/contact', ariaLabel: 'Get in touch with us' }
		],
		social: [
			{
				name: 'GitHub',
				href: 'https://github.com',
				icon: '🔗',
				ariaLabel: 'Visit our GitHub profile'
			},
			{
				name: 'LinkedIn',
				href: 'https://linkedin.com',
				icon: '🔗',
				ariaLabel: 'Connect with us on LinkedIn'
			},
			{
				name: 'Twitter',
				href: 'https://twitter.com',
				icon: '🔗',
				ariaLabel: 'Visit our Twitter profile'
			}
		]
	};
</script>

<footer class="footer" aria-label="Site footer">
	<svg
		class="footer__shape-top"
		data-name="Layer 1"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 1200 120"
		preserveAspectRatio="none"
	>
		<path
			d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
			class="shape-fill"
		></path>
	</svg>
	<section class="footer__content">
		<div class="footer__brand">
			<a class="footer__logo" href="/">
				<span class="footer__logo-company-my">My</span><br />Modern
			</a>
			<p class="footer__brand-description">
				Creating exceptional digital experiences with modern web technologies.
			</p>
		</div>

		<nav class="footer__nav" aria-label="Footer navigation">
			<div class="footer__nav-group">
				<h3 class="footer__nav-title" id="services-title">Services</h3>
				<ul class="footer__nav-list" aria-labelledby="services-title">
					{#each footerLinks.services as link}
						<li class="footer__nav-item">
							<a class="footer__nav-link" href={link.href} aria-label={link.ariaLabel}>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<section class="footer__nav-group">
				<h3 class="footer__nav-title" id="company-title">About</h3>
				<ul class="footer__nav-list" aria-labelledby="company-title">
					{#each footerLinks.company as link}
						<li class="footer__nav-item">
							<a class="footer__nav-link" href={link.href} aria-label={link.ariaLabel}>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</section>

			<section class="footer__nav-group">
				<h3 class="footer__nav-title" id="social-title">Connect</h3>
				<ul class="footer__nav-list footer__nav-list--social" aria-labelledby="social-title">
					<li class="footer__nav-item">
						<a
							class="footer__nav-link footer__nav-link--social"
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit our GitHub profile"
						>
							<img
								src="/Images/icons/github-icon.svg"
								alt="GitHub"
								class="footer__nav-icon"
								aria-hidden="true"
							/>
							<span class="footer__nav-text">GitHub</span>
						</a>
					</li>
					<li class="footer__nav-item">
						<a
							class="footer__nav-link footer__nav-link--social"
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Visit our GitHub profile"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="10"
								width="9.6875"
								viewBox="0 0 496 512"
								><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
									fill="currentColor"
									d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
								/></svg
							>
							<span class="footer__nav-text">GitHub</span>
						</a>
					</li>
				</ul>
			</section>
		</nav>
	</section>

	<section class="footer__bottom">
		<p class="footer__copyright">
			<span class="visually-hidden">Copyright</span>
			{currentYear} My Modern LLC.
		</p>
		<!-- &copy; -->
	</section>
</footer>

<style lang="scss">
	/*=============================================
	TODO: make footer parallax
	=============================================*/
	/*=============================================
	FOOTER TOP
	=============================================*/
	.footer__shape-top {
		line-height: 0;
		inline-size: calc(100% + get-static-sp('s16'));
		block-size: 5.25rem;
	}

	.footer__shape-top .shape-fill {
		inline-size: calc(100% + get-static-sp('s16'));

		fill: get-light-dark('lightest', 'darkest');
	}

	/*=============================================
	FOOTER CONTENT
	=============================================*/
	.footer {
		position: relative;
		block-size: 100%;
		inline-size: 100%;
		background: get-light-dark('medium', 'darker');
		padding-bottom: get-static-sp('s32');

		&__content {
			padding: get-static-sp('s16');
			max-inline-size: $desktop-breakpoint;
			margin-block: 0;
			margin-inline: auto;
			display: flex;
			flex-direction: column;
		}

		&__brand {
			&-description {
				@extend %global__body--md;
				max-width: 35ch;
				// margin-bottom: get-static-sp('s24');
			}
		}

		/*=============================================
        FOOTER LOGO
	=============================================*/

		&__logo {
			text-decoration: none;
			font-size: get-static-fsz('x4');
			margin-bottom: get-static-sp('s16');
		}

		&__nav {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
			justify-content: space-between;
			gap: get-static-sp('s24');
		}

		&__nav-title {
			font-family: get-ff('primary');
			font-size: get-static-fsz('x1');
			letter-spacing: get-ls('normal');
			color: get-light-dark('darkest', 'lightest');
			margin-block-end: get-static-sp('s16');
		}

		&__nav-list {
			list-style: none;
			padding: 0;
			margin: 0;

			&--social {
				display: flex;
				flex-direction: column;
				gap: get-static-sp('s8');
			}
		}

		&__nav-item {
			margin-block-end: get-static-sp('s8');

			& svg path {
				fill: get-light-dark('dark', 'light');
			}
		}

		&__nav-link {
			@extend %global__body--md;
			text-decoration: none;
			transition: all 0.2s ease-in-out;
			font-size: get-static-fsz('x3');
			color: get-light-dark('darker', 'lighter');

			&:focus-visible {
				outline: 2px solid get-light-dark('lightest', 'darkest');
				outline-offset: 4px;
				border-radius: 2px;
			}

			&--social {
				display: flex;
				align-items: center;
				padding: get-static-sp('s8');
				margin: calc(get-static-sp('s8') * -1);
			}
		}

		&__nav-icon {
			font-size: get-static-fsz('x4');
		}

		&__nav-text {
			margin-inline-start: get-static-sp('s8');
		}

		&__bottom {
			max-width: $desktop-breakpoint;
			margin: get-static-sp('s32') auto 0;
			padding-block-start: get-static-sp('s16');
			border-block-start: 0.0313rem solid get-light-dark('dark', 'light');
			text-align: center;
		}

		&__copyright {
			@extend %global__body--md;
			color: get-light-dark('dark', 'light');
			font-size: get-static-fsz('x1');
		}
	}

	// Utility class for screen readers
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
