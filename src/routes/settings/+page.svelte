<script lang="ts">
	import Button from '$components/Button.svelte';
	import DeleteDialog from './DeleteDialog.svelte';
	import ExportDialog from './ExportDialog.svelte';
	import ImportDialog from './ImportDialog.svelte';

	let exportDialog: ExportDialog;
	let importDialog: ImportDialog;
	let deleteDialog: DeleteDialog;
</script>

<section>
	<h1>Settings</h1>

	<Button color="pink" on:click={exportDialog.show}>Export data</Button>
	<Button color="pink" on:click={importDialog.show}>Import data</Button>
	<Button color="red" on:click={deleteDialog.show}>Delete data</Button>
</section>

<ExportDialog bind:this={exportDialog} />

<ImportDialog bind:this={importDialog} />

<DeleteDialog bind:this={deleteDialog} />

<style lang="postcss">
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
