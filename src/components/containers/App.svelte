<script lang="ts">
	import MainContainer from "./MainContainer.svelte";
	import SideContainer from "./SideContainer.svelte";
	import Footer from "./Footer.svelte";
	import { settings } from "../../scripts/stores/settings";
</script>

<main>
	<div class="game-container">
		{#if !$settings.rightSidePanel}<SideContainer />{/if}
		<MainContainer />
		{#if $settings.rightSidePanel}<SideContainer />{/if}
	</div>

	<Footer />
</main>

{#if $settings.darkMode}
	<style>
		/* Dark Mode colors */
		:root {
			--main-color: #fff;
			--bg-color: #181818;
			--border-color: #aaa;
			--link-color: #28f;
			--option-color: #0d0;
		}
	</style>
{/if}

<style>
	/* Vertical flexbox for game content + footer */
	main {
		display: flex;
		flex-flow: column nowrap;

		/* Ensures game content reliably fills but does not overflow screen unless
		 * minimum space requirements exceed screen dimensions */
		box-sizing: border-box;
		min-width: 20rem;
		height: 100%;
		padding: 0.5rem;
	}

	/* Horizontal flexbox for main and side panels */
	.game-container {
		display: flex;
		flex: 1 0 auto; /* Makes game content fill screen space not occupied by footer */
		flex-flow: row wrap;
	}

	.game-container > :global(div) {
		margin: 0.5rem;
		padding: 0.5rem;
		outline: var(--border-color) 1px solid;
	}
</style>
