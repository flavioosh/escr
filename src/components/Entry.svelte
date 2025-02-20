<script lang="ts">
	import type { Entry } from '$lib/types/entry';
	import Button, { type ButtonColor } from '$components/Button.svelte';

	type Props = {
		entry: Entry;
		buttonColor: ButtonColor;
		onvote: () => void;
	}

	let { entry, buttonColor, onvote }: Props = $props();
</script>

<div class="entry">
	<header>
		<img src={entry.flag} alt="Flag of {entry.country}" />
		<span>{entry.country}</span>
	</header>
	<div class="video-frame">
		<iframe
			width="100%"
			height="100%"
			src="https://www.youtube-nocookie.com/embed/{entry.youtubeId}"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		></iframe>
	</div>
	<footer>
		<div class="info">
			<span class="song">{entry.song}</span>
			<span class="artist">{entry.artist}</span>
		</div>
		<Button color={buttonColor} size="large" onclick={onvote}>Vote</Button>
	</footer>
</div>

<style>
	.entry {
		--color-info-foreground: #fff;

		width: 40vw;

		display: flex;
		flex-direction: column;
		gap: 0.25rem;

		header {
			padding: 0.5rem;
			height: 3.5rem;

			position: relative;

			display: flex;
			align-items: center;
			gap: 1rem;

			color: var(--color-info-foreground);

			img {
				height: 2.5rem;

				box-shadow: 0 0 2px black;
			}

			span {
				font-size: 1.5rem;
			}
		}

		.video-frame {
			aspect-ratio: 16/9;

			background-color: var(--color-info-background);
		}

		footer {
			display: flex;
			justify-content: space-between;
			align-items: center;

			color: var(--color-info-foreground);

			.info {
				padding: 0 0.5rem;

				display: flex;
				flex-direction: column;

				.song {
					font-size: 1.5rem;
					font-weight: 700;
				}
			}
		}
	}

	@media (max-aspect-ratio: 1/1) {
		.entry {
			width: auto;
			max-width: calc(26vh / 9 * 16);

			.video-frame {
				height: 26vh;
			}
		}
	}

	@media (max-width: 640px) {
		.entry {
			width: 90vw;

			.video-frame {
				width: 100%;
				max-width: 90vw;
				height: auto;

				align-self: center;
			}
		}
	}
</style>
