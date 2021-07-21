<script lang="ts">
	import EventEntry from "../fragments/EventFragment.svelte";
	import SettingsDisplay from "../displays/SettingsDisplay.svelte";
	import GameEvent from "../../scripts/events/GameEvent";

	let showSettings = false;

	const testEvent = new (class extends GameEvent {
		setOptions(): void {
			this.options = [];
		}
	})("When the impostor is suspicious", "red");
</script>

<div class="GameContent">
	<br />
	<EventEntry event={testEvent} bind:complete={showSettings} />
	<br />
	{#if showSettings}
		<SettingsDisplay />
	{/if}
</div>
