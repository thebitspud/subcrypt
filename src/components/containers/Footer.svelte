<script lang="ts">
	import { stateData } from "../../scripts/stores/stateData";

	function openCredits() {}

	function openSettings() {
		$stateData.general.showSettings = !$stateData.general.showSettings;
	}

	function save() {}

	function load() {}
</script>

<div class="Footer">
	<button class="text" on:click={openSettings}>settings</button>
	<button class="text" on:click={save}>save</button>
	<button class="text" on:click={load}>load</button>
	<button class="text" on:click={openCredits}>credits</button>
	<a
		draggable="false"
		href="https://github.com/thebitspud/subcrypt"
		rel="noreferrer"
		target="_blank">github</a
	>
</div>

<style>
	.Footer {
		display: flex;
		flex: 0 0 auto; /* Only occupies necessary space at bottom, game content fills rest of screen */
		flex-flow: row wrap;

		justify-content: center;
		margin: 0 1rem -0.5rem; /* Footer will overlap game content if no top margin */
		/* The negative bottom margin is for cancelling out the margin of the last row of flex items */
	}

	button.text,
	a {
		flex: 0 0 auto;
		margin: 0 min(2rem, 5%) 0.5rem;
		user-select: none;
		color: var(--link-color);
	}
</style>
