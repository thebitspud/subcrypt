<script lang="ts">
	import EventFragment from "../fragments/EventFragment.svelte";
	import ItemEvent from "../../scripts/events/itemEvent";
	import { eventList, nextEvent } from "../../scripts/stores/eventList";
	import ItemEventFragment from "../fragments/ItemEventFragment.svelte";
</script>

<div class="GameContent">
	{#each $eventList as event, i}
		{#if event instanceof ItemEvent}
			<ItemEventFragment {event} lastEvent={i === $eventList.length - 1} />
		{:else}
			<EventFragment {event} lastEvent={i === $eventList.length - 1} />
		{/if}
	{:else}
		<!-- Tricking eventList into correctly updating -->
		{(() => ($eventList = [$nextEvent]))()}
	{/each}
</div>

<style>
	.GameContent {
		width: max(30rem, 80%);
		max-width: 100%;
		margin: auto;
	}
</style>
