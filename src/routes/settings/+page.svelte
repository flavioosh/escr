<script lang="ts">
	import Button from '$components/Button.svelte';
	import DeleteDialog from './DeleteDialog.svelte';
	import ExportDialog from './ExportDialog.svelte';
	import ImportDialog from './ImportDialog.svelte';

	let exportDialog: ExportDialog | undefined = $state();
	let importDialog: ImportDialog | undefined = $state();
	let deleteDialog: DeleteDialog | undefined = $state();
</script>

<section>
	<h1>Settings</h1>

	<Button color="pink" onclick={exportDialog?.show}>Export data</Button>
	<Button color="pink" onclick={importDialog?.show}>Import data</Button>
	<Button color="red" onclick={deleteDialog?.show}>Delete data</Button>
</section>

<ExportDialog bind:this={exportDialog} />

<ImportDialog bind:this={importDialog} />

<DeleteDialog bind:this={deleteDialog} />

<style>
	section {
		min-height: 100%;
		padding: calc(1rem + var(--header-height)) 1rem 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;

		background-color: var(--color-cyan);

		h1 {
			margin: 0;

			font-size: 2rem;

			color: #fff;
		}
	}
</style>
