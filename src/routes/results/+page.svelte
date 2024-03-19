<script lang="ts">
	import { ENTRY_MAP } from '$lib/data';
	import { scores } from '$lib/store';

	const TOP_TEN_SCORES = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];

	$: topTen = Object.entries($scores)
		.sort(([, a], [, b]) => {
			if (a > b) {
				return -1;
			} else if (a < b) {
				return 1;
			}
			return 0;
		})
		.map(([id, score]) => {
			return {
				entry: ENTRY_MAP[id],
				score,
			};
		})
		.slice(0, 10);
</script>

<section>
	<h1>Results</h1>
	<ol>
		{#each topTen as { entry }, i}
			<li>
				<div class="left">
					<img src={entry.flag} alt="Flag of {entry.country}" />
					<span>
						{i + 1}
					</span>
				</div>
				<div class="right">
					<span class="country">
						{entry.country}
					</span>
					<div class="score">{TOP_TEN_SCORES[i]}</div>
				</div>
			</li>
		{/each}
	</ol>
</section>

<style lang="postcss">
	section {
		height: 100%;
		padding: 1rem;

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
				height: 3rem;

				display: flex;
				align-items: center;
				gap: 0.75rem;

				.left {
					width: 10rem;

					display: flex;
					align-items: center;
					justify-content: flex-end;
					gap: 0.5rem;

					font-weight: 500;

					color: #fff;

					img {
						height: 3rem;
					}

					span {
						width: 2rem;

						font-size: 1.375rem;
						text-align: right;
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
		}
	}
</style>
