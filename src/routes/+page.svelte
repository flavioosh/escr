<script lang="ts">
	import Entry from '$components/Entry.svelte';
	import SplitLayout from '$components/SplitLayout.svelte';
	import { calculateEloScores } from '$lib/elo';
	import { entryA, entryB, results, scores, seed } from '$lib/store';
	import { generateId } from '$lib/utils';

	async function handleVote(winner: 'a' | 'b') {
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
</script>

<SplitLayout>
	<div class="option" slot="left">
		{#if $seed}
			<Entry entry={$entryA} buttonColor="pink" on:vote={() => handleVote('a')} />
		{/if}
	</div>
	<div class="option" slot="right">
		{#if $seed}
			<Entry entry={$entryB} buttonColor="cyan" on:vote={() => handleVote('b')} />
		{/if}
	</div>
</SplitLayout>

<style lang="postcss">
	.option {
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
