<script lang="ts">
	import EventFragment from "../fragments/EventFragment.svelte";
	import { eventList, nextEvent } from "../../scripts/stores/eventList";
</script>

<div class="GameContent">
	{#each $eventList as event, i}
		<EventFragment {event} lastEvent={i === $eventList.length - 1} />
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
