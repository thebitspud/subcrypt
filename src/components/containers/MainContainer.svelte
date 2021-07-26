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
		{#if showTitle && !$stateData.general.gameActive}<TitlePage />{/if}
		{#if showAll}
			<br />
			{#if $stateData.general.gameActive}
				<GameContent />
			{:else}
				<button
					on:click={() => ($stateData.general.gameActive = true)}
					style="margin: 0.5rem auto 1rem">New Game</button
				>
			{/if}
		{/if}

		{#if $stateData.general.showSettings}
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
