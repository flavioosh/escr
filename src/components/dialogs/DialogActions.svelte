<script context="module" lang="ts">
	import type { ButtonColor } from '$components/Button.svelte';

	export type DialogAction = {
		label: string;
		color: ButtonColor;
		fn: () => void;
	};
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';

	export let actions: DialogAction[];
</script>

<div>
	{#each actions as { label, color, fn }}
		<Button {color} on:click={fn}>
			{label}
		</Button>
	{/each}
</div>

<style lang="postcss">
	div {
		display: flex;
		justify-content: center;
	}
</style>
