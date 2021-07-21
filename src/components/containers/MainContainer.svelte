<script lang="ts">
	import TitlePage from "../displays/TitlePage.svelte";
	import GameContent from "../displays/GameContent.svelte";

	let showTitle = false;
	let showAll = false;
	let gameStarted = false;

	setTimeout(() => (showTitle = true), 500);
	setTimeout(() => (showAll = true), 5000);
</script>

<div class="MainContainer overflow-wrapper">
	<div class="flex-overflow">
		{#if showTitle}<TitlePage />{/if}
		{#if showAll}
			{#if gameStarted}
				<GameContent />
			{:else}
				<button
					on:click={() => (gameStarted = true)}
					style="margin: 0.5rem auto 1rem">New Game</button
				>
			{/if}
		{/if}
	</div>
</div>

<style>
	.MainContainer {
		min-height: 16rem;
		flex: 3 1 30rem; /* 3:1 flex ratio between main panel and side panel */
	}
</style>
