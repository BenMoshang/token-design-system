/******************************************************
 * scroll.svelte.ts
 * A GSAP-based scroll utility foundation for Svelte 5
 *
 * Features:
 * 1) GSAP & ScrollTrigger initialization
 * 2) Scroll-locking with a "pin-like" approach
 * 3) A "useGsapAnimation" action for typical from->to
 *    tween animations (with optional pin).
 * 4) A "useGsapPin" action for quick pinning.
 * 5) A scrollLocker object for fully locking
 *    scrolling across the page.
 ******************************************************/

import { onMount, onDestroy } from 'svelte';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ---------------------------------------------------
// 1) Register the ScrollTrigger plugin globally
// ---------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize or configure GSAP's ScrollTrigger defaults.
 * For example, you can override autoRefreshEvents, set ease defaults, etc.
 *
 * @param options - Optional ScrollTrigger config.
 *                  See https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.config()
 *
 * @example
 * initGsapScroll({
 *   autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
 *   ignoreMobileResize: true
 * });
 */
export function initGsapScroll(options: gsap.plugins.ScrollTriggerConfigVars = {}) {
	ScrollTrigger.config(options);
}

/* -------------------------------------------------------------------
 * 2) scrollLocker: lock/unlock the entire page scroll
 *    (Equivalent to "freeze" the page, not just pin an element)
 * ------------------------------------------------------------------- */
export const scrollLocker = {
	isLocked: false,
	originalScrollY: 0,
	originalStyle: '',
	touchListener: null as ((e: TouchEvent) => void) | null,
	keyboardListener: null as ((e: KeyboardEvent) => void) | null,

	lock(options: { allowTouchMove?: boolean; allowKeyboardScroll?: boolean } = {}) {
		if (this.isLocked) return;

		const body = document.body;
		this.originalScrollY = window.scrollY;
		this.originalStyle = body.style.cssText;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		// Freeze the body at the current scroll position
		body.style.cssText = `
			overflow: hidden;
			position: fixed;
			top: -${this.originalScrollY}px;
			left: 0; 
			right: 0; 
			bottom: 0;
			padding-right: ${scrollbarWidth}px;
			${!options.allowTouchMove ? 'touch-action: none;' : ''}
		`;

		// Prevent touch scroll
		if (!options.allowTouchMove) {
			this.touchListener = (e: TouchEvent) => {
				e.preventDefault();
				e.stopPropagation();
			};
			document.addEventListener('touchmove', this.touchListener, { passive: false });
		}

		// Prevent keyboard scrolling (arrow keys, space, etc.)
		if (!options.allowKeyboardScroll) {
			this.keyboardListener = (e: KeyboardEvent) => {
				if (
					['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code) ||
					e.key === ' '
				) {
					e.preventDefault();
					e.stopPropagation();
				}
			};
			document.addEventListener('keydown', this.keyboardListener);
		}

		this.isLocked = true;
	},

	unlock() {
		if (!this.isLocked) return;

		const body = document.body;
		body.style.cssText = this.originalStyle;
		window.scrollTo(0, this.originalScrollY);

		// Cleanup event listeners
		if (this.touchListener) {
			document.removeEventListener('touchmove', this.touchListener);
			this.touchListener = null;
		}
		if (this.keyboardListener) {
			document.removeEventListener('keydown', this.keyboardListener);
			this.keyboardListener = null;
		}

		this.isLocked = false;
	}
};

/* -------------------------------------------------------------------
 * 3) "useGsapAnimation"
 *    Svelte Action for a typical GSAP from->to tween with ScrollTrigger
 *
 *    Options:
 *      - from: initial tween props
 *      - to:   final tween props
 *      - triggerConfig: a partial ScrollTrigger config
 *                       (can include pin, start, end, scrub, etc.)
 *      - immediateRender: If true, GSAP sets from-values immediately
 *      - lockScroll: If true, we forcibly lock the entire page
 *                    (similar to scrollLocker) during the animation
 *                    range. This is a more extreme "pin."
 * ------------------------------------------------------------------- */
export interface GsapAnimationOptions {
	from?: gsap.TweenVars;
	to?: gsap.TweenVars;
	triggerConfig?: Partial<ScrollTrigger.Vars>;
	immediateRender?: boolean;
	lockScroll?: boolean;
}

/**
 * useGsapAnimation Svelte Action
 *
 * @example
 * <script lang="ts">
 *   import { useGsapAnimation, initGsapScroll } from './scroll.svelte.ts';
 *   initGsapScroll(); // optional global config
 *   let box;
 * </script>
 *
 * <div use:useGsapAnimation={{
 *     from: { x: -200, opacity: 0 },
 *     to: { x: 0, opacity: 1, duration: 1 },
 *     triggerConfig: { start: 'top 80%', end: 'top 20%', scrub: 1, pin: true }
 * }} bind:this={box}>
 *   Animate me
 * </div>
 */
export function useGsapAnimation(node: HTMLElement, options: GsapAnimationOptions = {}) {
	let anim: gsap.core.Tween;
	let st: ScrollTrigger;

	function setup() {
		const {
			from = {},
			to = {},
			triggerConfig = {},
			immediateRender = false,
			lockScroll = false
		} = options;

		// If "lockScroll" is true, we set up a "fake pin" by locking the entire page
		// This is basically an extreme approach where user can't scroll at all
		// during the timeline range.
		//
		// Alternatively, you can set "pin: node" in `triggerConfig` for a normal GSAP pin.
		if (lockScroll) {
			// We'll lock the scroll at the start of the timeline, and unlock at the end
			triggerConfig.onEnter = () => scrollLocker.lock();
			triggerConfig.onLeave = () => scrollLocker.unlock();
			triggerConfig.onEnterBack = () => scrollLocker.lock();
			triggerConfig.onLeaveBack = () => scrollLocker.unlock();
			triggerConfig.onUpdate = (self) => {
				// If the user forcibly tries to scroll, keep it locked
				if (self && !scrollLocker.isLocked) scrollLocker.lock();
			};
		}

		anim = gsap.fromTo(
			node,
			{ ...from, immediateRender },
			{ ...to, scrollTrigger: { trigger: node, ...triggerConfig } }
		);

		if (anim.scrollTrigger) {
			st = anim.scrollTrigger;
		}
	}

	onMount(() => {
		setup();
	});

	onDestroy(() => {
		if (st) st.kill();
		if (anim) anim.kill();
		if (scrollLocker.isLocked) {
			scrollLocker.unlock();
		}
	});

	return {
		update(newOptions: GsapAnimationOptions) {
			// If your props change dynamically, re-initialize
			options = newOptions;
			if (st) st.kill();
			if (anim) anim.kill();
			setup();
		},
		destroy() {
			if (st) st.kill();
			if (anim) anim.kill();
			if (scrollLocker.isLocked) {
				scrollLocker.unlock();
			}
		}
	};
}

/* -------------------------------------------------------------------
 * 4) "useGsapPin"
 *    Simple Svelte Action that just pins the node in place
 *    while the user scrolls. The user can define start/end
 *    positions, etc. (like typical GSAP ScrollTrigger pin).
 * ------------------------------------------------------------------- */
export interface GsapPinOptions {
	start?: string | number;
	end?: string | number;
	pinSpacing?: boolean;
	scrub?: boolean | number;
	onEnter?: ScrollTrigger.Callback;
	onLeave?: ScrollTrigger.Callback;
	onEnterBack?: ScrollTrigger.Callback;
	onLeaveBack?: ScrollTrigger.Callback;
}

/**
 * useGsapPin - Svelte Action
 *
 * Example usage:
 * <section use:useGsapPin={{ start: 'top top', end: '+=500', scrub: true }}>
 *   <h2>Pinned Section</h2>
 * </section>
 */
export function useGsapPin(node: HTMLElement, options: GsapPinOptions = {}) {
	let st: ScrollTrigger;

	function setupPin() {
		const {
			start = 'top top',
			end = '+=1000', // how many px after we start do we unpin
			pinSpacing = true,
			scrub = false,
			onEnter,
			onLeave,
			onEnterBack,
			onLeaveBack
		} = options;

		st = ScrollTrigger.create({
			trigger: node,
			start,
			end,
			pin: true,
			pinSpacing,
			scrub,
			onEnter,
			onLeave,
			onEnterBack,
			onLeaveBack
		});
	}

	onMount(() => {
		setupPin();
	});

	onDestroy(() => {
		if (st) st.kill();
	});

	return {
		update(newOptions: GsapPinOptions) {
			options = newOptions;
			if (st) st.kill();
			setupPin();
		},
		destroy() {
			if (st) st.kill();
		}
	};
}
