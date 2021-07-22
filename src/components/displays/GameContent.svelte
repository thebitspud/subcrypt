<script lang="ts">
	import EventFragment from "../fragments/EventFragment.svelte";
	import SettingsDisplay from "../displays/SettingsDisplay.svelte";
	import { eventList, nextEvent } from "../../scripts/stores/eventList";

	let showSettings = false;
</script>

<div class="GameContent">
	{#each $eventList as event, i}
		<EventFragment {event} lastEvent={i === $eventList.length - 1} />
		<br />
	{:else}
		<!-- Tricking eventList into correctly updating -->
		{(() => ($eventList = [$nextEvent]))()}
	{/each}
	{#if showSettings}
		<SettingsDisplay />
	{/if}
</div>
