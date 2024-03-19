<script lang="ts">
	import Entry from '$components/Entry.svelte';
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
		$results = [...$results, { a: $entryA.id, b: $entryB.id, winner }];
		$seed = generateId();
	}
</script>

<main>
	<div class="option left">
		{#if $seed}
			<Entry entry={$entryA} buttonColor="pink" on:vote={() => handleVote('a')} />
		{/if}
	</div>
	<div class="splitter"></div>
	<div class="option right">
		{#if $seed}
			<Entry entry={$entryB} buttonColor="cyan" on:vote={() => handleVote('b')} />
		{/if}
	</div>
</main>

<style lang="postcss">
	main {
		--color-left: var(--color-cyan);
		--color-right: var(--color-pink);

		height: 100%;

		display: grid;
		grid-template-columns: 1fr 4vw 1fr;

		.left {
			background: var(--color-left);
		}

		.splitter {
			border-left: 4vw solid var(--color-left);
			border-bottom: 100vh solid var(--color-right);
		}

		.right {
			background: var(--color-right);
		}

		.option {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}

	@media (max-aspect-ratio: 1/1) {
		main {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 4vh 1fr;

			.splitter {
				border-left: none;
				border-right: 100vw solid var(--color-left);
				border-bottom: 4vh solid var(--color-right);
			}
		}
	}
</style>
