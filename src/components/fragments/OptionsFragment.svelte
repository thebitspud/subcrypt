<script lang="ts">
	import { eventList } from "../../scripts/stores/eventList";
	import { nextEvent } from "../../scripts/stores/eventList";
	import eventData from "../../scripts/events/eventData";
	import type { EventOption } from "../../scripts/events/gameEvent";

	export let options: EventOption[];
</script>

<div class="OptionsFragment">
	{#each options as option, i}
		<button
			class="text"
			on:click={() => {
				if (option.onClick) option.onClick();
				if (option.clearEvents) {
					$eventList = [];
					$nextEvent = option.nextEvent ?? eventData.error;
				} else {
					$eventList = [
						...$eventList,
						...(option.nextEvent ? [option.nextEvent] : []),
					];
				}
			}}>{i + 1}. {option.text}</button
		>
		<br />
	{/each}
</div>

<style>
	button.text {
		user-select: none;
		color: var(--option-color);
	}
</style>
