<script lang="ts">
	import TitlePage from "../displays/TitlePage.svelte";
	import GameContent from "../displays/GameContent.svelte";
	import SettingsDisplay from "../displays/SettingsDisplay.svelte";
	import { stateData } from "../../scripts/stores/stateData";

	let showTitle = false;
	let showAll = false;

	setTimeout(() => (showTitle = true), 500);
	setTimeout(() => (showAll = true), 4500);
</script>

<div class="MainContainer overflow-wrapper">
	<div class="flex-overflow">
		{#if showTitle && !$stateData.gameActive}<TitlePage />{/if}
		{#if showAll}
			<br />
			{#if $stateData.gameActive}
				<GameContent />
			{:else}
				<button
					on:click={() => ($stateData.gameActive = true)}
					style="margin: 0.5rem auto 1rem">New Game</button
				>
			{/if}
		{/if}

		{#if $stateData.showSettings}
			<SettingsDisplay />
		{/if}
	</div>
</div>

<style>
	.MainContainer {
		min-height: 16rem;
		flex: 3 1 30rem; /* 3:1 flex ratio between main panel and side panel */
	}
</style>
