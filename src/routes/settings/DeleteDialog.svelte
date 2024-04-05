<script lang="ts">
	import BaseDialog from '$components/dialogs/BaseDialog.svelte';
	import DialogActions from '$components/dialogs/DialogActions.svelte';
	import { ENTRIES } from '$lib/data';
	import { results, scores, seed } from '$lib/store';
	import { generateId } from '$lib/utils';

	let dialog: BaseDialog;

	export function show() {
		dialog.show();
	}

	export function close() {
		dialog.close();
	}

	function handleDeleteData() {
		$seed = generateId();
		$results = [];
		$scores = Object.fromEntries(ENTRIES.map((entry) => [entry.id, 1400]));

		close();
	}
</script>

<BaseDialog bind:this={dialog} title="Delete Data">
	<p>Are you sure you want to delete all of your data? This is irreversible.</p>
	<DialogActions
		slot="footer"
		actions={[
			{
				label: 'Yes',
				color: 'red',
				fn: handleDeleteData,
			},
			{
				label: 'No',
				color: 'cyan',
				fn: close,
			},
		]}
	/>
</BaseDialog>

<style lang="postcss">
	p {
		margin: 0;

		font-size: 1.125rem;
	}
</style>
