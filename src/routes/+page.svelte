<script lang="ts">
	import Entry from '$components/Entry.svelte';
	import SplitLayout from '$components/SplitLayout.svelte';
	import { calculateEloScores } from '$lib/elo';
	import { entryA, entryB, results, scores, seed } from '$lib/store';
	import { generateId } from '$lib/utils';

	let leftKeyDown = false;
	let rightKeyDown = false;

	async function vote(winner: 'a' | 'b') {
		const scoreA = $scores[$entryA.id];
		const scoreB = $scores[$entryB.id];
		const { a: newScoreA, b: newScoreB } = calculateEloScores(scoreA, scoreB, winner);
		$scores = {
			...$scores,
			[$entryA.id]: newScoreA,
			[$entryB.id]: newScoreB,
		};
		$results = [
			...$results,
			{ a: $entryA.id, b: $entryB.id, winner, timestamp: new Date().toISOString() },
		];
		$seed = generateId();
	}

	async function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft' && !leftKeyDown) {
			leftKeyDown = true;
			await vote('a');
		} else if (event.key === 'ArrowRight' && !rightKeyDown) {
			rightKeyDown = true;
			await vote('b');
		}
	}

	async function handleKeyUp(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			leftKeyDown = false;
		} else if (event.key === 'ArrowRight') {
			rightKeyDown = false;
		}
	}
</script>

<svelte:document onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<SplitLayout>
	{#snippet left()}
		<div class="option" >
			{#if $seed}
				<Entry entry={$entryA} buttonColor="pink" onvote={() => vote('a')} />
			{/if}
		</div>
	{/snippet}
	{#snippet right()}
		<div class="option" >
			{#if $seed}
				<Entry entry={$entryB} buttonColor="cyan" onvote={() => vote('b')} />
			{/if}
		</div>
	{/snippet}
</SplitLayout>

<style>
	.option {
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
