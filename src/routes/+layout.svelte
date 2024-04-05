<script lang="ts">
	import Logo from '$components/Logo.svelte';
	import '/src/app.postcss';

	let scrollY: number;
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
			<a href="/results" title="Results">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						d="M321-140v-45h136v-155q-54-10-96-46-41-37-57-90-68-8-116-55t-48-115v-43q0-18 13-32 14-13 32-13h111v-86h368v86h111q18 0 32 13 13 14 13 32v43q0 68-48 115t-116 55q-16 53-57 90-42 36-96 46v155h136v45H321Zm-25-384v-165H185v43q0 47 32 81t79 41Zm368 0q47-7 79-41t32-81v-43H664v165Z"
					/>
				</svg>
			</a>
		</nav>
	</header>
	<div class="content">
		<slot />
	</div>
</main>

<style lang="postcss">
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
