<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title?: string;
		onshow?: () => void;
		onclose?: () => void;
		children?: Snippet;
		footer?: Snippet;
	}

	let { title = '', onshow, onclose, children, footer }: Props = $props();

	let dialogElement: HTMLDialogElement | undefined = $state();

	export function show() {
		dialogElement?.showModal();
		onshow?.();
	}

	export function close() {
		dialogElement?.close();
		onclose?.();
	}
</script>

<dialog bind:this={dialogElement}>
	<header>
		<span>{title}</span>
		<button onclick={close} title="Close" aria-label="close">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
				<path
					d="m249-183-66-66 231-231-231-231 66-66 231 231 231-231 66 66-231 231 231 231-66 66-231-231-231 231Z"
				/>
			</svg>
		</button>
	</header>
	<section>
		{@render children?.()}
	</section>
	{#if footer}
		<footer>
			{@render footer()}
		</footer>
	{/if}
</dialog>

<style>
	dialog {
		border: none;
		padding: 0 0 1.5rem;

		min-width: 30vw;
		max-height: 80vh;

		/* Can't apply flex directly to dialog as it starts with display: none */
		&[open] {
			display: flex;
		}
		flex-direction: column;

		overflow: hidden;

		box-shadow: 0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.2);

		header {
			height: 3rem;

			display: flex;
			align-items: center;
			justify-content: space-between;

			background-color: var(--color-pink);
			color: #fff;

			span {
				padding: 0 1rem;

				font-size: 1.25rem;
				font-weight: 500;
			}

			button {
				border: none;
				padding: 0.25rem;

				line-height: 0;

				background: none;

				cursor: pointer;

				transition: box-shadow 0.2s;

				&:focus-visible {
					outline: none;

					box-shadow: inset 0 0 0 0.25rem var(--color-yellow);
				}

				svg {
					width: 2.5rem;
					height: 2.5rem;

					fill: #fff;
				}
			}
		}

		section {
			padding: 1.5rem 1.5rem 0;

			display: flex;
			flex-direction: column;
			gap: 2rem;

			overflow-y: auto;
		}

		footer {
			padding: 1.5rem 1.5rem 0;
		}

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.4);
		}
	}

	@media (max-width: 1024px) {
		dialog {
			width: 85vw;
		}
	}
</style>
