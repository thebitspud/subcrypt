<script lang="ts">
	import { typewriter } from "../../scripts/utils/Typewriter";
	import SettingsDisplay from "../displays/SettingsDisplay.svelte";
	import pkg from "../../../package.json";

	let visible = false;
	let showAll = false;

	function newGame() {
		visible = !visible;
	}

	setTimeout(() => {
		visible = true;
	}, 500);

	setTimeout(() => {
		showAll = true;
	}, 5000);

	//		color: var(--link-color);
</script>

<div class="MainContainer overflow-wrapper">
	<div class="flex-overflow">
		{#if visible}
			<h1 in:typewriter={{ speed: 100 }}>subcrypt</h1>
			<p>
				<span in:typewriter={{ delay: 1000 }}>A text-based adventure by </span><a
					draggable="false"
					href="https://github.com/thebitspud"
					rel="noreferrer"
					target="_blank"
					in:typewriter={{ delay: 2250 }}>thebitspud</a
				>
			</p>
			<p in:typewriter={{ delay: 2950 }}>Version {pkg.version}</p>
		{/if}
		{#if showAll}
			<button on:click={newGame} style="margin: 0.5rem auto 1rem">New Game</button>
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
