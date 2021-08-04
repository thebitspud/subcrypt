<script lang="ts">
	import GameEvent from "../../scripts/events/gameEvent";
	import typewriter from "../../scripts/utils/typewriter";
	import OptionsFragment from "./OptionsFragment.svelte";

	export let event: GameEvent;
	export let lastEvent;
	/** Whether the typewriter transition has finished */
	let complete = false;

	function getTextColor(): string {
		if (event.textColor === "default") return `var(--main-color)`;
		if (event.textColor === "faint") return `var(--border-color)`;
		return event.textColor;
	}
</script>

<div class="EventFragment">
	<div
		class="text"
		in:typewriter={{ speed: event.textSpeed }}
		on:introend={() => (complete = true)}
		style="color: {getTextColor()}"
	>
		{event.getText()}
	</div>
	<br />
	{#if complete && lastEvent}
		<OptionsFragment options={event.getOptions()} />
	{/if}
</div>

<style>
	.EventFragment {
		text-align: left;
	}
</style>
