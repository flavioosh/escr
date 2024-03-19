<script>
	import '/src/app.postcss';
</script>

<svelte:head>
	<title>ESCR</title>
</svelte:head>

<main>
	<header>
		<a href="/" class="home" title="Home">escr</a>
		<nav>
			<a href="/results" title="Results">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
					<path d="M18 22h12v22H18zM4 28h12v16H4zm28 4h12v12H32z" />
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

			height: var(--header-height);
			padding: 0 0.75rem;

			display: flex;
			align-items: center;
			justify-content: space-between;

			a {
				text-decoration: none;
			}

			a.home {
				font-size: 1.5rem;
				font-weight: 500;

				color: #fff;
			}

			svg {
				width: 3rem;

				fill: #fff;
			}
		}

		.content {
			flex-grow: 1;

			height: 0;
		}
	}
</style>
