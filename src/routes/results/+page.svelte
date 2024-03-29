<script lang="ts">
	import { ENTRY_MAP } from '$lib/data';
	import { results, scores } from '$lib/store';

	const TOP_TEN_SCORES = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

	let showDetails = false;

	$: fullResults = Object.entries($scores)
		.sort(([, a], [, b]) => {
			if (a > b) {
				return -1;
			} else if (a < b) {
				return 1;
			}
			return 0;
		})
		.map(([id, score]) => {
			const wins = $results.filter(
				(result) =>
					(result.a === id && result.winner === 'a') || (result.b === id && result.winner === 'b'),
			).length;
			const losses = $results.filter(
				(result) =>
					(result.a === id && result.winner === 'b') || (result.b === id && result.winner === 'a'),
			).length;
			return {
				entry: ENTRY_MAP[id],
				score,
				wins,
				losses,
				totalMatchups: wins + losses,
			};
		});

	$: displayedResults = showDetails ? fullResults : fullResults.slice(0, 10);
</script>

<section>
	<h1>Results</h1>
	{#if showDetails}
		<span class="total-matchups">
			Total matchups: {$results.length}
		</span>
	{/if}
	<ol>
		{#each displayedResults as { entry, score, wins, losses, totalMatchups }, i}
			<li>
				<div class="result">
					<div class="left">
						<span>
							{i + 1}
						</span>
						<img src={entry.flag} alt="Flag of {entry.country}" />
					</div>
					<div class="right">
						<span class="country">
							{entry.country}
						</span>
						{#if i < 10}
							<div class="score">{TOP_TEN_SCORES[i]}</div>
						{/if}
					</div>
				</div>
				{#if showDetails}
					<div class="details">
						<div class="elo-score">
							{score}
						</div>
						<div class="wins-losses">
							<div class="losses" style:width="{(losses / totalMatchups) * 100}%" />
							<span>
								{wins}
								{#if wins === 1}win{:else}wins{/if}
							</span>
							<span>
								{losses}
								{#if losses === 1}loss{:else}losses{/if}
							</span>
						</div>
					</div>
				{/if}
			</li>
		{/each}
	</ol>
	<button class="expand" on:click={() => (showDetails = !showDetails)}>
		{#if showDetails}
			Show Summary
		{:else}
			Show Details
		{/if}
	</button>
</section>

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

		.total-matchups {
			font-size: 1.25rem;
			font-weight: 500;

			color: #fff;
		}

		ol {
			margin: 0;
			width: 100%;
			max-width: 30rem;
			padding: 0;

			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			list-style: none;

			li {
				.result {
					height: 3rem;

					display: flex;
					align-items: stretch;
					gap: 0.5rem;

					.left {
						width: 9rem;

						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: 0.5rem;

						font-weight: 500;

						color: #fff;

						img {
							height: 3rem;

							box-shadow: 0 0 2px #000;
						}

						span {
							width: 2rem;

							font-size: 1.375rem;
							text-align: left;
						}
					}

					.right {
						flex-grow: 1;

						padding-left: 1rem;

						display: flex;
						align-items: center;
						justify-content: space-between;

						background-color: #fff;

						.country {
							font-size: 1.5rem;
						}

						.score {
							width: 3rem;
							height: 3rem;
							padding: 0.25rem;

							display: flex;
							align-items: center;
							justify-content: center;

							font-size: 1.5rem;
							font-weight: 500;

							background: var(--color-blue);
							color: #fff;
						}
					}
				}

				.details {
					display: flex;
					gap: 0.5rem;

					.elo-score {
						width: 9rem;

						display: flex;
						align-items: center;
						justify-content: flex-end;

						color: #fff;
					}

					.wins-losses {
						flex-grow: 1;
						position: relative;

						padding: 0.5rem;
						height: 2rem;

						display: flex;
						align-items: center;
						justify-content: space-between;

						background-color: var(--color-green);

						.losses {
							position: absolute;
							right: 0;
							top: 0;
							bottom: 0;

							background-color: var(--color-red);
						}

						span {
							z-index: 1;

							font-weight: 500;

							color: #fff;
						}
					}
				}
			}
		}

		button.expand {
			border: none;

			font-size: 1.5rem;
			font-weight: 600;

			background: transparent;
			color: #fff;

			cursor: pointer;
		}
	}
</style>
