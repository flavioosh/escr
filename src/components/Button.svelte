<script context="module" lang="ts">
	export type ButtonColor = 'cyan' | 'pink';
</script>

<script lang="ts">
	export let color: ButtonColor = 'cyan';
</script>

<button on:click style:--button-color="var(--color-{color})">
	<slot />
</button>

<style lang="postcss">
	button {
		--angle-width: 0.5rem;
		--button-height: 3.5rem;

		position: relative;

		margin: 0 var(--angle-width);
		padding: 0 1.5rem;
		height: var(--button-height);

		border: none;
		background-color: var(--button-color);
		color: #fff;

		font-size: 2rem;
		font-weight: 600;

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
	}
</style>
