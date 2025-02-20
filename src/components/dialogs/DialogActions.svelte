<script module lang="ts">
	import type { ButtonColor } from '$components/Button.svelte';

	export type DialogAction = {
		label: string;
		color: ButtonColor;
		fn: () => void;
	};
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';

	type Props = {
		actions: DialogAction[];
	}

	let { actions }: Props = $props();
</script>

<div>
	{#each actions as { label, color, fn }}
		<Button {color} onclick={fn}>
			{label}
		</Button>
	{/each}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.5rem 0;
	}
</style>
