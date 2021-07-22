<script lang="ts">
	import GameEvent from "../../scripts/events/gameEvent";
	import typewriter from "../../scripts/utils/typewriter";
	import { eventList, nextEvent } from "../../scripts/stores/eventList";

	export let event: GameEvent;
	export let delay = 0;
	export let lastEvent;
	/** Whether the typewriter transition has finished */
	export let complete = false;

	function getTextColor(): string {
		if (event.textColor === "default") return `var(--main-color)`;
		if (event.text === "faint") return `var(--border-color)`;
		return event.textColor;
	}

	function showButtons() {
		event.setOptions();
		complete = true;
	}
</script>

<div class="EventFragment">
	<div
		class="text"
		in:typewriter={{ speed: event.textSpeed, delay }}
		on:introend={showButtons}
		style="color: {getTextColor()}"
	>
		{event.text}
	</div>
	<br />
	{#if complete && lastEvent}
		{#each event.options as option}
			<button
				on:click={() => {
					if (option.onClick) option.onClick();
					if (option.clearEvents) {
						$eventList = [];
						$nextEvent = option.nextEvent;
					} else $eventList = [...$eventList, option.nextEvent];
				}}>{option.text}</button
			>
		{/each}
	{/if}
</div>
