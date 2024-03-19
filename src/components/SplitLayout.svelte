<div class="split">
	<section class="left">
		<slot name="left" />
	</section>
	<div class="splitter"></div>
	<section class="right">
		<slot name="right" />
	</section>
</div>

<style lang="postcss">
	.split {
		--color-left: var(--color-cyan);
		--color-right: var(--color-pink);

		height: 100%;

		display: grid;
		grid-template-columns: 1fr 4vw 1fr;

		section {
			padding-top: var(--header-height)
		}

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
	}

	@media (max-aspect-ratio: 1/1) {
		.split {
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
