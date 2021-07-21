<script lang="ts">
	import SettingsDisplay from "../displays/SettingsDisplay.svelte";
	import pkg from "../../../package.json";

	function newGame() {}
</script>

<div class="MainContainer overflow-wrapper">
	<div class="flex-overflow">
		<h1>subcrypt</h1>
		<p>A text-based adventure by thebitspud.</p>
		<p>Version {pkg.version}</p>
		<button on:click={newGame} style="margin: 0.5rem auto 1rem">New Game</button>
		<SettingsDisplay />
	</div>
</div>

<style>
	.MainContainer {
		min-height: 16rem;
		flex: 3 1 30rem; /* 3:1 flex ratio between main panel and side panel */
	}
</style>
