<script lang="ts">
	import BaseDialog from '$components/dialogs/BaseDialog.svelte';
	import DialogActions from '$components/dialogs/DialogActions.svelte';
	import { save } from '$lib/save';
	import { results, scores, seed } from '$lib/store';
	import { slide } from 'svelte/transition';

	let dialog: BaseDialog;

	let showExportCode = false;

	export function show() {
		dialog.show();
	}

	export function close() {
		dialog.close();
	}

	function handleClose() {
		showExportCode = false;
	}

	function handleShowExportData() {
		showExportCode = !showExportCode;
	}

	async function handleCopyExportData() {
		await navigator.clipboard.writeText(exportData!);
	}

	$: exportData =
		$seed &&
		save({
			version: 1,
			seed: $seed as string,
			results: $results,
			scores: $scores,
		});
</script>

<BaseDialog bind:this={dialog} title="Export Data" on:close={handleClose}>
	<div>
		<p>
			You can use this code in the import section if you want to transfer your data between devices.
		</p>
		{#if showExportCode}
			<code transition:slide>{exportData}</code>
		{/if}
	</div>
	<DialogActions
		slot="footer"
		actions={[
			{
				label: `${showExportCode ? 'Hide' : 'Show'} export code`,
				color: 'cyan',
				fn: handleShowExportData,
			},
			{
				label: 'Copy export code',
				color: 'pink',
				fn: handleCopyExportData,
			},
		]}
	/>
</BaseDialog>

<style lang="postcss">
	div {
		max-width: 60vw;

		p {
			margin: 0;

			font-size: 1.125rem;
		}

		code {
			margin-top: 1.5rem;
			padding: 1rem;

			display: block;

			word-wrap: break-word;

			font-family: 'Source Code Pro', monospace;
			font-weight: 500;

			background: #eee;
		}
	}

	@media (max-width: 1024px) {
		div {
			max-width: none;
		}
	}
</style>
