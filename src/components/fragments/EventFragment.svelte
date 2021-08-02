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
		if (event.textColor === "faint") return `var(--border-color)`;
		return event.textColor;
	}
</script>

<div class="EventFragment">
	<div
		class="text"
		in:typewriter={{ speed: event.textSpeed, delay }}
		on:introend={() => (complete = true)}
		style="color: {getTextColor()}"
	>
		{event.getText()}
	</div>
	<br />
	{#if complete && lastEvent}
		{#each event.getOptions() as option, i}
			<button
				class="text"
				on:click={() => {
					if (option.onClick) option.onClick();
					if (option.clearEvents) {
						$eventList = [];
						$nextEvent = option.nextEvent;
					} else $eventList = [...$eventList, option.nextEvent];
					option.nextEvent.onPlay();
				}}>{i + 1}. {option.text}</button
			>
			<br />
		{/each}
	{/if}
</div>

<style>
	.EventFragment {
		text-align: left;
	}

	button.text {
		user-select: none;
		color: var(--option-color);
	}
</style>
