<script module lang="ts">
	export type ButtonColor = 'cyan' | 'pink' | 'red';
	export type ButtonSize = 'regular' | 'large';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		color?: ButtonColor;
		size?: ButtonSize;
		onclick?: () => void;
		children?: Snippet;
	}

	let { color = 'cyan', size = 'regular', children, onclick }: Props = $props();
</script>

<button {onclick} style:--button-color="var(--color-{color})" class={size}>
	{@render children?.()}
</button>

<style>
	button {
		--angle-width: 0.5rem;

		position: relative;

		margin: 0 var(--angle-width);
		border: none;
		height: var(--button-height);

		white-space: nowrap;

		background-color: var(--button-color);
		color: #fff;

		cursor: pointer;

		transition: filter 0.2s;

		&.regular {
			--button-height: 2.5rem;

			padding: 0 1rem;

			font-size: 1.25rem;
			font-weight: 500;
		}

		&.large {
			--button-height: 3.5rem;

			padding: 0 1.5rem;

			font-size: 2rem;
			font-weight: 600;
		}

		&::before {
			content: '';

			position: absolute;
			top: 0;
			left: calc(var(--angle-width) * -1);

			height: 100%;

			border-left: var(--angle-width) solid transparent;
			border-bottom: var(--button-height) solid var(--button-color);
		}

		&::after {
			content: '';

			position: absolute;
			top: 0;
			right: calc(var(--angle-width) * -1);

			height: 100%;

			border-right: var(--angle-width) solid transparent;
			border-top: var(--button-height) solid var(--button-color);
		}

		&:focus-visible {
			outline: none;

			filter: drop-shadow(0.375rem 0.375rem 0 var(--color-yellow));
		}
	}
</style>
