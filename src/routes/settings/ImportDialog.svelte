<script lang="ts">
	import BaseDialog from '$components/dialogs/BaseDialog.svelte';
	import DialogActions from '$components/dialogs/DialogActions.svelte';
	import { load } from '$lib/save';
	import { results, scores, seed } from '$lib/store';
	import { slide } from 'svelte/transition';

	let dialog: BaseDialog | undefined = $state();

	let importText: string = $state('');
	let error: string = $state('');

	export function show() {
		dialog?.show();
	}

	export function close() {
		dialog?.close();
	}

	function handleClose() {
		importText = '';
		error = '';
	}

	function handleImport() {
		error = '';

		try {
			const save = load(importText);

			$seed = save.seed;
			$results = save.results;
			$scores = save.scores;

			close();
		} catch (e) {
			error = (e as Error).message;
		}
	}
</script>

<BaseDialog bind:this={dialog} title="Import Data" onclose={handleClose}>
	<p>Importing will overwrite your existing data.</p>
	<div>
		<textarea placeholder="Paste your code here" bind:value={importText}></textarea>
		{#if error}
			<div class="error" transition:slide>
				{error}
			</div>
		{/if}
	</div>
	{#snippet footer()}
		<DialogActions

			actions={[
				{
					label: 'Import',
					color: 'pink',
					fn: handleImport,
				},
			]}
		/>
	{/snippet}
</BaseDialog>

<style>
	p {
		margin: 0;

		font-size: 1.125rem;
	}

	textarea {
		border: none;
		width: 100%;
		max-width: 60vw;
		height: 30vh;
		padding: 1rem;
		resize: none;

		display: block;

		word-wrap: break-word;

		font-family: 'Source Code Pro', monospace;
		font-weight: 500;

		background: #eee;

		transition: box-shadow 0.2s;

		&:focus {
			outline: none;
		}

		&:focus-visible {
			box-shadow: inset 0 0 0 0.25rem var(--color-yellow);
		}
	}

	.error {
		padding: 0.25rem 0.5rem;

		font-weight: 500;

		background-color: var(--color-red);
		color: #fff;
	}

	@media (max-width: 1024px) {
		textarea {
			max-width: none;
		}
	}
</style>
