<script lang="ts">
	import Logo from '$components/Logo.svelte';
	import type { Snippet } from 'svelte';
	import '/src/app.css';

	type Props = {
		children?: Snippet;
	}

	let { children }: Props = $props();

	let scrollY: number = $state(0);
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>ESCR</title>
</svelte:head>

<main>
	<header class:background={scrollY > 0}>
		<a href="/" class="logo">
			<Logo />
			<span>escr</span>
		</a>
		<nav>
			<a href="/settings" title="Settings" aria-label="settings">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						d="m401-100-18-120q-21-7-45-21-23-13-40-28l-112 51-80-141 101-75-3-23-1-23 1-22 3-24-101-75 80-140 111 50q18-15 41-28t44-20l19-121h158l18 121q22 8 45 20 22 12 39 28l114-50 79 140-102 74 3 24 1 23-1 22-3 25 102 74-80 141-113-51q-18 15-40 29-22 13-44 19l-18 121H401Zm78-267q47 0 80-33t33-80-33-80q-33-33-80-33t-80 33q-33 33-33 80t33 80q33 33 80 33Z"
					/>
				</svg>
			</a>
			<a href="/results" title="Results" aria-label="results">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						d="M321-140v-45h136v-155q-54-10-96-46-41-37-57-90-68-8-116-55t-48-115v-43q0-18 13-32 14-13 32-13h111v-86h368v86h111q18 0 32 13 13 14 13 32v43q0 68-48 115t-116 55q-16 53-57 90-42 36-96 46v155h136v45H321Zm-25-384v-165H185v43q0 47 32 81t79 41Zm368 0q47-7 79-41t32-81v-43H664v165Z"
					/>
				</svg>
			</a>
		</nav>
	</header>
	<div class="content">
		{@render children?.()}
	</div>
</main>

<style>
	main {
		min-height: 100%;

		display: flex;
		flex-direction: column;

		header {
			position: fixed;
			left: 0;
			right: 0;
			z-index: 10;

			height: var(--header-height);
			padding: 0 0.25rem;

			display: flex;
			align-items: center;
			justify-content: space-between;

			transition: background 0.2s;

			&.background {
				background-color: var(--color-cyan);
			}

			a {
				text-decoration: none;

				box-shadow: 0 0 0 0 transparent;

				transition: box-shadow 0.2s;

				&:hover,
				&:focus-visible {
					box-shadow: 0 0.375rem 0 0 var(--color-yellow);
				}

				&:focus {
					outline: none;
				}
			}

			a.logo {
				padding: 0 0.25rem;

				display: flex;
				align-items: center;
				gap: 0.5rem;

				font-size: 1.5rem;
				font-weight: 500;

				color: #fff;

				:global(svg) {
					height: 2.25rem;

					fill: #fff;
				}
			}

			nav {
				display: flex;

				a {
					padding: 0.375rem;

					line-height: 0;
				}

				svg {
					height: 2.25rem;
					width: 2.25rem;

					fill: #fff;
				}
			}
		}

		.content {
			flex-grow: 1;

			height: 0;
		}
	}
</style>
